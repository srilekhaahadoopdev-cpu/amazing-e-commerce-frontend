"use client";

import React from "react";
import { Shield, Sparkles, Lock, ArrowUp } from "lucide-react";

interface FooterProps {
  onOpenAdmin?: () => void;
  onOpenVendorCTA?: () => void;
  onOpenAuth?: () => void;
}

export default function Footer({
  onOpenAdmin,
  onOpenVendorCTA,
  onOpenAuth,
}: FooterProps = {}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#0B1120] text-slate-300 text-xs border-t border-slate-800">
      
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="w-full py-3.5 bg-[#1E293B] hover:bg-[#334155] text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
      >
        <ArrowUp className="w-3.5 h-3.5" />
        <span>Back to top</span>
      </button>

      {/* Main 4-Column Directory */}
      <div className="max-w-[1536px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Column 1: Get to Know Us */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white tracking-wide uppercase">
              Get to Know Us
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#about" className="hover:text-white hover:underline transition-colors">
                  About SriVisionary
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-white hover:underline transition-colors">
                  Careers & Culture
                </a>
              </li>
              <li>
                <a href="#press" className="hover:text-white hover:underline transition-colors">
                  Press Releases
                </a>
              </li>
              <li>
                <a href="#science" className="hover:text-white hover:underline transition-colors">
                  SriVisionary Science & AI
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Connect with Us */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white tracking-wide uppercase">
              Connect with Us
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white hover:underline transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white hover:underline transition-colors">
                  Twitter / X
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white hover:underline transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Make Money with Us */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white tracking-wide uppercase">
              Make Money with Us
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={onOpenVendorCTA}
                  className="hover:text-[#F59E0B] hover:underline transition-colors text-left font-semibold cursor-pointer text-amber-300"
                >
                  Sell on SriVisionary (0% Fee)
                </button>
              </li>
              <li>
                <a href="#protect" className="hover:text-white hover:underline transition-colors">
                  Protect and Build Your Brand
                </a>
              </li>
              <li>
                <a href="#supply" className="hover:text-white hover:underline transition-colors">
                  Supply to SriVisionary
                </a>
              </li>
              <li>
                <a href="#affiliate" className="hover:text-white hover:underline transition-colors">
                  Become an Affiliate Partner
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Let Us Help You */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white tracking-wide uppercase">
              Let Us Help You
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={onOpenAuth}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left"
                >
                  Your Account & Orders
                </button>
              </li>
              <li>
                <a href="#returns" className="hover:text-white hover:underline transition-colors">
                  Returns Centre
                </a>
              </li>
              <li>
                <a href="#protection" className="hover:text-white hover:underline transition-colors">
                  100% Purchase Protection
                </a>
              </li>
              <li>
                <a href="#help" className="hover:text-white hover:underline transition-colors">
                  Help & Support Assistant
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Separator */}
        <div className="border-t border-slate-800 my-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#F59E0B] text-slate-950 font-black text-xs flex items-center justify-center">
              SV
            </div>
            <span className="font-extrabold text-white text-sm">
              SriVisionary Marketplace
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">India 🇮🇳</span>
          </div>

          {/* Bottom links & Staff / Admin Trigger */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a href="#conditions" className="hover:text-white">Conditions of Use & Sale</a>
            <a href="#privacy" className="hover:text-white">Privacy Notice</a>
            <a href="#ads" className="hover:text-white">Interest-Based Ads</a>
            
            {/* Section 8 Admin Trigger Link */}
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-all cursor-pointer font-semibold"
              title="Restricted Staff & Admin Login"
            >
              <Lock className="w-3 h-3 text-red-400" />
              <span>SriVisionary Staff & Admin Access</span>
            </button>
          </div>

        </div>

        {/* Copyright */}
        <div className="text-center text-[11px] text-slate-500 pt-2">
          © 2026 SriVisionary Marketplace, Inc. or its affiliates. All rights reserved. Built strictly according to Master Architecture Specification.
        </div>

      </div>

    </footer>
  );
}
