import { useState } from "react";
import Navbar from "@/components/Navbar";
import Tabs from "@/components/Tabs";
import TabContent from "@/components/tabContent/TabContent";

// Sample data for the tabs
const data: { [key: string]: string[] } = {
    all: ['Item 1', 'Item 2', 'Item 3'],
    household: ['Household 1', 'Household 2', 'Household 3'],
    trip: ['Trip 1', 'Trip 2', 'Trip 3'],
    workplace: ['Workplace 1', 'Workplace 2', 'Workplace 3'],
};

// ErrandsManager component
const ErrandsManager: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('all');

    // Render the ErrandsManager
    return (
        <>
            <Navbar />
            <main className="max-w-5xl mx-auto">
                <Tabs onTabChange={setActiveTab} activeTab={activeTab} />
                <TabContent data={data[activeTab]} />
            </main>
        </>
    );
};

export default ErrandsManager;
