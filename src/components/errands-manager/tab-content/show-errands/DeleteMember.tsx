import React, { useContext } from "react";
import { createList, deleteList } from "@/services/database/lists";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonCircleMinus } from "@fortawesome/free-solid-svg-icons";
import ActiveListContext from "@/contexts/ActiveListContext";


// DeleteMember component
const DeleteMember: React.FC<{ memberId: string, onMemberRemoved: () => void }> = ({ memberId, onMemberRemoved }) => {
    // Get the active list from ActiveListContext
    const list = useContext(ActiveListContext);

    // Function to delete list for member
    async function removeList() {
        try {
            await deleteList(list, memberId);

        } catch (error) {
            throw error;
        }
    };

    // Function to create new list for member
    async function addList() {
        try {
            await createList(list, memberId);

        } catch (error) {
            throw error;
        }
    };

    // Function to handle removing a member and creating a new list for them
    async function handleRemoveMember() {
        try {
            await removeList();
            await addList();
            onMemberRemoved();
        } catch (error) {
            console.error("Error removing member:", error);
        }
    }

    // Render DeleteMember
    return (
        <div className="popover popover-hover">
            <button className="popover-trigger" onClick={handleRemoveMember}>
                <FontAwesomeIcon icon={faPersonCircleMinus} className="text-red-700 h-5 ml-2" />
            </button>
            <div className="popover-content popover-right w-min">
                <div className="popover-arrow"></div>
                <div className="text-sm">Remove</div>
            </div>
        </div>
    );
};

export default DeleteMember;
