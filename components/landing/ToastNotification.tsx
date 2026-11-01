"use client";

import React, { useEffect } from "react";
import { CheckCircle2, X, ShoppingCart } from "lucide-react";
import { Product } from "@/lib/mockData";

export interface ToastData {
  id: string;
  product: Product;
  selectedColor?: string;
}

interface ToastNotificationProps {
  toast: ToastData | null;
  onClose: () => void;
  onOpenCart: () => void;
}

export default function ToastNotification({
  toast,
  onClose,
  onOpenCart,
}: ToastNotificationProps) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
          <CheckCircle2 className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Added to Cart
            </span>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h4 className="text-xs font-semibold text-slate-900 truncate mt-0.5">
            {toast.product.title}
          </h4>

          {toast.selectedColor && (
            <span className="text-[10px] text-slate-500 font-medium">
              Variant: {toast.selectedColor}
            </span>
          )}

          <div className="mt-2.5 flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenCart();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>View Cart & Checkout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
