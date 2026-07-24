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
    <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50 border-b border-neutral-200">
              <TableHead className="text-xs font-semibold text-neutral-600 uppercase tracking-wider py-3.5 pl-5">
                Lead
              </TableHead>
              <TableHead className="text-xs font-semibold text-neutral-600 uppercase tracking-wider py-3.5 hidden sm:table-cell">
                Budget
              </TableHead>
              <TableHead className="text-xs font-semibold text-neutral-600 uppercase tracking-wider py-3.5">
                Status
              </TableHead>
              <TableHead className="text-xs font-semibold text-neutral-600 uppercase tracking-wider py-3.5 hidden md:table-cell">
                Submitted
              </TableHead>
              <TableHead className="text-xs font-semibold text-neutral-600 uppercase tracking-wider py-3.5 pr-5 w-12">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow
                key={lead.id}
                className="border-b border-neutral-100 hover:bg-neutral-50 transition"
              >
                <TableCell className="py-3.5 pl-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
                      <User size={16} className="text-neutral-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-neutral-900 truncate">
                        {lead.name}
                      </p>
                      <p className="text-xs text-neutral-500 truncate">
                        {lead.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3.5 hidden sm:table-cell">
                  <span className="text-sm font-medium text-neutral-800">
                    {lead.budget}
                  </span>
                </TableCell>
                <TableCell className="py-3.5">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={lead.status} />
                    <StatusDropdown
                      value={lead.status}
                      onChange={(status) => onStatusChange(lead.id, status)}
                      disabled={updatingId === lead.id}
                    />
                  </div>
                </TableCell>
                <TableCell className="py-3.5 hidden md:table-cell">
                  <span className="text-sm text-neutral-500">
                    {getRelativeTime(lead.createdAt)}
                  </span>
                </TableCell>
                <TableCell className="py-3.5 pr-5">
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
    <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-neutral-50 border-b border-neutral-200">
            {Array.from({ length: 5 }).map((_, i) => (
              <TableHead key={i} className="py-3.5 first:pl-5 last:pr-5">
                <div className="h-3 w-16 bg-neutral-200 rounded animate-pulse" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i} className="border-b border-neutral-100">
              {Array.from({ length: 5 }).map((_, j) => (
                <TableCell key={j} className="py-4 first:pl-5 last:pr-5">
                  <div className="h-4 bg-neutral-200 rounded animate-pulse w-3/4" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}