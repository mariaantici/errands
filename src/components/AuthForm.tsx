import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login, register } from '../utils/auth';
import { useRouter } from 'next/router';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export default function LoginForm() {
    const router = useRouter();
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            let user = await register(values.email, values.password);

            if (!user || user.last_sign_in_at !== user.created_at) {
                user = await login(values.email, values.password);
            }
            if (user) {
                router.push('/errands-manager');
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik initialValues={{ email: '', password: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
                <Form>
                    <label htmlFor="email">Email</label>
                    <Field id="email" name="email" type="email" placeholder="Enter your email" className="input" />
                    <ErrorMessage name="email" component="div" className="error-message" />

                    <label htmlFor="password">Password</label>
                    <Field id="password" name="password" type="password" placeholder="Enter your password" className="input" />
                    <ErrorMessage name="password" component="div" className="error-message" />

                    <button type="submit" disabled={isSubmitting} className="submit-button">
                        Log in / Register
                    </button>
                </Form>
            )}
        </Formik>
    );
}
