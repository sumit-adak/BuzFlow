import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// YTD Revenue Overview Data matching Indian Rupee scale (in thousands)
const YTD_DATA = [
  { month: "Jan", revenue: 140000, expenses: 85000 },
  { month: "Feb", revenue: 240000, expenses: 110000 },
  { month: "Mar", revenue: 190000, expenses: 95000 },
  { month: "Apr", revenue: 280000, expenses: 130000 },
  { month: "May", revenue: 325000, expenses: 145000 },
  { month: "Jun", revenue: 420000, expenses: 180000 },
  { month: "Jul", revenue: 428500, expenses: 190000 },
];

// Budget vs Actual Spend Data in INR (in thousands)
const SPEND_DATA = [
  { dept: "Marketing", budget: 320, actual: 280 },
  { dept: "Engineering", budget: 360, actual: 295 },
  { dept: "Sales", budget: 420, actual: 310 },
  { dept: "Operations", budget: 380, actual: 270 },
  { dept: "IT", budget: 290, actual: 240 },
  { dept: "Transport", budget: 260, actual: 210 },
];

// Sparkline datasets
const BLUE_SPARKLINE = [{ v: 20 }, { v: 35 }, { v: 25 }, { v: 45 }, { v: 30 }, { v: 50 }, { v: 65 }];
const GREEN_SPARKLINE = [{ v: 15 }, { v: 25 }, { v: 20 }, { v: 38 }, { v: 30 }, { v: 42 }, { v: 58 }];
const RED_SPARKLINE = [{ v: 40 }, { v: 30 }, { v: 45 }, { v: 35 }, { v: 50 }, { v: 42 }, { v: 60 }];
const GREY_SPARKLINE = [{ v: 30 }, { v: 28 }, { v: 35 }, { v: 32 }, { v: 38 }, { v: 34 }, { v: 40 }];

export function RevenueOverviewYTDChart({ height = 280 }) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={YTD_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
          <defs>
            <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#2563EB" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="expensesGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#94A3B8" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 11 }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748B", fontSize: 11 }}
            tickFormatter={(val) => `₹${val / 1000}k`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-slate-900 text-white text-xs p-2.5 rounded-lg shadow-lg border border-slate-700 font-sans">
                    <p className="text-[10px] text-slate-400 font-medium">{payload[0].name}</p>
                    <p className="font-bold text-sm text-white">₹{payload[0].value.toLocaleString()}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            name="Gross Revenue"
            stroke="#2563EB"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#blueGrad)"
          />
          <Area
            type="monotone"
            dataKey="expenses"
            name="Expenses"
            stroke="#94A3B8"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            fillOpacity={1}
            fill="url(#expensesGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BudgetVsSpendBarChart({ height = 250 }) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={SPEND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
          <XAxis dataKey="dept" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 11 }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748B", fontSize: 11 }}
            tickFormatter={(val) => `₹${val}k`}
          />
          <Tooltip />
          <Bar dataKey="budget" name="Budget" fill="#0F172A" radius={[4, 4, 0, 0]} barSize={16} />
          <Bar dataKey="actual" name="Actual" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MiniSparkline({ color = "#2563EB", type = "blue" }) {
  const sparkData =
    type === "green"
      ? GREEN_SPARKLINE
      : type === "red"
      ? RED_SPARKLINE
      : type === "grey"
      ? GREY_SPARKLINE
      : BLUE_SPARKLINE;

  return (
    <div className="w-24 h-10">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={sparkData}>
          <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill="none" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function Charts({ type = "ytd", ...props }) {
  if (type === "budget") return <BudgetVsSpendBarChart {...props} />;
  return <RevenueOverviewYTDChart {...props} />;
}
