"use client";

import React from "react";
import { Truck, RotateCcw, CreditCard, Sparkles, ArrowRight, Zap } from "lucide-react";

interface HeroFestivalBannerProps {
  onExploreDeals: () => void;
}

export default function HeroFestivalBanner({ onExploreDeals }: HeroFestivalBannerProps) {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#0F172A] via-[#1E293B]/70 to-[#F8FAFC] pt-6 pb-12 px-3 sm:px-6 overflow-hidden">
      {/* Background Decorative Ambient Festive Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#DC2626]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-80 h-80 bg-[#F59E0B]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1536px] mx-auto">
        
        {/* Main Hero Festive Card Container - Amazon Great Indian Festival Royal Crimson & Gold */}
        <div className="relative rounded-2xl bg-gradient-to-r from-[#4A0413] via-[#7F1D1D] to-[#991B1B] border-2 border-amber-400/50 shadow-[0_20px_50px_rgba(127,29,29,0.35)] p-6 sm:p-10 text-white overflow-hidden">
          
          {/* Subtle Golden Diya / Sparkle Pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FDE047_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none" />
          
          {/* Ambient Corner Flare */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-rose-600/30 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Headlines & Offers */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              
              {/* Event Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/60 text-amber-200 text-xs sm:text-sm font-extrabold w-fit shadow-md backdrop-blur-xs">
                <Sparkles className="w-4 h-4 text-[#FDE047] animate-spin" style={{ animationDuration: '6s' }} />
                <span>GREAT INDIAN FESTIVAL RELOADED</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FDE047] animate-ping" />
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.15] text-white">
                SriVisionary{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FDE047] via-[#F59E0B] to-[#F97316] drop-shadow-sm">
                  Mega Fest
                </span>
                <span className="block text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-100 mt-1">
                  Bank Offers Reset Today
                </span>
              </h1>

              <p className="text-sm sm:text-base text-rose-100/90 max-w-2xl leading-relaxed">
                Unlock instant savings on Smartphones, Laptops, 4K Smart TVs, and Home Essentials with exclusive partner bank cards and zero-cost EMI.
              </p>

              {/* Dual Bank Offer Strip - High Contrast Crisp White Floating Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                
                {/* Bank Card 1: Axis Bank */}
                <div className="bg-white text-slate-900 rounded-xl p-3.5 border-2 border-amber-300 shadow-xl flex items-start gap-3 transform hover:-translate-y-0.5 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-[#881337] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-md">
                    AXIS
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#881337] uppercase tracking-wider">Axis Bank Cards</span>
                    <span className="text-sm font-black text-slate-900 leading-tight">
                      10% Savings* up to ₹11,250
                    </span>
                    <span className="text-[11px] text-slate-600 font-medium">On Credit Card & EMI • *T&C Apply</span>
                  </div>
                </div>

                {/* Bank Card 2: ICICI Bank */}
                <div className="bg-white text-slate-900 rounded-xl p-3.5 border-2 border-amber-300 shadow-xl flex items-start gap-3 transform hover:-translate-y-0.5 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-[#C2410C] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-md">
                    ICICI
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#C2410C] uppercase tracking-wider">ICICI Bank Cards</span>
                    <span className="text-sm font-black text-slate-900 leading-tight">
                      10% Savings* up to ₹11,250
                    </span>
                    <span className="text-[11px] text-slate-600 font-medium">Instant Discount + No-Cost EMI</span>
                  </div>
                </div>

              </div>

              {/* Promotional Cashback Callout Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/35 backdrop-blur-xs border border-amber-400/40 text-amber-100 text-xs font-semibold">
                  <Zap className="w-3.5 h-3.5 text-[#FDE047]" />
                  <span>10% savings with SriVisionary ICICI Card</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/35 backdrop-blur-xs border border-amber-400/40 text-amber-100 text-xs font-semibold">
                  <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                  <span>10% Cashback with Razorpay Later</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/70 backdrop-blur-xs border border-emerald-400/60 text-emerald-200 text-xs font-bold">
                  <span>35% cashback up to ₹150 on your first order</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  onClick={onExploreDeals}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FDE047] via-[#F59E0B] to-[#EA580C] hover:from-[#FACC15] hover:to-[#D97706] text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-950/50 transition-all duration-150 transform hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <span>Explore Mega Fest Deals</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>

            </div>

            {/* Right Column: Festive Spotlight Showcase */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400/40 bg-black/40 backdrop-blur-md p-5 shadow-2xl">
                
                <div className="flex items-center justify-between pb-3 border-b border-rose-900/60">
                  <span className="text-xs font-extrabold text-[#FDE047] uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Special Spotlight
                  </span>
                  <span className="px-2 py-0.5 rounded bg-gradient-to-r from-red-600 to-amber-600 text-[10px] font-black uppercase text-white shadow-sm animate-pulse">
                    Live Now
                  </span>
                </div>

                <div className="py-4 flex items-center justify-center relative">
                  {/* Subtle Golden Glow behind product */}
                  <div className="absolute inset-0 m-auto w-36 h-36 bg-amber-400/25 rounded-full blur-xl pointer-events-none" />

                  <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                    <img
                      src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80"
                      alt="Festival Mega Deal"
                      className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)] transform hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-red-600 to-amber-500 text-white font-black text-sm px-3.5 py-1 rounded-full shadow-xl border-2 border-amber-300">
                      44% OFF
                    </div>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <h3 className="text-sm font-bold text-white truncate">Nothing Phone (4b) 5G • 128GB</h3>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span className="text-lg font-black text-[#FDE047] tabular-nums">₹30,550</span>
                    <span className="text-xs text-rose-200/80 line-through tabular-nums">₹54,999</span>
                  </div>
                </div>

              </div>

              {/* Trust Badges Strip */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/30 backdrop-blur-xs border border-amber-400/30 text-rose-100">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/25 text-emerald-300 flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold leading-tight">
                    Free Delivery on first 3 orders
                  </span>
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/30 backdrop-blur-xs border border-amber-400/30 text-rose-100">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/25 text-blue-300 flex items-center justify-center shrink-0">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold leading-tight">
                    7-Day Easy Returns Guarantee
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
