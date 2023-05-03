import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { createUser, getUserData, updateUser } from "@/services/database/users";
import { updatePassword } from '@/services/auth';
import { createDefaultListsForUser } from "@/services/database/lists";
import { useRouter } from 'next/router';
import { Alert } from "@/components/Alert";
import Spinner from "../common/Spinner";
import FormComponent from "../common/Form/FormComponent";
import InputField from "../common/Form/InputField";

// Define the initial values
const initialValues = { name: '', password: '' }

// Define the form validation schema using Yup
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required')
});

// AcceptInviteForm component
const AcceptInviteForm: React.FC = () => {
    // State to handle user's id
    const [userId, setUserId] = useState(null);

    // State for managing loading state
    const [isLoading, setIsLoading] = useState(true);

    // State to handle the alerts
    const [alert, setAlert] = useState(null);
    const [alertKey, setAlertKey] = useState(null);

    const router = useRouter();

    // Create user is users table
    const addUser = async () => {
        try {
            await createUser(userId);
        } catch (error) {
            setAlert({ title: 'Error', message: error.message, type: 'error' });
            setAlertKey(Date.now());
        }
    };

    // Set user's name
    const updateName = async (values: { name: string }) => {
        try {
            await updateUser(values.name);
            setAlert({ title: 'Success', message: 'Name added successfully', type: 'success' });
            setAlertKey(Date.now());
        } catch (error) {
            setAlert({ title: 'Error', message: error.message, type: 'error' });
            setAlertKey(Date.now());
        }
    };

    // Set user's password
    const updateUserPassword = async (values: { password: string }) => {
        try {
            await updatePassword(values.password);
            setAlert({ title: 'Success', message: 'Your password has been added successfully', type: 'success' });
            setAlertKey(Date.now());
        } catch (error) {
            setAlert({ title: 'Error', message: error.message, type: 'error' });
            setAlertKey(Date.now());
        }
    };

    const acceptInvite = async (values: { name: string; password: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            // Create the user in users table
            await addUser();

            // Set name and password for user
            await updateName({ name: values.name });
            await updateUserPassword({ password: values.password });

            // Create the default lists for new user
            await createDefaultListsForUser(userId);

            // Redirect to member request
            router.push("/member-request");
        } catch (error) {
            setAlert({ title: "Error", message: error.message, type: "error" });
            setAlertKey(Date.now());
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);

        // Fetch user's data
        const fetchUser = async () => {
            try {
                const user = await getUserData();
                setUserId(user.id);
            } catch (error) {
                // If the session doesn't exist, navigate to the authentication page
                router.push('/authentication');

                // Manage errors
                setAlert({ title: 'Error', message: error.message, type: 'error' });
                setAlertKey(Date.now());
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    // Render the AcceptInviteForm
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
            {isLoading || userId === null ? (
                <div className="w-screen h-screen flex justify-center items-center">
                    <Spinner />
                </div>
            ) : (
                <FormComponent
                    header="Welcome aboard"
                    description="fill this in and you're good to go"
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    handleSubmit={acceptInvite}
                    buttonText="Create account"
                >
                    <div>
                        <InputField
                            field="name"
                            fieldName="Name"
                            fieldPlaceholder="Enter your name"
                        />
                        <InputField
                            field="password"
                            fieldName="Password"
                            fieldPlaceholder="Enter your password"
                        />
                    </div>
                </FormComponent>
            )}
        </>
    );
};

export default AcceptInviteForm;
