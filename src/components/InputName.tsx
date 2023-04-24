import React, { useState, useEffect } from "react";
import { updateUser } from "@/services/database/users";
import { Alert } from '@/components/Alert';

// InputName component
const InputName: React.FC<{ isOpen?: boolean }> = ({ isOpen = false }) => {
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

    // Render InputName
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
                    <div className="modal-content flex flex-col gap-5 min-w-[340px] xs:min-w-[360px]">
                        <h2 className="font-pacifico text-2xl">Your name</h2>
                        <p className="mb-3 mt-[-10px] text-sm text-green-600 text-left tracking-wide">no need for a full name, even a nickname works</p>
                        <label htmlFor="name" className="tracking-wide">
                            Name
                        </label>
                        <input
                            className="input mt-[-5px]"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)} // Update the name state when the input value changes
                        />
                        <div className="h-7">
                            {(name.length < 2 && name.length !== 0) && <p className="text-xs text-red-600">Name must have at least 2 characters</p>}
                        </div>
                        <button className="btn btn-outline-success min-w-[200px] mx-auto" type="submit">
                            Save Name
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default InputName;
