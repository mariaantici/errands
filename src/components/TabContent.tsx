import React, { useState } from 'react';
import AddErrandButton from './AddErrandButton';
import DatePicker from './DatePicker';
import ErrandsListForMembers from './ErrandsListForMembers';
import ReactDatePicker from './ReactDatePicker';
import RecommendedErrands from './RecommendedErrands';

// Define the props for the TabContent component
interface TabContentProps {
    data: string[];
}

// TabContent component
const TabContent: React.FC<TabContentProps> = ({ data }) => {
    // State for managing selected date initialized with the current date
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    // Render the TabContent
    return (
        <>
            <div className="md:hidden flex justify-center">
                <div className="flex items-baseline">
                    <h2 className="whitespace-nowrap mr-2">Select date:</h2>
                    <ReactDatePicker className="input mb-10 w-[108px]"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                    />
                </div>
            </div>

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
