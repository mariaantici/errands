import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Tabs from "@/components/Tabs";
import TabContent from "@/components/tabContent/TabContent";
import InputName from "@/components/InputName";
import { getUser } from "@/services/database/users";

// Sample data for the tabs
const data: { [key: string]: string[] } = {
    all: ['Item 1', 'Item 2', 'Item 3'],
    household: ['Household 1', 'Household 2', 'Household 3'],
    trip: ['Trip 1', 'Trip 2', 'Trip 3'],
    workplace: ['Workplace 1', 'Workplace 2', 'Workplace 3'],
};

// ErrandsManager component
const ErrandsManager: React.FC = () => {
    // State to handle tabs
    const [activeTab, setActiveTab] = useState<string>('all');

    // State to handle modal visibility
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {

        // Check if a name exists for a user in the users table, if not it will create the user and open the modal
        async function checkUserName() {
            // Check if the user exists in the users table
            try {
                const user = await getUser();
                console.log(user);

                if (!user.name) {
                    setIsOpen(true); // Open the modal for new users
                }
            } catch (error) {
                alert(error.message);
            }
        };

        checkUserName();
    }, []);

    // Render the ErrandsManager
    return (
        <>
            <Navbar />
            <main className="max-w-5xl mx-auto">
                <InputName isOpen={isOpen} />
                <Tabs onTabChange={setActiveTab} activeTab={activeTab} />
                <TabContent data={data[activeTab]} />
            </main>
        </>
    );
};

export default ErrandsManager;
