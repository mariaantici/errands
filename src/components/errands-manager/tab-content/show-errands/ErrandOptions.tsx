import React, { useState, useContext, useEffect } from "react";
import { updateErrandDate, deleteErrand } from "@/services/database/errands";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import ErrandsUpdateContext from "@/contexts/ErrandsUpdateContext";
import ReactDatePicker from '@/components/errands-manager/tab-content/datepickers/ReactDatePicker';

// ErrandOptions component
const ErrandOptions: React.FC<{ errandId: string }> = ({ errandId }) => {
    // Destructure the updateFlag and toggleUpdateFlag properties from the ErrandsUpdateContext
    const { updateFlag, toggleUpdateFlag } = useContext(ErrandsUpdateContext);

    // State for managing selected date
    const [date, setDate] = useState<Date | null>(null);

    // Convert a local date to a UTC date without timezone offset.
    function toUTCDate(date: Date): Date {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        return new Date(Date.UTC(year, month, day));
    }

    // Function to update errand's date, called on submitting the Reschedule date
    async function updateDate() {
        const utcDate = date ? toUTCDate(date) : null;
        try {
            await updateErrandDate(errandId, utcDate);

            // Toggle the updateFlag value after an errand's date has been updated
            toggleUpdateFlag();
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        if (date) {
            updateDate();
            setDate(null);
        }
    }, [date])

    // Function to delete errand
    async function removeErrand() {
        try {
            await deleteErrand(errandId);

            // Toggle the updateFlag value after an errand's date has been updated
            toggleUpdateFlag();
        } catch (error) {
            throw error;
        }
    };

    // Render ErrandOptions
    return (
        <div className="dropdown-container ml-1">
            <div className="dropdown dropdown-hover">
                <label className="btn btn-ghost flex cursor-pointer px-0" tabIndex={0}>
                    <FontAwesomeIcon icon={faEllipsisV} className="text-green-600 sm:h-4 sm:w-4" />
                </label>
                <div className="dropdown-menu dropdown-menu-bottom-left w-min xxs:w-[160px] md:w-[230px]">
                    <div tabIndex={-1} className="flex flex-wrap md:flex-nowrap items-center text-sm mb-1">
                        <label htmlFor="date" className="tracking-wide mx-2 mb-1 md:mb-0">Reschedule:</label>
                        <ReactDatePicker className="input w-[110px]" placeholder="Select Date"
                            selected={date}
                            onChange={(date) => setDate(date)} />
                    </div>
                    <div className="dropdown-divider" role="separator"></div>
                    <button tabIndex={-1} className="dropdown-item text-sm mt-2" onClick={removeErrand}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ErrandOptions;
