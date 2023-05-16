import { useEffect, useState } from "react";
import { getUser, getNameAndEmail } from "@/services/database/users";
import { deleteRequest, getRequests } from "@/services/database/member-requests";
import { updateListId } from "@/services/database/lists";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Alert } from "@/components/Alert";
import Spinner from "@/components/common/Spinner";

// MemberRequest component
const MemberRequest: React.FC = () => {
    // State to handle user's id
    const [userId, setUserId] = useState(null);

    // State to handle user email
    const [userEmail, setUserEmail] = useState(null);

    // State to handle requests for user
    const [requests, setRequests] = useState([]);

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

    // Fetch Requests
    const fetchRequests = async () => {
        try {
            const requests = await getRequests(userEmail);

            // Check if requests is not an empty array
            if (requests.length > 0) {
                // iterate over each request and fetch user data
                const requestsWithUserData = await Promise.all(requests.map(async (request) => {
                    const senderData = await getNameAndEmail(request.sender_id);
                    return { ...request, senderData };
                }));

                setRequests(requestsWithUserData);
            } else {
                setRequests([]);
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
            fetchRequests();
        }

    }, [userId]);

    // Function to accept member request
    const acceptMemberRequest = async (listId: string, listName: string, requestId: string) => {
        try {
            await updateListId(userId, listId, listName);
            await deleteRequest(requestId);

            setAlert({ title: 'Success', message: 'Invite has been accepted', type: 'success' });
            setAlertKey(Date.now());

            // Remove the request from the state
            setRequests(requests.filter(request => request.id !== requestId));

        } catch (error) {
            setAlert({ title: 'Error', message: error.message, type: 'error' });
            setAlertKey(Date.now());
        }
    }

    // Function to decline member request
    const deleteMemberRequest = async (requestId: string) => {
        try {
            await deleteRequest(requestId);

            setAlert({ title: 'Success', message: 'Invite has been declined', type: 'success' });
            setAlertKey(Date.now());

            // Remove the request from the state
            setRequests(requests.filter(request => request.id !== requestId));

        } catch (error) {
            setAlert({ title: 'Error', message: error.message, type: 'error' });
            setAlertKey(Date.now());
        }
    }

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
                    <div className="card m-auto max-w-[80%] md:max-w-[760px]">
                        <div className="card-body">
                            <div className="text-left mb-6">
                                <h2 className="text-2xl font-pacifico mb-2">Your invites</h2>
                                <p className="text-sm text-green-600 tracking-wide">they won't even know if you decline</p>
                            </div>
                            <div className="flex flex-col">
                                {requests.length === 0 ? (
                                    <div className="flex justify-center items-center text-base">
                                        You have no invites.
                                    </div>
                                ) : (
                                    requests.map((request, index) => (
                                        <>
                                            <div key={index} className="flex flex-col divider:flex-row sm:items-center justify-between gap-4">
                                                <div>
                                                    <h6 className="text-base">
                                                        <span className="font-pacifico">{request.senderData.name}</span>'s <span className="text-green-600">{request.list_name}</span> list invite
                                                    </h6>
                                                    <p className="text-sm text-content2">
                                                        {request.senderData.email}
                                                    </p>
                                                </div>
                                                <div className="flex gap-3">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-outline-success btn-md btn-block rounded-3xl"
                                                        onClick={() => acceptMemberRequest(request.list_id, request.list_name, request.id)}
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        type="reset"
                                                        className="btn btn-outline-error btn-md btn-block rounded-3xl"
                                                        onClick={() => deleteMemberRequest(request.id)}
                                                    >
                                                        Decline
                                                    </button>
                                                </div>
                                            </div>
                                            {index < requests.length - 1 && (
                                                <div className="divider divider-horizontal w-full mx-auto"></div>
                                            )}
                                        </>
                                    ))
                                )}
                            </div>
                            <p className="text-xs text-content3 tracking-wide mt-6">
                                {requests.length === 0
                                    ? "No invites? No problem! Maybe it's time to be the inviter, not the invitee."
                                    : "Joining another's list? Don't worry, your errands stay safe! But remember, your tasks will be visible to the other members."
                                }
                            </p>
                            <a href="/errands-manager" className="flex items-center justify-end mt-4">
                                <p className="text-xl font-pacifico">Continue to </p>
                                <p className="text-xl ml-1 mr-2 font-pacifico text-green-600">Errands</p>
                                <FontAwesomeIcon icon={faCircleArrowRight} className="h-6 text-green-600" />
                            </a>
                        </div>
                    </div >
                </div >
            )}
        </>
    );
};

export default MemberRequest;
