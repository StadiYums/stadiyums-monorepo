import type { Metadata } from "next";
import { Archivo_Black, Inter, Space_Mono } from "next/font/google";
import {
  ConvexClientProvider,
  ThemeProvider,
  VendorToggle,
  WorkspaceShell,
} from "@stadiyums/ui";
import { AdminSidebar } from "../components/AdminSidebar";
import { AuthGate } from "../components/AuthGate";
import { AdminProvider } from "../providers/AdminProvider";
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
  title: "StadiYums — Vendor",
  description: "Vendor operations and order desk console",
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
            <AdminProvider>
              <AuthGate>
                <WorkspaceShell sidebar={<AdminSidebar />} sidebarLabel="Vendor navigation">
                  {children}
                </WorkspaceShell>
              </AuthGate>
              <VendorToggle />
            </AdminProvider>
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
