"use client";

import { useState } from "react";
import ReviewForm from "@/components/ReviewForm";
import ResultCard from "@/components/ResultCard";
import { BrainCircuit } from "lucide-react";

export default function AnalyzerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    reviewText: string;
    sentiment: string;
    category: string;
    aiResponse: string;
  } | null>(null);

  const handleAnalyze = (reviewText: string) => {
    setIsLoading(true);
    setResult(null);

    // Mock API Response delay (simulating network roundtrip)
    setTimeout(() => {
      // Determine Mock Sentiment
      let sentiment = "Neutral";
      const lowerText = reviewText.toLowerCase();
      
      const positiveWords = ["good", "great", "amazing", "excellent", "wonderful", "love", "delicious", "clean", "friendly", "comfortable", "scenic"];
      const negativeWords = ["bad", "worst", "terrible", "poor", "dirty", "expensive", "disappointing", "low", "rough", "slow", "disappointed"];
      
      let posCount = 0;
      let negCount = 0;
      
      positiveWords.forEach(word => {
        if (lowerText.includes(word)) posCount++;
      });
      negativeWords.forEach(word => {
        if (lowerText.includes(word)) negCount++;
      });

      if (posCount > negCount) {
        sentiment = "Positive";
      } else if (negCount > posCount) {
        sentiment = "Negative";
      }

      // Determine Mock Category
      let category = "Experience";
      if (lowerText.includes("food") || lowerText.includes("meal") || lowerText.includes("cook") || lowerText.includes("breakfast") || lowerText.includes("dinner")) {
        category = "Food";
      } else if (lowerText.includes("clean") || lowerText.includes("dirty") || lowerText.includes("wash") || lowerText.includes("bathroom") || lowerText.includes("neat")) {
        category = "Cleanliness";
      } else if (lowerText.includes("location") || lowerText.includes("view") || lowerText.includes("river") || lowerText.includes("mountain") || lowerText.includes("road") || lowerText.includes("scenic")) {
        category = "Location";
      } else if (lowerText.includes("host") || lowerText.includes("staff") || lowerText.includes("owner") || lowerText.includes("people") || lowerText.includes("friendly")) {
        category = "Host";
      } else if (lowerText.includes("price") || lowerText.includes("expensive") || lowerText.includes("worth") || lowerText.includes("cost") || lowerText.includes("value")) {
        category = "Value";
      }

      // Generate Suggested Response
      let aiResponse = "";
      if (sentiment === "Positive") {
        aiResponse = `Dear Guest,\n\nThank you so much for your wonderful review! We are absolutely thrilled to hear you had such a great time during your stay. We take great pride in our homestay's ${category.toLowerCase()} and hospitality, and it means the world to our team to receive such positive feedback. We hope to welcome you back to our eco-sanctuary in the near future!\n\nWarm regards,\nManagement Team`;
      } else if (sentiment === "Negative") {
        aiResponse = `Dear Guest,\n\nThank you for taking the time to share your feedback. We sincerely apologize that your experience did not meet your expectations, particularly regarding the ${category.toLowerCase()} during your stay. We take your comments seriously and are already addressing this with our team to ensure improvements are made. We hope you will give us another chance in the future to show you the high standard of hospitality we aim for.\n\nSincerely,\nManagement Team`;
      } else {
        aiResponse = `Dear Guest,\n\nThank you for your review and for sharing your constructive feedback. We are glad you enjoyed parts of your stay, but also appreciate your notes on the ${category.toLowerCase()}. We are always looking for ways to improve our homestay experience and will use your input to refine our services. We hope to host you again for an even better stay.\n\nKind regards,\nManagement Team`;
      }

      setResult({
        reviewText,
        sentiment,
        category,
        aiResponse
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-4">
      {/* Page Header */}
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
          <BrainCircuit className="h-6 w-6" />
        </div>
        <div className="space-y-0.5">
          <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">Review Analyzer</h1>
          <p className="text-stone-500 text-sm">
            Leverage Google Gemini AI to analyze customer sentiments, classify topics, and draft immediate replies.
          </p>
        </div>
      </div>

      {/* Main Form and Output Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3">
          <ReviewForm onSubmit={handleAnalyze} isLoading={isLoading} />
        </div>
        
        <div className="lg:col-span-2">
          {result ? (
            <ResultCard result={result} />
          ) : (
            <div className="border border-stone-200 rounded-xl p-8 text-center space-y-4 bg-white min-h-[300px] flex flex-col items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-stone-50 border border-stone-150 text-stone-400 flex items-center justify-center">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <div className="max-w-xs space-y-1">
                <h3 className="font-semibold text-stone-700 text-sm">Waiting for Analysis</h3>
                <p className="text-stone-400 text-xs leading-relaxed">
                  Submit a review on the left, and the AI analysis results and response suggestion will appear here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
