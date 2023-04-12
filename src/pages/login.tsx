import AuthForm from '@/components/AuthForm';

export default function Login() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="m-auto">
                <h2 className="text-center">Login / Register</h2>
                <AuthForm />
            </div>
        </div>
    );
}
