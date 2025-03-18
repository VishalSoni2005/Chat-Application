import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-base-100 border-base-300 fixed top-0 z-40 w-full border-b backdrop-blur-lg">
      <div className="container mx-auto h-16 px-4">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 transition-all hover:opacity-80">
              <div className=" flex size-11 items-center justify-center rounded-lg">
                <img src="/logo.svg" className="h-full" />
              </div>
              <h1 className="text-lg font-bold font-serif">Together</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link to={"/settings"} className={`btn btn-sm gap-2 transition-colors`}>
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  {/* <User className="size-5" />
                   */}
                  <img src={authUser.profilePic} className="size-7 rounded-full" alt="" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex items-center gap-2" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
