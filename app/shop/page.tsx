"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import ProductCard, { CatalogProduct } from "@/components/catalog/ProductCard";
import ProductFilters, { FilterState } from "@/components/catalog/ProductFilters";
import CartDrawer, { CartItem } from "@/components/landing/CartDrawer";
import AuthModal from "@/components/landing/AuthModal";
import LocationModal from "@/components/landing/LocationModal";
import ToastNotification, { ToastData } from "@/components/landing/ToastNotification";
import { MOCK_PRODUCTS, Product } from "@/lib/mockData";
import { SlidersHorizontal, ArrowUpDown, ChevronDown, CheckCircle } from "lucide-react";

export default function ShopPage() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [brands, setBrands] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter and search state
  const [filters, setFilters] = useState<FilterState>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState("relevance");
  const [totalCount, setTotalCount] = useState(0);

  // Cart & UI State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Hyderabad 500084");
  const [signedInRole, setSignedInRole] = useState<string | null>(null);
  const [activeToast, setActiveToast] = useState<ToastData | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Fetch categories & brands
  useEffect(() => {
    async function loadMeta() {
      try {
        const catRes = await fetch("http://localhost:8000/api/v1/categories");
        if (catRes.ok) {
          const cats = await catRes.json();
          setCategories(cats);
        }
        const brandRes = await fetch("http://localhost:8000/api/v1/categories/brands");
        if (brandRes.ok) {
          const b = await brandRes.json();
          setBrands(b);
        }
      } catch {
        // Fallback categories
        setCategories([
          { id: "1", name: "Mobiles & Accessories", slug: "mobiles-accessories" },
          { id: "2", name: "Laptops & Computers", slug: "laptops-computers" },
          { id: "3", name: "Headphones & Audio", slug: "headphones-audio" },
          { id: "4", name: "Smart Watches", slug: "smart-watches" },
          { id: "5", name: "Smart TVs & Appliances", slug: "smart-tvs-appliances" },
          { id: "6", name: "Home & Kitchen", slug: "home-kitchen" },
        ]);
        setBrands([
          { id: "1", name: "Apple", slug: "apple" },
          { id: "2", name: "Samsung", slug: "samsung" },
          { id: "3", name: "OnePlus", slug: "oneplus" },
          { id: "4", name: "Sony", slug: "sony" },
          { id: "5", name: "Noise", slug: "noise" },
        ]);
      }
    }
    loadMeta();
  }, []);

  // Fetch products with dynamic filters
  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.append("query", searchQuery);
        if (filters.category) params.append("category", filters.category);
        if (filters.brand) params.append("brand", filters.brand);
        if (filters.minPrice) params.append("min_price", String(filters.minPrice));
        if (filters.maxPrice) params.append("max_price", String(filters.maxPrice));
        if (filters.minRating) params.append("min_rating", String(filters.minRating));
        if (selectedSort) params.append("sort", selectedSort);

        const res = await fetch(`http://localhost:8000/api/v1/products?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data.items || []);
          setTotalCount(data.total || 0);
        } else {
          fallbackMock();
        }
      } catch {
        fallbackMock();
      } finally {
        setIsLoading(false);
      }
    }

    function fallbackMock() {
      let filtered = [...MOCK_PRODUCTS];
      if (filters.category) {
        filtered = filtered.filter((p) => p.category.toLowerCase().includes(filters.category!.toLowerCase()));
      }
      if (searchQuery) {
        filtered = filtered.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
      }
      setProducts(filtered);
      setTotalCount(filtered.length);
    }

    fetchProducts();
  }, [filters, searchQuery, selectedSort]);

  const handleAddToCart = (product: CatalogProduct, variant?: any) => {
    const priceToUse = variant?.selling_price || product.selling_price || product.price || 0;
    const mrpToUse = product.mrp || priceToUse;
    const img = variant?.variant_image || product.featured_image || (product as any).variants?.[0]?.image || "";

    const fullProduct: Product = {
      id: product.id,
      slug: product.slug || "product",
      category: (product as any).categories?.name || product.category || "General",
      title: product.name || product.title || "",
      discountBadge: product.discount_percentage ? `${product.discount_percentage}% off` : (product.discountBadge || ""),
      rating: product.avg_rating || product.rating || 4.5,
      ratingCount: product.review_count || product.ratingCount || 100,
      socialProof: "Popular choice",
      price: priceToUse,
      mrp: mrpToUse,
      cardOffer: "Bank discounts applicable",
      deliveryDate: "Tomorrow",
      fastestDelivery: "Today evening",
      variants: [
        {
          colorName: variant?.color_name || "Standard",
          colorHex: variant?.color_hex || "#1E293B",
          image: img,
        },
      ],
    };

    const itemToAdd: CartItem = {
      product: fullProduct,
      selectedColor: variant?.color_name,
      quantity: 1,
    };

    setCartItems((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += 1;
        return updated;
      }
      return [...prev, itemToAdd];
    });

    setActiveToast({
      id: String(Date.now()),
      product: fullProduct,
      selectedColor: variant?.color_name,
    });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedSearchCategory="All Categories"
        onSearchCategoryChange={() => {}}
        signedInRole={signedInRole}
        onSignOut={() => setSignedInRole(null)}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-[1536px] w-full mx-auto px-4 sm:px-6 py-6">
        
        {/* Results Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              {filters.category ? categories.find(c => c.slug === filters.category)?.name || "Category Results" : "All Products"}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing 1-{products.length} of {totalCount} results {searchQuery && `for "${searchQuery}"`}
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold bg-white text-slate-700"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-500 font-medium hidden sm:inline">Sort by:</label>
              <div className="relative">
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="text-xs font-bold px-3 py-2 bg-white border border-slate-300 rounded-lg shadow-2xs appearance-none pr-8 cursor-pointer focus:border-amber-500 outline-none"
                >
                  <option value="relevance">Featured & Relevance</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Avg. Customer Review</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="discount">Highest Discount</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout: Sidebar + Grid */}
        <div className="flex gap-6 mt-6">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <ProductFilters
              categories={categories}
              brands={brands}
              filters={filters}
              onFilterChange={setFilters}
              onReset={() => setFilters({})}
            />
          </aside>

          {/* Mobile Filter Modal */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 lg:hidden flex justify-end">
              <div className="w-80 h-full bg-white p-4 overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b mb-4">
                  <h3 className="font-bold text-sm">Filter Catalog</h3>
                  <button onClick={() => setShowMobileFilters(false)} className="text-xs font-bold text-red-600">
                    Close
                  </button>
                </div>
                <ProductFilters
                  categories={categories}
                  brands={brands}
                  filters={filters}
                  onFilterChange={(f) => {
                    setFilters(f);
                    setShowMobileFilters(false);
                  }}
                  onReset={() => {
                    setFilters({});
                    setShowMobileFilters(false);
                  }}
                />
              </div>
            </div>
          )}

          {/* Product Grid Area */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-96 rounded-xl bg-slate-200 animate-pulse" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-slate-300">
                <p className="text-base font-bold text-slate-800">No products found matching your filters</p>
                <p className="text-xs text-slate-500 mt-1">Try clearing some filters or searching for something else</p>
                <button
                  onClick={() => {
                    setFilters({});
                    setSearchQuery("");
                  }}
                  className="mt-4 px-4 py-2 bg-[#FFD814] font-bold text-xs rounded-lg hover:bg-[#F7CA00]"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

        </div>

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
