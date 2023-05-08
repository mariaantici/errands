import React, { useState, useEffect } from "react";
import { updateUser } from "@/services/database/users";
import { Alert } from '@/components/Alert';

// InputNameModal component
const InputNameModal: React.FC<{ isOpen?: boolean }> = ({ isOpen = false }) => {
    // State to handle the input value of the name field
    const [name, setName] = useState("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);

    // State to handle the alerts
    const [alert, setAlert] = useState(null);
    const [alertKey, setAlertKey] = useState(null);

    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen]);

    // Function to update the user's name, called on form submit
    const updateName = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await updateUser(name);
            setAlert({ title: 'Success', message: 'Name updated successfully', type: 'success' });
            setAlertKey(Date.now());
        } catch (error) {
            setAlert({ title: 'Error', message: error.message, type: 'error' });
            setAlertKey(Date.now());
        }

        // Close modal only if the name has a certain length
        if (name.length > 1) {
            setIsModalOpen(false);
        }
    };

    // Render InputNameModal
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
            {isModalOpen && (
                <input className="modal-state" id="modalId" type="checkbox" defaultChecked />
            )}            <div className="modal">
                <label className="modal-overlay"></label>
                <form onSubmit={updateName}>
                    <div className="modal-content flex flex-col gap-7 min-w-[340px] xs:min-w-[360px]">
                        <div className="text-left">
                            <h2 className="text-2xl font-pacifico mb-2">Name</h2>
                            <p className="text-sm text-green-600 tracking-wide">no need for a full name, a nickname will do</p>
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="name" className="tracking-wide">
                                Name
                            </label>
                            <input
                                className="input"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)} // Update the name state when the input value changes
                            />
                            <div className="h-1">
                                {(name.length < 2 && name.length !== 0) && <p className="text-xs text-red-600">Name must have at least 2 characters</p>}
                            </div>
                        </div>
                        <button className="btn btn-outline-success rounded-3xl w-full" type="submit">
                            Save Name
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default InputNameModal;
