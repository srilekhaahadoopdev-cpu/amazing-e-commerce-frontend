"use client";

import React from "react";
import { Store, Percent, Calendar, Users, ChevronRight, CheckCircle2 } from "lucide-react";

interface VendorCTAProps {
  onRegisterVendor: () => void;
}

export default function VendorCTA({ onRegisterVendor }: VendorCTAProps) {
  return (
    <section className="w-full bg-[#F8FAFC] py-12 px-3 sm:px-6">
      <div className="max-w-[1536px] mx-auto">
        
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#1E3A8A] text-white p-8 sm:p-12 shadow-2xl overflow-hidden border border-slate-700">
          
          {/* Subtle Ambient Pattern */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#F59E0B]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
                <Store className="w-4 h-4 text-[#F59E0B]" />
                <span>Seller Onboarding Gateway</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Grow Your Business Across India —{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-[#FF7A00]">
                  Become a SriVisionary Seller
                </span>
              </h2>

              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                Join thousands of manufacturers, brands, and local retailers who fulfill orders daily using our enterprise multi-vendor portal with automated payouts.
              </p>

              {/* 3 Key Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/80 backdrop-blur-xs flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Percent className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">0% Commission</h4>
                    <p className="text-[11px] text-slate-400">For your first 30 days of sales</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/80 backdrop-blur-xs flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">7-Day Payouts</h4>
                    <p className="text-[11px] text-slate-400">Direct NEFT/RTGS to your bank</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/80 backdrop-blur-xs flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Nationwide Reach</h4>
                    <p className="text-[11px] text-slate-400">Millions of verified buyers</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Action */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-700 text-center w-full max-w-sm backdrop-blur">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Ready to Start?
                </span>
                <div className="text-xl font-extrabold text-white mb-4">
                  Paperless KYC & Fast Approval
                </div>
                <button
                  onClick={onRegisterVendor}
                  className="w-full group inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all duration-150 transform hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <span>Register as Vendor</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[3]" />
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 mt-3">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>GSTIN & Bank Account required</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
