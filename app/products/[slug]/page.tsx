"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import CartDrawer, { CartItem } from "@/components/landing/CartDrawer";
import { Product } from "@/lib/mockData";
import AuthModal from "@/components/landing/AuthModal";
import LocationModal from "@/components/landing/LocationModal";
import ToastNotification, { ToastData } from "@/components/landing/ToastNotification";
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  CheckCircle,
  MapPin,
  ChevronRight,
  ShoppingCart,
  Zap,
} from "lucide-react";

function ProductDetailContent() {
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // App UI State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Hyderabad 500084");
  const [signedInRole, setSignedInRole] = useState<string | null>(null);
  const [activeToast, setActiveToast] = useState<ToastData | null>(null);

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return;
      setIsLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/api/v1/products/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          setSelectedImage(data.featured_image || data.images?.[0]?.image_url || "");
          if (data.variants && data.variants.length > 0) {
            setSelectedVariant(data.variants[0]);
          }
        }
      } catch {
        // Fallback default
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  const handleSelectVariant = (v: any) => {
    setSelectedVariant(v);
    if (v.variant_image) {
      setSelectedImage(v.variant_image);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    const priceToUse = selectedVariant?.selling_price || product.selling_price;
    const fullProduct: Product = {
      id: product.id,
      slug: product.slug || slug,
      category: product.category_name || "Mobiles",
      title: product.name,
      discountBadge: `${product.discount_percentage}% off`,
      rating: product.avg_rating || 4.5,
      ratingCount: product.review_count || 100,
      socialProof: "Prime Eligible",
      price: priceToUse,
      mrp: product.mrp,
      cardOffer: "5% Unlimited Cashback on ICICI Card",
      deliveryDate: "FREE delivery tomorrow",
      fastestDelivery: "Fastest delivery by 10 AM tomorrow",
      variants: [
        {
          colorName: selectedVariant?.color_name || "Standard",
          colorHex: selectedVariant?.color_hex || "#1E293B",
          image: selectedImage || product.featured_image || "",
        },
      ],
    };

    const itemToAdd: CartItem = {
      product: fullProduct,
      selectedColor: selectedVariant?.color_name,
      quantity,
    };

    setCartItems((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += quantity;
        return updated;
      }
      return [...prev, itemToAdd];
    });

    setActiveToast({
      id: String(Date.now()),
      product: fullProduct,
      selectedColor: selectedVariant?.color_name,
    });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Header
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenLocation={() => setIsLocationOpen(true)}
          cartCount={0}
          selectedLocation={selectedLocation}
          searchQuery=""
          onSearchChange={() => {}}
          selectedSearchCategory="All Categories"
          onSearchCategoryChange={() => {}}
        />
        <div className="max-w-[1536px] mx-auto p-8 animate-pulse space-y-4">
          <div className="h-6 w-48 bg-slate-200 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="h-96 bg-slate-200 rounded-xl" />
            <div className="space-y-4">
              <div className="h-8 bg-slate-200 rounded" />
              <div className="h-24 bg-slate-200 rounded" />
            </div>
            <div className="h-96 bg-slate-200 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <Header
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenLocation={() => setIsLocationOpen(true)}
          cartCount={0}
          selectedLocation={selectedLocation}
          searchQuery=""
          onSearchChange={() => {}}
          selectedSearchCategory="All Categories"
          onSearchCategoryChange={() => {}}
        />
        <div className="flex-1 max-w-[1536px] mx-auto p-8 text-center flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold">Product not found</h2>
          <Link href="/shop" className="mt-4 px-4 py-2 bg-[#FFD814] font-bold text-xs rounded-lg">
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages = [
    product.featured_image,
    ...(product.images || []).map((img: any) => img.image_url),
    ...(product.variants || []).map((v: any) => v.variant_image),
  ].filter(Boolean);

  const uniqueGallery = Array.from(new Set(galleryImages));

  const displayPrice = selectedVariant?.selling_price || product.selling_price;
  const displayMrp = selectedVariant?.mrp || product.mrp;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      
      {/* Session Active Banner */}
      {signedInRole && (
        <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-bold flex items-center justify-between shadow-xs">
          <div className="max-w-[1536px] mx-auto flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Session Active: Authenticated as <strong className="uppercase underline">{signedInRole}</strong></span>
          </div>
          <button onClick={() => setSignedInRole(null)} className="text-white hover:underline text-xs font-bold">
            Sign Out
          </button>
        </div>
      )}

      {/* Header */}
      <Header
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLocation={() => setIsLocationOpen(true)}
        cartCount={totalCartCount}
        selectedLocation={selectedLocation}
        searchQuery=""
        onSearchChange={() => {}}
        selectedSearchCategory="All Categories"
        onSearchCategoryChange={() => {}}
        signedInRole={signedInRole}
        onSignOut={() => setSignedInRole(null)}
      />

      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 py-2.5 text-xs text-slate-500 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <Link href="/shop" className="hover:text-amber-600 font-semibold">Shop</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          {product.category_name && (
            <>
              <Link href={`/shop?category=${product.category_slug}`} className="hover:text-amber-600">
                {product.category_name}
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-400" />
            </>
          )}
          <span className="text-slate-800 font-bold truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      {/* Main PDP Grid */}
      <main className="flex-1 max-w-[1536px] w-full mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COLUMN 1: Image Gallery (5 cols) */}
          <div className="lg:col-span-5 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnail Column */}
            <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto max-h-[500px] shrink-0">
              {uniqueGallery.map((img: string, i: number) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-lg border-2 p-1 bg-white shrink-0 overflow-hidden transition-all ${
                    selectedImage === img ? "border-amber-500 shadow-sm" : "border-slate-200 hover:border-slate-400"
                  }`}
                >
                  <img src={img} alt={`Angle ${i + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Main Image Stage */}
            <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-6 flex items-center justify-center min-h-[420px] max-h-[520px] overflow-hidden group">
              <img
                src={selectedImage}
                alt={product.name}
                className="max-h-[460px] w-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

          </div>

          {/* COLUMN 2: Details & Specification (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Title & Brand */}
            <div>
              {product.brand_name && (
                <Link
                  href={`/shop?brand=${product.brand_slug}`}
                  className="text-xs font-bold uppercase tracking-wider text-amber-600 hover:underline"
                >
                  Visit the {product.brand_name} Store
                </Link>
              )}
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 mt-1 leading-snug">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-1 bg-emerald-700 text-white text-xs font-black px-2 py-0.5 rounded">
                <span>{product.avg_rating.toFixed(1)}</span>
                <Star className="w-3 h-3 fill-current" />
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {product.review_count.toLocaleString()} customer ratings
              </span>
            </div>

            {/* Price Box */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-2.5">
                <span className="text-red-600 font-bold text-lg">
                  -{product.discount_percentage}%
                </span>
                <span className="text-3xl font-black text-slate-950 tracking-tight">
                  ₹{displayPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                M.R.P.: <span className="line-through">₹{displayMrp.toLocaleString("en-IN")}</span>
              </p>
              <p className="text-[11px] font-semibold text-slate-700">Inclusive of all taxes</p>
            </div>

            {/* Bank Offer Banner */}
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
                <CreditCard className="w-4 h-4 text-amber-600" />
                <span>Bank Offer Available</span>
              </div>
              <p className="text-[11px] text-amber-900 leading-relaxed">
                Up to ₹1,500 Instant Discount on SriVisionary ICICI & SBI Credit Cards. EMI available from ₹1,480/month.
              </p>
            </div>

            {/* Variants Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-slate-900 block">
                  Select Variant: <strong className="text-amber-700 font-extrabold">{selectedVariant?.variant_name}</strong>
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v: any) => {
                    const isSelected = selectedVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => handleSelectVariant(v)}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#0F172A] text-white border-[#0F172A] shadow-sm"
                            : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {v.color_hex && (
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/40"
                            style={{ backgroundColor: v.color_hex }}
                          />
                        )}
                        <span>{v.color_name || v.variant_name}</span>
                        <span className="text-[11px] font-normal opacity-80">
                          ₹{v.selling_price.toLocaleString("en-IN")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Product Highlights */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                About this item
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                {product.short_description || product.description}
              </p>
            </div>

          </div>

          {/* COLUMN 3: Buy Box & Delivery (3 cols) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-slate-300 p-5 shadow-sm space-y-4 sticky top-24">
              
              <div>
                <span className="text-2xl font-black text-slate-950">
                  ₹{displayPrice.toLocaleString("en-IN")}
                </span>
                <p className="text-xs text-emerald-700 font-bold mt-1 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>FREE delivery by Tomorrow 2 PM</span>
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Deliver to <strong>{selectedLocation}</strong></span>
              </div>

              <div className="py-2 border-y border-slate-100">
                <span className="text-base font-extrabold text-emerald-700 block">
                  In Stock
                </span>
                <span className="text-[11px] text-slate-500">
                  Ships from SriVisionary Fulfillment Center
                </span>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-700">Quantity:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="text-xs font-bold px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg outline-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5].map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
              </div>

              {/* Add to Cart CTA */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-2.5 px-4 rounded-xl bg-[#FFD814] hover:bg-[#F7CA00] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm transition-all duration-150 active:scale-97 cursor-pointer flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              {/* Buy Now CTA */}
              <button
                type="button"
                onClick={() => {
                  handleAddToCart();
                  setIsCartOpen(true);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#FFA41C] hover:bg-[#FA8900] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm transition-all duration-150 active:scale-97 cursor-pointer"
              >
                Buy Now
              </button>

              {/* Seller Box */}
              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                <p>Sold by <strong className="text-slate-900">SriVisionary Official</strong> and Fulfilled by SriVisionary.</p>
                <p className="flex items-center gap-1 text-slate-600">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Secure transaction</span>
                </p>
                <p className="flex items-center gap-1 text-slate-600">
                  <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
                  <span>7 days replacement guarantee</span>
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Full Description & Specifications Tab */}
        <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
          <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-200">
            Product Description & Overview
          </h2>
          <div className="mt-4 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-4">
            {product.description}
          </div>
        </section>

      </main>

      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={(id, q) =>
          setCartItems((prev) =>
            q <= 0
              ? prev.filter((i) => i.product.id !== id)
              : prev.map((i) => (i.product.id === id ? { ...i, quantity: q } : i))
          )
        }
        onRemoveItem={(id) => setCartItems((prev) => prev.filter((i) => i.product.id !== id))}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsAuthOpen(true);
        }}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccessRole={setSignedInRole}
      />

      {/* Location Modal */}
      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        currentLocation={selectedLocation}
        onSelectLocation={setSelectedLocation}
      />

      {/* Toast Notification */}
      <ToastNotification
        toast={activeToast}
        onClose={() => setActiveToast(null)}
        onOpenCart={() => setIsCartOpen(true)}
      />

    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#0F172A] border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <ProductDetailContent />
    </React.Suspense>
  );
}
