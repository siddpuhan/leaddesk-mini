"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { Download, Circle, Phone, TrendingUp } from "lucide-react";

interface Lead {
  id: number;
  name: string;
  email: string;
  budget: string;
  message: string;
  status: "NEW" | "CONTACTED";
  createdAt: string;
}

export function AnalyticsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/leads")
      .then((r) => {
        if (!r.ok) throw new Error("Failed");
        return r.json();
      })
      .then((data) => {
        setLeads(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="space-y-5">
        <div className="h-7 w-44 bg-white/5 rounded-xl animate-pulse" />
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 bg-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="h-72 bg-white/5 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-sm text-white/40">Failed to load analytics data.</p>
      </div>
    );
  }

  const total = leads.length;
  const newLeads = leads.filter((l) => l.status === "NEW").length;
  const contacted = leads.filter((l) => l.status === "CONTACTED").length;
  const conversionRate = total > 0 ? Math.round((contacted / total) * 100) : 0;

  const statusData = [
    { name: "New", value: newLeads, color: "#22c55e" },
    { name: "Contacted", value: contacted, color: "#3b82f6" },
  ];

  const budgetFreq: Record<string, number> = {};
  leads.forEach((l) => {
    const key = l.budget.toLowerCase();
    if (key.includes("10k") || key.includes("over")) budgetFreq["$10k+"] = (budgetFreq["$10k+"] || 0) + 1;
    else if (key.includes("5k")) budgetFreq["$5k-$10k"] = (budgetFreq["$5k-$10k"] || 0) + 1;
    else budgetFreq["< $5k"] = (budgetFreq["< $5k"] || 0) + 1;
  });
  const budgetData = Object.entries(budgetFreq).map(([name, value]) => ({ name, value }));

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">Analytics</h2>
        <p className="mt-0.5 text-sm text-white/40">Track your lead performance and trends.</p>
      </div>

      <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
        {[
          { label: "Total Leads", value: total, icon: Download, color: "text-purple-400", bg: "bg-purple-500/10" },
          { label: "New", value: newLeads, icon: Circle, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { label: "Contacted", value: contacted, icon: Phone, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Conversion", value: `${conversionRate}%`, icon: TrendingUp, color: "text-amber-400", bg: "bg-amber-500/10" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 hover:bg-white/[0.06] transition"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-white/40 uppercase tracking-wider">{stat.label}</p>
              <div className={`rounded-lg p-2 ${stat.bg}`}>
                <stat.icon size={16} className={stat.color} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5"
        >
          <h3 className="text-sm font-semibold text-white mb-4">Leads by Budget Range</h3>
          <div className="h-64">
            {budgetData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} />
                  <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      background: "#1a1a1a",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "13px",
                    }}
                  />
                  <Bar dataKey="value" fill="#a855f7" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-white/30">
                No data available
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5"
        >
          <h3 className="text-sm font-semibold text-white mb-4">Lead Status Distribution</h3>
          <div className="h-64">
            {statusData.some((d) => d.value > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {statusData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#1a1a1a",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "13px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-white/30">
                No data available
              </div>
            )}
            <div className="flex justify-center gap-6 mt-2">
              {statusData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: entry.color }} />
                  <span className="text-xs text-white/60">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}