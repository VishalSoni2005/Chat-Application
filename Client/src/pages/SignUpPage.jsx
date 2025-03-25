"use client";

import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import ImageShowcase from "../components/imageShowcase";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: ""
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullname.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 3) return toast.error("Password must be at least 3 characters");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();

    if (success === true) {
      try {
        await signup(formData);
      } catch (error) {
        console.error("Signup failed:", error);
      }
    }
  };

  return (
    <div className="grid min-h-screen mt-8 lg:grid-cols-2">
      {/* Left side - Form */}
      <div className="from-background to-background/80 dark:from-background dark:to-background/90 flex flex-col items-center justify-center bg-gradient-to-b p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Header */}
          <div className="mb-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="bg-primary/10 hover:bg-primary/20 flex size-14 transform items-center justify-center rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow">
                <img src="/logo.svg" alt="" />
              </div>
              <h1 className="text-foreground mt-4 text-3xl font-bold">Create Account</h1>
              <p className="text-muted-foreground max-w-xs">
                Get started with your free account and join our community today
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-foreground/90 dark:text-foreground/80 font-medium">
                  Full Name
                </span>
              </label>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="text-muted-foreground group-hover:text-primary size-5 transition-colors duration-200" />
                </div>
                <input
                  type="text"
                  className="input input-bordered border-input bg-background hover:border-primary/50 focus:border-primary focus:ring-primary/20 w-full rounded-xl py-3 pl-10 transition-all duration-200 focus:ring"
                  placeholder="John Doe"
                  value={formData.fullname}
                  onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-foreground/90 dark:text-foreground/80 font-medium">
                  Email
                </span>
              </label>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="text-muted-foreground group-hover:text-primary size-5 transition-colors duration-200" />
                </div>
                <input
                  type="email"
                  className="input input-bordered border-input bg-background hover:border-primary/50 focus:border-primary focus:ring-primary/20 w-full rounded-xl py-3 pl-10 transition-all duration-200 focus:ring"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-foreground/90 dark:text-foreground/80 font-medium">
                  Password
                </span>
              </label>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="text-muted-foreground group-hover:text-primary size-5 transition-colors duration-200" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered border-input bg-background hover:border-primary/50 focus:border-primary focus:ring-primary/20 w-full rounded-xl py-3 pl-10 transition-all duration-200 focus:ring"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex items-center pr-3 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
              <div className="mt-1">
                <p className="text-muted-foreground text-xs">
                  Password must be at least 3 characters
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn btn-primary text-primary-foreground w-full transform rounded-xl py-3 font-medium shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                disabled={isSigningUp}>
                {isSigningUp ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="size-5 animate-spin" />
                    <span>Creating account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>

            <div className="relative my-6 gap-2 p-4 ">
              <div className="absolute inset-0 flex items-center">
                <div className="border-border w-1/3 border-t"></div>
                <span className="bg-background text-muted-foreground px-4">or sign up with</span>
                <div className="border-border w-1/3 border-t"></div>
              </div>
              
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              <button
                type="button"
                className="btn btn-outline border-input hover:bg-accent hover:text-accent-foreground flex items-center justify-center rounded-xl border py-2.5 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="btn btn-outline border-input hover:bg-accent hover:text-accent-foreground flex items-center justify-center rounded-xl border py-2.5 transition-colors">
                <svg className="h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                </svg>
              </button>
              <button
                type="button"
                className="btn btn-outline border-input hover:bg-accent hover:text-accent-foreground flex items-center justify-center rounded-xl border py-2.5 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
                </svg>
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-medium transition-colors hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image Showcase */}
      <ImageShowcase />
    </div>
  );
};

export default SignUpPage;

// import { useState } from "react";
// import { useAuthStore } from "../store/useAuthStore";
// import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
// import { Link } from "react-router";

// import AuthImagePattern from "../components/SignupImageGrid.component";
// import toast from "react-hot-toast";

// const SignUpPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     fullname: "",
//     email: "",
//     password: ""
//   });

//   const { signup, isSigningUp } = useAuthStore();

//   const validateForm = () => {
//     if (!formData.fullname.trim()) return toast.error("Full name is required");
//     if (!formData.email.trim()) return toast.error("Email is required");
//     // if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
//     if (!formData.password) return toast.error("Password is required");
//     if (formData.password.length < 3) return toast.error("Password must be at least 3 characters");

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log("Form Data is : ", formData);

//     const success = validateForm();

//     if (success === true) {
//       try {
//         await signup(formData);
//       } catch (error) {
//         console.error("Signup failed:", error);
//       }
//     }
//   };

//   return (
//     <div className="grid min-h-screen lg:grid-cols-2">
//       {/* left side */}
//       <div className="flex flex-col items-center justify-center p-6 sm:p-12">
//         <div className="w-full max-w-md space-y-8">
//           {/* LOGO */}
//           <div className="mb-8 text-center">
//             <div className="group flex flex-col items-center gap-2">
//               <div className="bg-primary/10 group-hover:bg-primary/20 flex size-12 items-center justify-center rounded-xl transition-colors">
//                 <MessageSquare className="text-primary size-6" />
//               </div>
//               <h1 className="mt-2 text-2xl font-bold">Create Account</h1>
//               <p className="text-base-content/60">Get started with your free account</p>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Full Name</span>
//               </label>
//               <div className="relative">
//                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                   <User className="text-base-content/40 size-5" />
//                 </div>
//                 <input
//                   type="text"
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="John Doe"
//                   value={formData.fullname}
//                   onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
//                 />
//               </div>
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Email</span>
//               </label>
//               <div className="relative">
//                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                   <Mail className="text-base-content/40 size-5" />
//                 </div>
//                 <input
//                   type="email"
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="you@example.com"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 />
//               </div>
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Password</span>
//               </label>
//               <div className="relative">
//                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                   <Lock className="text-base-content/40 size-5" />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="••••••••"
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 flex items-center pr-3"
//                   onClick={() => setShowPassword(!showPassword)}>
//                   {showPassword ? (
//                     <EyeOff className="text-base-content/40 size-5" />
//                   ) : (
//                     <Eye className="text-base-content/40 size-5" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>

//               {/* {console.log("this is form data : ",formData)} */}

//               {isSigningUp ? (
//                 <>
//                   <Loader2 className="size-5 animate-spin" />
//                   Loading...
//                 </>
//               ) : (
//                 "Create Account"
//               )}
//             </button>
//           </form>

//           <div className="text-center">
//             <p className="text-base-content/60">
//               Already have an account?{" "}
//               <Link to="/login" className="link link-primary">
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* right side */}

//       <AuthImagePattern
//         title="Join our community"
//         subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
//       />
//     </div>
//   );
// };
// export default SignUpPage;
