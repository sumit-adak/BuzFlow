import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-16 text-slate-600 dark:text-slate-400 font-sans transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
        <div className="col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-blue-600 text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              insights
            </span>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              BizFlow
            </span>
          </Link>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
            The high-performance business operating system for modern retail and service industry leaders.
          </p>
        </div>

        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Product
          </h5>
          <ul className="space-y-2 text-xs">
            <li><Link className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" to="/dashboard">Features</Link></li>
            <li><a className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#pricing">Pricing</a></li>
            <li><Link className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" to="/settings">Security</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Company
          </h5>
          <ul className="space-y-2 text-xs">
            <li><a className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#about">About</a></li>
            <li><a className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#careers">Careers</a></li>
            <li><a className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Legal
          </h5>
          <ul className="space-y-2 text-xs">
            <li><a className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#privacy">Privacy</a></li>
            <li><a className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#terms">Terms</a></li>
            <li><a className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#cookies">Cookie Policy</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Newsletter
          </h5>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-1.5">
            <input
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
              placeholder="Email address"
              type="email"
            />
            <button className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 mt-12 pt-8 border-t border-slate-200/60 dark:border-slate-800 text-center">
        <p className="text-xs text-slate-400 dark:text-slate-500">© 2026 BizFlow OS. All rights reserved.</p>
      </div>
    </footer>
  );
}
