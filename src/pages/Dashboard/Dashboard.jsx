import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineBanknotes,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineExclamationTriangle,
  HiOutlinePlus,
  HiOutlineSparkles,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import { StoreContext } from "../../Context/StoreContext";
import StatCard from "../../components/StatCard/StatCard";
import { RevenueOverviewYTDChart, BudgetVsSpendBarChart } from "../../components/Charts/Charts";
import Button from "../../components/Button/Button";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, recentSales, tasks } = useContext(StoreContext);

  const pendingTasks = tasks.filter((t) => t.status !== "completed");

  return (
    <div className="space-y-8 pb-10 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Smart Operating Hub
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
            Good afternoon, {user?.name?.split(" ")[0] || "Alex"} 👋
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Here is what's happening with <span className="font-semibold text-slate-700 dark:text-slate-200">{user?.businessName}</span> today.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="primary"
            size="sm"
            icon={HiOutlineShoppingCart}
            onClick={() => navigate("/sales")}
          >
            New POS Sale
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={HiOutlinePlus}
            className="dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700"
            onClick={() => navigate("/customers")}
          >
            Add Customer
          </Button>
          <Button
            variant="subtle"
            size="sm"
            icon={HiOutlineSparkles}
            onClick={() => navigate("/ai")}
          >
            Ask AI
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid (Using ₹ Indian Rupee) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Monthly Revenue"
          value="₹4,28,500.00"
          change="+18.4%"
          trend="up"
          timeframe="vs June 2026"
          icon={HiOutlineBanknotes}
          badgeText="Target Hit"
          badgeType="emerald"
        />
        <StatCard
          title="POS Sales Orders"
          value="560 Orders"
          change="+12.2%"
          trend="up"
          timeframe="Avg ₹7,650/order"
          icon={HiOutlineShoppingCart}
          badgeText="Live"
          badgeType="blue"
        />
        <StatCard
          title="Active CRM Accounts"
          value="528 Clients"
          change="+8.1%"
          trend="up"
          timeframe="12 added this month"
          icon={HiOutlineUsers}
          badgeText="Healthy"
          badgeType="purple"
        />
        <StatCard
          title="Outstanding Dues"
          value="₹46,000.00"
          change="-4.5%"
          trend="down"
          timeframe="2 clients pending"
          icon={HiOutlineExclamationTriangle}
          badgeText="Attention"
          badgeType="amber"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Revenue Trend Area Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Revenue vs Operating Costs (₹)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">2026 Year-to-date monthly financial performance</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-600" /> Revenue
              </span>
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-400" /> Expenses
              </span>
            </div>
          </div>
          <RevenueOverviewYTDChart height={310} />
        </div>

        {/* Right: Department Spend Bar Chart */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between transition-colors">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Budget vs. Spend</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Departmental operating budget breakdown</p>
          </div>
          <div className="my-4">
            <BudgetVsSpendBarChart height={240} />
          </div>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Top Segment: <strong>Marketing (35%)</strong></span>
            <Link to="/analytics" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1">
              Full Breakdown <HiOutlineArrowRight />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Transactions & Priority Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Transactions Table */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent POS Transactions</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Real-time checkout history (INR)</p>
            </div>
            <Link to="/sales" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              Open POS →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="pb-3">Invoice</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Payment</th>
                  <th className="pb-3 text-right">Amount</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {recentSales.slice(0, 5).map((sale) => (
                  <tr key={sale.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 font-semibold text-slate-900 dark:text-white">{sale.id}</td>
                    <td className="py-3 text-slate-700 dark:text-slate-300">{sale.customer}</td>
                    <td className="py-3 text-slate-500 dark:text-slate-400">{sale.method}</td>
                    <td className="py-3 text-right font-bold text-slate-900 dark:text-white">
                      ₹{sale.amount.toFixed(2)}
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          sale.status === "Paid"
                            ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                            : "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                        }`}
                      >
                        {sale.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Priority Tasks List */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Priority Store Tasks</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{pendingTasks.length} pending operational actions</p>
              </div>
              <Link to="/tasks" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                View Kanban Board →
              </Link>
            </div>

            <div className="space-y-3">
              {pendingTasks.slice(0, 4).map((task) => (
                <div
                  key={task.id}
                  className="p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors flex items-start gap-3"
                >
                  <div className="mt-0.5 p-1 rounded bg-white dark:bg-slate-700 text-slate-400 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                    <HiOutlineCheckCircle className="text-sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{task.title}</p>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          task.priority === "High"
                            ? "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-100 dark:border-red-800"
                            : "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      <span>Due: {task.dueDate}</span>
                      <span>•</span>
                      <span>{task.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 dark:border-slate-700"
              onClick={() => navigate("/tasks")}
            >
              + Add Operational Task
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
