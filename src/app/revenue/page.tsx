"use client";

import { useState, useEffect } from "react";

const PRICE_MAP: Record<string, number> = {
  "Brötchen": 0.5,
  "Croissant": 1.8,
  "Kaiserbrötchen": 0.6,
  "Baguette": 2.5,
  "Laugenbrötchen": 0.7,
};

export default function RevenuePage() {
  const [sales, setSales] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/sales")
      .then(r => r.json())
      .then(data => { setSales(Array.isArray(data) ? data : []); setLoading(false); });
  }, []);

  const getPrice = (name: string) => PRICE_MAP[name] ?? 1.0;

  const totalRevenue = sales.reduce((sum, s) => sum + s.quantity * getPrice(s.product?.name), 0);
  const todayRevenue = sales
    .filter(s => s.date?.slice(0, 10) === new Date().toISOString().slice(0, 10))
    .reduce((sum, s) => sum + s.quantity * getPrice(s.product?.name), 0);

  // Group by product
  const byProduct = sales.reduce((acc: Record<string, { qty: number; revenue: number }>, s) => {
    const name = s.product?.name || "Unknown";
    if (!acc[name]) acc[name] = { qty: 0, revenue: 0 };
    acc[name].qty += s.quantity;
    acc[name].revenue += s.quantity * getPrice(name);
    return acc;
  }, {});

  // Group by date (last 7)
  const byDate = sales.reduce((acc: Record<string, number>, s) => {
    const d = s.date?.slice(0, 10) || "";
    acc[d] = (acc[d] || 0) + s.quantity * getPrice(s.product?.name);
    return acc;
  }, {});
  const last7 = Object.entries(byDate).sort((a, b) => a[0].localeCompare(b[0])).slice(-7);
  const maxRev = Math.max(...last7.map(([, v]) => v), 1);

  const fmt = (n: number) => `€${n.toFixed(2)}`;

  return (
    <div className="min-h-full bg-[#f7f7f8]">
      <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Revenue</h1>
          <p className="text-sm text-gray-400 mt-0.5">Estimated earnings from sales</p>
        </div>
        <div className="text-sm text-gray-400">{new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</div>
      </div>

      <div className="px-8 py-6 space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Revenue", value: fmt(totalRevenue), icon: "💶" },
            { label: "Today's Revenue", value: fmt(todayRevenue), icon: "📈" },
            { label: "Total Sales", value: sales.length, icon: "🧾" },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 uppercase tracking-wide">{label}</span>
                <span>{icon}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Bar chart */}
          <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-5">Revenue — Last 7 Days</h2>
            {last7.length === 0 ? (
              <div className="h-36 flex items-center justify-center text-sm text-gray-400">No data yet</div>
            ) : (
              <div className="flex items-end gap-3 h-36">
                {last7.map(([date, rev]) => (
                  <div key={date} className="flex-1 flex flex-col items-center gap-1.5">
                    <span className="text-xs text-gray-400">{fmt(rev)}</span>
                    <div
                      className="w-full bg-[#0f1117] rounded-t-md transition-all"
                      style={{ height: `${(rev / maxRev) * 100}%`, minHeight: "4px" }}
                    />
                    <span className="text-xs text-gray-400">
                      {new Date(date).toLocaleDateString("en-GB", { weekday: "short" })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* By product */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">By Product</h2>
            {Object.keys(byProduct).length === 0 ? (
              <div className="text-sm text-gray-400 text-center py-8">No data yet</div>
            ) : (
              <div className="space-y-3">
                {Object.entries(byProduct)
                  .sort((a, b) => b[1].revenue - a[1].revenue)
                  .map(([name, { qty, revenue }]) => (
                    <div key={name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700 truncate">{name}</span>
                        <span className="text-sm font-mono text-gray-900">{fmt(revenue)}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#0f1117] rounded-full"
                          style={{ width: `${(revenue / totalRevenue) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{qty} units × {fmt(getPrice(name))}</p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Note */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl px-5 py-3 text-sm text-amber-700">
          💡 Revenue is estimated using default prices per product. You can configure actual prices in Settings.
        </div>
      </div>
    </div>
  );
}