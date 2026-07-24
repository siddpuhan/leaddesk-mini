import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface StatsCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  description: string;
  trend: string;
  trendUp: boolean;
  accent: "purple" | "emerald" | "blue";
}

const accentStyles: Record<string, { icon: string; dot: string }> = {
  purple: {
    icon: "bg-purple-500/10 text-purple-400",
    dot: "bg-purple-400",
  },
  emerald: {
    icon: "bg-emerald-500/10 text-emerald-400",
    dot: "bg-emerald-400",
  },
  blue: {
    icon: "bg-blue-500/10 text-blue-400",
    dot: "bg-blue-400",
  },
};

const fallbackStyle = { icon: "bg-white/5 text-white/40", dot: "bg-white/40" };

export function StatsCard({
  label,
  value,
  icon: Icon,
  description,
  trend,
  trendUp,
  accent,
}: StatsCardProps) {
  const style = accentStyles[accent] ?? fallbackStyle;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 transition-shadow hover:shadow-lg hover:shadow-purple-500/5 hover:border-white/[0.1]"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-white/40 uppercase tracking-wider">
            {label}
          </p>
          <p className="text-3xl font-bold tracking-tight text-white">
            {value}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/40">{description}</span>
            <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-400">
              <ArrowUpRight size={12} />
              {trend}
            </span>
          </div>
        </div>
        <div className={`rounded-lg p-2.5 ${style.icon}`}>
          <Icon size={20} />
        </div>
      </div>
    </motion.div>
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="h-3 w-20 bg-white/5 rounded animate-pulse" />
          <div className="h-8 w-12 bg-white/5 rounded animate-pulse" />
          <div className="h-3 w-24 bg-white/5 rounded animate-pulse" />
        </div>
        <div className="h-10 w-10 rounded-lg bg-white/5 animate-pulse" />
      </div>
    </div>
  );
}