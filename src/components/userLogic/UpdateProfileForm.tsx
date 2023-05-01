import { useState } from "react";;
import * as Yup from 'yup';
import { updateUser } from "@/services/database/users";
import { updatePassword } from '@/services/auth';
import { Alert } from "@/components/Alert";
import FormComponent from "../common/Form/FormComponent";
import InputField from "../common/Form/InputField";

// Define the initial values
const initialValues = { name: '', password: '' };

// Define the form validation schema using Yup
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
});

// UpdateProfileForm component
const UpdateProfileForm: React.FC = () => {
    // State to handle the alerts
    const [alert, setAlert] = useState(null);
    const [alertKey, setAlertKey] = useState(null);

    // Handles the name reset process
    const updateName = async (values: { name: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            await updateUser(values.name);
            setAlert({ title: 'Success', message: 'Name updated successfully', type: 'success' });
            setAlertKey(Date.now());
        } catch (error) {
            setAlert({ title: 'Error', message: error.message, type: 'error' });
            setAlertKey(Date.now());
        }
    };

    // Handles the password reset process
    async function updateUserPassword(values: { password: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) {
        try {
            await updatePassword(values.password);
            setAlert({ title: 'Success', message: 'Your password has been updated successfully', type: 'success' });
            setAlertKey(Date.now());
        } catch (error) {
            setAlert({ title: 'Error', message: error.message, type: 'error' });
            setAlertKey(Date.now());
        }
    }

    const updateProfile = async (values: { name: string; password: string }, actions: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            // Check if a new name is provided and call the updateName function
            if (values.name) {
                await updateName({ name: values.name }, actions);
            }
            // Check if a new password is provided and call the updateUserPassword function
            if (values.password) {
                await updateUserPassword({ password: values.password }, actions);
            }
        } catch (error) {
            // Handle any errors here if needed
        } finally {
            // Set submitting to false in the final block to ensure it's always executed
            actions.setSubmitting(false);
        }
    };

    // Render the UpdateProfileForm
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
            <FormComponent
                header="Looks like your profile"
                description="change your name or the password"
                initialValues={initialValues}
                validationSchema={validationSchema}
                handleSubmit={updateProfile}
                buttonText="Update profile"
            >
                <div>
                    <InputField
                        field="name"
                        fieldName="New Name"
                        fieldPlaceholder="Enter your new name"
                    />
                    <InputField
                        field="password"
                        fieldName="New Password"
                        fieldPlaceholder="Enter your new password"
                    />
                </div>
            </FormComponent>
        </>
    );
};

export default UpdateProfileForm;
