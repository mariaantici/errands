import React, { useState, useEffect, useContext } from 'react';
import UserIdContext from "@/contexts/UserIdContext";
import ActiveListContext from "@/contexts/ActiveListContext";
import ErrandsUpdateContext from "@/contexts/ErrandsUpdateContext";
import { createErrand } from '@/services/database/errands';
import { Alert } from '@/components/Alert';
import ReactDatePicker from '@/components/datepickers/ReactDatePicker';

// AddErrandModal component
const AddErrandModal: React.FC<{ modalId: string, recommendedName?: string }> = ({ modalId, recommendedName = "" }) => {
    // Get the userId from the UserIdContext
    const userId = useContext(UserIdContext);

    // Get the active list from ActiveListContext
    const activeList = useContext(ActiveListContext);

    // Destructure the updateFlag and toggleUpdateFlag properties from the ErrandsUpdateContext
    const { updateFlag, toggleUpdateFlag } = useContext(ErrandsUpdateContext);

    // State to handle the input value of the name field
    const [name, setName] = useState(recommendedName);

    // State for managing the selected list
    const [list, setList] = useState(activeList !== 'all' ? activeList : 'household')

    // State for managing selected date
    const [date, setDate] = useState<Date | null>(null);

    // State to handle the alerts
    const [alert, setAlert] = useState(null);
    const [alertKey, setAlertKey] = useState(null);

    // State for managing modal visibility
    const [modalVisible, setModalVisible] = useState(false);

    // Convert a local date to a UTC date without timezone offset.
    function toUTCDate(date: Date): Date {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        return new Date(Date.UTC(year, month, day));
    }

    // Function to reset the form
    const resetForm = () => {
        setName(recommendedName || "");
        setDate(null);
    };

    // Function to create new errand, called on form submit
    const addErrand = async (event: React.FormEvent) => {
        event.preventDefault();
        const utcDate = date ? toUTCDate(date) : null;
        try {
            await createErrand(userId, list, name, utcDate);
            setAlert({ title: 'Success', message: 'Errand added successfully', type: 'success' });
            setAlertKey(Date.now());
        } catch (error) {
            setAlert({ title: 'Error', message: error.message, type: 'error' });
            setAlertKey(Date.now());
        }
        // Close modal only if the name has a certain length
        if (name.length > 1) {
            setModalVisible(false);

            // Toggle the updateFlag value after an errand has been added
            toggleUpdateFlag();
        }
    };

    // useEffect hook to update the 'list' state when the 'activeList' value changes
    useEffect(() => {
        setList(activeList !== 'all' ? activeList : 'household');
    }, [activeList]);

    // Render AddErrandModal
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
            <input className="modal-state" id={modalId} type="checkbox" checked={modalVisible} onChange={() => { setModalVisible(!modalVisible); resetForm(); }} />
            <div className="modal">
                <label className="modal-overlay"></label>
                <form onSubmit={addErrand}>
                    <div className="modal-content flex flex-col gap-6 min-w-[340px] xs:min-w-[360px]">
                        <label htmlFor={modalId} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </label>
                        <div className="text-left">
                            <h2 className="text-2xl font-pacifico mb-2">New Errand</h2>
                            <p className="text-sm text-green-600 tracking-wide">time to get shit done</p>
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="name" className="tracking-wide">Name</label>
                            <input id={modalId} className="input" placeholder="Name this errand like you mean it" value={name} onChange={(e) => setName(e.target.value)} />
                            <div className="h-1">
                                {(name.length < 2 && name.length !== 0) && <p className="text-xs text-red-600">Name must have at least 2 characters</p>}
                            </div>
                        </div>
                        <div className="space-y-1 mb-2">
                            <label htmlFor="name" className="tracking-wide">Pick a list</label>
                            <select id={modalId} className="select" value={list} onChange={(e) => setList(e.target.value)}>
                                <option>household</option>
                                <option>trip</option>
                                <option>workplace</option>
                            </select>
                        </div>
                        <div className="space-y-1 mb-2">
                            <label htmlFor="name" className="tracking-wide">When</label>
                            <div>
                                <ReactDatePicker className="input" placeholder="Select a Date"
                                    selected={date}
                                    onChange={(date) => setDate(date)} />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button type="submit" className="btn btn-outline-success btn-block rounded-3xl">Add Errand</button>
                            <label htmlFor={modalId} className="btn btn-block rounded-3xl">Cancel</label>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddErrandModal;
