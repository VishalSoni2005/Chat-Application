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
