"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, MapPin, ShoppingCart, User, Globe, ChevronDown, Sparkles } from "lucide-react";

interface HeaderProps {
  onOpenAuth: () => void;
  onOpenCart: () => void;
  onOpenLocation: () => void;
  cartCount: number;
  selectedLocation: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedSearchCategory: string;
  onSearchCategoryChange: (cat: string) => void;
  isCartBumping?: boolean;
  signedInRole?: string | null;
  onSignOut?: () => void;
}

export default function Header({
  onOpenAuth,
  onOpenCart,
  onOpenLocation,
  cartCount,
  selectedLocation,
  searchQuery,
  onSearchChange,
  selectedSearchCategory,
  onSearchCategoryChange,
  isCartBumping,
  signedInRole,
  onSignOut,
}: HeaderProps) {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const [isLangOpen, setIsLangOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?query=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/shop");
    }
  };

  const languages = [
    { code: "EN", label: "English - EN" },
    { code: "HI", label: "हिन्दी - HI" },
    { code: "TE", label: "తెలుగు - TE" },
  ];

  const searchCategories = [
    "All Categories",
    "Mobiles",
    "Electronics",
    "Headphones & Watches",
    "Smart TVs",
    "Large Appliances",
    "Kitchen",
    "Home",
    "Furniture",
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0F172A] text-white shadow-md border-b border-slate-800">
      {/* Main Bar */}
      <div className="max-w-[1536px] mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 md:gap-5">
        
        {/* Brand Logo & Tagline */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer select-none group shrink-0">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-[#F59E0B] to-[#FF7A00] shadow-[0_0_15px_rgba(245,158,11,0.4)]">
            <span className="font-extrabold text-slate-950 text-xl tracking-tighter">SV</span>
            <Sparkles className="absolute -top-1 -right-1 w-3.5 h-3.5 text-white animate-pulse" />
          </div>
          <div className="hidden sm:flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-[#F59E0B] transition-colors">
                Sri<span className="text-[#F59E0B]">Visionary</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                .in
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide">
              Discover More. Shop Smarter.
            </span>
          </div>
        </Link>

        {/* Location Selector */}
        <button
          onClick={onOpenLocation}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:outline hover:outline-1 hover:outline-white text-left transition-all group shrink-0"
          title="Change delivery location"
        >
          <MapPin className="w-5 h-5 text-[#F59E0B] shrink-0 group-hover:animate-bounce" />
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] text-slate-400">Deliver to</span>
            <span className="text-xs font-bold text-white max-w-[140px] truncate">
              {selectedLocation}
            </span>
          </div>
        </button>

        {/* Mega Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 max-w-3xl flex items-center h-10 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#F59E0B] shadow-inner bg-white"
        >
          {/* Category Dropdown */}
          <div className="relative hidden lg:block h-full">
            <select
              value={selectedSearchCategory}
              onChange={(e) => onSearchCategoryChange(e.target.value)}
              className="h-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-3 pr-7 cursor-pointer border-r border-slate-300 outline-none appearance-none transition-colors"
            >
              {searchCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          </div>

          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search SriVisionary.in (Mobiles, Laptops, Audio, Offers...)"
            className="flex-1 h-full px-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none bg-transparent"
          />

          {/* Search Button */}
          <button
            type="submit"
            className="h-full px-4 sm:px-5 bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 flex items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer"
            aria-label="Submit search"
          >
            <Search className="w-4 h-4 text-slate-950 stroke-[2.5]" />
          </button>
        </form>

        {/* Right Utility Navigation */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          
          {/* Language / Region */}
          <div className="relative hidden xl:block">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded hover:outline hover:outline-1 hover:outline-white text-xs font-bold transition-all"
            >
              <span className="text-base">🇮🇳</span>
              <span>{selectedLanguage}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            {isLangOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white text-slate-900 rounded-lg shadow-xl border border-slate-200 py-1 z-50">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setSelectedLanguage(l.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-slate-100 flex items-center justify-between ${
                      selectedLanguage === l.code ? "text-[#F59E0B] bg-slate-50 font-bold" : ""
                    }`}
                  >
                    <span>{l.label}</span>
                    {selectedLanguage === l.code && <span className="text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Account & Lists */}
          {signedInRole ? (
            <div className="flex items-center gap-1">
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded hover:outline hover:outline-1 hover:outline-white text-left transition-all"
                title="Switch Account / Role"
              >
                <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] flex items-center justify-center">
                  {signedInRole.charAt(0)}
                </div>
                <div className="hidden md:flex flex-col leading-tight">
                  <span className="text-[10px] text-amber-400 font-bold uppercase">{signedInRole}</span>
                  <span className="text-xs font-bold text-white flex items-center gap-0.5">
                    Switch Role <ChevronDown className="w-3 h-3 text-slate-400" />
                  </span>
                </div>
              </button>
              <button
                onClick={onSignOut}
                className="px-2 py-1 rounded text-[11px] font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-red-900/60 border border-slate-700 transition-colors"
                title="Sign Out"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded hover:outline hover:outline-1 hover:outline-white text-left transition-all"
            >
              <User className="w-5 h-5 text-slate-300 md:hidden" />
              <div className="hidden md:flex flex-col leading-tight">
                <span className="text-[11px] text-slate-400">Hello, Sign in</span>
                <span className="text-xs font-bold text-white flex items-center gap-0.5">
                  Account & Lists <ChevronDown className="w-3 h-3 text-slate-400" />
                </span>
              </div>
            </button>
          )}

          {/* Returns & Orders */}
          <button
            onClick={onOpenAuth}
            className="hidden lg:flex flex-col leading-tight px-2 py-1.5 rounded hover:outline hover:outline-1 hover:outline-white transition-all"
          >
            <span className="text-[11px] text-slate-400">Returns</span>
            <span className="text-xs font-bold text-white">& Orders</span>
          </button>

          {/* Tactile Cart Button */}
          <button
            onClick={onOpenCart}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded hover:outline hover:outline-1 hover:outline-white transition-all relative ${
              isCartBumping ? "animate-cart-bump" : ""
            }`}
            aria-label="View shopping cart"
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-white" />
              <span className="absolute -top-2 -right-2 bg-[#F59E0B] text-slate-950 font-black text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center px-1 shadow-sm tabular-nums">
                {cartCount}
              </span>
            </div>
            <span className="hidden sm:inline text-xs font-bold text-white self-end mb-0.5">
              Cart
            </span>
          </button>
        </div>

      </div>

      {/* Category Sub-Navigation Strip */}
      <nav className="bg-[#1E293B] text-white px-3 sm:px-6 py-1.5 border-t border-slate-800 text-xs flex items-center gap-4 overflow-x-auto whitespace-nowrap scrollbar-none">
        <Link href="/shop" className="font-extrabold text-amber-400 hover:text-white flex items-center gap-1 shrink-0">
          <span>☰ All Categories</span>
        </Link>
        <Link href="/shop?category=mobiles-accessories" className="hover:text-amber-400 text-slate-200 transition-colors shrink-0">
          Mobiles
        </Link>
        <Link href="/shop?category=laptops-computers" className="hover:text-amber-400 text-slate-200 transition-colors shrink-0">
          Laptops & PCs
        </Link>
        <Link href="/shop?category=headphones-audio" className="hover:text-amber-400 text-slate-200 transition-colors shrink-0">
          Audio & Headphones
        </Link>
        <Link href="/shop?category=smart-watches" className="hover:text-amber-400 text-slate-200 transition-colors shrink-0">
          Smart Watches
        </Link>
        <Link href="/shop?category=smart-tvs-appliances" className="hover:text-amber-400 text-slate-200 transition-colors shrink-0">
          Smart TVs
        </Link>
        <Link href="/shop?category=home-kitchen" className="hover:text-amber-400 text-slate-200 transition-colors shrink-0">
          Home & Kitchen
        </Link>
        <Link href="/shop?sort=discount" className="text-amber-400 font-bold hover:underline ml-auto shrink-0">
          🔥 Today's Festival Deals
        </Link>
      </nav>

      {/* Mobile Location Strip */}
      <div
        onClick={onOpenLocation}
        className="md:hidden flex items-center gap-1.5 px-4 py-1.5 bg-[#1E293B] text-[11px] text-slate-300 border-t border-slate-800 cursor-pointer"
      >
        <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
        <span>Deliver to: <strong className="text-white">{selectedLocation}</strong></span>
        <span className="ml-auto text-amber-400 font-medium">Update</span>
      </div>
    </header>
  );
}
