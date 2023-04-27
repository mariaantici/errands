import React, { useState } from 'react';
import ErrandsUpdateContext from '@/contexts/ErrandsUpdateContext';
import DatePickerMobile from '@/components/datepickers/DatePickerMobile';
import DatePicker from '@/components/datepickers/DatePicker';
import ShowSelectedDate from './ShowSelectedDate';
import ErrandsListsForUser from '@/components/tabContent/showErrands/ErrandsListsForUser';
import AddErrandButton from '@/components/tabContent/addErrands/AddErrandButton';
import RecommendedErrands from '@/components/tabContent/addErrands/RecommendedErrands';

// TabContent component
const TabContent: React.FC<{ list: string }> = ({ list }) => {
    // Set state for managing the selected date across the components
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    // Declare the state for the update flag and set its initial value to false
    const [updateFlag, setUpdateFlag] = useState(false);

    // Function to toggle the value of the update flag
    const toggleUpdateFlag = () => {
        // Set the new value of the update flag to the opposite of its current value
        setUpdateFlag(!updateFlag);
    };

    // Render the TabContent
    return (
        <>
            <DatePickerMobile selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <ShowSelectedDate date={selectedDate} />
            <ErrandsUpdateContext.Provider value={{ updateFlag, toggleUpdateFlag }}>
                <ErrandsListsForUser list={list} date={selectedDate} />
                <AddErrandButton />
                <RecommendedErrands />
            </ErrandsUpdateContext.Provider>
        </>
    );
};

export default TabContent;
