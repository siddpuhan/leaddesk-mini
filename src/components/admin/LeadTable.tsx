import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "./StatusBadge";
import { StatusDropdown } from "./StatusDropdown";
import { ActionsMenu } from "./ActionsMenu";
import { User } from "lucide-react";

interface Lead {
  id: number;
  name: string;
  email: string;
  budget: string;
  message: string;
  status: "NEW" | "CONTACTED";
  createdAt: Date;
}

interface LeadTableProps {
  leads: Lead[];
  onStatusChange: (id: number, status: "NEW" | "CONTACTED") => void;
  onView: (lead: Lead) => void;
  updatingId: number | null;
}

function getRelativeTime(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

export function LeadTable({
  leads,
  onStatusChange,
  onView,
  updatingId,
}: LeadTableProps) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/[0.06]">
              <TableHead className="text-xs font-semibold text-white/40 uppercase tracking-wider py-3.5 pl-5">
                Lead
              </TableHead>
              <TableHead className="text-xs font-semibold text-white/40 uppercase tracking-wider py-3.5 hidden sm:table-cell">
                Budget
              </TableHead>
              <TableHead className="text-xs font-semibold text-white/40 uppercase tracking-wider py-3.5">
                Status
              </TableHead>
              <TableHead className="text-xs font-semibold text-white/40 uppercase tracking-wider py-3.5 hidden md:table-cell">
                Submitted
              </TableHead>
              <TableHead className="py-3.5 pr-5 w-12">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead, i) => (
              <TableRow
                key={lead.id}
                className="border-b border-white/[0.04] hover:bg-white/[0.02] transition cursor-pointer"
                onClick={() => onView(lead)}
              >
                <TableCell className="py-3.5 pl-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <User size={16} className="text-white/40" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {lead.name}
                      </p>
                      <p className="text-xs text-white/40 truncate">
                        {lead.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3.5 hidden sm:table-cell">
                  <span className="text-sm font-medium text-white/80">
                    {lead.budget}
                  </span>
                </TableCell>
                <TableCell className="py-3.5">
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <StatusBadge status={lead.status} />
                    <StatusDropdown
                      value={lead.status}
                      onChange={(status) => onStatusChange(lead.id, status)}
                      disabled={updatingId === lead.id}
                    />
                  </div>
                </TableCell>
                <TableCell className="py-3.5 hidden md:table-cell">
                  <span className="text-sm text-white/40">
                    {getRelativeTime(lead.createdAt)}
                  </span>
                </TableCell>
                <TableCell className="py-3.5 pr-5" onClick={(e) => e.stopPropagation()}>
                  <ActionsMenu
                    onView={() => onView(lead)}
                    email={lead.email}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function LeadTableSkeleton() {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-white/[0.06]">
            {Array.from({ length: 5 }).map((_, i) => (
              <TableHead key={i} className="py-3.5 first:pl-5 last:pr-5">
                <div className="h-3 w-16 bg-white/5 rounded animate-pulse" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i} className="border-b border-white/[0.04]">
              {Array.from({ length: 5 }).map((_, j) => (
                <TableCell key={j} className="py-4 first:pl-5 last:pr-5">
                  <div className="h-4 bg-white/5 rounded animate-pulse w-3/4" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}