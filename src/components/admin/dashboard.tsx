"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { toast } from "sonner";
import {
  Download,
  Circle,
  Phone,
  ChevronDown,
} from "lucide-react";
import { StatsCard, StatsCardSkeleton } from "./StatsCard";
import { SearchBar } from "./SearchBar";
import { LeadTable, LeadTableSkeleton } from "./LeadTable";
import { EmptyState } from "./EmptyState";
import { LeadDialog } from "./LeadDialog";
import { Sidebar } from "./Sidebar";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-neutral-900">Failed to load dashboard</h2>
          <p className="mt-1 text-sm text-neutral-500">Could not connect to the server. Please try again.</p>
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
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-scope flex min-h-screen bg-neutral-50">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur-xl">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg text-neutral-500 hover:bg-neutral-100"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
              <div className="hidden sm:block">
                <h1 className="text-base font-bold text-neutral-900">LeadDesk Mini</h1>
                <p className="text-[11px] text-neutral-500 -mt-0.5">CRM Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isLoaded && (
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 rounded-full border-2 border-neutral-200",
                      userButtonTrigger: "focus:shadow-outline",
                    },
                  }}
                >
                </UserButton>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="max-w-6xl mx-auto space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
                {getGreeting()}{isLoaded && user?.firstName ? `, ${user.firstName}` : ""} 👋
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                Here&apos;s an overview of your incoming leads.
              </p>
            </div>

            {loading ? (
              <div className="grid gap-4 sm:grid-cols-3">
                <StatsCardSkeleton />
                <StatsCardSkeleton />
                <StatsCardSkeleton />
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-3">
                <StatsCard
                  label="Total Leads"
                  value={stats.total}
                  icon={Download}
                  description={`${stats.new} new, ${stats.contacted} contacted`}
                  accent="blue"
                />
                <StatsCard
                  label="New Leads"
                  value={stats.new}
                  icon={Circle}
                  description={stats.new > 0 ? "Needs follow-up" : "All caught up"}
                  accent="emerald"
                />
                <StatsCard
                  label="Contacted"
                  value={stats.contacted}
                  icon={Phone}
                  description={stats.total > 0 ? `${Math.round((stats.contacted / stats.total) * 100)}% completed` : "No data"}
                  accent="amber"
                />
              </div>
            )}

            {!loading && (
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <SearchBar value={search} onChange={setSearch} />
                </div>
              </div>
            )}

            {loading ? (
              <div>
                <div className="mb-4">
                  <div className="h-5 w-16 bg-neutral-200 rounded animate-pulse" />
                </div>
                <LeadTableSkeleton />
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState />
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-neutral-500">
                    {filtered.length} lead{filtered.length !== 1 ? "s" : ""}
                    {search ? ` matching "${search}"` : ""}
                  </p>
                </div>
                <LeadTable
                  leads={filtered}
                  onStatusChange={handleStatusChange}
                  onView={handleView}
                  updatingId={updatingId}
                />
              </div>
            )}
          </div>
        </main>

        <footer className="border-t border-neutral-200 bg-white px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-neutral-400">
              LeadDesk Mini — CRM Dashboard
            </p>
            <div className="flex items-center gap-3 text-xs text-neutral-400">
              <span>Powered by</span>
              <span className="font-medium text-neutral-500">Next.js</span>
              <span className="text-neutral-300">·</span>
              <span className="font-medium text-neutral-500">Clerk</span>
              <span className="text-neutral-300">·</span>
              <span className="font-medium text-neutral-500">Turso</span>
              <span className="text-neutral-300">·</span>
              <span className="font-medium text-neutral-500">Drizzle</span>
            </div>
          </div>
        </footer>
      </div>

      <LeadDialog
        lead={selectedLead}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}