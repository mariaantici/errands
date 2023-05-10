import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonCirclePlus } from "@fortawesome/free-solid-svg-icons";
import AddMemberModal from "@/components/tabContent/addMembers/AddMemberModal";

// AddMemberButton component
const AddMemberButton: React.FC = () => {
    // State to handle modal visibility
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Render AddMemberButton
    return (

        <div className="max-w-2xl mx-auto flex justify-end">
            <label className="absolute mr-5 mt-2 popover popover-hover">
                <button className="btn btn-outline-success btn-circle text-sm h-11 w-11 popover-trigger" onClick={() => setIsOpen(true)}>
                    <FontAwesomeIcon icon={faPersonCirclePlus} className="h-6" />
                </button>
                <div className="popover-content popover-bottom w-28 hidden md:block">
                    <div className="popover-arrow"></div>
                    <div className="text-center text-sm">Add Member</div>
                </div>
            </label>
            <AddMemberModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

    );
};

export default AddMemberButton;
