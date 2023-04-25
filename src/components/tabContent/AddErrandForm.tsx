import React, { useState } from 'react';
import { createErrand } from '@/services/database/errands';
import { Alert } from '@/components/Alert';
import ReactDatePicker from '@/components/datepickers/ReactDatePicker';

// AddErrandForm component
const AddErrandForm: React.FC<{ modalId: string, userId: string, recommendedName?: string }> = ({ modalId, userId, recommendedName = "" }) => {

    // State to handle the input value of the name field
    const [name, setName] = useState(recommendedName);

    // State for managing the selected list
    const [list, setList] = useState("household")

    // State for managing selected date
    const [date, setDate] = useState<Date | null>(null);

    // State to handle the alerts
    const [alert, setAlert] = useState(null);
    const [alertKey, setAlertKey] = useState(null);

    // State for managing modal visibility
    const [modalVisible, setModalVisible] = useState(false);

    // Function to reset the form
    const resetForm = () => {
        setName(recommendedName || "");
        setDate(null);
    };

    // Function to create new errand, called on form submit
    const addErrand = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await createErrand(userId, list, name, date);
            setAlert({ title: 'Success', message: 'Errand added successfully', type: 'success' });
            setAlertKey(Date.now());
        } catch (error) {
            setAlert({ title: 'Error', message: error.message, type: 'error' });
            setAlertKey(Date.now());
        }

        // Close modal only if the name has a certain length
        if (name.length > 1) {
            setModalVisible(false);
        }
    };

    // Render AddErrandForm
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
                    <div className="modal-content flex flex-col gap-3 min-w-[340px] xs:min-w-[360px]">
                        <label htmlFor={modalId} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </label>

                        <h2 className="font-pacifico text-2xl">New Errand</h2>
                        <p className="mb-3 mt-[-10px] text-sm text-green-600 text-left tracking-wide">time to get shit done</p>

                        <label htmlFor="name" className="tracking-wide">Name</label>
                        <input id={modalId} className="input" placeholder="Name this errand like you mean it" value={name} onChange={(e) => setName(e.target.value)} />
                        <div className="h-2">
                            {(name.length < 2 && name.length !== 0) && <p className="text-xs text-red-600">Name must have at least 2 characters</p>}
                        </div>

                        <label htmlFor="name" className="tracking-wide">Pick a list</label>
                        <select id={modalId} className="select" onChange={(e) => setList(e.target.value)}>
                            <option>household</option>
                            <option>trip</option>
                            <option>workplace</option>
                        </select>

                        <label htmlFor="name" className="tracking-wide mt-6">When</label>
                        <div>
                            <ReactDatePicker className="input mb-7" placeholder="Select a Date"
                                selected={date}
                                onChange={(date) => setDate(date)} />
                        </div>

                        <div className="flex gap-3">
                            <button type="submit" className="btn btn-outline-success btn-block">Add Errand</button>
                            <label htmlFor={modalId} className="btn btn-block">Cancel</label>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddErrandForm;
