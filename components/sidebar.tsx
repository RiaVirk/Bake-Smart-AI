"use client";
import { MdHome, MdBakeryDining, MdBarChart, MdDelete, MdLocalShipping, MdEuroSymbol, MdSettings } from "react-icons/md";
import Link from "next/link";

export function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white h-screen p-4 flex flex-col">
      <div className="text-2xl font-bold mb-8">🍞 BakeSmart</div>
      <nav className="space-y-2">
        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl">
          <MdHome size={20} /> Dashboard
        </Link>
        <Link href="/production" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl">
          <MdBakeryDining size={20} /> Produktion
        </Link>
        <Link href="/sales" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl">
          <MdBarChart size={20} /> Verkauf
        </Link>
        <Link href="/waste" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl">
          <MdDelete size={20} /> Abfall
        </Link>
        <Link href="/operations" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl">
          <MdLocalShipping size={20} /> Betrieb
        </Link>
        <Link href="/revenue" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl">
          <MdEuroSymbol size={20} /> Umsatz
        </Link>
        <Link href="/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl">
          <MdSettings size={20} /> Einstellungen
        </Link>
      </nav>
    </div>
  );
}