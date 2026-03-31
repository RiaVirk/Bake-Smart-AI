"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import {
  MdHome, MdBakeryDining, MdBarChart, MdDelete,
  MdLocalShipping, MdEuroSymbol, MdSettings, MdHelpCenter
} from "react-icons/md";

const navItems = [
  { href: "/dashboard", icon: MdHome, label: "Dashboard" },
  { href: "/production", icon: MdBakeryDining, label: "Production" },
  { href: "/sales", icon: MdBarChart, label: "Sales" },
  { href: "/waste", icon: MdDelete, label: "Waste" },
  { href: "/operations", icon: MdLocalShipping, label: "Operations" },
  { href: "/revenue", icon: MdEuroSymbol, label: "Revenue" },
  { href: "/settings", icon: MdSettings, label: "Settings" },
];

function BakeSmartLogo() {
  return (
    <div className="flex items-center gap-3 px-1">
      <svg width="36" height="36" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Hexagon outer */}
        <polygon
          points="28,4 50,16 50,40 28,52 6,40 6,16"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        />
        {/* Loaf arc top */}
        <path
          d="M16,22 Q28,12 40,22"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Bread slice lines */}
        <line x1="14" y1="28" x2="42" y2="28" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="14" y1="34" x2="42" y2="34" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="40" x2="40" y2="40" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Corner accent dots */}
        <circle cx="28" cy="4" r="2" fill="white"/>
        <circle cx="6" cy="16" r="1.5" fill="white" opacity="0.5"/>
        <circle cx="50" cy="16" r="1.5" fill="white" opacity="0.5"/>
      </svg>
      <div>
        <div className="text-sm font-semibold tracking-widest text-white uppercase">BakeSmart</div>
        <div className="text-[9px] tracking-[4px] text-white/40 uppercase">AI</div>
      </div>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div className="w-56 bg-[#0f1117] text-white h-screen flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-white/10">
        <BakeSmartLogo />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                active
                  ? "bg-white/10 text-white font-medium"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/10 space-y-0.5">
        <Link
          href="/help"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all"
        >
          <MdHelpCenter size={17} />
          Help Center
        </Link>
        {user && (
          <div className="flex items-center gap-3 px-3 py-2.5 mt-1">
            <img
              src={user.imageUrl}
              alt={user.fullName || ""}
              className="w-7 h-7 rounded-full"
            />
            <div className="min-w-0">
              <p className="text-xs font-medium text-white truncate">{user.fullName}</p>
              <p className="text-xs text-white/40 truncate">
                {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}