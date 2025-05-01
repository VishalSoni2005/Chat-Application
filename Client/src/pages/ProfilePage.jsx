import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Camera, Mail, User, Calendar, Shield, Edit, CheckCircle } from 'lucide-react';

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      await updateProfile(formData);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImg(imageUrl);
    } catch (error) {
      toast.error("Error updating profile");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-100 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header with decorative elements */}
        <div className="relative mb-12 text-center">
          <div className="absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-xl"></div>
          <h1 className="relative font-serif text-4xl font-bold tracking-tight text-base-content">
            Profile
          </h1>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-success"></span>
            <p className="text-base-content/70">
              Welcome back, {authUser?.fullname || "User"}
            </p>
          </div>
        </div>

        {/* Main content with glass-morphism effect */}
        <div className="overflow-hidden rounded-2xl bg-base-100/50 shadow-xl backdrop-blur-sm">
          {/* Profile header with background */}
          <div className="relative h-32 bg-gradient-to-r from-primary/20 to-secondary/20 sm:h-40">
            <div className="absolute -bottom-16 left-8 sm:-bottom-20 sm:left-10">
              <div className="relative">
                <div className="aspect-square h-32 overflow-hidden rounded-full border-4 border-base-100 bg-base-300 shadow-lg sm:h-40">
                  <img
                    src={selectedImg || authUser.profilePic || "/avatar.png"}
                    alt="Profile"
                    className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
                  />
                </div>
                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-2 right-2 rounded-full bg-base-100 p-2 shadow-md transition-all duration-200 hover:bg-primary hover:text-primary-content sm:bottom-3 sm:right-3 sm:p-3 ${
                    isUpdatingProfile ? "animate-pulse bg-primary/50" : ""
                  }`}
                >
                  <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Profile content */}
          <div className="mt-16 px-6 pb-8 pt-4 sm:mt-20 sm:px-10">
            {/* User identity section */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold capitalize text-base-content">
                  {authUser?.fullname}
                </h2>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-base-content/70">
                  <Mail className="h-3.5 w-3.5" />
                  {authUser?.email}
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <div className="badge badge-primary gap-1.5 py-3">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>Verified Account</span>
                </div>
              </div>
            </div>

            {/* Upload status message */}
            {isUpdatingProfile && (
              <div className="mb-6 rounded-lg bg-info/10 px-4 py-3 text-sm text-info">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-info"></div>
                  <span>Uploading your profile picture...</span>
                </div>
              </div>
            )}

            {/* Information cards */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Personal Information Card */}
              <div className="card bg-base-200/50 transition-all duration-300 hover:bg-base-200">
                <div className="card-body">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="card-title text-lg font-medium text-base-content">
                      <User className="mr-2 h-5 w-5 text-primary" />
                      Personal Details
                    </h3>
                    <button className="btn btn-circle btn-ghost btn-xs">
                      <Edit className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="divider my-1"></div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium uppercase tracking-wide text-base-content/60">
                        Full Name
                      </label>
                      <div className="mt-1 rounded-md bg-base-300/50 p-3 text-base-content">
                        {authUser?.fullname}
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-xs font-medium uppercase tracking-wide text-base-content/60">
                        Email Address
                      </label>
                      <div className="mt-1 rounded-md bg-base-300/50 p-3 text-base-content">
                        {authUser?.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Information Card */}
              <div className="card bg-base-200/50 transition-all duration-300 hover:bg-base-200">
                <div className="card-body">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="card-title text-lg font-medium text-base-content">
                      <Shield className="mr-2 h-5 w-5 text-primary" />
                      Account Status
                    </h3>
                  </div>
                  <div className="divider my-1"></div>
                  
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between rounded-md bg-base-300/30 p-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm">Member Since</span>
                      </div>
                      <span className="font-mono text-sm font-medium">
                        {authUser.createdAt?.split("T")[0] || "2023-01-01"}
                      </span>
                    </li>
                    
                    <li className="flex items-center justify-between rounded-md bg-base-300/30 p-3">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-sm">Status</span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-success/20 px-3 py-1 text-xs font-medium text-success">
                        <span className="h-1.5 w-1.5 rounded-full bg-success"></span>
                        Active
                      </span>
                    </li>
                  </ul>
                  
                  <div className="mt-4">
                    <div className="stats stats-vertical w-full bg-base-300/30 shadow-sm lg:stats-horizontal">
                      <div className="stat">
                        <div className="stat-title text-xs">Messages</div>
                        <div className="stat-value text-lg text-primary">89</div>
                      </div>
                      <div className="stat">
                        <div className="stat-title text-xs">Connections</div>
                        <div className="stat-value text-lg text-secondary">12</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer section with additional info */}
        <div className="mt-8 text-center text-sm text-base-content/60">
          <p>
            Last login: {new Date().toLocaleDateString()} at{" "}
            {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;