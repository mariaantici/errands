import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login, register, resetPassword } from '@/services/auth';
import { createUser } from '@/services/database/users';
import { Alert } from '@/components/Alert';

// Form validation schema using Yup
const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

// AuthForm component
const AuthForm: React.FC = () => {
    // State to handle the alerts
    const [alert, setAlert] = useState(null);
    const [alertKey, setAlertKey] = useState(null);

    const router = useRouter()

    //Handles form submission, registers and/or logs in the user
    const handleSubmit = async (values: { email: string, password: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {

        try {
            // Try to register the user
            const user = await register(values.email, values.password);

            // If registration is successful, login, create user in users table and redirect to errands-manager
            if (user) {
                try {
                    let userId = await login(values.email, values.password);
                    console.log(userId)

                    // Create the user in users table
                    try {
                        await createUser(userId);
                    } catch (error) {
                        let alertType = 'error';
                        setAlert({ title: 'Error', message: error.message, type: alertType });
                        setAlertKey(Date.now());
                    }

                    router.push('/errands-manager');
                } catch (error) {
                    let alertType = 'error';
                    setAlert({ title: 'Error', message: error.message, type: alertType });
                    setAlertKey(Date.now());
                }
            }
        } catch (error) {
            let alertType = 'error';

            // If the user is already registered, attempt to login
            if (error?.message === 'User already registered') {
                try {
                    const data = await login(values.email, values.password);
                    router.push('/errands-manager');
                } catch (error) {
                    let alertType = 'error';
                    setAlert({ title: 'Error', message: error.message, type: alertType });
                    setAlertKey(Date.now());
                }
            } else {
                // If there's a different error, display it
                setAlert({ title: 'Error', message: error.message, type: alertType });
                setAlertKey(Date.now());
            }
        } finally {
            // Set submitting state to false
            setSubmitting(false);
        }
    };

    //Handles the forgot password process
    async function handleForgotPassword(email: string) {
        if (email) {
            // Send reset password email to user
            try {
                await resetPassword(email);
                setAlert({ title: 'Success', message: 'Password recovery email has been sent. Please check your email.', type: 'success' });
                setAlertKey(Date.now());
            } catch (error) {
                setAlert({ title: 'Error', message: error.message, type: 'error' });
                setAlertKey(Date.now());
            }
        }
    }

    // Render the AuthForm
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
                <h2 className="text-2xl text-center font-pacifico">Sign in or Sign up</h2>
                <p className="mb-3 mt-[-2px] text-sm text-green-600 text-center tracking-wide">we'll sort it out either way</p>
                <Formik initialValues={{ email: '', password: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting, values }) => (
                        <Form>
                            <label htmlFor="email" className="tracking-wide">Email</label>
                            <Field id="email" name="email" type="email" placeholder="Enter your email" className="input my-1" />
                            <div className="h-7 text-xs text-red-600">
                                <ErrorMessage name="email" />
                            </div>

                            <label htmlFor="password" className="tracking-wide">Password</label>
                            <Field id="password" name="password" type="password" placeholder="Enter your password" className="input" />
                            <div className="h-8 text-xs text-red-600">
                                <ErrorMessage name="password" />
                            </div>

                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="checkbox checkbox-sm checkbox-bordered-success"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <label
                                        className="font-medium text-green-600 hover:text-red-600"
                                        htmlFor="resetPassword"
                                    >
                                        Forgot your password?
                                    </label>
                                    <input className="modal-state" id="resetPassword" type="checkbox" />
                                    <div className="modal">
                                        <label className="modal-overlay"></label>
                                        <div className="modal-content flex flex-col gap-2 min-w-[340px] xs:min-w-[360px]">
                                            <label htmlFor="resetPassword" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                                            <h2 className="text-xl">Forgot your password?</h2>
                                            <p className="mb-3 mt-[-2px] text-sm text-green-600 tracking-wide">no worries, we'll send you an email to reset it</p>
                                            <label htmlFor="email" className="tracking-wide">Email</label>
                                            <Field id="recoverEmail" name="email" type="email" placeholder="Enter your email" className="input my-1" />
                                            <div className="h-7 text-xs text-red-600">
                                                <ErrorMessage name="email" />
                                            </div>
                                            <div className="flex gap-3">
                                                <label htmlFor="resetPassword" className="btn btn-outline-success btn-block" onClick={(e) => {
                                                    handleForgotPassword(values.email);
                                                }}>Send Email</label>
                                                <label htmlFor="resetPassword" className="btn btn-block">Cancel</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" disabled={isSubmitting} className="btn btn-outline-success w-full tracking-wider">
                                Sign in or Sign up
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div >
    );
}

export default AuthForm;
