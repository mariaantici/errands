import { useRouter } from 'next/router';
import { logout } from '@/services/auth';

// LogoutButton component for logging out a user
const LogoutButton: React.FC = () => {
    const router = useRouter();

    // Function to handle logout action
    const handleClick = async () => {
        try {
            await logout();
            router.push('/authentication');
        } catch (error) {
            alert(error.message);
        }
    };

    // Rendering the LogoutButton
    return <button tabIndex={-1} className="dropdown-item text-sm" onClick={handleClick}>Log out</button>;
}

export default LogoutButton;
