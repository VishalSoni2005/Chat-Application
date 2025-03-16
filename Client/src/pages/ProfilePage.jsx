import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const {checkAuth, authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  // const handleImageUpload = async (e) => {

  //   console.log("e.target.files return FILELIST object ", e.target.files);
  //   console.log("Selected image:", e.target.files[0]);

  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const reader = new FileReader(); //FileReader is a built-in JavaScript API that allows you to read the contents of files (like images, PDFs, text files) from the client side.

  //   reader.readAsDataURL(file); //Reads the file and converts it to a Base64-encoded string (data URL).

  //   reader.onload = async () => {
  //     //Callback trigerred when the file is loaded
  //     const base64Image = reader.result;
  //     setSelectedImg(base64Image);
  //     console.log("base64Image", base64Image);
  //     await updateProfile({ profilePic: base64Image });
  //   };
  // };
  useEffect(() => {
   checkAuth();
  
  }, [checkAuth]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      // Create a URL for the selected image to display in the UI
      await updateProfile(formData);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImg(imageUrl);
      
    } catch (error) {
      toast.error("Error updating profile");
      console.error("Error updating profile:", error);
    }
  };
  return (
    <div className="h-screen pt-20">
      <div className="mx-auto max-w-2xl p-4 py-8">
        <div className="bg-base-300 space-y-8 rounded-xl p-6">
          <div className="flex flex-col text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="h-5 w-5 animate-pulse rounded-full bg-green-600" />
              <h1 className="font-serif text-2xl font-semibold capitalize">
                {authUser?.fullname || "Profile"}
              </h1>
            </div>
            <p className="mt-2">{authUser?.fullname} profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full border-4 object-cover"
              />
              <label
                htmlFor="avatar-upload" //* When you set htmlFor="avatar-upload", it links the <label> to the <input> element with id="avatar-upload".
                className={`bg-base-content absolute bottom-0 right-0 cursor-pointer rounded-full p-2 transition-all duration-200 hover:scale-105 ${isUpdatingProfile ? "pointer-events-none animate-pulse" : ""} `}>
                <Camera className="text-base-200 h-5 w-5" />
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
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <User className="h-4 w-4" />
                Full Name
              </div>
              <p className="bg-base-200 rounded-lg border px-4 py-2.5">{authUser?.fullname}</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Mail className="h-4 w-4" />
                Email Address
              </div>
              <p className="bg-base-200 rounded-lg border px-4 py-2.5">{authUser?.email}</p>
            </div>
          </div>

          <div className="bg-base-300 mt-6 rounded-xl p-6">
            <h2 className="mb-4 text-lg font-medium">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between border-b border-zinc-700 py-2">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
