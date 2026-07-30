import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

export default function Navbar() {
  const { theme, setThemeMode } = useContext(StoreContext);

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
            <span
              className="material-symbols-outlined text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              insights
            </span>
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-[#0d1c2e] dark:text-white">
            BizFlow
          </span>
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <a className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#features">
            Features
          </a>
          <Link className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" to="/sales">
            POS Billing
          </Link>
          <Link className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" to="/ai">
            AI Assistant
          </Link>
          <a className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#pricing">
            Pricing
          </a>
        </nav>

        {/* Action Buttons & Theme Switcher */}
        <div className="flex items-center gap-3">
          {/* Dual Segmented Theme Selector Buttons */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setThemeMode("light")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                theme === "light"
                  ? "bg-white text-slate-900 shadow-xs ring-1 ring-slate-300"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
              title="Switch entire site to White Theme"
            >
              <span>☀️</span>
              <span className="hidden sm:inline">White Mode</span>
            </button>
            <button
              onClick={() => setThemeMode("dark")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                theme === "dark"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
              title="Switch entire site to Dark Mode"
            >
              <span>🌙</span>
              <span className="hidden sm:inline">Dark Mode</span>
            </button>
          </div>

          <Link
            to="/login"
            className="text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 px-2 py-2 rounded-lg transition-colors"
          >
            Log in
          </Link>

          <Link
            to="/dashboard"
            className="bg-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md hover:bg-blue-700 active:scale-95 transition-all"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
