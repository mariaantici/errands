import AcceptInviteForm from '@/components/userLogic/AcceptInviteForm'

// AcceptInvite component
const AcceptInvite: React.FC = () => {
    // Render the AcceptInvite
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="m-auto">
                <AcceptInviteForm />
            </div>
        </div>
    );
}

export default AcceptInvite;
