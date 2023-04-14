import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updatePassword } from '../utils/auth';
import { AlertComponent } from './AlertComponent';

const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('New password is required'),
});

export default function ResetPasswordForm() {
    const router = useRouter();
    const [alert, setAlert] = useState(null);
    const [alertKey, setAlertKey] = useState(null);

    useEffect(() => {
        (async () => {
            const { data } = await supabase.auth.getUser();
            if (!data) {
                router.push('/authentication');
            }
        })();
    }, []);

    async function handlePasswordReset(values, { setSubmitting }) {
        try {
            await updatePassword(values.newPassword);
            setAlert({ title: 'Success', message: 'Your password has been updated successfully. Please log in with your new password.', type: 'success' });
            setAlertKey(Date.now());
            router.push('/authentication');
        } catch (error) {
            setAlert({ title: 'Error', message: error.message, type: 'error' });
            setAlertKey(Date.now());
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="card min-w-[340px] xs:min-w-[380px]">
            {alert && (
                <AlertComponent
                    key={alertKey}
                    title={alert.title}
                    message={alert.message}
                    type={alert.type}
                />
            )}
            <div className="card-body">
                <h2 className="text-2xl text-center font-pacifico">Reset Password</h2>
                <p className="mb-3 mt-[-2px] text-sm text-green-600 text-center tracking-wide">password amnesia: a modern epidemic</p>
                <Formik
                    initialValues={{ newPassword: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handlePasswordReset}
                >
                    {({ isSubmitting }) => (
                        <Form>
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
                            <div className="h-7 text-xs text-red-600">
                                <ErrorMessage name="newPassword" />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-outline-success w-full tracking-wider"
                            >
                                Update Password
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
