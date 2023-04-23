import React from 'react';
import DatePickerMobile from '@/components/datepickers/DatePickerMobile';
import DatePicker from '@/components/datepickers/DatePicker';
import ErrandsListForMembers from '@/components/tabContent/ErrandsListForMembers';
import AddErrandButton from '@/components/tabContent/AddErrandButton';
import RecommendedErrands from '@/components/tabContent/RecommendedErrands';

// Define the props for the TabContent component
interface TabContentProps {
    data: string[];
}

// TabContent component
const TabContent: React.FC<TabContentProps> = ({ data }) => {

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
            {data.map((item, index) => (
                <p key={index}>{item}</p>
            ))}
        </>
    );
};

export default TabContent;
