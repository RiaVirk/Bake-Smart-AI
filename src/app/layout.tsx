import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "BakeSmart AI",
  description: "Production planner for bakeries",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="de">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}