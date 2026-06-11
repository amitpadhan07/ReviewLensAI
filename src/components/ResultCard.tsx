"use client";

import { useState } from "react";
import { Copy, Check, MessageSquare, Tag, Smile, AlertCircle, HelpCircle } from "lucide-react";

interface ResultCardProps {
  result: {
    reviewText: string;
    sentiment: string; // Positive | Neutral | Negative
    category: string;  // Food | Cleanliness | Location | Host | Value | Experience
    aiResponse: string;
  };
}

export default function ResultCard({ result }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.aiResponse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Define styling themes based on sentiment
  const getSentimentTheme = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return {
          bg: "bg-emerald-50/50 border-emerald-200",
          text: "text-emerald-800",
          badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
          icon: Smile,
        };
      case "negative":
        return {
          bg: "bg-rose-50/50 border-rose-200",
          text: "text-rose-800",
          badge: "bg-rose-100 text-rose-800 border-rose-200",
          icon: AlertCircle,
        };
      case "neutral":
      default:
        return {
          bg: "bg-amber-50/50 border-amber-200",
          text: "text-amber-800",
          badge: "bg-amber-100 text-amber-800 border-amber-200",
          icon: HelpCircle,
        };
    }
  };

  const theme = getSentimentTheme(result.sentiment);
  const SentimentIcon = theme.icon;

  return (
    <div className={`bg-white border rounded-xl shadow-sm overflow-hidden divide-y divide-stone-100 transition-all duration-300`}>
      {/* Header Info */}
      <div className={`p-6 border-l-4 ${result.sentiment.toLowerCase() === 'positive' ? 'border-l-emerald-600' : result.sentiment.toLowerCase() === 'negative' ? 'border-l-rose-500' : 'border-l-amber-500'}`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-bold text-lg text-stone-900 flex items-center space-x-2">
            <span>Analysis Outcome</span>
          </h2>
          
          <div className="flex items-center space-x-2">
            {/* Sentiment Badge */}
            <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${theme.badge}`}>
              <SentimentIcon className="h-3.5 w-3.5" />
              <span>{result.sentiment}</span>
            </span>

            {/* Category Badge */}
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200">
              <Tag className="h-3.5 w-3.5" />
              <span>{result.category}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Submitted Review Snippet */}
      <div className="p-6 bg-stone-50/50">
        <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-2">Analyzed Review</span>
        <p className="text-stone-700 text-sm italic leading-relaxed">"{result.reviewText}"</p>
      </div>

      {/* Suggested Auto Response */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider flex items-center space-x-1">
            <MessageSquare className="h-3.5 w-3.5 mr-1" />
            <span>Suggested Professional Response</span>
          </span>
          <button
            onClick={handleCopy}
            className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              copied
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50 hover:text-stone-900"
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Reply</span>
              </>
            )}
          </button>
        </div>
        <div className="p-4 bg-stone-50 rounded-lg border border-stone-200/80">
          <p className="text-stone-800 text-sm whitespace-pre-wrap leading-relaxed">{result.aiResponse}</p>
        </div>
      </div>
    </div>
  );
}
