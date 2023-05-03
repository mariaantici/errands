import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import UpdateProfileForm from '@/components/userLogic/UpdateProfileForm'

// Profile component
const Profile: React.FC = () => {
    // Render the Profile
    return (
        <>
            <div className="h-[108px] xs:h-[96px] absolute">
                <div className="navbar navbar-glass navbar-sticky max-w-[95%] lg:max-w-5xl mx-auto mt-5 xs:mt-2 rounded-xl">
                    <div className="navbar-start">
                        <a href="/errands-manager" className="flex items-center">
                            <FontAwesomeIcon icon={faCircleLeft} className="h-8 w-8 text-green-600" />
                            <p className="text-xl lg:text-2xl ml-2 font-pacifico">Go back to </p>
                            <p className="text-xl lg:text-2xl ml-2 font-pacifico text-green-600">Errands</p>
                        </a>
                    </div>
                </div>
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
