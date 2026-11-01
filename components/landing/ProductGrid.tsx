"use client";

import React, { useMemo, useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product, MOCK_PRODUCTS } from "@/lib/mockData";
import { Clock, Sparkles, FilterX } from "lucide-react";

interface ProductGridProps {
  selectedCategory: string;
  searchQuery: string;
  selectedSearchCategory: string;
  onAddToCart: (product: Product, selectedColor?: string) => void;
  onResetFilters: () => void;
}

export default function ProductGrid({
  selectedCategory,
  searchQuery,
  selectedSearchCategory,
  onAddToCart,
  onResetFilters,
}: ProductGridProps) {
  // Flash Sale Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 22, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter products by selected category and search
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // Category pill filter
      const matchesPill =
        selectedCategory === "Deals in focus" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      // Mega Search Bar Category dropdown
      const matchesSearchCat =
        selectedSearchCategory === "All Categories" ||
        product.category.toLowerCase().includes(selectedSearchCategory.toLowerCase()) ||
        selectedSearchCategory.toLowerCase().includes(product.category.toLowerCase());

      // Search Query
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.cardOffer.toLowerCase().includes(query);

      return matchesPill && matchesSearchCat && matchesQuery;
    });
  }, [selectedCategory, selectedSearchCategory, searchQuery]);

  return (
    <section id="deals-section" className="w-full bg-[#F8FAFC] py-8 px-3 sm:px-6">
      <div className="max-w-[1536px] mx-auto">
        
        {/* Section Header with Countdown Timer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-8 bg-gradient-to-b from-[#F59E0B] to-[#FF7A00] rounded-full" />
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>{selectedCategory === "Deals in focus" ? "Deals in Focus & Flash Sales" : selectedCategory}</span>
                {selectedCategory === "Deals in focus" && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-extrabold uppercase tracking-wider border border-red-200">
                    Up to 70% Off
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Showing {filteredProducts.length} verified handpicked items with instant dispatch
              </p>
            </div>
          </div>

          {/* Flash Sale Countdown Timer */}
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs self-start sm:self-auto">
            <Clock className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-700">Ends in:</span>
            <div className="flex items-center gap-1 font-mono text-xs font-extrabold text-red-600">
              <span className="px-1.5 py-0.5 rounded bg-red-50 border border-red-100">
                {String(timeLeft.hours).padStart(2, "0")}h
              </span>
              <span>:</span>
              <span className="px-1.5 py-0.5 rounded bg-red-50 border border-red-100">
                {String(timeLeft.minutes).padStart(2, "0")}m
              </span>
              <span>:</span>
              <span className="px-1.5 py-0.5 rounded bg-red-50 border border-red-100">
                {String(timeLeft.seconds).padStart(2, "0")}s
              </span>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3 sm:gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xs">
            <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <FilterX className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              No matching products found
            </h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              We couldn&apos;t find any products matching &quot;{searchQuery}&quot; in the &quot;{selectedCategory}&quot; category.
            </p>
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0F172A] text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span>Reset Filters & Show All Deals</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
