"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Phone, ShieldCheck, ArrowRight, CheckCircle2, RotateCcw, AlertCircle, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessRole?: (role: "CUSTOMER" | "VENDOR" | "ADMIN") => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  onSuccessRole,
}: AuthModalProps) {
  const [step, setStep] = useState<"phone" | "otp" | "success">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [simulatedRole, setSimulatedRole] = useState<"CUSTOMER" | "VENDOR" | "ADMIN">("CUSTOMER");
  const [isLoading, setIsLoading] = useState(false);

  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Reset state when opening/closing
  useEffect(() => {
    if (isOpen) {
      setStep("phone");
      setPhoneNumber("");
      setPhoneError("");
      setOtpValues(["", "", "", "", "", ""]);
      setOtpError("");
      setCountdown(30);
    }
  }, [isOpen]);

  // Countdown timer for OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "otp" && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  if (!isOpen) return null;

  // Phone submission handler
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = phoneNumber.replace(/\D/g, "");
    if (cleanNumber.length !== 10) {
      setPhoneError("Please enter a valid 10-digit Indian mobile number");
      return;
    }
    setPhoneError("");
    setIsLoading(true);

    // Simulate OTP dispatch
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      setCountdown(30);
      setTimeout(() => {
        otpInputsRef.current[0]?.focus();
      }, 100);
    }, 700);
  };

  // OTP Input Change & Auto-advancing
  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }
    const newOtp = [...otpValues];
    newOtp[index] = val;
    setOtpValues(newOtp);
    setOtpError("");

    if (val && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  // OTP Verification handler
  const handleVerifyOtp = () => {
    const fullOtp = otpValues.join("");
    if (fullOtp.length !== 6) {
      setOtpError("Please enter the complete 6-digit OTP");
      return;
    }
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
      if (onSuccessRole) {
        onSuccessRole(simulatedRole);
      }
      setTimeout(() => {
        onClose();
      }, 1800);
    }, 800);
  };

  // Google OAuth handler (ready for Supabase OAuth integration)
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      // Initiate Supabase OAuth flow if configured
      if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: window.location.origin,
          },
        });
      }
    } catch {
      // Fallback preview
      setStep("success");
      setTimeout(onClose, 1500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#0F172A] px-6 py-4 flex items-center justify-between text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#F59E0B] text-slate-950 font-black text-xs flex items-center justify-center">
              SV
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base tracking-tight">
                SriVisionary Gateway
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                One Login • Multiple Roles
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          
          {step === "phone" && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mobile Phone Number
                </label>
                <div className="flex items-center rounded-xl border border-slate-300 focus-within:border-[#F59E0B] focus-within:ring-2 focus-within:ring-amber-200 overflow-hidden bg-slate-50 transition-all">
                  <div className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-100 border-r border-slate-300 text-xs font-extrabold text-slate-700 select-none">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value.replace(/\D/g, ""));
                      setPhoneError("");
                    }}
                    placeholder="Enter 10-digit mobile number"
                    className="flex-1 px-3 py-2.5 text-sm font-semibold text-slate-900 bg-transparent outline-none"
                    autoFocus
                  />
                </div>
                {phoneError && (
                  <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {phoneError}
                  </p>
                )}
                <p className="text-[11px] text-slate-500 mt-1.5">
                  By continuing, you agree to SriVisionary&apos;s Conditions of Use & Privacy Notice.
                </p>
              </div>

              {/* Role Simulation Selector (For Testing All 3 PRD Roles) */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <span className="text-[11px] font-bold text-amber-900 block mb-1.5">
                  Smart Role Routing Target (Test Preview):
                </span>
                <div className="grid grid-cols-3 gap-1.5 mb-2.5">
                  {(["CUSTOMER", "VENDOR", "ADMIN"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setSimulatedRole(r)}
                      className={`py-1 px-2 rounded-lg text-[10px] font-extrabold border transition-all ${
                        simulatedRole === r
                          ? "bg-[#0F172A] text-white border-[#0F172A] shadow-xs"
                          : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>

                {/* 1-Click Direct Bypass Login */}
                <button
                  type="button"
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      setStep("success");
                      if (onSuccessRole) {
                        onSuccessRole(simulatedRole);
                      }
                      setTimeout(() => {
                        onClose();
                      }, 1200);
                    }, 400);
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Instant Login as {simulatedRole} (Skip OTP)</span>
                </button>
              </div>

              {/* Get OTP Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#FF7A00] hover:from-[#D97706] hover:to-[#EA580C] text-slate-950 font-black text-sm uppercase tracking-wider shadow-md transition-all duration-150 transform active:scale-97 cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span>Generating Secure OTP...</span>
                ) : (
                  <>
                    <span>Get OTP</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center py-2">
                <div className="w-full border-t border-slate-200" />
                <span className="absolute bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Or continue with
                </span>
              </div>

              {/* Social Google Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-xs cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </form>
          )}

          {step === "otp" && (
            <div className="space-y-5">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-[#92400E] mb-2">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-base font-extrabold text-slate-900">
                  Verify Phone Number
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  We sent a 6-digit code to <strong className="text-slate-800">+91 {phoneNumber}</strong>
                </p>
                <button
                  onClick={() => setStep("phone")}
                  className="text-[11px] font-bold text-[#F59E0B] hover:underline mt-1 cursor-pointer"
                >
                  Change phone number
                </button>
              </div>

              {/* 6-digit segmented inputs */}
              <div className="flex items-center justify-center gap-2">
                {otpValues.map((v, idx) => (
                  <input
                    key={idx}
                    ref={(el) => { otpInputsRef.current[idx] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={v}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-11 h-12 text-center text-lg font-black text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:border-[#F59E0B] focus:ring-2 focus:ring-amber-200 outline-none transition-all tabular-nums"
                  />
                ))}
              </div>

              {otpError && (
                <p className="text-xs text-red-600 font-medium text-center flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {otpError}
                </p>
              )}

              {/* Resend Countdown */}
              <div className="text-center">
                {countdown > 0 ? (
                  <span className="text-xs text-slate-500 font-medium">
                    Resend OTP in <span className="font-bold text-slate-800 font-mono">00:{String(countdown).padStart(2, "0")}</span>
                  </span>
                ) : (
                  <button
                    onClick={() => setCountdown(30)}
                    className="text-xs font-bold text-[#F59E0B] hover:text-[#D97706] flex items-center justify-center gap-1 mx-auto cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Resend OTP Now</span>
                  </button>
                )}
              </div>

              {/* Verify & Continue Button */}
              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-black text-sm uppercase tracking-wider shadow-md transition-all duration-150 transform active:scale-97 cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span>Verifying Code...</span>
                ) : (
                  <>
                    <span>Verify & Continue</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>
            </div>
          )}

          {step === "success" && (
            <div className="py-8 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="w-8 h-8 animate-bounce" />
              </div>
              <h4 className="text-lg font-black text-slate-900">
                Authentication Successful!
              </h4>
              <p className="text-xs text-slate-600 font-medium">
                Signed in with role: <strong className="text-slate-900 uppercase">{simulatedRole}</strong>
              </p>
              <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold">
                Routing you to your workspace...
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
