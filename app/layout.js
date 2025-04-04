"use client";

import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import Footer from "./dashboard/_components/Footer";
import Header from "./dashboard/_components/Header";
import { useEffect, useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  fallback: ["system-ui", "arial", "sans-serif"],
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  fallback: ["Courier New", "monospace"],
});

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Check for saved theme in localStorage or default to light
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <body
          className={`
            antialiased 
            min-h-screen 
            flex 
            flex-col 
            bg-white 
            dark:bg-gray-900 
            text-gray-900 
            dark:text-gray-100 
            font-sans
          `}
        >
          <a
            href="#main-content"
            className="
              absolute 
              top-[-999px] 
              left-[-999px] 
              z-[-1] 
              focus:top-0 
              focus:left-0 
              focus:z-50 
              p-4 
              bg-indigo-600 
              text-white
            "
          >
            Skip to main content
          </a>

          {/* Pass theme and toggleTheme to Header */}
          <Header theme={theme} toggleTheme={toggleTheme} />
          <Toaster />

          <main
            id="main-content"
            className="
              flex-grow 
              pt-16 
              sm:pt-20 
              max-w-7xl 
              mx-auto 
              w-full 
              px-4 
              sm:px-6 
              lg:px-8
            "
          >
            {children}
          </main>

          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}