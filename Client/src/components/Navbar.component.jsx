
import { useState } from "react"
import { Link } from "react-router" // Fixed import
import { useAuthStore } from "../store/useAuthStore"
import { LogOut,  Settings, User, ChevronDown, HelpCircle } from "lucide-react"

const Navbar = () => {
  const { logout, authUser } = useAuthStore()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  // Close menu when clicking outside
  const closeUserMenu = () => {
    setIsUserMenuOpen(false)
  }

  return (
    <header className="bg-zinc-900/80 border-zinc-800/50 fixed top-0 z-40 w-full border-b backdrop-blur-lg">
      <div className="container mx-auto h-16 px-4">
        <div className="flex h-full items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 transition-all hover:opacity-90 group">
              <div className="flex size-10 items-center justify-center rounded-lg bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors">
                <img src="/logo.svg" className="h-6 transition-transform group-hover:scale-110" />
              </div>
              <h1 className="text-lg font-bold font-serif bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Together
              </h1>
            </Link>

           
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
           
            {/* Settings Button */}
            <Link
              to="/settings"
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/70 transition-colors hidden sm:flex"
            >
              <Settings className="size-5" />
            </Link>

            {/* Help Button - Mobile Only */}
            <button className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/70 transition-colors sm:hidden">
              <HelpCircle className="size-5" />
            </button>

            {/* User Profile Dropdown */}
            {authUser && (
              <div className="relative ml-2">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-zinc-800/70 transition-colors"
                >
                  <img
                    src={authUser.profilePic || "/placeholder.svg"}
                    className="size-8 rounded-full border-2 border-zinc-700/50 object-cover"
                    alt={authUser.fullname || "User"}
                  />
                  <span className="hidden sm:inline text-zinc-200 font-medium">
                    {authUser.fullname?.split(" ")[0] || "User"}
                  </span>
                  <ChevronDown className="size-4 text-zinc-400" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={closeUserMenu}></div>
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-zinc-800 border border-zinc-700/50 z-20 animate-in fade-in slide-in-from-top-5 duration-200">
                      <div className="px-4 py-2 border-b border-zinc-700/50">
                        <p className="text-sm font-medium text-zinc-200">{authUser.fullname}</p>
                        <p className="text-xs text-zinc-400 truncate">{authUser.email}</p>
                      </div>

                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/50 transition-colors flex items-center gap-2"
                        onClick={closeUserMenu}
                      >
                        <User className="size-4" />
                        <span>Your Profile</span>
                      </Link>

                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/50 transition-colors flex items-center gap-2 sm:hidden"
                        onClick={closeUserMenu}
                      >
                        <Settings className="size-4" />
                        <span>Settings</span>
                      </Link>

                      <button
                        onClick={() => {
                          closeUserMenu()
                          logout()
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-zinc-700/50 transition-colors flex items-center gap-2 border-t border-zinc-700/50 mt-1"
                      >
                        <LogOut className="size-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
