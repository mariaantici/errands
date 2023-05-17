import React, { useState, useEffect, useContext } from 'react';
import { getListId, getMembersId } from '@/services/database/lists';
import UserIdContext from "@/contexts/UserIdContext";
import ActiveListContext from "@/contexts/ActiveListContext";
import ErrandsUpdateContext from '@/contexts/ErrandsUpdateContext';
import Spinner from '@/components/common/Spinner';
import DatePickerMobile from '@/components/errands-manager/tab-content/datepickers/DatePickerMobile';
import DatePicker from '@/components/errands-manager/tab-content/datepickers/DatePicker';
import ShowSelectedDate from '@/components/errands-manager/tab-content/datepickers/ShowSelectedDate';
import AddMemberButton from '@/components/errands-manager/tab-content/add-member/AddMemberButton';
import ErrandsListsForMember from '@/components/errands-manager/tab-content/show-errands/ErrandsListsForMember';
import ErrandsListsForUser from '@/components/errands-manager/tab-content/show-errands/ErrandsListsForUser';
import AddErrandButton from '@/components/errands-manager/tab-content/add-errand/AddErrandButton';
import RecommendedErrands from '@/components/errands-manager/tab-content/add-errand/RecommendedErrands';

// TabContent component
const TabContent: React.FC = () => {
    // Get the userId from the UserIdContext
    const userId = useContext(UserIdContext);

    // Get the active list from ActiveListContext
    const list = useContext(ActiveListContext);

    // State for managing fetched members for all the lists
    const [listsMembers, setListsMembers] = useState({});

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

    // Function to fetch all members for the current user's lists
    const fetchAllMembers = async (userId: string) => {
        const lists = ['household', 'trip', 'workplace'];
        let listsMembers = {};

        // Function to fetch the list id and members for a specific list
        const fetchDataForList = async (list: string) => {
            try {
                const listId = await getListId(userId, list);
                if (listId) {
                    try {
                        const membersIds = await getMembersId(listId);
                        // If there is more than one member in the list, save members
                        if (membersIds.length > 1) {
                            listsMembers[list] = membersIds;
                        }
                    } catch (error) {
                        throw error;
                    }
                }
            } catch (error) {
                throw error;
            }
        };
        // Wait for the array of promises to fetch data for each list
        try {
            await Promise.all(lists.map((list) => fetchDataForList(list)));
        } catch (error) {
            throw error;
        }

        return listsMembers;
    };

    // Fetch members data when the component mounts and whenever userId or refreshMembers change
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllMembers(userId);
                setListsMembers(data);
                setLoading(false);
            } catch (error) {
                throw error;
            }
        };
        fetchData();
    }, [userId, refreshMembers]);

    // Render the TabContent
    return (
        <>
            <DatePickerMobile selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            {list !== "all" && <AddMemberButton />}
            <ShowSelectedDate date={selectedDate} />
            <ErrandsUpdateContext.Provider value={{ updateFlag, toggleUpdateFlag }}>
                {loading && list !== "all" ? (
                    <div className="flex justify-center items-center h-24">
                        <Spinner />
                    </div>
                ) : (
                    list === "all"
                        ? <ErrandsListsForUser date={selectedDate} key={`${list}-${selectedDate}`} />
                        : listsMembers[list]
                            ? <ErrandsListsForMember date={selectedDate} members={listsMembers[list]} onMemberRemoved={onMemberRemoved} key={`${list}-${selectedDate}`} />
                            : <ErrandsListsForUser date={selectedDate} key={`${list}-${selectedDate}`} />
                )}
                <AddErrandButton />
                <RecommendedErrands />
            </ErrandsUpdateContext.Provider>
        </>
    );
};

export default TabContent;
