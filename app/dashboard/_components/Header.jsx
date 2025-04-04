"use client";
import { useEffect, useState, useCallback } from "react";
import { SignInButton, UserButton, SignedOut, SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";

function Header({ theme, toggleTheme }) {
  const path = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle navbar visibility on scroll
  const controlNavbar = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsVisible(currentScrollY <= lastScrollY || currentScrollY <= 100);
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [controlNavbar]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => {
      const newState = !prev;
      document.body.style.overflow = newState ? "hidden" : "unset";
      return newState;
    });
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  // Navigation items
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/how-it-works", label: "How it works" },
    { href: "/about-us", label: "About us" },
  ];

  return (
    <>
      {/* Header */}
      <header
        className={`
          fixed top-0 left-0 right-0 
          flex justify-between items-center 
          p-4 sm:p-5 
          bg-white/90 dark:bg-gray-900 backdrop-blur-md 
          shadow-md z-50 
          transition-all duration-300 ease-in-out
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="MashSub AI Home"
          onClick={closeMobileMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="h-8 w-8 text-indigo-600 dark:text-indigo-400"
            fill="currentColor"
          >
            <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="4" fill="none" />
            <path d="M50 20 L65 50 L50 80 L35 50 Z" fill="currentColor" />
          </svg>
          <span className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            MashSub AI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4 lg:gap-6" aria-label="Main Navigation">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              path={path}
              href={item.href}
              label={item.label}
              onClick={closeMobileMenu}
            />
          ))}
        </nav>

        {/* Desktop Authentication and Theme Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <SignedOut>
            <SignInButton mode="modal">
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{ elements: { userButtonAvatarBox: "w-10 h-10" } }}
            />
          </SignedIn>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="focus:outline-none text-gray-600 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40">
          <nav className="bg-white dark:bg-gray-900 w-64 h-full p-4 space-y-6">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                path={path}
                href={item.href}
                label={item.label}
                mobile
                onClick={closeMobileMenu}
              />
            ))}

            {/* Mobile Theme Toggle */}
            <div className="flex justify-center">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                aria-label="Toggle Theme"
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>

            {/* Mobile Authentication */}
            <div className="pt-6 border-t">
              <SignedOut>
                <SignInButton mode="modal">
                  <button
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={closeMobileMenu}
                  >
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="flex justify-center">
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{ elements: { userButtonAvatarBox: "w-12 h-12 mx-auto" } }}
                  />
                </div>
              </SignedIn>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

// Navigation Item Component
function NavItem({ path, href, label, mobile, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        block transition-all duration-300 ease-in-out cursor-pointer rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500
        ${mobile ? "w-full text-lg py-3 text-center" : "px-3 py-2 hover:bg-indigo-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400"}
        ${path === href ? "text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-100 dark:bg-gray-800" : "text-gray-700 dark:text-gray-300"}
      `}
    >
      {label}
    </Link>
  );
}

export default Header;