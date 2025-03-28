"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Loader2, MessageSquare, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setIsLoading(true);

    try {
      // Simulate API call to reset password
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Password reset successfully");

      // Redirect to login page
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
      console.error("Error resetting password:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center p-6">
      <div className="card w-full max-w-md shadow-xl">
        <div className="card-body">
          <div className="mb-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="bg-primary/10 hover:bg-primary/20 flex size-14 items-center justify-center rounded-2xl shadow-sm transition-all duration-300 hover:shadow">
                <MessageSquare className="text-primary size-7" />
              </div>
              <h1 className="mt-4 text-3xl font-bold">Reset Password</h1>
              <p className="max-w-xs opacity-60">Create a new password for your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">New Password</span>
              </label>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="group-hover:text-primary size-5 opacity-60 transition-colors duration-200" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input input-bordered w-full rounded-xl py-3 pl-10"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 opacity-60 transition-opacity hover:opacity-100"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
              <label className="label">
                <span className="label-text-alt opacity-60">
                  Password must be at least 6 characters
                </span>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Confirm Password</span>
              </label>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="group-hover:text-primary size-5 opacity-60 transition-colors duration-200" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="input input-bordered w-full rounded-xl py-3 pl-10"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 opacity-60 transition-opacity hover:opacity-100"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full rounded-xl py-3"
              disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="size-5 animate-spin" />
                  <span>Resetting password...</span>
                </div>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          <div className="divider my-6"></div>

          <div className="text-center">
            <Link to="/login" className="btn btn-ghost btn-sm gap-2">
              <ArrowLeft className="size-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
