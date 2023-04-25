import React, { useEffect, useState } from 'react';
import { getUser } from '@/services/database/users';
import DatePickerMobile from '@/components/datepickers/DatePickerMobile';
import DatePicker from '@/components/datepickers/DatePicker';
import ShowSelectedDate from './ShowSelectedDate';
import ErrandsListsForUser from '@/components/tabContent/ErrandsListsForUser';
import AddErrandButton from '@/components/tabContent/AddErrandButton';
import RecommendedErrands from '@/components/tabContent/RecommendedErrands';

// TabContent component
const TabContent: React.FC<{ list: string, userId: string }> = ({ list, userId }) => {
    // Set state for managing the selected date across the components
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    // Render the TabContent
    return (
        <>
            <DatePickerMobile selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <ShowSelectedDate date={selectedDate} />
            <ErrandsListsForUser />
            <AddErrandButton userId={userId} />
            <RecommendedErrands userId={userId} />

            {// Rendering sample data to show the Tabs work
            }
            <p key={list}>{list}</p>
        </>
    );
};

export default TabContent;
