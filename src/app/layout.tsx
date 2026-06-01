import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { ThemeProvider } from "@/components/theme-provider";

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

                const hideNetlify = () => {
                  document.querySelectorAll('netlify-drawer, iframe[src*="netlify.com"], iframe[src*="netlify.app"], #netlify-identity-widget, #netlify-drawer, .netlify-drawer, [class*="netlify-drawer"]').forEach(el => {
                    el.style.setProperty('display', 'none', 'important');
                    el.style.setProperty('visibility', 'hidden', 'important');
                    el.style.setProperty('opacity', '0', 'important');
                    el.style.setProperty('pointer-events', 'none', 'important');
                  });
                };
                hideNetlify();
                setInterval(hideNetlify, 300);
                const observer = new MutationObserver(hideNetlify);
                observer.observe(document.documentElement, { childList: true, subtree: true });
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.className} relative`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* Scroll progress bar — pure DOM, zero React re-renders */}
          <div id="scroll-progress">
            <div id="scroll-progress-bar" />
          </div>
          <SmoothScroll>
            <Navbar />
            <main className="overflow-x-hidden w-full max-w-[100vw]">
              {children}
            </main>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
