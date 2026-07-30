import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  HiOutlineSquares2X2,
  HiOutlineChartBar,
  HiOutlineDocumentText,
  HiOutlineCreditCard,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { StoreContext } from "../../Context/StoreContext";

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const location = useLocation();
  const { user } = useContext(StoreContext);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: HiOutlineSquares2X2 },
    { name: "Analytics", path: "/analytics", icon: HiOutlineChartBar },
    { name: "Invoices", path: "/sales", icon: HiOutlineDocumentText },
    { name: "Expenses", path: "/tasks", icon: HiOutlineCreditCard },
    { name: "Team", path: "/customers", icon: HiOutlineUsers },
    { name: "AI Assistant", path: "/ai", icon: HiOutlineSparkles },
    { name: "Settings", path: "/settings", icon: HiOutlineCog6Tooth },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-[#0F172A] text-white border-r border-slate-800 transition-all duration-300 ease-in-out ${
          collapsed ? "w-20" : "w-60"
        } ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-5 border-b border-slate-800/80">
          <NavLink to="/dashboard" className="flex items-center gap-3 overflow-hidden">
            <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shrink-0">
              <span
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                insights
              </span>
            </div>
            {!collapsed && (
              <span className="font-extrabold text-white text-xl tracking-tight">
                BizFlow
              </span>
            )}
          </NavLink>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center h-7 w-7 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {collapsed ? <HiOutlineChevronRight /> : <HiOutlineChevronLeft />}
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-3 py-6 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`relative flex items-center gap-3.5 px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-150 group ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold shadow-sm"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
                }`}
                title={collapsed ? item.name : undefined}
              >
                <Icon className={`text-lg shrink-0 ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`} />
                {!collapsed && <span className="truncate">{item.name}</span>}
              </NavLink>
            );
          })}
        </div>

        {/* User Card */}
        <div className="p-3 border-t border-slate-800/80">
          <NavLink
            to="/settings"
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/60 transition-colors"
          >
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
              alt="Avatar"
              className="h-8 w-8 rounded-full object-cover ring-2 ring-blue-500/40 shrink-0"
            />
            {!collapsed && (
              <div className="flex flex-col truncate">
                <span className="text-xs font-bold text-white truncate">
                  {user?.name || "Alex Morgan"}
                </span>
                <span className="text-[11px] text-slate-400 truncate">
                  {user?.role || "Owner"}
                </span>
              </div>
            )}
          </NavLink>
        </div>
      </aside>
    </>
  );
}
