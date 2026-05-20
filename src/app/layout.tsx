import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/animations/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AXAR AI | Industrial Intelligence Redefined",
  description: "Enterprise-grade AI platform for industrial engineering — Spray Dryers, Evaporators, ZLD Systems.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                if ('scrollRestoration' in history) {
                  history.scrollRestoration = 'manual';
                }
                if (window.location.hash) {
                  window.history.replaceState(null, '', window.location.pathname + window.location.search);
                }
                window.scrollTo(0, 0);
              }
            `,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {/* Scroll progress bar — pure DOM, zero React re-renders */}
        <div id="scroll-progress">
          <div id="scroll-progress-bar" />
        </div>
        <SmoothScroll>
          <Navbar />
          <main>
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
