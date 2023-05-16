import { useState } from 'react';
import * as Yup from 'yup';
import { updatePassword } from '@/services/auth';
import { useRouter } from 'next/router';
import { Alert } from '@/components/common/Alert';
import FormComponent from '@/components/common/Form/FormComponent';
import InputField from '@/components/common/Form/InputField';

// Define the initial values
const initialValues = { password: '' };

// Define the form validation schema using Yup
const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

// ResetPassword component
const ResetPassword: React.FC = () => {
    // State to handle the alerts
    const [alert, setAlert] = useState(null);
    const [alertKey, setAlertKey] = useState(null);

    const router = useRouter();

    // Handles the password reset process
    async function handlePasswordReset(values: { password: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) {
        try {
            await updatePassword(values.password);
            setAlert({ title: 'Success', message: 'Your password has been updated successfully. Please log in with your new password.', type: 'success' });
            setAlertKey(Date.now());
            router.push('/errands-manager');
        } catch (error) {
            setAlert({ title: 'Error', message: error.message, type: 'error' });
            setAlertKey(Date.now());
        } finally {
            setSubmitting(false);
        }
    }

    // Render ResetPassword
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="m-auto">
                {alert && (
                    <Alert
                        key={alertKey}
                        title={alert.title}
                        message={alert.message}
                        type={alert.type}
                    />
                )}
                <FormComponent
                    header="Reset Password"
                    description="password amnesia: a modern epidemic"
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    handleSubmit={handlePasswordReset}
                    buttonText="Update password"
                >
                    <div>
                        <InputField
                            field="password"
                            fieldName="New Password"
                            fieldPlaceholder="Enter your new password"
                        />
                    </div>
                </FormComponent>
            </div>
        </div>
    );
};

export default ResetPassword;
