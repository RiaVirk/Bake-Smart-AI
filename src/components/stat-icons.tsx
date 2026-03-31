// Paste this file as: src/components/stat-icons.tsx
// Reusable futuristic stat card icons matching the BakeSmart hex logo style

export function IconRevenue({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <rect x="2" y="10" width="3" height="8" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="8.5" y="6" width="3" height="12" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="15" y="2" width="3" height="16" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  );
}

export function IconBread({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M3 13 L3 9 Q3 4 10 4 Q17 4 17 9 L17 13 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <line x1="3" y1="10.5" x2="17" y2="10.5" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1.5"/>
      <line x1="3" y1="13" x2="17" y2="13" stroke="currentColor" strokeWidth="1.2"/>
      <line x1="3" y1="16" x2="17" y2="16" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  );
}

export function IconSales({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <polyline points="2,14 6,9 10,11 14,5 18,7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="15,5 18,5 18,8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconWaste({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M5 6 L6.5 17 L13.5 17 L15 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M8 6 L8 4 L12 4 L12 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="10" y1="9" x2="10" y2="14" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

export function IconProduction({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <rect x="2" y="12" width="6" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="7" y="7" width="6" height="10" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="12" y="3" width="6" height="14" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
      <line x1="5" y1="9" x2="5" y2="12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="1.5 1.5"/>
    </svg>
  );
}

export function IconEntry({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <rect x="3" y="2" width="14" height="16" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <line x1="6" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <line x1="6" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <line x1="6" y1="13" x2="10" y2="13" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

export function IconCalendar({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="16" height="14" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <line x1="2" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <line x1="6" y1="2" x2="6" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="14" y1="2" x2="14" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="10" cy="13" r="1.2" fill="currentColor"/>
    </svg>
  );
}

export function IconTrend({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M7 12 L10 8 L13 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="13" y1="8" x2="13" y2="10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}