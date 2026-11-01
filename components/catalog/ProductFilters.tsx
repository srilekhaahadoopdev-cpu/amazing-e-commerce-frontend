"use client";

import React from "react";
import { Star, RotateCcw, Filter, ChevronRight } from "lucide-react";

export interface FilterState {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  discount?: number;
}

interface ProductFiltersProps {
  categories: { id: string; name: string; slug: string }[];
  brands: { id: string; name: string; slug: string }[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

export default function ProductFilters({
  categories,
  brands,
  filters,
  onFilterChange,
  onReset,
}: ProductFiltersProps) {
  const ratings = [
    { label: "4★ & up", val: 4.0 },
    { label: "3★ & up", val: 3.0 },
    { label: "2★ & up", val: 2.0 },
  ];

  const discounts = [
    { label: "50% or more", val: 50 },
    { label: "30% or more", val: 30 },
    { label: "20% or more", val: 20 },
    { label: "10% or more", val: 10 },
  ];

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 p-4 space-y-6 text-slate-800">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-amber-500" />
          <span>Filters</span>
        </h3>
        <button
          onClick={onReset}
          className="text-[11px] text-slate-500 hover:text-amber-600 flex items-center gap-1 font-semibold transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Clear All</span>
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2.5">
          Category
        </h4>
        <div className="space-y-1 text-xs">
          <button
            onClick={() => onFilterChange({ ...filters, category: undefined })}
            className={`w-full text-left py-1 px-2 rounded font-medium flex items-center justify-between transition-colors ${
              !filters.category ? "bg-amber-50 text-amber-900 font-bold" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <span>All Categories</span>
            {!filters.category && <span className="text-amber-600">●</span>}
          </button>
          {categories.map((c) => {
            const isSelected = filters.category === c.slug;
            return (
              <button
                key={c.id}
                onClick={() => onFilterChange({ ...filters, category: isSelected ? undefined : c.slug })}
                className={`w-full text-left py-1 px-2 rounded font-medium flex items-center justify-between transition-colors ${
                  isSelected ? "bg-amber-50 text-amber-900 font-bold" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>{c.name}</span>
                {isSelected && <span className="text-amber-600">●</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Brands Filter */}
      {brands.length > 0 && (
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2.5">
            Brands
          </h4>
          <div className="space-y-1.5 text-xs max-h-48 overflow-y-auto">
            {brands.map((b) => {
              const isChecked = filters.brand === b.slug;
              return (
                <label
                  key={b.id}
                  className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-950 select-none"
                >
                  <input
                    type="radio"
                    name="brand"
                    checked={isChecked}
                    onChange={() => onFilterChange({ ...filters, brand: isChecked ? undefined : b.slug })}
                    className="accent-amber-500 rounded text-amber-500 focus:ring-amber-400"
                  />
                  <span>{b.name}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2.5">
          Price (₹)
        </h4>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ""}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                minPrice: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-full text-xs px-2 py-1.5 rounded border border-slate-300 focus:border-amber-500 outline-none"
          />
          <span className="text-xs text-slate-400">to</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ""}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                maxPrice: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-full text-xs px-2 py-1.5 rounded border border-slate-300 focus:border-amber-500 outline-none"
          />
        </div>
      </div>

      {/* Customer Review Rating */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2.5">
          Customer Reviews
        </h4>
        <div className="space-y-1.5 text-xs">
          {ratings.map((r) => {
            const isSelected = filters.minRating === r.val;
            return (
              <button
                key={r.val}
                type="button"
                onClick={() => onFilterChange({ ...filters, minRating: isSelected ? undefined : r.val })}
                className={`w-full text-left py-1 px-1.5 rounded flex items-center gap-1.5 transition-colors ${
                  isSelected ? "bg-amber-50 font-bold" : "hover:bg-slate-50"
                }`}
              >
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(r.val) ? "fill-current" : "text-slate-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-slate-700">{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Discount Filter */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2.5">
          Discount
        </h4>
        <div className="space-y-1 text-xs">
          {discounts.map((d) => {
            const isSelected = filters.discount === d.val;
            return (
              <button
                key={d.val}
                onClick={() => onFilterChange({ ...filters, discount: isSelected ? undefined : d.val })}
                className={`w-full text-left py-1 px-1.5 rounded transition-colors ${
                  isSelected ? "bg-amber-50 text-amber-900 font-bold" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}

