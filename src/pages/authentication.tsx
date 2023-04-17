import AuthForm from '@/components/auth/AuthForm';

// Authentication component
const Authentication: React.FC = () => {
    // Render Authentication
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="m-auto">
                <AuthForm />
            </div>
        </div>
    );
};

export default Authentication;
