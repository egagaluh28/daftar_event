"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import "./globals.css";
import { EventProvider } from "../Context/EventContext";
import { Header } from "../Components/partials/Header";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Metadata dasar */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 font-sans text-gray-900`}>
        <HeroUIProvider>
          <EventProvider>
            <ToastProvider
              placement="top-center"
              toastOffset={20}
              toastProps={{
                variant: "solid",
                radius: "md",
              }}
            />
            <Header />
            <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-indigo-100 p-6 sm:p-10 transition-all duration-300">
                {children}
              </div>
            </main>
          </EventProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
}
