import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  description: string;
  accent: "emerald" | "blue" | "amber";
}

const accentStyles = {
  emerald: {
    icon: "bg-emerald-100 text-emerald-600",
    text: "text-emerald-600",
  },
  blue: {
    icon: "bg-blue-100 text-blue-600",
    text: "text-blue-600",
  },
  amber: {
    icon: "bg-amber-100 text-amber-600",
    text: "text-amber-600",
  },
};

export function StatsCard({
  label,
  value,
  icon: Icon,
  description,
  accent,
}: StatsCardProps) {
  const style = accentStyles[accent];

  return (
    <Card className="bg-white border-neutral-200 transition-shadow hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
              {label}
            </p>
            <p className="text-3xl font-bold text-neutral-900">{value}</p>
            <p className="text-xs text-neutral-500">{description}</p>
          </div>
          <div className={`rounded-lg p-2.5 ${style.icon}`}>
            <Icon size={20} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsCardSkeleton() {
  return (
    <Card className="bg-white border-neutral-200">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-3 w-20 bg-neutral-200" />
            <Skeleton className="h-8 w-12 bg-neutral-200" />
            <Skeleton className="h-3 w-24 bg-neutral-200" />
          </div>
          <Skeleton className="h-10 w-10 rounded-lg bg-neutral-200" />
        </div>
      </CardContent>
    </Card>
  );
}