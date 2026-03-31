"use client";
import { Home, BreadSlice, BarChart3, Trash2, Truck, Euro, Settings } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white h-screen p-4 flex flex-col">
      <div className="text-2xl font-bold mb-8">🍞 BakeSmart</div>
      <nav className="space-y-2">
        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl">
          <Home /> Dashboard
        </Link>
        <Link href="/production" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl">
          <BreadSlice /> Produktion
        </Link>
        <Link href="/sales" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl">
          <BarChart3 /> Verkauf
        </Link>
        <Link href="/waste" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl">
          <Trash2 /> Abfall
        </Link>
        <Link href="/operations" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl">
          <Truck /> Betrieb
        </Link>
        <Link href="/revenue" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl">
          <Euro /> Umsatz
        </Link>
        <Link href="/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl">
          <Settings /> Einstellungen
        </Link>
      </nav>
    </div>
  );
}