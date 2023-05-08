import React, { useState, useEffect, useContext } from 'react';
import { fetchListId, fetchMembersId } from '@/services/database/lists';
import { getName } from "@/services/database/users";
import UserIdContext from "@/contexts/UserIdContext";
import ActiveListContext from "@/contexts/ActiveListContext";
import ErrandsUpdateContext from '@/contexts/ErrandsUpdateContext';
import Spinner from '@/components/common/Spinner';
import DatePickerMobile from '@/components/datepickers/DatePickerMobile';
import DatePicker from '@/components/datepickers/DatePicker';
import ShowSelectedDate from '@/components/tabContent/ShowSelectedDate';
import ErrandsListsForMember from './showErrands/ErrandsListsForMember';
import ErrandsListsForUser from '@/components/tabContent/showErrands/ErrandsListsForUser';
import AddErrandButton from '@/components/tabContent/addErrands/AddErrandButton';
import RecommendedErrands from '@/components/tabContent/addErrands/RecommendedErrands';
import MembersNamesContext from '@/contexts/MembersNamesContext';

// TabContent component
const TabContent: React.FC = () => {
    // Get the userId from the UserIdContext
    const userId = useContext(UserIdContext);

    // Get the active list from ActiveListContext
    const list = useContext(ActiveListContext);

    // State for managing the members
    const [members, setMembers] = useState([]);

    // State to handle fetched names for members
    const [membersNames, setMembersNames] = useState([]);

    // State for managing the loading status
    const [loading, setLoading] = useState(true);

    // Set state for managing the selected date across the components
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    // State for managing the refresh flag for deleting member
    const [refreshMembers, setRefreshMembers] = useState(false);

    // Declare the state for the update flag and set its initial value to false
    const [updateFlag, setUpdateFlag] = useState(false);

    // Function to toggle the refreshMembers flag when a member is removed
    const onMemberRemoved = () => {
        setRefreshMembers(!refreshMembers);
    };

    // Function to toggle the value of the update flag
    const toggleUpdateFlag = () => {
        // Set the new value of the update flag to the opposite of its current value
        setUpdateFlag(!updateFlag);
    };

    useEffect(() => {
        setLoading(true);

        if (list !== "all" && userId) {

            const fetchData = async () => {

                // Fetch list id for user
                try {
                    const data = await fetchListId(userId, list);

                    if (data.list_id) {
                        // Fetch members for list id
                        try {
                            const membersIds = await fetchMembersId(data.list_id);
                            setMembers(membersIds);
                            setLoading(false);

                        } catch (error) {
                            throw error;
                        }
                    }

                } catch (error) {
                    throw error;
                }
            };

            fetchData();

        } else {
            setLoading(false);
        }

        // Cleanup function
        return () => {
            setMembers([]);
        };

    }, [userId, list, refreshMembers]);

    useEffect(() => {
        if (members.length > 1) {
            // Fetch name for each member
            const fetchMemberName = async (memberId: string) => {
                try {
                    const data = await getName(memberId);
                    setMembersNames((prevMembersNames) => [...prevMembersNames, data]);

                } catch (error) {
                    throw error;
                }
            };

            // Reset the states before accumulating new data
            setMembersNames([]);

            Promise.all(members.map((member) => fetchMemberName(member.user_id)));
        }
    }, [members]);

    // Render the TabContent
    return (
        <>
            <DatePickerMobile selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <ShowSelectedDate date={selectedDate} />
            <ErrandsUpdateContext.Provider value={{ updateFlag, toggleUpdateFlag }}>
                <MembersNamesContext.Provider value={membersNames}>
                    {loading ? (
                        <div className="flex justify-center items-center h-24">
                            <Spinner />
                        </div>
                    ) : (
                        members.length > 1
                            ? <ErrandsListsForMember date={selectedDate} members={members} onMemberRemoved={onMemberRemoved} key={`${list}-${selectedDate}`} />
                            : <ErrandsListsForUser date={selectedDate} key={`${list}-${selectedDate}`} />
                    )}
                    <AddErrandButton />
                    <RecommendedErrands />
                </MembersNamesContext.Provider>
            </ErrandsUpdateContext.Provider>
        </>
    );
};

export default TabContent;
