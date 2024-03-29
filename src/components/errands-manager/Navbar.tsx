import Link from "next/link";
import { logout } from "@/services/auth";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

// Navbar component
const Navbar: React.FC = () => {
  const router = useRouter();

  // Function to handle logout
  const handleClick = async () => {
    try {
      await logout();
      router.push("/authentication");
    } catch (error) {
      alert(error.message);
    }
  };

  // Render Navbar
  return (
    <div className="h-[84px] xs:h-[96px]">
      <div className="navbar navbar-glass navbar-sticky max-w-[95%] lg:max-w-5xl mx-auto mt-2 rounded-xl">
        <div className="navbar-start">
          <Link href="/errands-manager" className="flex items-center">
            <h1 className="font-pacifico text-2xl hidden md:block">
              Tame the chaos, embrace{" "}
            </h1>
            <h1 className="font-pacifico text-2xl text-green-600 ml-2">
              Errands
            </h1>
          </Link>
        </div>
        <div className="navbar-end">
          <div className="avatar avatar-ring-success avatar-md">
            <div className="dropdown-container">
              <div className="dropdown dropdown-hover">
                <label className="cursor-pointer px-0" tabIndex={0}>
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-green-600 sm:h-4 sm:w-4"
                  />
                </label>
                <div className="dropdown-menu dropdown-menu-bottom-left">
                  <Link
                    href="/profile"
                    className="dropdown-item text-sm"
                    tabIndex={-1}
                  >
                    Profile
                  </Link>
                  <div className="dropdown-divider" role="separator"></div>
                  <button
                    tabIndex={-1}
                    className="dropdown-item text-sm"
                    onClick={handleClick}
                  >
                    Log out
                  </button>{" "}
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
