import React from 'react';
import DatePicker from './DatePicker';
import ErrandsListForMembers from './ErrandsListForMembers';

// Define the props for the TabContent component
interface TabContentProps {
    data: string[];
}

// TabContent component
const TabContent: React.FC<TabContentProps> = ({ data }) => {
    // Renter the TabContent
    return (
        <>
            <DatePicker />
            <ErrandsListForMembers />

            {// Rendering sample data to show the Tabs work
            }
            {data.map((item, index) => (
                <p key={index}>{item}</p>
            ))}
        </>
    );
};

export default TabContent;
