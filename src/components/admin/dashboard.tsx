"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Download, Circle, Phone } from "lucide-react";
import { StatsCard, StatsCardSkeleton } from "./StatsCard";
import { SearchBar } from "./SearchBar";
import { LeadTable, LeadTableSkeleton } from "./LeadTable";
import { EmptyState } from "./EmptyState";
import { LeadDialog } from "./LeadDialog";

interface Lead {
  id: number;
  name: string;
  email: string;
  budget: string;
  message: string;
  status: "NEW" | "CONTACTED";
  createdAt: Date;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function AdminDashboard() {
  const { user, isLoaded } = useUser();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json();
      })
      .then((data) => {
        setLeads(data.map((l: Lead) => ({ ...l, createdAt: new Date(l.createdAt) })));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
        toast.error("Failed to load leads");
      });
  }, []);

  const filtered = useMemo(
    () =>
      leads.filter((lead) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
          lead.name.toLowerCase().includes(q) ||
          lead.email.toLowerCase().includes(q)
        );
      }),
    [leads, search]
  );

  const stats = useMemo(
    () => ({
      total: leads.length,
      new: leads.filter((l) => l.status === "NEW").length,
      contacted: leads.filter((l) => l.status === "CONTACTED").length,
    }),
    [leads]
  );

  const handleStatusChange = useCallback(
    async (id: number, status: "NEW" | "CONTACTED") => {
      setUpdatingId(id);
      const previous = leads;
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status } : l))
      );

      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      setUpdatingId(null);

      if (!res.ok) {
        setLeads(previous);
        toast.error("Failed to update status");
        return;
      }

      toast.success("Status updated");
    },
    [leads]
  );

  const handleView = useCallback((lead: Lead) => {
    setSelectedLead(lead);
    setDialogOpen(true);
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <h2 className="text-base font-semibold text-white">Failed to load dashboard</h2>
          <p className="mt-1 text-sm text-white/40">Could not connect to the server.</p>
          <button
            onClick={() => {
              setError(false);
              setLoading(true);
              fetch("/api/leads")
                .then((res) => res.json())
                .then((data) => {
                  setLeads(data);
                  setLoading(false);
                })
                .catch(() => {
                  setError(true);
                  setLoading(false);
                  toast.error("Failed to load leads");
                });
            }}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/15 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          {getGreeting()}{isLoaded && user?.firstName ? `, ${user.firstName}` : ""} 👋
        </h2>
        <p className="mt-0.5 text-sm text-white/40">
          Welcome back. Here&apos;s what&apos;s happening with your leads today.
        </p>
      </motion.div>

      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-3 sm:grid-cols-3"
        >
          <StatsCardSkeleton />
          <StatsCardSkeleton />
          <StatsCardSkeleton />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="grid gap-3 sm:grid-cols-3"
        >
          <StatsCard
            label="Total Leads"
            value={stats.total}
            icon={Download}
            description="All time submissions"
            trend={`+${stats.new} new`}
            trendUp={stats.new > 0}
            accent="purple"
          />
          <StatsCard
            label="New Leads"
            value={stats.new}
            icon={Circle}
            description={stats.new > 0 ? "Needs follow-up" : "All caught up"}
            trend={`${stats.total > 0 ? Math.round((stats.new / stats.total) * 100) : 0}%`}
            trendUp={stats.new > 0}
            accent="emerald"
          />
          <StatsCard
            label="Contacted"
            value={stats.contacted}
            icon={Phone}
            description="Followed up with"
            trend={`${stats.total > 0 ? Math.round((stats.contacted / stats.total) * 100) : 0}% completed`}
            trendUp={stats.contacted > 0}
            accent="blue"
          />
        </motion.div>
      )}

      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          <SearchBar value={search} onChange={setSearch} />
        </motion.div>
      )}

      {loading ? (
        <div>
          <div className="h-4 w-16 bg-white/5 rounded animate-pulse mb-3" />
          <LeadTableSkeleton />
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <EmptyState />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-white/40">
              {filtered.length} lead{filtered.length !== 1 ? "s" : ""}
              {search ? ` matching &quot;${search}&quot;` : ""}
            </p>
          </div>
          <LeadTable
            leads={filtered}
            onStatusChange={handleStatusChange}
            onView={handleView}
            updatingId={updatingId}
          />
        </motion.div>
      )}

      <LeadDialog
        lead={selectedLead}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}