"use client";

import React, { useState } from "react";
import { Send, Trash2, HelpCircle } from "lucide-react";

interface ReviewFormProps {
  onSubmit: (reviewText: string) => void;
  isLoading: boolean;
}

export default function ReviewForm({ onSubmit, isLoading }: ReviewFormProps) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const sampleReviews = [
    "The wooden cabins were clean and comfortable. The host cooked delicious organic local meals, and the surrounding forest walks were breathtaking. We will definitely come back!",
    "Amazing location right by the river, very scenic! But the bathroom cleanliness was disappointing and the water pressure was extremely low. The host was very friendly though.",
    "Decent stay, but way too expensive for what was provided. The room was basic and the WiFi did not work at all. It is quiet, but not worth the price."
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmed = text.trim();
    if (!trimmed) {
      setError("Please enter a review to analyze.");
      return;
    }

    if (trimmed.length < 10) {
      setError("Review must be at least 10 characters long.");
      return;
    }

    onSubmit(trimmed);
  };

  const handleClear = () => {
    setText("");
    setError("");
  };

  const handleUseSample = (sample: string) => {
    setText(sample);
    setError("");
  };

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm space-y-6">
      <div className="space-y-1">
        <h2 className="font-bold text-lg text-stone-900">Enter Guest Review</h2>
        <p className="text-stone-500 text-xs md:text-sm">
          Paste the review text from booking platforms, social media, or email to analyze sentiment and generate responses.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (e.target.value.trim().length >= 10) setError("");
            }}
            disabled={isLoading}
            placeholder="Type or paste a guest review here (minimum 10 characters)..."
            rows={5}
            className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none transition-all resize-y ${
              error
                ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            } bg-stone-50 disabled:opacity-60`}
          />
          {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <button
            type="button"
            onClick={handleClear}
            disabled={isLoading || !text}
            className="inline-flex items-center justify-center space-x-1.5 px-4 py-2 border border-stone-200 text-stone-600 hover:text-red-700 hover:bg-red-50 hover:border-red-100 rounded-lg text-sm font-medium transition-all disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-stone-600"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear Input</span>
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center space-x-1.5 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm font-semibold shadow-sm transition-all disabled:bg-stone-300 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Analyzing Review...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Analyze Sentiment</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Sample Review Shortcuts */}
      <div className="pt-4 border-t border-stone-100 space-y-3">
        <span className="inline-flex items-center space-x-1 text-xs font-semibold text-stone-500 uppercase tracking-wider">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Quick Samples (Click to Try)</span>
        </span>
        <div className="flex flex-col gap-2">
          {sampleReviews.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleUseSample(sample)}
              disabled={isLoading}
              className="text-left p-2.5 rounded-lg border border-stone-100 bg-stone-50 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all text-xs text-stone-600 truncate"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
