"use client";

import React, { useState } from "react";
import { ShieldCheck, Lock, CreditCard, Smartphone, Building, Banknote, CheckCircle, Sparkles, ArrowRight } from "lucide-react";

export default function PaymentShowcase() {
  const [demoAmount, setDemoAmount] = useState(1499);
  const [selectedMethod, setSelectedMethod] = useState<"UPI" | "CARD" | "NETBANKING" | "COD">("UPI");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState<"idle" | "processing" | "success">("idle");
  const [orderId, setOrderId] = useState("SVM-2026-48291");

  const runPaymentSimulator = () => {
    setIsSimulating(true);
    setSimulationStep("processing");
    setOrderId(`SVM-2026-${Math.floor(10000 + Math.random() * 90000)}`);

    setTimeout(() => {
      setSimulationStep("success");
      setIsSimulating(false);
      setTimeout(() => {
        setSimulationStep("idle");
      }, 3500);
    }, 1500);
  };

  return (
    <section className="w-full bg-white py-12 px-3 sm:px-6 border-b border-slate-200">
      <div className="max-w-[1536px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>ENTERPRISE GRADE PAYMENT SECURITY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            100% Secure Checkout Powered by Razorpay
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Every transaction is safeguarded by 256-bit AES encryption, PCI-DSS Level 1 compliance, and instant bank reconciliation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Supported Payment Rails & Badges */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Payment Methods Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              
              {/* UPI */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition-all flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-lg bg-white shadow-xs border border-slate-200 flex items-center justify-center text-indigo-600 mb-2">
                  <Smartphone className="w-5 h-5" />
                </div>
                <span className="text-xs font-extrabold text-slate-900">Instant UPI</span>
                <span className="text-[10px] text-slate-500 mt-0.5">GPay, PhonePe, Paytm, BHIM</span>
              </div>

              {/* Cards */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition-all flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-lg bg-white shadow-xs border border-slate-200 flex items-center justify-center text-blue-600 mb-2">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="text-xs font-extrabold text-slate-900">Cards & EMI</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Visa, Mastercard, RuPay</span>
              </div>

              {/* Net Banking */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition-all flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-lg bg-white shadow-xs border border-slate-200 flex items-center justify-center text-emerald-600 mb-2">
                  <Building className="w-5 h-5" />
                </div>
                <span className="text-xs font-extrabold text-slate-900">Net Banking</span>
                <span className="text-[10px] text-slate-500 mt-0.5">50+ Major Indian Banks</span>
              </div>

              {/* Pay on Delivery */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition-all flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-lg bg-white shadow-xs border border-slate-200 flex items-center justify-center text-amber-600 mb-2">
                  <Banknote className="w-5 h-5" />
                </div>
                <span className="text-xs font-extrabold text-slate-900">Pay on Delivery</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Cash / UPI QR at Doorstep</span>
              </div>

            </div>

            {/* Certifications Strip */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-[#1E293B] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F59E0B] text-slate-950 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold tracking-tight">
                    PCI-DSS Level 1 & 256-Bit SSL Encryption
                  </h4>
                  <p className="text-[11px] text-slate-300">
                    Highest global security certification for payment processing
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-slate-800 text-[10px] font-bold tracking-wider uppercase border border-slate-700 text-amber-400">
                  Verified Partner
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-800 text-[10px] font-bold tracking-wider uppercase border border-slate-700 text-emerald-400">
                  Razorpay Live
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Payment Simulator Widget */}
          <div className="lg:col-span-5">
            <div className="bg-[#F8FAFC] rounded-2xl border border-slate-300 shadow-md p-5 sm:p-6 relative">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    Interactive Payment Simulator
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-[#92400E] font-bold">
                  Test Mode Sandbox
                </span>
              </div>

              {simulationStep === "idle" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Simulated Order Amount
                    </label>
                    <div className="flex items-center gap-2">
                      {[499, 1499, 4999].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setDemoAmount(amt)}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                            demoAmount === amt
                              ? "bg-[#0F172A] text-white border-[#0F172A]"
                              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Choose Payment Rail
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["UPI", "CARD", "NETBANKING", "COD"] as const).map((method) => (
                        <button
                          key={method}
                          onClick={() => setSelectedMethod(method)}
                          className={`py-2 px-3 rounded-lg text-xs font-bold border text-left flex items-center justify-between transition-all ${
                            selectedMethod === method
                              ? "bg-amber-50 text-[#92400E] border-amber-400"
                              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <span>{method === "UPI" ? "⚡ UPI Instant" : method === "CARD" ? "💳 Debit/Credit" : method === "NETBANKING" ? "🏦 Net Banking" : "💵 Cash on Delivery"}</span>
                          {selectedMethod === method && <CheckCircle className="w-3.5 h-3.5 text-amber-600" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={runPaymentSimulator}
                    disabled={isSimulating}
                    className="w-full py-3 px-4 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-black text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                  >
                    <span>Simulate Razorpay Payment (₹{demoAmount})</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              )}

              {simulationStep === "processing" && (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full border-4 border-amber-400 border-t-transparent animate-spin mx-auto" />
                  <h4 className="text-sm font-extrabold text-slate-900">
                    Routing to Secure Razorpay Gateway...
                  </h4>
                  <p className="text-xs text-slate-500">
                    Simulating 3D Secure OTP authentication & webhook capture
                  </p>
                </div>
              )}

              {simulationStep === "success" && (
                <div className="py-6 text-center space-y-2 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600 text-white">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-extrabold text-emerald-950">
                    Payment Simulator Verified!
                  </h4>
                  <p className="text-xs text-emerald-800">
                    Order ID: <strong>{orderId}</strong>
                  </p>
                  <span className="inline-block text-[10px] text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full font-semibold">
                    Amount: ₹{demoAmount} • Method: {selectedMethod}
                  </span>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
