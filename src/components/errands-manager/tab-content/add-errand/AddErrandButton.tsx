import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import AddErrandModal from "@/components/errands-manager/tab-content/add-errand/AddErrandModal";

// AddErrandButton component
const AddErrandButton: React.FC = () => {
    // Unique identifier for the modal
    const modalId = "addErrandModal";

    // Render AddErrandButton
    return (
        <div className="max-w-[95%] xs:max-w-[300px] mx-auto my-10">
            <label className="btn btn-outline-success btn-block rounded-3xl text-lg" htmlFor={modalId}>
                <FontAwesomeIcon icon={faCirclePlus} className="h-5 w-5 mr-2" />
                Add new Errand
            </label>
            <AddErrandModal modalId={modalId} />
        </div>
    );
};

export default AddErrandButton;
