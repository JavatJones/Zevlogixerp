import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aldevaram ERP",
  description: "Generated by create next app",
  manifest: "/manifest.json",
  icons: {
    icon: [
      './favicon.ico?v=4',
    ],
    apple: [
      '/apple-touch-icon.png?v=4',
    ],
    shortcut: [
      '/apple-touch-icon.png',
    ],
  }
};

import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
