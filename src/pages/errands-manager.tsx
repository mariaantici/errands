import { useState, useEffect } from "react";
import UserIdContext from "@/contexts/UserIdContext";
import ActiveListContext from "@/contexts/ActiveListContext";
import { getUser } from "@/services/database/users";
import { useRouter } from 'next/router';
import { Alert } from '@/components/Alert';
import Spinner from '@/components/common/Spinner';
import Navbar from "@/components/Navbar";
import Tabs from "@/components/Tabs";
import TabContent from "@/components/tabContent/TabContent";
import InputNameModal from "@/components/userLogic/InputNameModal";

// ErrandsManager component
const ErrandsManager: React.FC = () => {
    // State to handle tabs
    const [activeTab, setActiveTab] = useState<string>('all');

    // State to handle modal visibility
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // State to handle the alerts
    const [alert, setAlert] = useState(null);
    const [alertKey, setAlertKey] = useState(null);

    // State for saving the user's id
    const [userId, setUserId] = useState(null);

    // State for managing loading state
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter()

    useEffect(() => {
        // Check if a name exists for a user in the users table, if not it will create the user and open the modal
        async function checkUserName() {
            setIsLoading(true);

            // Check if the user exists in the users table
            try {
                const user = await getUser();
                setUserId(user.id);

                if (!user.name) {
                    setIsOpen(true); // Open the modal for new users
                }
            } catch (error) {
                // If the session doesn't exist, navigate to the authentication page
                router.push('/authentication');

                // Manage errors
                if (error.message !== "invalid claim: missing sub claim") {
                    setAlert({ title: 'Error', message: error.message, type: 'error' });
                    setAlertKey(Date.now());
                }
            } finally {
                setIsLoading(false);
            }
        };

        checkUserName();
    }, []);

    // Render the ErrandsManager
    return (
        <>
            {alert && (
                <Alert
                    key={alertKey}
                    title={alert.title}
                    message={alert.message}
                    type={alert.type}
                />
            )}
            {isLoading || userId === null ? (
                <div className="w-screen h-screen flex justify-center items-center">
                    <Spinner />
                </div>
            ) : (
                <>
                    <Navbar />
                    <main className="max-w-5xl mx-auto">
                        <InputNameModal isOpen={isOpen} />
                        <Tabs onTabChange={setActiveTab} activeTab={activeTab} />
                        <UserIdContext.Provider value={userId}>
                            <ActiveListContext.Provider value={activeTab}>
                                <TabContent />
                            </ActiveListContext.Provider>
                        </UserIdContext.Provider>
                    </main>
                </>
            )}

        </>
    );
};

export default ErrandsManager;
