"use client";

import { useEffect, useState } from "react";
import { LayoutDashboard, Tag, Smile, AlertCircle, HelpCircle, ArrowRight, Activity, Calendar } from "lucide-react";
import Link from "next/link";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

interface Review {
  _id: string;
  reviewText: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  category: 'Food' | 'Cleanliness' | 'Location' | 'Host' | 'Value' | 'Experience';
  aiResponse: string;
  createdAt: string;
}

interface DashboardData {
  totalReviews: number;
  sentimentCounts: {
    Positive: number;
    Neutral: number;
    Negative: number;
  };
  categoryCounts: {
    Food: number;
    Cleanliness: number;
    Location: number;
    Host: number;
    Value: number;
    Experience: number;
  };
  recentReviews: Review[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: any;
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-stone-900 border border-stone-800 text-stone-105 p-2.5 rounded-lg text-xs shadow-md space-y-0.5">
        <p className="font-bold text-white">{payload[0].name}</p>
        <p className="text-stone-300">Reviews: <span className="font-semibold text-emerald-400">{payload[0].value}</span></p>
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    async function fetchDashboardData() {
      try {
        const res = await fetch("/api/dashboard");
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        } else {
          setError(json.error || "Failed to load dashboard data.");
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred while fetching dashboard statistics.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

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

  const getSentimentBadgeStyles = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "bg-emerald-50 text-emerald-800 border-emerald-100";
      case "negative":
        return "bg-rose-50 text-rose-800 border-rose-100";
      case "neutral":
      default:
        return "bg-amber-50 text-amber-800 border-amber-100";
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8 py-4 px-4 sm:px-0">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
            <LayoutDashboard className="h-6 w-6 animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-6 w-40 bg-stone-200 rounded animate-pulse"></div>
            <div className="h-4 w-64 bg-stone-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Stats Grid Loader */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-white border border-stone-200 rounded-xl p-6 h-28 animate-pulse space-y-3">
              <div className="h-4 w-24 bg-stone-200 rounded"></div>
              <div className="h-8 w-16 bg-stone-200 rounded"></div>
            </div>
          ))}
        </div>

