"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Brain, History, LayoutDashboard, Menu, X, TreePine, HelpCircle, LogIn } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Analyzer", href: "/analyzer", icon: Brain },
    { name: "History", href: "/history", icon: History },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "About", href: "/about", icon: HelpCircle },
    { name: "Login", href: "/login", icon: LogIn },
  ];

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-emerald-800 hover:text-emerald-950 transition-colors">
              <TreePine className="h-6 w-6 text-emerald-600" />
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight leading-tight">ReviewLens <span className="text-emerald-600">AI</span></span>
                <span className="text-[10px] text-stone-500 font-medium tracking-wider uppercase">Eco-Homestay Solutions</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-emerald-50 text-emerald-800 border-b-2 border-emerald-600"
                      : "text-stone-600 hover:text-emerald-700 hover:bg-stone-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-stone-500 hover:text-emerald-800 hover:bg-stone-50 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panels */}
      {isOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3.5 py-3 rounded-lg text-base font-medium transition-all ${
                    isActive
                      ? "bg-emerald-50 text-emerald-800"
                      : "text-stone-600 hover:text-emerald-700 hover:bg-stone-50"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
