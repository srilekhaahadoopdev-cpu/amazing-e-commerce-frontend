"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, ShoppingCart, Check, Zap, ShieldCheck } from "lucide-react";

export interface CatalogVariant {
  id?: string;
  sku?: string;
  variant_name?: string;
  color_name?: string;
  color_hex?: string;
  mrp?: number;
  selling_price?: number;
  variant_image?: string;
  colorName?: string;
  colorHex?: string;
  image?: string;
}

export interface CatalogProduct {
  id: string;
  name?: string;
  title?: string;
  slug: string;
  short_description?: string;
  mrp: number;
  selling_price?: number;
  price?: number;
  discount_percentage?: number;
  discountBadge?: string;
  featured_image?: string;
  image?: string;
  avg_rating?: number;
  rating?: number;
  review_count?: number;
  ratingCount?: number;
  category_name?: string;
  category?: string;
  brand_name?: string;
  variants?: CatalogVariant[];
  deliveryDate?: string;
  seasonalBadge?: string;
  socialProof?: string;
}

interface ProductCardProps {
  product: CatalogProduct;
  onAddToCart?: (product: CatalogProduct, selectedVariant?: CatalogVariant) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const displayTitle = product.name || product.title || "";
  const displayPrice = product.selling_price || product.price || 0;
  const displayMrp = product.mrp || 0;
  const displayDiscount = product.discount_percentage
    ? `${product.discount_percentage}% off`
    : product.discountBadge || (displayMrp > displayPrice ? `${Math.round(((displayMrp - displayPrice) / displayMrp) * 100)}% off` : "");
  
  const initialImage = product.featured_image || product.image || (product.variants && product.variants[0]?.variant_image) || (product.variants && product.variants[0]?.image) || "";
  
  const [selectedImage, setSelectedImage] = useState<string>(initialImage);
  const [selectedVariant, setSelectedVariant] = useState<CatalogVariant | undefined>(product.variants?.[0]);
  const [isAdded, setIsAdded] = useState(false);

  const variants = product.variants || [];
  const ratingValue = product.avg_rating || product.rating || 4.5;
  const reviewCount = product.review_count || product.ratingCount || 120;
  const deliveryText = product.deliveryDate || "Tomorrow, 2 PM";
  const seasonalBadge = product.seasonalBadge || "Arrives before Diwali";

  const handleVariantClick = (v: CatalogVariant, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedVariant(v);
    const img = v.variant_image || v.image;
    if (img) setSelectedImage(img);
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product, selectedVariant);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="group relative flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-amber-400 transition-all duration-200">
      
      {/* Product Image Area */}
      <Link href={`/products/${product.slug}`} className="relative block w-full bg-slate-50 pt-[85%] overflow-hidden">
        {displayDiscount && (
          <span className="absolute top-2.5 left-2.5 z-10 bg-red-600 text-white text-[11px] font-black px-2 py-0.5 rounded shadow-sm">
            {displayDiscount}
          </span>
        )}

        {product.brand_name && (
          <span className="absolute top-2.5 right-2.5 z-10 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide">
            {product.brand_name}
          </span>
        )}

        <img
          src={selectedImage || "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800"}
          alt={displayTitle}
          className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </Link>

      {/* Card Content */}
      <div className="flex-1 flex flex-col p-4">
        
        {/* Color Swatch Dots */}
        {variants.length > 0 && (
          <div className="flex items-center gap-1.5 mb-2.5">
            {variants.slice(0, 5).map((v, idx) => {
              const hex = v.color_hex || v.colorHex || "#CCCCCC";
              const isSelected = selectedVariant === v;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => handleVariantClick(v, e)}
                  title={v.color_name || v.colorName || `Option ${idx + 1}`}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    isSelected ? "ring-2 ring-[#0F172A] scale-110 border-white" : "border-slate-300 hover:scale-105"
                  }`}
                  style={{ backgroundColor: hex }}
                />
              );
            })}
            {variants.length > 5 && (
              <span className="text-[10px] font-bold text-slate-400">+{variants.length - 5}</span>
            )}
          </div>
        )}

        {/* Title */}
        <Link
          href={`/products/${product.slug}`}
          className="text-xs sm:text-sm font-semibold text-slate-900 line-clamp-2 hover:text-[#FF7A00] transition-colors leading-snug mb-1.5"
          title={displayTitle}
        >
          {displayTitle}
        </Link>

        {/* Rating and Social Proof */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-0.5 bg-emerald-700 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded">
            <span>{ratingValue.toFixed(1)}</span>
            <Star className="w-2.5 h-2.5 fill-current text-white" />
          </div>
          <span className="text-[11px] text-slate-500">
            ({reviewCount.toLocaleString()})
          </span>
          {product.socialProof && (
            <span className="text-[10px] font-medium text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded ml-auto">
              {product.socialProof}
            </span>
          )}
        </div>

        {/* Bold Pricing Area (Amazon Style) */}
        <div className="mt-auto pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              ₹{displayPrice.toLocaleString("en-IN")}
            </span>
            {displayMrp > displayPrice && (
              <span className="text-xs text-slate-400 line-through">
                M.R.P: ₹{displayMrp.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Delivery & Seasonal Badges */}
          <div className="mt-1 space-y-0.5">
            <p className="text-[11px] text-slate-700 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>FREE delivery <strong>{deliveryText}</strong></span>
            </p>
            {seasonalBadge && (
              <p className="text-[11px] font-bold text-emerald-700">
                {seasonalBadge}
              </p>
            )}
          </div>

          {/* Add to Cart Tactile CTA */}
          <button
            type="button"
            onClick={handleAddClick}
            className={`mt-3 w-full py-2 px-3 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs transition-all duration-150 active:scale-97 cursor-pointer ${
              isAdded
                ? "bg-emerald-600 text-white"
                : "bg-[#FFD814] hover:bg-[#F7CA00] text-slate-950 border border-[#FCD200]"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

