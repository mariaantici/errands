import React from 'react';
import DatePickerMobile from '@/components/datepickers/DatePickerMobile';
import DatePicker from '@/components/datepickers/DatePicker';
import ErrandsListForMembers from '@/components/tabContent/ErrandsListForMembers';
import AddErrandButton from '@/components/tabContent/AddErrandButton';
import RecommendedErrands from '@/components/tabContent/RecommendedErrands';

// TabContent component
const TabContent: React.FC<{ list: string }> = ({ list }) => {

    // Render the TabContent
    return (
        <>
            <DatePickerMobile />
            <DatePicker />
            <ErrandsListForMembers />
            <AddErrandButton />
            <RecommendedErrands />

            {// Rendering sample data to show the Tabs work
            }
            <p key={list}>{list}</p>
        </>
    );
};

export default TabContent;
