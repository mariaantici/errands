import { useRouter } from 'next/router';
import { logout } from '@/utils/auth';

export default function LogoutButton() {
    const router = useRouter();

    const handleClick = async () => {
        try {
            await logout();
            router.push('/authentication');
        } catch (error) {
            alert(error.message);
        }
    };

    return <button tabIndex={-1} className="dropdown-item text-sm" onClick={handleClick}>Log out</button>;
}
