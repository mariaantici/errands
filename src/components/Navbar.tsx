import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "@/components/auth/LogoutButton";

// Navbar component
const Navbar: React.FC = () => {
    // Render Navbar
    return (
        <div className="h-[108px] xs:h-[96px]">
            <div className="navbar navbar-glass navbar-sticky max-w-[95%] lg:max-w-5xl mx-auto mt-5 xs:mt-2 rounded-xl">
                <div className="navbar-start">
                    <h1 className="font-pacifico text-2xl hidden md:block">Tame the chaos, embrace </h1>
                    <h1 className="font-pacifico text-2xl text-green-600 ml-1">Errands</h1>
                </div>
                <div className="navbar-end">
                    <div className="avatar avatar-ring-success avatar-md">
                        <div className="dropdown-container">
                            <div className="dropdown">
                                <label className="btn btn-ghost flex cursor-pointer px-0" tabIndex={0}>
                                    <FontAwesomeIcon icon={faUser} className="text-green-600 sm:h-4 sm:w-4" />
                                </label>
                                <div className="dropdown-menu dropdown-menu-bottom-left">
                                    <a tabIndex={-1} className="dropdown-item text-sm">Profile</a>
                                    <a tabIndex={-1} className="dropdown-item text-sm">Settings</a>
                                    <LogoutButton />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
