import { Link } from "react-router-dom";
import { HiOutlineBuildingStorefront, HiCheckCircle } from "react-icons/hi2";

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Column: Auth Form */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5 mb-8">
              <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-xs">
                <HiOutlineBuildingStorefront className="text-2xl" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                BizFlow
              </span>
            </Link>

            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {title}
              </h2>
              {subtitle && (
                <p className="text-sm text-slate-500 mt-2">{subtitle}</p>
              )}
            </div>

            {children}
          </div>

          <div className="mt-8 text-center sm:text-left text-xs text-slate-400">
            © 2026 BizFlow SaaS Inc. All rights reserved. Built for modern merchants.
          </div>
        </div>

        {/* Right Column: SaaS Showcase */}
        <div className="hidden lg:flex lg:col-span-6 bg-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-xs font-semibold text-blue-400 mb-6">
              ⚡ Smart Business Operating System
            </span>
            <h3 className="text-3xl font-extrabold leading-tight tracking-tight text-white mb-4">
              Everything your local business needs in one sleek dashboard.
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Join 12,000+ grocery stores, pharmacies, restaurants, and retail shops processing millions in sales effortlessly.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Instant POS & Digital Thermal Billing",
                "Automated Customer CRM & Lifetime Analytics",
                "AI-Powered Profit & Stock Optimization",
              ].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs font-medium text-slate-300">
                  <HiCheckCircle className="text-blue-400 text-lg shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Testimonial"
                className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500/40"
              />
              <div>
                <p className="text-xs font-semibold text-white">
                  "BizFlow cut our daily inventory & checkout time by 60%."
                </p>
                <p className="text-[11px] text-slate-400">
                  Sophia Chen — Founder, Artisan Cafe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
