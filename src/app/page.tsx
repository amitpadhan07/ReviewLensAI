import Link from "next/link";
import { Brain, MessageSquareCode, BarChart3, ArrowRight, ShieldCheck } from "lucide-react";
import Hero from "@/components/Hero";
import Card from "@/components/Card";

export default function Home() {
  const features = [
    {
      title: "AI Sentiment Analysis",
      description: "Classifies guest feedback automatically as Positive, Neutral, or Negative so you can identify critical reviews instantly.",
      icon: Brain,
      color: "text-emerald-650 bg-emerald-50",
    },
    {
      title: "Topic Classification",
      description: "Automatically routes reviews into categories like Cleanliness, Food, Location, Host, Value, or overall Experience.",
      icon: ShieldCheck,
      color: "text-blue-650 bg-blue-50",
    },
    {
      title: "Smart Auto-Responses",
      description: "Drafts instant, professional replies customized to the guest's review, saving hours of manual drafting.",
      icon: MessageSquareCode,
      color: "text-amber-655 bg-amber-50",
    },
    {
      title: "Analytics Dashboard",
      description: "Presents statistics, category breakdowns, and sentiment distributions in clear, intuitive charts.",
      icon: BarChart3,
      color: "text-purple-650 bg-purple-50",
    },
  ];

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <Hero
        title="Transform Guest Reviews into"
        highlightText="Actionable Insights"
        description="A lightweight, AI-powered assistant designed specifically for homestays and eco-tourism operators. Instantly analyze guest feedback, identify sentiments, categorize topics, and draft polite, professional replies in seconds."
        primaryCtaText="Analyze a Review"
        primaryCtaLink="/analyzer"
        secondaryCtaText="View Dashboard"
        secondaryCtaLink="/dashboard"
      />

      {/* Quick Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
          <span className="text-sm font-medium text-stone-500 uppercase tracking-wider">Total Reviews Analyzed</span>
          <p className="text-3xl font-bold text-stone-900 mt-2">1,248</p>
          <span className="text-xs text-emerald-600 font-medium mt-1 inline-block">↑ 12% increase this month</span>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
          <span className="text-sm font-medium text-stone-500 uppercase tracking-wider">Average Positive Sentiment</span>
          <p className="text-3xl font-bold text-emerald-700 mt-2">84.2%</p>
          <span className="text-xs text-stone-500 mt-1 inline-block">Based on guest satisfaction data</span>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
          <span className="text-sm font-medium text-stone-500 uppercase tracking-wider">Top Feedback Category</span>
          <p className="text-3xl font-bold text-stone-900 mt-2">Location &amp; Host</p>
          <span className="text-xs text-stone-500 mt-1 inline-block">Representing 48% of total positive reviews</span>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-900">Designed for Eco-Tourism &amp; Homestays</h2>
          <p className="text-stone-600 text-sm md:text-base">
            Everything you need to streamline feedback management, protect your reputation, and delight guests with speedy replies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-stone-900 text-white rounded-2xl p-8 md:p-12 text-center space-y-6 relative overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-900/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Ready to boost your homestay rating?</h2>
          <p className="text-stone-400 text-sm md:text-base">
            Paste a review from Booking.com, Airbnb, Google Maps, or TripAdvisor and see what ReviewLens AI can do for you.
          </p>
          <div className="pt-4">
            <Link
              href="/analyzer"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-xl transition-all"
            >
              <span>Get Started Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
