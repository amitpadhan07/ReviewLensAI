import { History } from "lucide-react";

export default function HistoryPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <div className="p-4 bg-emerald-50 text-emerald-800 rounded-full">
        <History className="h-10 w-10 text-emerald-600 animate-pulse" />
      </div>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-stone-900">Review History</h1>
        <p className="text-stone-500 max-w-sm text-sm leading-relaxed">
          The guest review database records list, search controls, and filter tables will be implemented on Day 6.
        </p>
      </div>
    </div>
  );
}
