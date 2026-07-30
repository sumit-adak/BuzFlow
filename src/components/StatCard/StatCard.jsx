import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";

export default function StatCard({
  title,
  value,
  change,
  trend = "up",
  timeframe = "vs last month",
  icon: Icon,
  badgeText,
  badgeType = "blue",
}) {
  const isUp = trend === "up";

  const badgeStyles = {
    blue: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800",
    emerald: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-800",
    amber: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-800",
    purple: "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-100 dark:border-purple-800",
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm font-sans">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        {Icon && (
          <div className="p-2 rounded-lg bg-slate-100/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <Icon className="text-lg" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {value}
        </h3>
        {badgeText && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
              badgeStyles[badgeType] || badgeStyles.blue
            }`}
          >
            {badgeText}
          </span>
        )}
      </div>

      {(change !== undefined || timeframe) && (
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          {change !== undefined && (
            <span
              className={`inline-flex items-center gap-0.5 font-medium px-1.5 py-0.5 rounded-md ${
                isUp
                  ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300"
                  : "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300"
              }`}
            >
              {isUp ? (
                <HiTrendingUp className="text-xs" />
              ) : (
                <HiTrendingDown className="text-xs" />
              )}
              {change}
            </span>
          )}
          <span className="text-slate-400 dark:text-slate-500 font-normal">{timeframe}</span>
        </div>
      )}
    </div>
  );
}
