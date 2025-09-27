import type { Metadata } from "next";
import "./globals.css";
// import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "../components/ErrorReporter";
import Script from "next/script";
import Link from "next/link";
import { Toaster } from "../components/ui/sonner";

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

        {/* Simple top nav available on all pages */}
        <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
          <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
            <Link href="/" className="font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Varuna</span>
            </Link>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
              <Link href="/chat" className="hover:text-foreground">Chat</Link>
              <Link href="/map" className="hover:text-foreground">Map</Link>
              <Link href="/insights" className="hover:text-foreground">Insights</Link>
              <Link href="/alerts" className="hover:text-foreground">Alerts</Link>
            </div>
          </nav>
        </header>

        <ErrorReporter />
        <Script
          // src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />

        <main className="mx-auto w-full max-w-6xl px-4 sm:px-6">{children}</main>

        <footer className="mt-16 border-t border-border/40 py-10 text-center text-xs text-muted-foreground">
          UI prototype • Mock data • © {new Date().getFullYear()} Varuna
        </footer>

        <Toaster richColors position="top-right" />
        {/* <VisualEditsMessenger /> */}
      </body>
    </html>
  );
}