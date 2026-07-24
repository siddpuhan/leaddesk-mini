"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Sparkles,
  ArrowUpRight,
  Users,
  Zap,
  Check,
  Clock,
  MoreHorizontal,
  Circle,
  ChevronRight,
} from "lucide-react";

interface FeatureCardProps {
  number: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  className?: string;
  children: React.ReactNode;
}

function FeatureCard({ number, icon, title, subtitle, className, children }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className={`group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-lime/5 ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute -top-6 -right-4 text-[10rem] font-black leading-none text-white/[0.03] select-none pointer-events-none lg:text-[12rem]"
      >
        {number}
      </span>

      <div className="relative z-10 p-8 sm:p-10 lg:p-12">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime/10 text-lime ring-1 ring-lime/20">
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white sm:text-2xl">{title}</h3>
            <p className="text-sm text-white/40">{subtitle}</p>
          </div>
        </div>
        {children}
      </div>
    </motion.div>
  );
}

function MiniLeadsTable() {
  const rows = [
    { name: "Sarah Chen", email: "sarah@acme.co", budget: "$25k+", status: "NEW" },
    { name: "Marcus Kim", email: "marcus@build.co", budget: "$10k+", status: "NEW" },
  ];
  return (
    <div className="mt-8 rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-lime" />
          <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Live Inbox</span>
        </div>
        <span className="text-[10px] text-white/30">3 new today</span>
      </div>
      {rows.map((row, i) => (
        <div
          key={row.name}
          className="flex items-center justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors border-b border-white/[0.04] last:border-0"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-lime/30 to-lime/10 flex items-center justify-center text-[10px] font-bold text-lime">
              {row.name.charAt(0)}{row.name.split(" ")[1].charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-white">{row.name}</p>
              <p className="text-xs text-white/30">{row.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/30">{row.budget}</span>
            <span className="px-2 py-0.5 rounded-full bg-lime/10 text-[10px] font-semibold text-lime border border-lime/20">
              {row.status}
            </span>
          </div>
        </div>
      ))}
      <div className="px-4 py-3 border-t border-white/[0.06]">
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-2 border-[#0a0a0a] bg-gradient-to-br from-white/20 to-white/5"
              />
            ))}
            <div className="w-6 h-6 rounded-full border-2 border-[#0a0a0a] bg-lime/10 flex items-center justify-center text-[8px] font-bold text-lime">
              +2
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-white/30">
            <Zap size={12} className="text-lime/60" />
            Auto-assigned
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniStats() {
  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
        <span className="text-xs text-white/40">Response time</span>
        <span className="text-sm font-bold text-lime">2.4m avg</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/40">Pipeline progress</span>
          <span className="text-xs text-white/30">3 of 8</span>
        </div>
        <div className="flex gap-1">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-colors ${
                i < 3 ? "bg-lime/60" : "bg-white/[0.06]"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "New", value: "12", color: "text-lime" },
          { label: "Active", value: "8", color: "text-white" },
          { label: "Closed", value: "$48k", color: "text-lime" },
        ].map((s) => (
          <div key={s.label} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
            <p className={`text-lg font-black ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-white/30">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniTimeline() {
  const items = [
    {
      initials: "SC",
      name: "Sarah Chen",
      action: "moved to Contract Sent",
      time: "2m ago",
      color: "text-lime",
      bg: "bg-lime/10",
    },
    {
      initials: "MK",
      name: "Marcus Kim",
      action: "scheduled a demo",
      time: "15m ago",
      color: "text-white",
      bg: "bg-white/10",
    },
    {
      initials: "AJ",
      name: "Amara Johnson",
      action: "submitted proposal",
      time: "1h ago",
      color: "text-white",
      bg: "bg-white/10",
    },
  ];

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-white/30" />
          <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Activity</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-white/30">
          <MoreHorizontal size={12} />
        </div>
      </div>
      <div className="space-y-0">
        {items.map((item, i) => (
          <div key={item.name} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full ${item.bg} flex items-center justify-center text-[10px] font-bold ${item.color} ring-1 ring-white/[0.06]`}
              >
                {item.initials}
              </div>
              {i < items.length - 1 && <div className="w-px flex-1 bg-white/[0.06] my-1" />}
            </div>
            <div className="pb-5 pt-0.5">
              <p className="text-sm text-white">
                <span className="font-medium">{item.name}</span>{" "}
                <span className="text-white/40">{item.action}</span>
              </p>
              <p className="text-xs text-white/20 mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2 text-xs text-lime/70">
        <Check size={12} strokeWidth={3} />
        <span>All leads followed up</span>
      </div>
    </div>
  );
}

function MiniDealStages() {
  const stages = [
    { label: "Inbound", active: true, complete: true },
    { label: "Contacted", active: true, complete: true },
    { label: "Qualified", active: true, complete: false },
    { label: "Proposal", active: false, complete: false },
    { label: "Closed", active: false, complete: false },
  ];

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-5">
        <Users size={14} className="text-white/30" />
        <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Deal Stages</span>
      </div>
      <div className="flex items-center gap-0">
        {stages.map((stage, i) => (
          <div key={stage.label} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-500 ${
                  stage.complete
                    ? "bg-lime text-near-black shadow-[0_0_12px_rgba(212,247,74,0.15)]"
                    : stage.active
                    ? "bg-lime/20 text-lime ring-1 ring-lime/30"
                    : "bg-white/[0.04] text-white/20"
                }`}
              >
                {stage.complete ? <Check size={12} strokeWidth={3} /> : i + 1}
              </div>
              <span
                className={`text-[9px] font-semibold uppercase tracking-wider ${
                  stage.active || stage.complete ? "text-white/50" : "text-white/15"
                }`}
              >
                {stage.label}
              </span>
            </div>
            {i < stages.length - 1 && (
              <div
                className={`h-px flex-1 mx-1 ${
                  stage.complete ? "bg-lime/40" : "bg-white/[0.06]"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between p-3 rounded-xl bg-lime/[0.03] border border-lime/10">
        <span className="text-xs text-white/40">Deal value</span>
        <span className="text-sm font-bold text-lime">$84,500</span>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.4]);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative overflow-hidden bg-near-black py-24 sm:py-32 lg:py-40"
    >
      <div className="absolute top-1/4 left-0 h-[400px] w-[400px] rounded-full border border-white/[0.03] -translate-x-1/2" />
      <div className="absolute bottom-1/3 right-[5%] h-[200px] w-[200px] rounded-full bg-lime/[0.02] blur-3xl" />
      <div className="absolute top-[20%] right-[10%]" aria-hidden="true">
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-2 w-2 rounded-full border border-white/[0.06]" />
          ))}
        </div>
      </div>

      <motion.div style={{ opacity }} className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 sm:mb-20"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-lime/60">
            Why LeadDesk
          </span>
          <h2 className="mt-5 text-5xl font-black leading-[0.9] tracking-tighter text-white sm:text-6xl lg:text-7xl">
            From First
            <br />
            <span className="text-lime">Click to Closed.</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-12">
          <FeatureCard
            number="01"
            icon={<Sparkles size={20} />}
            title="Capture Leads"
            subtitle="From first touch to first contact"
            className="lg:col-span-7"
          >
            <MiniLeadsTable />
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-4 flex items-center gap-2 text-xs text-white/30"
            >
              <Zap size={12} className="text-lime/60" />
              Auto-captured from landing page form
              <span className="ml-auto flex items-center gap-1 text-lime/60">
                View all <ChevronRight size={12} />
              </span>
            </motion.div>
          </FeatureCard>

          <FeatureCard
            number="02"
            icon={<ArrowUpRight size={20} />}
            title="Track Pipeline"
            subtitle="Know where every deal stands"
            className="lg:col-span-5 lg:row-span-2"
          >
            <MiniStats />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-4 flex items-center justify-between p-2 rounded-lg bg-white/[0.02]"
            >
              <span className="text-[10px] text-white/30">Conversion rate</span>
              <span className="text-xs font-bold text-lime">64%</span>
            </motion.div>
          </FeatureCard>

          <FeatureCard
            number="03"
            icon={<Users size={20} />}
            title="Close Deals"
            subtitle="Together, in real time"
            className="lg:col-span-12"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <MiniTimeline />
              <MiniDealStages />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-6 p-4 rounded-xl bg-gradient-to-r from-lime/[0.03] to-transparent border border-lime/10"
            >
              <div className="flex items-center gap-3">
                <Check size={16} className="text-lime shrink-0" strokeWidth={3} />
                <p className="text-sm text-white/70">
                  <span className="font-semibold text-white">3 deals closed</span> this week &mdash;{" "}
                  <span className="text-lime">$12,400</span> in pipeline value
                </p>
              </div>
            </motion.div>
          </FeatureCard>
        </div>
      </motion.div>
    </section>
  );
}