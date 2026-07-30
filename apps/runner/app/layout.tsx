import type { Metadata } from "next";
import { Archivo_Black, Inter, Space_Mono } from "next/font/google";
import { ConvexClientProvider, ThemeProvider } from "@stadiyums/ui";
import { AuthGate } from "../components/AuthGate";
import { RunnerNav } from "../components/RunnerNav";
import { RunnerProvider } from "../providers/RunnerProvider";
import "./globals.css";

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "StadiYums — Runner",
  description: "Runner fulfillment scaffold",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${archivoBlack.variable} ${inter.variable} ${spaceMono.variable} min-h-full bg-cream font-body text-ink antialiased`}
      >
        <ConvexClientProvider>
          <ThemeProvider>
            <RunnerProvider>
              <AuthGate>
                {children}
                <RunnerNav />
              </AuthGate>
            </RunnerProvider>
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
