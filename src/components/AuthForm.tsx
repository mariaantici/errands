import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login, register, resetPassword } from '../utils/auth';
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

    async function handleForgotPassword() {
        const email = prompt('Please enter your email address');
        if (email) {
            try {
                await resetPassword(email);
                alert('Password recovery email has been sent. Please check your email.');
            } catch (error) {
                alert(error.message);
            }
        }
    }

    return (
        <div className="card min-w-[340px] xs:min-w-[380px]">
            <div className="card-body" >
                <h2 className="text-2xl text-center font-pacifico">Sing in or Sign up</h2>
                <p className="mb-3 mt-[-2px] text-sm text-green-600 text-center tracking-wide">we'll sort it out either way</p>
                <Formik initialValues={{ email: '', password: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting }) => (
                        <Form>
                            <label htmlFor="email" className="tracking-wide">Email</label>
                            <Field id="email" name="email" type="email" placeholder="Enter your email" className="input my-1" />
                            <div className='h-7 text-xs text-red-600'>
                                <ErrorMessage name="email" />
                            </div>

                            <label htmlFor="password" className="tracking-wide">Password</label>
                            <Field id="password" name="password" type="password" placeholder="Enter your password" className="input" />
                            <div className='h-8 text-xs text-red-600'>
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
                                    <a
                                        href="#"
                                        className="font-medium text-green-600 hover:text-red-600"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleForgotPassword();
                                        }}
                                    >
                                        Forgot your password?
                                    </a>

                                </div>
                            </div>

                            <button type="submit" disabled={isSubmitting} className="btn btn-outline-success w-full tracking-wider">
                                Sing in or Sign up
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div >
    );
}
