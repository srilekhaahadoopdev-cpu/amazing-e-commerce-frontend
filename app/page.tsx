"use client";

import React, { useState } from "react";
import Header from "@/components/landing/Header";
import HeroFestivalBanner from "@/components/landing/HeroFestivalBanner";
import CategoryPills from "@/components/landing/CategoryPills";
import ProductGrid from "@/components/landing/ProductGrid";
import AuthModal from "@/components/landing/AuthModal";
import PaymentShowcase from "@/components/landing/PaymentShowcase";
import VendorCTA from "@/components/landing/VendorCTA";
import AdminModal from "@/components/landing/AdminModal";
import Footer from "@/components/landing/Footer";
import CartDrawer, { CartItem } from "@/components/landing/CartDrawer";
import LocationModal from "@/components/landing/LocationModal";
import ToastNotification, { ToastData } from "@/components/landing/ToastNotification";
import { Product } from "@/lib/mockData";
import { Sparkles, CheckCircle } from "lucide-react";

export default function LandingPage() {
  // Modal States
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Search & Filter States
  const [selectedCategory, setSelectedCategory] = useState("Deals in focus");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSearchCategory, setSelectedSearchCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("Hyderabad 500084");

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Initial sample item for tactile immediate preview
  ]);
  const [isCartBumping, setIsCartBumping] = useState(false);
  const [activeToast, setActiveToast] = useState<ToastData | null>(null);

  // Auth User Feedback State
  const [signedInRole, setSignedInRole] = useState<string | null>(null);

  // Add To Cart Handler
  const handleAddToCart = (product: Product, selectedColor?: string) => {
    // Bump cart counter animation
    setIsCartBumping(true);
    setTimeout(() => setIsCartBumping(false), 300);

    // Update cart state
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, selectedColor, quantity: 1 }];
    });

    // Trigger toast notification
    setActiveToast({
      id: String(Date.now()),
      product,
      selectedColor,
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleResetFilters = () => {
    setSelectedCategory("Deals in focus");
    setSearchQuery("");
    setSelectedSearchCategory("All Categories");
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      
      {/* Role Notification Banner if Authenticated */}
      {signedInRole && (
        <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-bold flex items-center justify-between shadow-xs">
          <div className="max-w-[1536px] mx-auto flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>
              Session Active: Authenticated as <strong className="uppercase underline">{signedInRole}</strong>.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAuthOpen(true)}
              className="text-emerald-100 hover:text-white text-xs underline font-medium"
            >
              Switch Account / Role
            </button>
            <button
              onClick={() => setSignedInRole(null)}
              className="text-white hover:text-emerald-100 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 px-2.5 py-1 rounded transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* SECTION 1: GLOBAL MARKETPLACE HEADER & TOP UTILITY BAR */}
      <Header
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLocation={() => setIsLocationOpen(true)}
        cartCount={totalCartCount}
        selectedLocation={selectedLocation}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedSearchCategory={selectedSearchCategory}
        onSearchCategoryChange={setSelectedSearchCategory}
        isCartBumping={isCartBumping}
        signedInRole={signedInRole}
        onSignOut={() => setSignedInRole(null)}
      />

      <main className="flex-1">
        
        {/* SECTION 2: HERO CAMPAIGN BANNER (FESTIVAL & BANK OFFERS) */}
        <HeroFestivalBanner
          onExploreDeals={() => {
            setSelectedCategory("Deals in focus");
            const dealsEl = document.getElementById("deals-section");
            if (dealsEl) {
              dealsEl.scrollIntoView({ behavior: "smooth" });
            }
          }}
        />

        {/* SECTION 3: INTERACTIVE HORIZONTAL CATEGORY PILL SELECTOR */}
        <CategoryPills
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            const dealsEl = document.getElementById("deals-section");
            if (dealsEl) {
              dealsEl.scrollIntoView({ behavior: "smooth" });
            }
          }}
        />

        {/* SECTION 4: DEALS IN FOCUS & FLASH SALES (AMAZON-STYLE 6-COL GRID) */}
        <ProductGrid
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          selectedSearchCategory={selectedSearchCategory}
          onAddToCart={handleAddToCart}
          onResetFilters={handleResetFilters}
        />

        {/* SECTION 6: PAYMENT, SECURITY & TRUST SHOWCASE (RAZORPAY INTEGRATION) */}
        <PaymentShowcase />

        {/* SECTION 7: VENDOR PARTNERSHIP CTA ("SELL ON SRIVISIONARY") */}
        <VendorCTA
          onRegisterVendor={() => {
            setIsAuthOpen(true);
          }}
        />

      </main>

      {/* SECTION 9: HIGH-DENSITY MARKETPLACE FOOTER (Includes SECTION 8 Admin Gateway Trigger) */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenVendorCTA={() => setIsAuthOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* SECTION 5: UNIFIED AUTHENTICATION GATEWAY (PHONE + OTP & GOOGLE MODAL) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccessRole={(role) => {
          setSignedInRole(role);
        }}
      />

      {/* SECTION 8: ADMIN ACCESS & SECURITY PORTAL MODAL */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onSuccessAdmin={() => {
          setSignedInRole("ADMIN");
        }}
      />

      {/* Interactive Location / Delivery Pincode Modal */}
      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        currentLocation={selectedLocation}
        onSelectLocation={setSelectedLocation}
      />

      {/* Sliding Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsAuthOpen(true);
        }}
      />

      {/* Instant Floating Toast Notification */}
      <ToastNotification
        toast={activeToast}
        onClose={() => setActiveToast(null)}
        onOpenCart={() => setIsCartOpen(true)}
      />

    </div>
  );
}
