import { cn } from "@/lib/utils";
import { Sparkles, ArrowUpRight, Users, Check } from "lucide-react";

interface EditorialBlockProps {
  number: string;
  icon: "Sparkles" | "ArrowUpRight" | "Users";
  title: string;
  subtitle: string;
  type: "process" | "stat" | "benefits";
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  Sparkles,
  ArrowUpRight,
  Users,
};

function ProcessContent() {
  const steps = [
    { step: "01", label: "Inbound form", desc: "Auto-capture from any source" },
    { step: "02", label: "Auto-enrich", desc: "Context from every touchpoint" },
    { step: "03", label: "Route to team", desc: "Assign in one click" },
  ];

  return (
    <div className="mt-8">
      {steps.map((s, i) => (
        <div key={s.step}>
          <div className="flex items-center gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-lime/20">
              <span className="text-xs font-bold text-lime">{s.step}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-near-black">{s.label}</p>
              <p className="text-xs text-near-black/40">{s.desc}</p>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className="ml-4 flex justify-center py-1.5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-near-black/15">
                <path d="M8 3v10M8 13l-4-4M8 13l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function StatContent() {
  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="text-7xl font-black leading-none tracking-tighter text-near-black lg:text-8xl">
        3<span className="text-lime">x</span>
      </div>
      <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-near-black/40">
        Faster Response
      </p>
      <div className="mt-8 flex w-full gap-1">
        <div className="h-2 flex-1 rounded-full bg-lime" />
        <div className="h-2 flex-1 rounded-full bg-near-black/8" />
        <div className="h-2 flex-1 rounded-full bg-near-black/8" />
      </div>
      <p className="mt-6 max-w-[18ch] text-center text-xs leading-relaxed text-near-black/40">
        Teams using LeadDesk respond to leads{" "}
        <span className="font-semibold text-near-black">3x faster</span>{" "}
        than industry average.
      </p>
    </div>
  );
}

function BenefitsContent() {
  const items = [
    { label: "No duplicates", desc: "Every lead captured once" },
    { label: "Shared view", desc: "One pipeline for everyone" },
    { label: "Real-time", desc: "Updates as they happen" },
  ];

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6">
      {items.map((item) => (
        <div key={item.label} className="flex items-start gap-3">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime/20">
            <Check size={10} className="text-lime" strokeWidth={3} />
          </span>
          <div>
            <p className="text-sm font-semibold text-near-black">{item.label}</p>
            <p className="text-xs text-near-black/40">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function EditorialBlock({
  number,
  icon,
  title,
  subtitle,
  type,
  className,
}: EditorialBlockProps) {
  const Icon = iconMap[icon];

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-near-black/5 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-10",
        type === "stat" && "flex flex-col items-center text-center",
        type === "benefits" && "lg:p-12",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="absolute -top-4 -right-2 text-[8rem] font-black leading-none text-near-black/[0.03] select-none lg:text-[10rem]"
      >
        {number}
      </span>

      <div className="relative z-10">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl bg-near-black text-warm-white shrink-0",
              type === "stat" && "mx-auto",
              type === "benefits" && "h-10 w-10"
            )}
          >
            {Icon && <Icon size={type === "benefits" ? 18 : 20} strokeWidth={1.5} />}
          </div>
          <span
            className={cn(
              "text-xs font-bold tracking-widest text-near-black/20",
              type === "stat" && "hidden"
            )}
          >
            {number}
          </span>
        </div>

        <h3
          className={cn(
            "mt-5 text-2xl font-black tracking-tight text-near-black lg:text-3xl"
          )}
        >
          {title}
        </h3>

        <p
          className={cn(
            "mt-1.5 text-sm leading-relaxed text-near-black/40",
            type === "stat" && "text-xs"
          )}
        >
          {subtitle}
        </p>

        {type === "process" && <ProcessContent />}
        {type === "stat" && <StatContent />}
        {type === "benefits" && <BenefitsContent />}
      </div>
    </div>
  );
}