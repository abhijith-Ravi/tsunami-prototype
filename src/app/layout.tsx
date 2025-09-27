import type { Metadata } from "next";
import "./globals.css";
// import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Varuna – Ocean AI UI Prototype",
  description: "Conversational insights for ARGO float oceanographic data (UI prototype)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      {/* Prefer dark-ish palette for ocean theme */}
      <body className="antialiased min-h-screen text-foreground selection:bg-primary/20 selection:text-primary-foreground">
        {/* Global ocean glow overlay */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-[-120px] right-[-120px] h-[28rem] w-[28rem] rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        {/* Beautiful glassmorphic top nav */}
        <header className="sticky top-0 z-50 border-b backdrop-blur-xl bg-black/30 border-cyan-400/20 shadow-2xl">
          <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 sm:px-8">
            <Link href="/" className="font-bold text-2xl tracking-tight">
              <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">Varuna</span>
            </Link>
            <div className="flex items-center gap-6 text-base text-white/90">
              <Link href="/dashboard" className="px-3 py-1 rounded-md transition hover:bg-cyan-400/10 hover:text-cyan-200">Dashboard</Link>
              <Link href="/chat" className="px-3 py-1 rounded-md transition hover:bg-cyan-400/10 hover:text-cyan-200">Chat</Link>
              <Link href="/map" className="px-3 py-1 rounded-md transition hover:bg-cyan-400/10 hover:text-cyan-200">Map</Link>
              <Link href="/insights" className="px-3 py-1 rounded-md transition hover:bg-cyan-400/10 hover:text-cyan-200">Insights</Link>
              <Link href="/alert" className="px-3 py-1 rounded-md transition hover:bg-cyan-400/10 hover:text-cyan-200">Alerts</Link>
            </div>
          </nav>
        </header>

        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />

        <main className="mx-auto w-full">{children}</main>

        <footer className="mt-20 border-t border-white/10 py-10 text-center text-xs text-white/60">
          • © {new Date().getFullYear()} Varuna
        </footer>

        <Toaster richColors position="top-right" />
        {/* <VisualEditsMessenger /> */}
      </body>
    </html>
  );
}