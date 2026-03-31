"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

const statCards = [
  { label: "Total Revenue", value: "€0", sub: "No data yet", icon: "💶" },
  { label: "Sales Today", value: "0", sub: "No sales recorded", icon: "🧾" },
  { label: "Products", value: "5", sub: "Demo products loaded", icon: "🍞" },
  { label: "Waste Rate", value: "—", sub: "No waste data yet", icon: "🗑️" },
];

export default function DashboardPage() {
  const { user } = useUser();
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="min-h-full bg-[#f7f7f8]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          <div className="flex gap-4 mt-1">
            {["Overview", "Analytics", "Reports"].map((tab, i) => (
              <button
                key={tab}
                className={`text-sm pb-0.5 ${
                  i === 0
                    ? "text-gray-900 font-medium border-b-2 border-gray-900"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">{today}</span>
          {user && (
            <img src={user.imageUrl} className="w-8 h-8 rounded-full" alt="" />
          )}
        </div>
      </div>

      <div className="px-8 py-6 space-y-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(({ label, value, sub, icon }) => (
            <div key={label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</span>
                <span className="text-lg">{icon}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              <div className="text-xs text-gray-400 mt-1">{sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Chart placeholder */}
          <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Sales Overview</h2>
            <div className="flex items-end gap-2 h-36">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                <div key={day} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-md bg-[#0f1117]"
                    style={{ height: `${[40, 65, 50, 80, 55, 90, 45][i]}%` }}
                  />
                  <span className="text-xs text-gray-400">{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { label: "Record a sale", href: "/sales" },
                { label: "Log production", href: "/production" },
                { label: "Add waste entry", href: "/waste" },
                { label: "View revenue", href: "/revenue" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition text-sm text-gray-700"
                >
                  {label}
                  <span className="text-gray-300">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Sales Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700">Recent Sales</h2>
            <a href="/sales" className="text-xs text-gray-400 hover:text-gray-600">View all →</a>
          </div>
          <div className="p-5 text-center text-sm text-gray-400 py-12">
            No sales recorded yet.{" "}
            <a href="/sales" className="text-gray-700 underline underline-offset-2">Add your first sale →</a>
          </div>
        </div>
      </div>
    </div>
  );
}