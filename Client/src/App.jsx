import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar.component";
import { useAuthStore } from "./store/useAuthStore.js";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore.js";
import ForgetPassword from "./pages/ForgetPassword.jsx";

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  //! console.log("All online users are : ", onlineUsers);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  //? the whole purpose of checkAuth() in useEffect() is to extract userDetail on brower reload and set it to authUser

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        //* forgot password route
        <Route path="forgot-password" element={<ForgetPassword />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
