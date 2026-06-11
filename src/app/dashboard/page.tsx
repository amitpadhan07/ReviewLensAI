import { LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <div className="p-4 bg-emerald-50 text-emerald-800 rounded-full">
        <LayoutDashboard className="h-10 w-10 text-emerald-600 animate-pulse" />
      </div>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-stone-900">Analytics Dashboard</h1>
        <p className="text-stone-500 max-w-sm text-sm leading-relaxed">
          The analytics charts, summary cards, and recent review listings will be implemented on Day 5.
        </p>
      </div>
    </div>
  );
}
