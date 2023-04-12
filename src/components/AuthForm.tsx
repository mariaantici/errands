import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login, register } from '../utils/auth';
import { Input, Button, Card, Spacer } from '@nextui-org/react';
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
        <Card>
            <Card.Body>
                <Formik initialValues={{ email: '', password: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting }) => (
                        <Form>
                            <Field name="email">
                                {({ field }) => (
                                    <Input
                                        {...field}
                                        type="email"
                                        label="Email"
                                        placeholder="Enter your email"
                                        status={field.value && field.value.length > 0 ? 'error' : 'warning'}
                                        bordered
                                        clearable
                                        width="300px"
                                    />
                                )}
                            </Field>
                            <br />
                            <div className="h-5">
                                <ErrorMessage name="email" />
                            </div>
                            <Spacer y={0.5} />
                            <Field name="password">
                                {({ field }) => (
                                    <Input.Password
                                        {...field}
                                        type="password"
                                        label="Password"
                                        placeholder="Enter your password"
                                        status={field.value && field.value.length > 0 ? 'error' : 'warning'}
                                        bordered
                                        clearable
                                        width="300px"
                                    />
                                )}
                            </Field>
                            <br />
                            <div className="h-5">
                                <ErrorMessage name="password" />
                            </div>
                            <Spacer y={1} />
                            <Button type="submit" disabled={isSubmitting} color='warning' className='mx-auto'>
                                Log in / Register
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    );
}
