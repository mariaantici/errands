import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import AddErrandForm from "./AddErrandForm";

// AddErrandButton component
const AddErrandButton: React.FC = () => {
    // Unique identifier for the modal
    const modalId = "addErrandModal";

    // Render AddErrandButton
    return (
        <div className="max-w-[95%] sm:max-w-[600px] mx-auto my-10">
            <label className="btn btn-outline-success btn-block text-lg" htmlFor={modalId}>
                <FontAwesomeIcon icon={faCirclePlus} className="h-5 w-5 mr-2" />
                Add new Errand
            </label>
            <AddErrandForm modalId={modalId} />
        </div>
    );
};

export default AddErrandButton;
