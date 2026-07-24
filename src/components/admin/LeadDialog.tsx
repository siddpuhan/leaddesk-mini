import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StatusBadge } from "./StatusBadge";

interface Lead {
  id: number;
  name: string;
  email: string;
  budget: string;
  message: string;
  status: "NEW" | "CONTACTED";
  createdAt: Date;
}

interface LeadDialogProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function LeadDialog({ lead, open, onOpenChange }: LeadDialogProps) {
  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Lead Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-900">{lead.name}</p>
              <p className="text-xs text-neutral-500">{lead.email}</p>
            </div>
            <StatusBadge status={lead.status} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-neutral-50 p-3">
              <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Budget</p>
              <p className="mt-1 text-sm font-semibold text-neutral-900">{lead.budget}</p>
            </div>
            <div className="rounded-lg bg-neutral-50 p-3">
              <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Submitted</p>
              <p className="mt-1 text-sm font-semibold text-neutral-900">{formatDate(lead.createdAt)}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">Message</p>
            <div className="rounded-lg bg-neutral-50 p-3">
              <p className="text-sm text-neutral-700 leading-relaxed">{lead.message}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}