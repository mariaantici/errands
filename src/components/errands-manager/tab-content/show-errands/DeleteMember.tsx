import React, { useState, useContext } from "react";
import { createList, deleteList, updateIsOwner } from "@/services/database/lists";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { Alert } from "@/components/common/Alert";
import UserIdContext from "@/contexts/UserIdContext";
import ActiveListContext from "@/contexts/ActiveListContext";

// DeleteMember component
const DeleteMember: React.FC<{ member: { user_id: string, name: string, isOwner: boolean }, members: any[], onMemberRemoved: () => void }> = ({ member, members, onMemberRemoved }) => {
    // Get the userId from the UserIdContext
    const userId = useContext(UserIdContext);

    // Get the active list from ActiveListContext
    const list = useContext(ActiveListContext);

    // State to handle the alerts
    const [alert, setAlert] = useState(null);
    const [alertKey, setAlertKey] = useState(null);

    // Function to delete list for member
    async function removeList() {
        try {
            await deleteList(list, member.user_id);

            // Show success alert
            setAlert({
                title: 'Success',
                message: userId === member.user_id
                    ? `You have successfully removed yourself from the list. Enjoy your brand new ${list} list`
                    : `${member.name} has been successfully removed from your ${list}`,
                type: 'success'
            });
            setAlertKey(Date.now());

        } catch (error) {
            setAlert({ title: 'Error', message: error.message, type: 'error' });
            setAlertKey(Date.now());
        }
    };

    // Function to create new list for member
    async function addList() {
        try {
            await createList(list, member.user_id);

        } catch (error) {
            setAlert({ title: 'Error', message: error.message, type: 'error' });
            setAlertKey(Date.now());
        }
    };

    // Function to set a new owner if the owner removes himself
    async function addOwner(memberId: string) {
        try {
            await updateIsOwner(memberId, list, true)

        } catch (error) {
            setAlert({ title: 'Error', message: error.message, type: 'error' });
            setAlertKey(Date.now());
        }
    };

    // Function to handle removing a member and creating a new list for them
    async function handleRemoveMember() {
        try {
            await removeList();
            await addList();

            // If owner removes himself from the list create another owner
            if (member.isOwner) {
                // Find the next in line member to take over ownership
                const userToTakeOwnership = members.find(member => member.user_id !== userId).user_id;

                // Make the next in line the owner of the list
                addOwner(userToTakeOwnership);
            }

            // Trigger a re-render of members in the parent component
            onMemberRemoved();
        } catch (error) {
            setAlert({ title: 'Error', message: error.message, type: 'error' });
            setAlertKey(Date.now());
        }
    }

    // Render DeleteMember
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
            <div className="popover popover-hover">
                <button className="popover-trigger" onClick={handleRemoveMember}>
                    <FontAwesomeIcon icon={faPersonCircleMinus} className="text-red-700 h-5 ml-2" />
                </button>
                <div className="popover-content popover-right w-min">
                    <div className="popover-arrow"></div>
                    <div className="text-sm">Remove</div>
                </div>
            </div>
        </>
    );
};

export default DeleteMember;
