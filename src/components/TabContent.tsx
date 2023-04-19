import React from 'react';
import DatePickerMobile from './DatePickerMobile';
import DatePicker from './DatePicker';
import ErrandsListForMembers from './ErrandsListForMembers';
import AddErrandButton from './AddErrandButton';
import RecommendedErrands from './RecommendedErrands';

// Define the props for the TabContent component
interface TabContentProps {
    data: string[];
}

// TabContent component
const TabContent: React.FC<TabContentProps> = ({ data }) => {

    // Render the TabContent
    return (
        <>
            < DatePickerMobile />
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
