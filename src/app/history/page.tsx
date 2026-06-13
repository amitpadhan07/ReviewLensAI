"use client";

import { useEffect, useState } from "react";
import { History, Calendar, MessageSquare, Tag, Smile, AlertCircle, HelpCircle, ChevronDown, ChevronUp, Copy, Check, AlertTriangle } from "lucide-react";

interface Review {
  _id: string;
  reviewText: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  category: 'Food' | 'Cleanliness' | 'Location' | 'Host' | 'Value' | 'Experience';
  aiResponse: string;
  createdAt: string;
}

export default function HistoryPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews");
        const json = await res.json();
        if (json.success) {
          setReviews(json.reviews);
        } else {
          setError(json.error || "Failed to load reviews.");
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred while fetching reviews.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReviews();
  }, []);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return <Smile className="h-4 w-4 text-emerald-600" />;
      case "negative":
        return <AlertCircle className="h-4 w-4 text-rose-600" />;
      case "neutral":
      default:
        return <HelpCircle className="h-4 w-4 text-amber-600" />;
    }
  };

  const getSentimentStyles = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "negative":
        return "bg-rose-50 text-rose-800 border-rose-200";
      case "neutral":
      default:
        return "bg-amber-50 text-amber-800 border-amber-200";
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4 px-4 sm:px-0">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
          <History className="h-6 w-6 animate-pulse" />
        </div>
        <div className="space-y-0.5">
          <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">Review Database</h1>
          <p className="text-stone-500 text-sm">
            View history of guest reviews and suggested replies saved in the system.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="border border-stone-200 rounded-xl p-6 bg-white space-y-4 animate-pulse">
              <div className="flex justify-between items-center">
                <div className="h-5 w-24 bg-stone-200 rounded"></div>
                <div className="flex space-x-2">
                  <div className="h-5 w-16 bg-stone-200 rounded-full"></div>
                  <div className="h-5 w-16 bg-stone-200 rounded-full"></div>
                </div>
              </div>
              <div className="h-4 w-full bg-stone-200 rounded"></div>
              <div className="h-4 w-3/4 bg-stone-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="border border-red-200 bg-red-50/50 rounded-xl p-6 text-center max-w-lg mx-auto space-y-3">
          <AlertTriangle className="h-10 w-10 text-red-600 mx-auto" />
          <h3 className="font-semibold text-red-800">Database Connection Failed</h3>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="border border-stone-200 rounded-xl p-12 text-center bg-white space-y-4 max-w-lg mx-auto">
          <div className="h-12 w-12 rounded-full bg-stone-50 border border-stone-150 text-stone-400 flex items-center justify-center mx-auto">
            <History className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-stone-700">No Reviews Found</h3>
            <p className="text-stone-400 text-sm">
              Use the Analyzer page to submit and save guest reviews.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => {
            const isExpanded = expandedId === review._id;
            return (
              <div
                key={review._id}
                className="border border-stone-200 rounded-xl bg-white shadow-sm overflow-hidden transition-all duration-300 hover:border-emerald-300"
              >
                {/* Collapsed Overview Row */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : review._id)}
                  className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none hover:bg-stone-50/30"
                >
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Sentiment Badge */}
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getSentimentStyles(review.sentiment)}`}>
                        {getSentimentIcon(review.sentiment)}
                        <span>{review.sentiment}</span>
                      </span>

                      {/* Category Badge */}
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                        <Tag className="h-3 w-3 text-stone-500" />
                        <span>{review.category}</span>
                      </span>

                      {/* Date Badge */}
                      <span className="inline-flex items-center space-x-1 text-xs text-stone-400">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(review.createdAt)}</span>
                      </span>
                    </div>

                    <p className="text-stone-700 text-sm line-clamp-2 italic pr-4">
                      &ldquo;{review.reviewText}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 text-stone-400 hover:text-emerald-700">
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="border-t border-stone-200 bg-stone-50/30 p-6 space-y-4">
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">Full Guest Review</span>
                      <p className="text-stone-800 text-sm leading-relaxed whitespace-pre-line bg-white p-4 rounded-lg border border-stone-200/60 italic">
                        &ldquo;{review.reviewText}&rdquo;
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center">
                          <MessageSquare className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                          <span>Suggested Response</span>
                        </span>

                        <button
                          onClick={() => handleCopy(review._id, review.aiResponse)}
                          className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                            copiedId === review._id
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50 hover:text-stone-900"
                          }`}
                        >
                          {copiedId === review._id ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-600" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>Copy Reply</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="p-4 bg-white rounded-lg border border-stone-200/80">
                        <p className="text-stone-800 text-sm whitespace-pre-wrap leading-relaxed">
                          {review.aiResponse}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
