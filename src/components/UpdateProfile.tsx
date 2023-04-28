import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateUser } from "@/services/database/users";
import { updatePassword } from '@/services/auth';
import { Alert } from "@/components/Alert";

// Define the form validation schema using Yup
const validationSchema = Yup.object().shape({
    newName: Yup.string()
        .min(2, 'Name must be at least 2 characters'),
    newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
});

// UpdateProfile component
const UpdateProfile: React.FC = () => {
    // State to handle the alerts
    const [alert, setAlert] = useState(null);
    const [alertKey, setAlertKey] = useState(null);

    // Handles the name reset process
    const updateName = async (values: { newName: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            await updateUser(values.newName);
            setAlert({ title: 'Success', message: 'Name updated successfully', type: 'success' });
            setAlertKey(Date.now());
        } catch (error) {
            setAlert({ title: 'Error', message: error.message, type: 'error' });
            setAlertKey(Date.now());
        }
    };

    // Handles the password reset process
    async function updateUserPassword(values: { newPassword: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) {
        try {
            await updatePassword(values.newPassword);
            setAlert({ title: 'Success', message: 'Your password has been updated successfully', type: 'success' });
            setAlertKey(Date.now());
        } catch (error) {
            setAlert({ title: 'Error', message: error.message, type: 'error' });
            setAlertKey(Date.now());
        }
    }

    const updateProfile = async (values: { newName: string; newPassword: string }, actions: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            // Check if a new name is provided and call the updateName function
            if (values.newName) {
                await updateName({ newName: values.newName }, actions);
            }
            // Check if a new password is provided and call the updateUserPassword function
            if (values.newPassword) {
                await updateUserPassword({ newPassword: values.newPassword }, actions);
            }
        } catch (error) {
            // Handle any errors here if needed
        } finally {
            // Set submitting to false in the final block to ensure it's always executed
            actions.setSubmitting(false);
        }
    };

    // Render the UpdateProfile
    return (
        <div className="card min-w-[340px] xs:min-w-[380px]">
            {alert && (
                <Alert
                    key={alertKey}
                    title={alert.title}
                    message={alert.message}
                    type={alert.type}
                />
            )}
            <div className="card-body">
                <Formik
                    initialValues={{ newName: '', newPassword: '' }}
                    validationSchema={validationSchema}
                    onSubmit={updateProfile}
                >
                    {({ isSubmitting }) => (
                        <Form className="flex flex-col gap-5">
                            <h2 className="font-pacifico text-2xl">This is your profile</h2>
                            <p className="mb-3 mt-[-10px] text-sm text-green-600 text-left tracking-wide">change your name or the password</p>

                            <div>
                                <label htmlFor="newName" className="tracking-wide">
                                    New Name
                                </label>
                                <Field
                                    id="newName"
                                    name="newName"
                                    type="name"
                                    placeholder="Enter your new name"
                                    className="input my-1"
                                />
                                <div className="h-2 text-xs text-red-600">
                                    <ErrorMessage name="newName" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="newPassword" className="tracking-wide">
                                    New Password
                                </label>
                                <Field
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    placeholder="Enter your new password"
                                    className="input my-1"
                                />
                                <div className="h-3 text-xs text-red-600">
                                    <ErrorMessage name="newPassword" />
                                </div>
                            </div>

                            <button className="btn btn-outline-success btn-block" disabled={isSubmitting} type="submit">Update profile</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div >
    );
};

export default UpdateProfile;
