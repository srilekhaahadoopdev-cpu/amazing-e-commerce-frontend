"use client";

import React from "react";
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Plus, Minus } from "lucide-react";
import { Product } from "@/lib/mockData";

export interface CartItem {
  product: Product;
  selectedColor?: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const formatINR = (amt: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#0F172A] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#F59E0B]" />
            <h3 className="font-extrabold text-sm sm:text-base">
              Your Shopping Cart ({items.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="bg-emerald-50 px-4 py-2 border-b border-emerald-100 flex items-center gap-2 text-xs text-emerald-800 font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Your order qualifies for FREE Express Delivery!</span>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 text-base">Your Cart is empty</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explore our festive deals and add items to your cart to enjoy bank offers and fast delivery.
              </p>
              <button
                onClick={onClose}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0F172A] text-white text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 p-3 rounded-xl border border-slate-200 bg-[#F8FAFC] hover:border-slate-300 transition-all"
              >
                <img
                  src={item.product.variants[0]?.image || ""}
                  alt={item.product.title}
                  className="w-16 h-16 object-contain rounded-lg bg-white p-1 border border-slate-200 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {item.product.title}
                  </h4>
                  {item.selectedColor && (
                    <span className="text-[10px] text-slate-500 font-medium block">
                      Color: {item.selectedColor}
                    </span>
                  )}
                  <div className="text-xs font-black text-slate-900 mt-1 tabular-nums">
                    {formatINR(item.product.price)}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 hover:bg-slate-100 text-slate-600 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-slate-800 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 hover:bg-slate-100 text-slate-600 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Subtotal & Checkout */}
        {items.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 font-semibold">Subtotal:</span>
              <span className="text-lg font-black text-slate-950 tabular-nums">
                {formatINR(subtotal)}
              </span>
            </div>

            <p className="text-[11px] text-slate-500">
              Taxes and delivery calculated at checkout with Razorpay.
            </p>

            <button
              onClick={onCheckout}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#FF7A00] hover:from-[#D97706] hover:to-[#EA580C] text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <span>Proceed to Buy ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
