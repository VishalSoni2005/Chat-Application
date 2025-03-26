"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Loader2, Mail, MessageSquare, KeyRound } from "lucide-react";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("email"); // "email" or "otp"
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Email is required");
    }

    setIsLoading(true);

    try {
      // Simulate API call to send OTP
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("OTP sent to your email");
      setStep("otp");
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
      console.error("Error sending OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      return toast.error("Please enter a valid 6-digit OTP");
    }

    setIsLoading(true);

    try {
      // Simulate API call to verify OTP
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("OTP verified successfully");

      // Redirect to login page after successful verification
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
      console.error("Error verifying OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key press in OTP input
  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
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
              <h1 className="mt-4 text-3xl font-bold">
                {step === "email" ? "Forgot Password" : "Verify OTP"}
              </h1>
              <p className="max-w-xs opacity-60">
                {step === "email"
                  ? "Enter your email address to receive a verification code"
                  : "Enter the 6-digit code sent to your email"}
              </p>
            </div>
          </div>

          {step === "email" ? (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email Address</span>
                </label>
                <div className="group relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="group-hover:text-primary size-5 opacity-60 transition-colors duration-200" />
                  </div>
                  <input
                    type="email"
                    className="input input-bordered w-full rounded-xl py-3 pl-10"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full rounded-xl py-3"
                disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="size-5 animate-spin" />
                    <span>Sending code...</span>
                  </div>
                ) : (
                  "Send Reset Code"
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Verification Code</span>
                </label>
                <div className="my-4 flex items-center justify-center gap-2">
                  <KeyRound className="mr-2 size-5 opacity-60" />
                  <p className="text-sm opacity-60">We sent a code to {email}</p>
                </div>
                <div className="mt-2 flex justify-between gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      className="input input-bordered h-12 w-12 text-center text-lg font-semibold"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full rounded-xl py-3"
                disabled={isLoading || otp.join("").length !== 6}>
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="size-5 animate-spin" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  "Verify & Reset Password"
                )}
              </button>

              <div className="mt-4 text-center">
                <p className="text-sm opacity-60">
                  Didn't receive the code?{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => {
                      setStep("email");
                      setOtp(["", "", "", "", "", ""]);
                    }}>
                    Resend
                  </button>
                </p>
              </div>
            </form>
          )}

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

export default ForgetPassword;
