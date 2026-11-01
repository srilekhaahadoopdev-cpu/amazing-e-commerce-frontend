"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { CATEGORIES } from "@/lib/mockData";

interface CategoryPillsProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryPills({
  selectedCategory,
  onSelectCategory,
}: CategoryPillsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#F8FAFC] py-4 border-b border-slate-200">
      <div className="max-w-[1536px] mx-auto px-3 sm:px-6 relative">
        <div className="flex items-center gap-2">
          
          {/* Scroll Left Button */}
          <button
            onClick={() => handleScroll("left")}
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-sm transition-all shrink-0 active:scale-95"
            aria-label="Scroll categories left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Pill Container */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1 flex-1"
          >
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              const isDealsInFocus = category === "Deals in focus";

              return (
                <button
                  key={category}
                  onClick={() => onSelectCategory(category)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-150 cursor-pointer select-none shrink-0 ${
                    isActive
                      ? "bg-[#0F172A] text-white shadow-md border border-[#0F172A] scale-[1.02]"
                      : "bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-950 border border-slate-300 hover:border-slate-400 shadow-xs"
                  }`}
                >
                  {isDealsInFocus && (
                    <Flame
                      className={`w-4 h-4 ${
                        isActive ? "text-[#F59E0B]" : "text-orange-500"
                      }`}
                    />
                  )}
                  <span>{category}</span>
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            onClick={() => handleScroll("right")}
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-sm transition-all shrink-0 active:scale-95"
            aria-label="Scroll categories right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>
      </div>
    </section>
  );
}
