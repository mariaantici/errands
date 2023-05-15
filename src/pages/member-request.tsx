import { useEffect, useState } from "react";
import { getUser } from "@/services/database/users";
import { deleteRequest, fetchRequest } from "@/services/database/member-requests";
import { updateListId } from "@/services/database/lists";
import { useRouter } from 'next/router';
import { Alert } from "@/components/Alert";
import Spinner from "@/components/common/Spinner";

// MemberRequest component
const MemberRequest: React.FC = () => {
    // State to handle user's id
    const [userId, setUserId] = useState(null);

    // State to handle user email
    const [userEmail, setUserEmail] = useState(null);

    // State to handle if there's a member request
    const [hasRequest, setHasRequest] = useState(false);

    // State for managing loading state
    const [isLoading, setIsLoading] = useState(true);

    // State to handle the alerts
    const [alert, setAlert] = useState(null);
    const [alertKey, setAlertKey] = useState(null);

    const router = useRouter();

    // Fetch user's data
    const fetchUser = async () => {
        try {
            const user = await getUser();
            setUserId(user.id);
            setUserEmail(user.email);

        } catch (error) {
            // If the session doesn't exist, navigate to the authentication page
            router.push('/authentication');

            // Manage errors
            setAlert({ title: 'Error', message: error.message, type: 'error' });
            setAlertKey(Date.now());
        }
    };

    // Update the user's list id if there's a request
    const isRequest = async () => {
        try {
            const request = await fetchRequest(userEmail);

            if (request) {
                setHasRequest(true);

                try {
                    await updateListId(userId, request.list_id, request.list_name);
                    await deleteRequest(request.id);

                } catch (error) {
                    setAlert({ title: 'Error', message: error.message, type: 'error' });
                    setAlertKey(Date.now());
                }
            }

        } catch (error) {
            throw error;

        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);

        fetchUser();

        if (userId) {
            isRequest();
        }

    }, [userId]);

    // Redirect user after a certain time when the loading state is false and userId is not null
    useEffect(() => {
        if (!isLoading && userId !== null) {
            const timer = setTimeout(() => {
                router.push('/errands-manager');
            }, 5000); // = 5 seconds

            // Clean up the timer when the component is unmounted
            return () => clearTimeout(timer);
        }
    }, [isLoading, userId, router]);

    // Render the MemberRequest
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
                <div className="flex items-center justify-center min-h-screen">
                    <div className="m-auto">
                        <div className={`alert ${hasRequest ? "alert-success" : "alert-error"} max-w-xs sm:max-w-sm`}>
                            {hasRequest ? (
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM18.58 32.58L11.4 25.4C10.62 24.62 10.62 23.36 11.4 22.58C12.18 21.8 13.44 21.8 14.22 22.58L20 28.34L33.76 14.58C34.54 13.8 35.8 13.8 36.58 14.58C37.36 15.36 37.36 16.62 36.58 17.4L21.4 32.58C20.64 33.36 19.36 33.36 18.58 32.58Z" fill="#00BA34" />
                                </svg>
                            ) : (
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM24 26C22.9 26 22 25.1 22 24V16C22 14.9 22.9 14 24 14C25.1 14 26 14.9 26 16V24C26 25.1 25.1 26 24 26ZM26 34H22V30H26V34Z" fill="#E92C2C" />
                                </svg>
                            )}
                            <div className="flex w-full justify-between">
                                <div className="flex flex-col">
                                    <span>{hasRequest ? "Member request have been accepted" : "You have no member request"}</span>
                                    <span className="text-content2 text-sm">we'll redirect you in a moment</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MemberRequest;
