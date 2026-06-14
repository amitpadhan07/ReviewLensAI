import React from "react";
import { HelpCircle, TreePine, MapPin, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 px-4 sm:px-0">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
          <HelpCircle className="h-6 w-6 text-emerald-700" />
        </div>
        <div className="space-y-0.5">
          <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">About ReviewLens AI</h1>
          <p className="text-stone-500 text-sm">
            Discover the mission behind our eco-tourism review analyzer.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white border border-stone-200 rounded-xl p-8 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-stone-900">Eco-Friendly Hospitality Operations</h2>
        <p className="text-stone-600 text-sm leading-relaxed">
          ReviewLens AI is a lightweight assistant specifically tailored for homestays and eco-tourism operators.
          Our solution leverages natural language processing and advanced AI to classify guest sentiments,
          tag recurring topics (such as cleanliness, food, location, and hosting quality), and auto-draft professional
          email or message responses. By streamlining the feedback loop, homestay operators can save time and focus on what
          matters most—providing unforgettable experiences in nature.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-stone-150">
          <div className="flex items-start space-x-3">
            <TreePine className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-stone-850 text-sm">Eco-Conscious</h4>
              <p className="text-stone-500 text-xs leading-relaxed">Promoting digital solutions that foster sustainable tourism operations.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-stone-850 text-sm">Locally Targeted</h4>
              <p className="text-stone-500 text-xs leading-relaxed">Optimized to understand the unique charm of remote nature cabins.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Award className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-stone-850 text-sm">Premium Quality</h4>
              <p className="text-stone-500 text-xs leading-relaxed">Crafting professional hospitality responses that protect your brand.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
