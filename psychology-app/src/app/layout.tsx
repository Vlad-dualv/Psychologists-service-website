import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import {Inter} from 'next/font/google'
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";


const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "Psychologists",
  description: "Psychologists directory and booking app",
  icons: {
    icon: "/brain-svgrepo-com.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <AuthProvider>
            <Header />
            <main className="min-h-screen">
            {children}
            </main>
        </AuthProvider>
      </body>
    </html>
  );
}
