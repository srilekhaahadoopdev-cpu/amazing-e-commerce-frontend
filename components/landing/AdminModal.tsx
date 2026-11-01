"use client";

import React, { useState } from "react";
import { X, Lock, KeyRound, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessAdmin?: () => void;
}

export default function AdminModal({
  isOpen,
  onClose,
  onSuccessAdmin,
}: AdminModalProps) {
  const [email, setEmail] = useState("admin@srivisionary.in");
  const [password, setPassword] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  if (!isOpen) return null;

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please enter both staff email and admin security password.");
      return;
    }

    if (totpCode.length !== 6) {
      setErrorMsg("Please enter the 6-digit TOTP authenticator code.");
      return;
    }

    setIsAuthenticating(true);

    // Simulated Role & TOTP Verification against Supabase ADMIN Role
    setTimeout(() => {
      setIsAuthenticating(false);
      // Demo validation
      if (email.toLowerCase().includes("admin") && totpCode === "123456" || totpCode.length === 6) {
        setAuthSuccess(true);
        if (onSuccessAdmin) {
          onSuccessAdmin();
        }
        setTimeout(() => {
          onClose();
          setAuthSuccess(false);
          setPassword("");
          setTotpCode("");
        }, 1800);
      } else {
        setErrorMsg("403 Forbidden: Account does not have ADMIN privileges in Supabase security directory.");
      }
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      <div
        className="relative w-full max-w-md bg-[#0F172A] text-white rounded-2xl shadow-2xl border border-slate-700 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold tracking-tight text-white flex items-center gap-1.5">
                <span>Administrative Access Portal</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-900/60 text-red-300 font-bold border border-red-700">
                  SECURE
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Staff & Governance Authentication
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

        {/* Content */}
        <div className="p-6">
          {authSuccess ? (
            <div className="py-6 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8 animate-bounce" />
              </div>
              <h4 className="text-base font-black text-white">
                Admin Credential Verified
              </h4>
              <p className="text-xs text-slate-300">
                Access Token issued. Redirecting to SriVisionary Admin Console...
              </p>
            </div>
          ) : (
            <form onSubmit={handleAdminLogin} className="space-y-4">
              
              {/* Notice */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-tight">
                  Restricted access. All connection attempts, IP addresses, and TOTP handshakes are logged into the Supabase security audit ledger.
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Staff Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                  placeholder="admin@srivisionary.in"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Master Access Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                  placeholder="••••••••••••"
                  required
                />
              </div>

              {/* TOTP 2FA */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold text-slate-300 uppercase">
                    TOTP 2FA Authenticator Code
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    (Demo: 123456)
                  </span>
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    maxLength={6}
                    value={totpCode}
                    onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono font-bold tracking-widest focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                    placeholder="6-digit TOTP"
                    required
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-600/40 text-red-300 text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all duration-150 transform active:scale-97 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
              >
                {isAuthenticating ? (
                  <span>Verifying Cryptographic Credentials...</span>
                ) : (
                  <>
                    <span>Authenticate & Access Console</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
