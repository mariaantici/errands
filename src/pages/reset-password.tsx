import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

// ResetPassword component
const ResetPassword: React.FC = () => {
    // Render ResetPassword
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="m-auto">
                <ResetPasswordForm />
            </div>
        </div>
    );
};

export default ResetPassword;
