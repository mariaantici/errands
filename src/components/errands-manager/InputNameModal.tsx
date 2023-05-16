import React, { useState, useEffect } from "react";
import { updateUser } from "@/services/database/users";
import * as Yup from 'yup';
import { Alert } from '@/components/common/Alert';
import ModalComponent from "@/components/common/Form/ModalComponent";
import InputField from '@/components/common/Form/InputField';

// Define the initial values
const initialValues = { name: '' }

// Define the form validation schema using Yup
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
});

// InputNameModal component
const InputNameModal: React.FC<{ isOpen?: boolean }> = ({ isOpen = false }) => {
    // State to handle the input value of the name field
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);

    // State to handle the alerts
    const [alert, setAlert] = useState(null);
    const [alertKey, setAlertKey] = useState(null);

    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen]);

    // Function to update the user's name, called on form submit
    const updateName = async (values: { name: string }) => {
        try {
            await updateUser(values.name);
            setAlert({ title: 'Success', message: 'Name updated successfully', type: 'success' });
            setAlertKey(Date.now());
        } catch (error) {
            setAlert({ title: 'Error', message: error.message, type: 'error' });
            setAlertKey(Date.now());
        } finally {
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
            )}
            <ModalComponent
                header="Name"
                description="no need for a full name, a nickname will do"
                initialValues={initialValues}
                validationSchema={validationSchema}
                handleSubmit={updateName}
                buttonText="Save Name"
            >
                <InputField
                    field="name"
                    fieldName="Appelative"
                    fieldPlaceholder="Write it here"
                />
            </ModalComponent>
        </>
    );
};

export default InputNameModal;
