import React, { useState, useEffect, useContext } from "react";
import { getErrands } from "@/services/database/errands"
import { getName } from "@/services/database/users";
import { isOwner } from "@/services/database/lists";
import { Alert } from "@/components/common/Alert";
import UserIdContext from "@/contexts/UserIdContext";
import ActiveListContext from "@/contexts/ActiveListContext";
import ErrandsUpdateContext from "@/contexts/ErrandsUpdateContext";
import Spinner from "@/components/common/Spinner";
import ErrandsList from "@/components/errands-manager/tab-content/show-errands/ErrandsList";
import DeleteMember from "@/components/errands-manager/tab-content/show-errands/DeleteMember";

// ErrandsListsForMember component
const ErrandsListsForMember: React.FC<{ date: Date, members: any[], onMemberRemoved: () => void }> = ({ date, members, onMemberRemoved }) => {
    // Get the userId from the UserIdContext
    const userId = useContext(UserIdContext);

    // Get the active list from ActiveListContext
    const list = useContext(ActiveListContext);

    // Destructure the updateFlag and toggleUpdateFlag properties from the ErrandsUpdateContext
    const { updateFlag, toggleUpdateFlag } = useContext(ErrandsUpdateContext);

    // State to handle fetched errands data
    const [errandsData, setErrandsData] = useState([[]]);

    // State to handle fetched names for members
    const [membersNames, setMembersNames] = useState([]);

    // State to handle the ownership of members
    const [ownership, setOwnership] = useState([]);

    // State for managing the loading status
    const [loading, setLoading] = useState(true);

    // State to handle the alerts
    const [alert, setAlert] = useState(null);
    const [alertKey, setAlertKey] = useState(null);

    // Convert a local date to match the supabase date type.
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;

    // Function to filter retrieved errands based on the member's id
    const filterErrandsByMember = (memberId: string) => {
        const memberErrands = errandsData.find((memberErrands) =>
            memberErrands.some((errand) => errand.user_id === memberId)
        );
        return memberErrands || [];
    };

    // Function to filter retrieved errands based on the list value
    const filterErrandsByList = (errands: any[], list: string) => {
        if (!errands || !Array.isArray(errands)) {
            return [];
        }
        return errands.filter((errand) => errand.list_name === list);
    };

    // Find if user is owner of the list
    const userOwns = ownership.find(o => o.user_id === userId)?.is_owner;

    useEffect(() => {
        // Fetch errands, names and ownership for members
        const fetchErrandsNameAndOwneship = async (memberId: string) => {
            try {
                const errands = await getErrands(memberId, formattedDate);
                const name = await getName(memberId);
                const owner = await isOwner(userId, list);

                setErrandsData((prevErrandsData) => [...prevErrandsData, errands]);
                setMembersNames((prevMembersNames) => [...prevMembersNames, name]);
                setOwnership((prevOwners) => [...prevOwners, owner]);

            } catch (error) {
                setAlert({ title: 'Error', message: error.message, type: 'error' });
                setAlertKey(Date.now());
            }
        };

        setLoading(true);

        // Reset the states before accumulating new data
        setErrandsData([[]]);
        setMembersNames([]);
        setOwnership([]);

        Promise.all(members.map((member) => fetchErrandsNameAndOwneship(member.user_id))).then(() => setLoading(false));

    }, [members, formattedDate, updateFlag]);

    // Render the ErrandsListsForMember
    return (
        <>
            {alert && (
                <Alert
                    key={alertKey}
                    title={alert.title}
                    message={alert.message}
                    type={alert.type}
                />
            )}
            {loading ? (
                <div className="flex justify-center items-center h-24">
                    <Spinner />
                </div>
            ) : (
                <div className="flex flex-row flex-wrap justify-center items-start">
                    {members
                        .sort((a, b) => (a.user_id === userId ? -1 : b.user_id === userId ? 1 : 0))
                        .map((member, index) => {
                            const memberErrands = filterErrandsByMember(member.user_id);
                            const filteredErrands = filterErrandsByList(memberErrands, list);
                            return (
                                <React.Fragment key={member.user_id}>
                                    <div className="flex flex-col items-center w-[300px]">
                                        <div className="flex items-center mb-3">
                                            <h2 className="font-pacifico text-lg text-green-600">
                                                {
                                                    membersNames.find(memberName => memberName.id === member.user_id)?.name
                                                    || 'Loading...'
                                                }
                                            </h2>
                                            {(userOwns || userId === member.user_id) && <DeleteMember memberId={member.user_id} onMemberRemoved={onMemberRemoved} />}
                                        </div>
                                        <ErrandsList errands={[
                                            ...filteredErrands.filter((errand) => errand.status === false),
                                            ...filteredErrands.filter((errand) => errand.status === true),
                                        ]} />
                                    </div>
                                    {index < members.length - 1 && (
                                        <>
                                            <div className="divider divider-vertical h-auto self-stretch mx-0 hidden divider:flex"></div>
                                            <div className="w-full divider:hidden"><div className="divider divider-horizontal w-[150px] mx-auto"></div></div>
                                        </>
                                    )}
                                </React.Fragment>
                            );
                        })}
                </div>
            )}
        </>
    );
};

export default ErrandsListsForMember;
