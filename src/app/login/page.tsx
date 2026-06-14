"use client";

import React from "react";
import { LogIn, Key, Mail, ShieldAlert } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto space-y-8 py-8 px-4 sm:px-0">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl w-fit mx-auto">
          <LogIn className="h-6 w-6 text-emerald-700" />
        </div>
        <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">Login to ReviewLens AI</h1>
        <p className="text-stone-500 text-sm">
          Access your homestay review analyzer dashboard.
        </p>
      </div>

      {/* Main Content Area */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="p-3 bg-amber-50 border border-amber-250 text-amber-900 rounded-lg text-xs flex items-start space-x-2">
          <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <span>This is a placeholder login screen. Direct database authentication is coming soon.</span>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-550 uppercase tracking-wider block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input
                type="email"
                placeholder="operator@eco-cabin.com"
                disabled
                className="w-full bg-stone-50 border border-stone-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-stone-550 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-550 uppercase tracking-wider block">Password</label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input
                type="password"
                placeholder="••••••••"
                disabled
                className="w-full bg-stone-50 border border-stone-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-stone-550 cursor-not-allowed"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled
            className="w-full bg-emerald-700/50 text-white font-semibold py-2.5 rounded-lg text-sm transition-all cursor-not-allowed text-center"
          >
            Sign In (Locked)
          </button>
        </form>
      </div>
    </div>
  );
}