        {/* Charts Loader */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[1, 2].map((n) => (
            <div key={n} className="bg-white border border-stone-200 rounded-xl p-6 h-80 animate-pulse space-y-4">
              <div className="h-6 w-40 bg-stone-200 rounded"></div>
              <div className="h-60 w-full bg-stone-100 rounded"></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-6 w-32 bg-stone-200 rounded animate-pulse"></div>
            <div className="bg-white border border-stone-200 rounded-xl p-6 h-80 animate-pulse"></div>
          </div>
          <div className="space-y-4">
            <div className="h-6 w-32 bg-stone-200 rounded animate-pulse"></div>
            <div className="bg-white border border-stone-200 rounded-xl p-6 h-80 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="border border-red-200 bg-red-50/50 rounded-xl p-8 text-center max-w-lg mx-auto space-y-4">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto" />
          <h3 className="font-semibold text-red-800 text-lg">Error Loading Dashboard</h3>
          <p className="text-red-700 text-sm">{error || "An unexpected error occurred."}</p>
        </div>
      </div>
    );
  }

  const maxCategoryCount = Math.max(...Object.values(data.categoryCounts), 1);

  const sentimentChartData = [
    { name: "Positive", value: data.sentimentCounts.Positive, color: "#059669" },
    { name: "Neutral", value: data.sentimentCounts.Neutral, color: "#d97706" },
    { name: "Negative", value: data.sentimentCounts.Negative, color: "#e11d48" }
  ].filter(item => item.value > 0);

  const categoryChartData = Object.entries(data.categoryCounts).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4 px-4 sm:px-0">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
          <LayoutDashboard className="h-6 w-6 text-emerald-700" />
        </div>
        <div className="space-y-0.5">
          <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">Analytics Dashboard</h1>
          <p className="text-stone-500 text-sm">
            Overview of client satisfaction, key topic counts, and recent reviews.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Reviews */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <span className="text-stone-400 text-xs font-semibold uppercase tracking-wider block">Total Reviews</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-extrabold text-stone-900">{data.totalReviews}</span>
            <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-medium border border-stone-150">All Time</span>
          </div>
        </div>

        {/* Positive Reviews */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-l-emerald-600">
          <span className="text-stone-400 text-xs font-semibold uppercase tracking-wider block">Positive Sentiment</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-extrabold text-emerald-700">{data.sentimentCounts.Positive}</span>
            <span className="text-xs text-emerald-700 font-semibold">
              {data.totalReviews > 0 ? Math.round((data.sentimentCounts.Positive / data.totalReviews) * 100) : 0}% of total
            </span>
          </div>
        </div>

        {/* Neutral Reviews */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-l-amber-500">
          <span className="text-stone-400 text-xs font-semibold uppercase tracking-wider block">Neutral Sentiment</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-extrabold text-amber-700">{data.sentimentCounts.Neutral}</span>
            <span className="text-xs text-amber-700 font-semibold">
              {data.totalReviews > 0 ? Math.round((data.sentimentCounts.Neutral / data.totalReviews) * 100) : 0}% of total
            </span>
          </div>
        </div>

        {/* Negative Reviews */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-l-rose-500">
          <span className="text-stone-400 text-xs font-semibold uppercase tracking-wider block">Negative Sentiment</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-extrabold text-rose-700">{data.sentimentCounts.Negative}</span>
            <span className="text-xs text-rose-700 font-semibold">
              {data.totalReviews > 0 ? Math.round((data.sentimentCounts.Negative / data.totalReviews) * 100) : 0}% of total
            </span>
          </div>
        </div>
      </div>

      {/* Visual Charts */}
      {isMounted && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sentiment Distribution Pie Chart */}
          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <h2 className="font-bold text-lg text-stone-900 mb-4 flex items-center space-x-2">
                <Smile className="h-5 w-5 text-emerald-650" />
                <span>Sentiment Distribution</span>
              </h2>
            </div>
            <div className="h-64 w-full flex items-center justify-center">
              {data.totalReviews > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sentimentChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {sentimentChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      iconType="circle"
                      formatter={(value) => <span className="text-xs text-stone-600 font-semibold">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-stone-400 text-sm">
                  No review sentiments to visualize
                </div>
              )}
            </div>
          </div>

          {/* Category Distribution Bar Chart */}
          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <h2 className="font-bold text-lg text-stone-900 mb-4 flex items-center space-x-2">
                <Tag className="h-5 w-5 text-emerald-650" />
                <span>Category Distribution</span>
              </h2>
            </div>
            <div className="h-64 w-full flex items-center justify-center">
              {data.totalReviews > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categoryChartData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
                    <XAxis 
                      dataKey="name" 
                      tickLine={false} 
                      axisLine={false} 
                      tick={{ fill: '#78716c', fontSize: 11 }}
                    />
                    <YAxis 
                      tickLine={false} 
                      axisLine={false} 
                      tick={{ fill: '#78716c', fontSize: 11 }}
                      allowDecimals={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#047857" radius={[4, 4, 0, 0]} name="Reviews" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-stone-400 text-sm">
                  No review categories to visualize
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg text-stone-900 flex items-center space-x-2">
              <Activity className="h-5 w-5 text-emerald-600 animate-pulse" />
              <span>Recent Activity</span>
            </h2>
            <Link
              href="/history"
              className="text-emerald-700 hover:text-emerald-800 text-sm font-semibold flex items-center space-x-1 transition-all"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-white border border-stone-200 rounded-xl shadow-sm divide-y divide-stone-150 overflow-hidden">
            {data.recentReviews.map((review) => (
              <div key={review._id} className="p-5 hover:bg-stone-50/20 transition-all duration-200 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getSentimentBadgeStyles(review.sentiment)}`}>
                      {getSentimentIcon(review.sentiment)}
                      <span>{review.sentiment}</span>
                    </span>
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                      <Tag className="h-3 w-3 text-stone-500" />
                      <span>{review.category}</span>
                    </span>
                  </div>
                  <span className="text-xs text-stone-400 flex items-center space-x-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(review.createdAt)}</span>
                  </span>
                </div>
                <p className="text-stone-700 text-sm italic line-clamp-2">
                  &ldquo;{review.reviewText}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-4">
          <h2 className="font-bold text-lg text-stone-900 flex items-center space-x-2">
            <Tag className="h-5 w-5 text-emerald-600 animate-pulse" />
            <span>Category Counts</span>
          </h2>

          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm space-y-5">
            {Object.entries(data.categoryCounts).map(([category, count]) => {
              const percentage = Math.round((count / maxCategoryCount) * 100);
              return (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-stone-700">{category}</span>
                    <span className="text-stone-500 font-semibold">{count} reviews</span>
                  </div>
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
