import React, { useState, useEffect, useContext } from "react";
import { getErrands } from "@/services/database/errands"
import { getName } from "@/services/database/users";
import { getIsOwner } from "@/services/database/lists";
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

    // Fetch errands, names and ownership for members
    const fetchErrandsNameAndOwneship = async (member: any) => {
        try {
            const errands = await getErrands(member.user_id, formattedDate);
            const name = await getName(member.user_id);
            const owner = await getIsOwner(member.user_id, list);

            setErrandsData((prevErrandsData) => [...prevErrandsData, errands]);

            // Add name and is_owner to member
            member.name = name;
            member.isOwner = owner;

        } catch (error) {
            setAlert({ title: 'Error', message: error.message, type: 'error' });
            setAlertKey(Date.now());
        }
    };

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

    useEffect(() => {

        setLoading(true);

        // Reset the errands state before accumulating new data
        setErrandsData([[]]);

        Promise.all(members.map((member) => fetchErrandsNameAndOwneship(member))).then(() => setLoading(false));

    }, [members, formattedDate, updateFlag]);

    // Find if user is owner of the list
    const userOwns = members.find(member => member.user_id === userId)?.isOwner ?? false;

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
                                                {member.name || 'Loading...'}
                                            </h2>
                                            {(userOwns || userId === member.user_id) && <DeleteMember member={member} members={members} onMemberRemoved={onMemberRemoved} />}
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
