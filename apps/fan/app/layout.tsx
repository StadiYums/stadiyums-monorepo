import type { Metadata } from "next";
import { Archivo_Black, Inter, Space_Mono } from "next/font/google";
import {
  ConvexClientProvider,
  ThemeProvider,
  VendorToggle,
} from "@stadiyums/ui";
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
  title: "StadiYums — Fan",
  description: "Fan ordering PWA scaffold",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${archivoBlack.variable} ${inter.variable} ${spaceMono.variable} min-h-full font-body antialiased`}
      >
        <ConvexClientProvider>
          <ThemeProvider>
            {children}
            <VendorToggle />
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
