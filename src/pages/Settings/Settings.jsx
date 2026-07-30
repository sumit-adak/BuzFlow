import { useState, useContext } from "react";
import {
  HiOutlineUser,
  HiOutlineCreditCard,
  HiOutlineCircleStack,
  HiOutlineShieldCheck,
  HiOutlineCheck,
  HiOutlineExclamationTriangle,
  HiOutlineSun,
  HiOutlineMoon,
} from "react-icons/hi2";
import { toast } from "react-toastify";
import { StoreContext } from "../../Context/StoreContext";
import Button from "../../components/Button/Button";

export default function Settings() {
  const { user, setUser, theme, setThemeMode } = useContext(StoreContext);
  const [activeTab, setActiveTab] = useState("profile");

  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
    businessName: user.businessName,
    role: user.role,
    currency: user.currency || "₹",
    timezone: user.timezone || "IST (UTC+5:30)",
  });

  const handleSave = (e) => {
    e.preventDefault();
    setUser({ ...user, ...profileForm });
    toast.success("Business settings saved successfully!");
  };

  const tabs = [
    { id: "profile", label: "Business Profile", icon: HiOutlineUser },
    { id: "billing", label: "Billing & Currency", icon: HiOutlineCreditCard },
    { id: "database", label: "Database & Backups", icon: HiOutlineCircleStack },
    { id: "security", label: "Team & Security", icon: HiOutlineShieldCheck },
  ];

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Business Settings
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage your merchant hub profile, currency (₹ INR), dark mode, database backups, and security preferences.
        </p>
      </div>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-1 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs h-fit transition-colors">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                  active
                    ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon className={`text-base ${active ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Pane */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
          {activeTab === "profile" && (
            <form onSubmit={handleSave} className="space-y-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                General Business Profile
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Store / Business Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.businessName}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, businessName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Account Owner Name
                    </label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, name: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Role / Designation
                    </label>
                    <input
                      type="text"
                      value={profileForm.role}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, role: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Theme Preference Mode
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setThemeMode("light")}
                      className={`p-3.5 rounded-xl border flex items-center justify-center gap-2 font-bold cursor-pointer transition-all ${
                        theme === "light"
                          ? "border-blue-600 bg-blue-50 text-blue-600 shadow-xs ring-2 ring-blue-500/20"
                          : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      <HiOutlineSun className="text-lg text-amber-500" />
                      <span>☀️ White Theme</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setThemeMode("dark")}
                      className={`p-3.5 rounded-xl border flex items-center justify-center gap-2 font-bold cursor-pointer transition-all ${
                        theme === "dark"
                          ? "border-blue-600 bg-blue-950/40 text-blue-400 shadow-xs ring-2 ring-blue-500/20"
                          : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      <HiOutlineMoon className="text-lg text-indigo-400" />
                      <span>🌙 Dark Theme</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <Button variant="primary" size="md" type="submit" icon={HiOutlineCheck}>
                  Save Profile Changes
                </Button>
              </div>
            </form>
          )}

          {activeTab === "billing" && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Currency & Financial Preferences
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Default Currency Symbol
                  </label>
                  <select
                    value={profileForm.currency}
                    onChange={(e) => {
                      setProfileForm({ ...profileForm, currency: e.target.value });
                      toast.info(`Default currency set to ${e.target.value}`);
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 font-bold"
                  >
                    <option value="₹">₹ INR - Indian Rupee (Default)</option>
                    <option value="$">$ USD - US Dollar</option>
                    <option value="€">€ EUR - Euro</option>
                    <option value="£">£ GBP - British Pound</option>
                  </select>
                </div>

                <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 text-blue-900 dark:text-blue-300 space-y-1">
                  <p className="font-bold">Current SaaS Subscription</p>
                  <p className="text-xs">Professional Merchant Plan (₹2,499/month)</p>
                  <p className="text-[11px] text-blue-700 dark:text-blue-400">Next renewal date: August 28, 2026</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "database" && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Database Backup & Export Tools
              </h3>

              <div className="space-y-4 text-xs">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Export all your store data, customer CRM records, and POS invoices in JSON or CSV format for local record keeping.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700"
                    onClick={() => toast.success("JSON Database Export downloaded!")}
                  >
                    Export Database (JSON)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700"
                    onClick={() => toast.success("Customer CRM CSV exported!")}
                  >
                    Export Customers (CSV)
                  </Button>
                </div>

                <div className="pt-6 border-t border-red-100 dark:border-red-950 space-y-2">
                  <span className="text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1">
                    <HiOutlineExclamationTriangle /> Danger Zone
                  </span>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Reset all local cart state, tasks, and recent sales telemetry back to initial default state.
                  </p>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to reset workspace cache?")) {
                        window.location.reload();
                      }
                    }}
                  >
                    Reset Workspace Cache
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Team Access & Security
              </h3>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Two-Factor Authentication (2FA)</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Encrypted OTP authentication for owner sign-in</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    Enabled
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
