import "./globals.css";
import type { ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-neutral-950 text-neutral-100">
        <AuthProvider>
          <Navigation />
          <main className="pt-16">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
