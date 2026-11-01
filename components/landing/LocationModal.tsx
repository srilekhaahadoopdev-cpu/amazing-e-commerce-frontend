"use client";

import React, { useState } from "react";
import { X, MapPin, Check, Building2, Search } from "lucide-react";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: string;
  onSelectLocation: (location: string) => void;
}

export default function LocationModal({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
}: LocationModalProps) {
  const [customPincode, setCustomPincode] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const quickCities = [
    { city: "Hyderabad", pincode: "500084", area: "HITEC City / Madhapur" },
    { city: "Bengaluru", pincode: "560001", area: "Central Business District" },
    { city: "Mumbai", pincode: "400001", area: "South Mumbai / Fort" },
    { city: "New Delhi", pincode: "110001", area: "Connaught Place" },
    { city: "Chennai", pincode: "600001", area: "George Town" },
    { city: "Pune", pincode: "411001", area: "Shivajinagar" },
  ];

  const handleApplyCustomPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = customPincode.replace(/\D/g, "");
    if (cleanPin.length !== 6) {
      setError("Please enter a valid 6-digit Indian PIN code.");
      return;
    }
    setError("");
    onSelectLocation(`India ${cleanPin}`);
    onClose();
  };

  const handleSelectQuick = (city: string, pincode: string) => {
    onSelectLocation(`${city} ${pincode}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#0F172A] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#F59E0B]" />
            <h3 className="font-extrabold text-sm sm:text-base">
              Choose your delivery location
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <p className="text-xs text-slate-600">
            Delivery options and delivery speeds may vary based on your selected postal address.
          </p>

          {/* Custom Pincode Entry */}
          <form onSubmit={handleApplyCustomPincode} className="space-y-2">
            <label className="block text-[11px] font-bold text-slate-700 uppercase">
              Enter an Indian Pincode
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={customPincode}
                onChange={(e) => {
                  setCustomPincode(e.target.value.replace(/\D/g, ""));
                  setError("");
                }}
                placeholder="e.g. 500084"
                className="flex-1 px-3 py-2 text-sm font-bold text-slate-900 border border-slate-300 rounded-xl focus:border-[#F59E0B] focus:ring-2 focus:ring-amber-200 outline-none tabular-nums"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Apply PIN
              </button>
            </div>
            {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
          </form>

          {/* Quick Select Cities */}
          <div>
            <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Or pick a major metropolitan hub
            </span>
            <div className="grid grid-cols-2 gap-2">
              {quickCities.map((item) => {
                const label = `${item.city} ${item.pincode}`;
                const isSelected = currentLocation.includes(item.pincode);

                return (
                  <button
                    key={item.pincode}
                    type="button"
                    onClick={() => handleSelectQuick(item.city, item.pincode)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-start justify-between cursor-pointer ${
                      isSelected
                        ? "bg-amber-50 border-amber-400 text-[#92400E]"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-extrabold">{item.city}</div>
                      <div className="text-[11px] font-mono font-bold text-slate-500">
                        {item.pincode}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[120px]">
                        {item.area}
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-amber-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
