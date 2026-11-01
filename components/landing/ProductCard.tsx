"use client";

import React, { useState } from "react";
import { Star, Heart, Check, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/lib/mockData";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, selectedColor?: string) => void;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onQuickView,
}: ProductCardProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const currentVariant = product.variants[selectedVariantIndex] || {
    colorName: "Standard",
    colorHex: "#0F172A",
    image: product.variants[0]?.image || "",
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(product, currentVariant.colorName);
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  // Format INR Currency
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-xl border border-slate-200/90 hover:border-slate-400/80 shadow-xs hover:shadow-xl transition-all duration-200 p-3 sm:p-4 overflow-hidden">
      
      {/* Top Header: Discount Badge + Wishlist */}
      <div className="flex items-center justify-between gap-2 z-10 mb-2">
        <span className="inline-block px-2 py-0.5 rounded-md bg-gradient-to-r from-[#FF7A00] to-[#FF3B30] text-white font-extrabold text-[11px] uppercase tracking-wider shadow-xs">
          {product.discountBadge}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className={`p-1.5 rounded-full transition-colors cursor-pointer ${
            isWishlisted
              ? "bg-red-50 text-red-500"
              : "text-slate-400 hover:text-red-500 hover:bg-slate-100"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 ${isWishlisted ? "fill-current text-red-500" : ""}`}
          />
        </button>
      </div>

      {/* Product Image Area with Color Swatch Preview */}
      <div className="relative w-full aspect-square bg-[#F8FAFC] rounded-lg overflow-hidden flex items-center justify-center p-2 mb-3">
        <img
          src={currentVariant.image}
          alt={`${product.title} - ${currentVariant.colorName}`}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Quick View Button on Hover */}
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-3 py-1 rounded-md bg-[#0F172A]/90 hover:bg-[#0F172A] text-white text-[11px] font-bold shadow-md flex items-center gap-1.5 backdrop-blur-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        )}
      </div>

      {/* Color Variant Dots */}
      <div className="flex items-center gap-1.5 mb-2 min-h-[22px]">
        {product.variants.length > 1 && (
          <div className="flex items-center gap-1.5">
            {product.variants.map((v, idx) => (
              <button
                key={v.colorName}
                onClick={() => setSelectedVariantIndex(idx)}
                onMouseEnter={() => setSelectedVariantIndex(idx)}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedVariantIndex === idx
                    ? "ring-2 ring-offset-1 ring-slate-800 scale-110 border-slate-700"
                    : "border-slate-300 hover:scale-105"
                }`}
                style={{ backgroundColor: v.colorHex }}
                title={`Color: ${v.colorName}`}
              />
            ))}
            <span className="text-[10px] text-slate-500 font-medium ml-1">
              {currentVariant.colorName}
            </span>
          </div>
        )}
      </div>

      {/* Title (2 lines clamp) */}
      <h3
        className="text-xs sm:text-sm font-semibold text-slate-900 line-clamp-2 leading-snug hover:text-[#1E3A8A] cursor-pointer mb-1.5 transition-colors"
        title={product.title}
      >
        {product.title}
      </h3>

      {/* Star Ratings & Social Proof */}
      <div className="flex items-center gap-1.5 mb-2 flex-wrap">
        <div className="flex items-center text-[#F59E0B]">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span className="text-xs font-bold text-slate-800 ml-1">
            {product.rating}
          </span>
        </div>
        <span className="text-[11px] text-slate-400">({product.ratingCount})</span>
        <span className="text-slate-300 text-xs">•</span>
        <span className="text-[11px] text-slate-600 font-medium">
          {product.socialProof}
        </span>
      </div>

      {/* Price Strip */}
      <div className="mb-2">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-lg sm:text-xl font-extrabold text-slate-950 tabular-nums">
            {formatINR(product.price)}
          </span>
          <span className="text-xs text-slate-400 line-through tabular-nums">
            M.R.P: {formatINR(product.mrp)}
          </span>
        </div>
        <div className="text-[11px] text-[#92400E] font-semibold truncate mt-0.5">
          {product.cardOffer}
        </div>
      </div>

      {/* Delivery Timelines (Emerald Green) */}
      <div className="mb-3 text-[11px] leading-relaxed text-slate-600 border-t border-slate-100 pt-2">
        <div className="text-[#059669] font-bold">
          FREE delivery <span className="underline">{product.deliveryDate}</span>
        </div>
        <div className="text-slate-500 text-[10px]">
          Or fastest: {product.fastestDelivery}
        </div>
        {product.seasonalBadge && (
          <div className="text-[#92400E] text-[10px] font-bold mt-0.5">
            ★ {product.seasonalBadge}
          </div>
        )}
      </div>

      {/* Tactile Interactive Add To Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className="w-full mt-auto py-2.5 px-3 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm transition-all duration-150 cursor-pointer disabled:opacity-80"
      >
        {isAdding ? (
          <>
            <Check className="w-4 h-4 text-emerald-400 animate-scale" />
            <span className="text-emerald-300">Added to Cart!</span>
          </>
        ) : (
          <>
            <ShoppingBag className="w-4 h-4 text-[#F59E0B]" />
            <span>Add to Cart</span>
          </>
        )}
      </button>

    </div>
  );
}
