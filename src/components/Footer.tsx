import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-stone-200 py-6 text-center text-xs text-stone-500 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <p>ReviewLens AI &copy; {new Date().getFullYear()} &bull; AI-Powered Homestay &amp; Eco-Tourism Solutions</p>
        <p className="mt-1 text-[10px] text-stone-400">Internship Project &bull; B.Tech AI &amp; Full Stack Development</p>
      </div>
    </footer>
  );
}
