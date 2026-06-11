import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReviewLens AI - Eco-Homestay Review Analyzer",
  description: "Lightweight AI-powered customer review analysis tool to classify sentiments, tag topics, and draft auto-responses for homestays & eco-tourism owners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 font-sans">
        <Navbar />
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="bg-white border-t border-stone-200 py-6 text-center text-xs text-stone-500">
          <div className="max-w-7xl mx-auto px-4">
            <p>ReviewLens AI &copy; {new Date().getFullYear()} &bull; AI-Powered Homestay &amp; Eco-Tourism Solutions</p>
            <p className="mt-1 text-[10px] text-stone-400">Internship Project &bull; B.Tech AI &amp; Full Stack Development</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
