import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import UpdateProfileForm from '@/components/userLogic/UpdateProfileForm'

// Profile component
const Profile: React.FC = () => {
    // Render the Profile
    return (
        <>
            <div className="relative max-w-5xl mx-auto">
                <a href="/errands-manager" className="absolute left-5 sm:left-20 top-16 sm:top-20 flex items-center">
                    <FontAwesomeIcon icon={faCircleLeft} className="h-8 sm:h-10 w-8 sm:w-10 text-green-600" />
                    <div className="flex items-end">
                        <p className="text-lg sm:text-xl ml-2">Go back to </p>
                        <p className="text-xl sm:text-2xl ml-2 font-pacifico text-green-600">Errands</p>
                    </div>
                </a>
            </div>
            <div className="flex items-center justify-center min-h-screen">
                <div className="m-auto">
                    <UpdateProfileForm />
                </div>
            </div>
        </>
    );
};

export default Profile;
