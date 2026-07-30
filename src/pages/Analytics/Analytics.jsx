import { useContext } from "react";
import {
  HiOutlineChartPie,
  HiOutlineArrowTrendingUp,
  HiOutlineBanknotes,
  HiOutlineUsers,
  HiOutlineArrowDownTray,
} from "react-icons/hi2";
import { StoreContext } from "../../Context/StoreContext";
import StatCard from "../../components/StatCard/StatCard";
import { RevenueOverviewYTDChart, BudgetVsSpendBarChart } from "../../components/Charts/Charts";
import Button from "../../components/Button/Button";

export default function Analytics() {
  const { customers } = useContext(StoreContext);

  const topCustomers = [...customers].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5);

  return (
    <div className="space-y-8 pb-12 font-sans">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Executive Analytics & Reports
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Deep insights into business revenue velocity, margin metrics, and top spending accounts (₹ INR).
          </p>
        </div>

        <Button
          variant="outline"
          size="md"
          icon={HiOutlineArrowDownTray}
          className="bg-white dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700"
          onClick={() => alert("Downloading PDF Financial Report...")}
        >
          Export Financial Report (PDF)
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Gross Revenue (YTD)"
          value="₹21,36,500.00"
          change="+22.4%"
          trend="up"
          timeframe="vs 2025 FY"
          icon={HiOutlineBanknotes}
          badgeText="Annual Record"
          badgeType="emerald"
        />
        <StatCard
          title="Average Order Value"
          value="₹7,650.00"
          change="+5.2%"
          trend="up"
          timeframe="across 2,840 checkouts"
          icon={HiOutlineArrowTrendingUp}
          badgeText="Upward"
          badgeType="blue"
        />
        <StatCard
          title="Gross Profit Margin"
          value="48.2%"
          change="+3.1%"
          trend="up"
          timeframe="Operating cost ₹11.06L"
          icon={HiOutlineChartPie}
          badgeText="Healthy"
          badgeType="purple"
        />
        <StatCard
          title="Repeat Purchase Rate"
          value="68.4%"
          change="+8.0%"
          trend="up"
          timeframe="362 recurring clients"
          icon={HiOutlineUsers}
          badgeText="High Loyalty"
          badgeType="emerald"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Revenue & Expense Projection (₹)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">7-Month historical trend & 30-day forecast</p>
            </div>
          </div>
          <RevenueOverviewYTDChart height={320} />
        </div>

        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between transition-colors">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Departmental Budget vs. Spend</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Volume generated per product vertical</p>
          </div>
          <div className="my-4">
            <BudgetVsSpendBarChart height={260} />
          </div>
        </div>
      </div>

      {/* Top Customers Leaderboard */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Top Grossing Client Accounts</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Highest lifetime value customers</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="pb-3">Rank</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Company</th>
                <th className="pb-3 text-right">Orders</th>
                <th className="pb-3 text-right">Lifetime Spend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {topCustomers.map((cust, idx) => (
                <tr key={cust.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 font-extrabold text-blue-600 dark:text-blue-400">#{idx + 1}</td>
                  <td className="py-3 font-bold text-slate-900 dark:text-white">{cust.name}</td>
                  <td className="py-3 text-slate-600 dark:text-slate-300">{cust.business}</td>
                  <td className="py-3 text-right text-slate-600 dark:text-slate-400">{cust.ordersCount} checkouts</td>
                  <td className="py-3 text-right font-extrabold text-slate-900 dark:text-white">
                    ₹{cust.totalSpent.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
