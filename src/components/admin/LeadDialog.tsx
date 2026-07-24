import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StatusBadge } from "./StatusBadge";
import { User, Mail, Wallet, Clock, MessageSquare } from "lucide-react";

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

const fields = [
  { label: "Name", icon: User, key: "name" as const },
  { label: "Email", icon: Mail, key: "email" as const },
  { label: "Budget", icon: Wallet, key: "budget" as const },
  { label: "Submitted", icon: Clock, key: "createdAt" as const },
];

export function LeadDialog({ lead, open, onOpenChange }: LeadDialogProps) {
  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#141414] border-white/[0.08] text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Lead Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                <User size={18} className="text-white/60" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{lead.name}</p>
                <p className="text-xs text-white/40">{lead.email}</p>
              </div>
            </div>
            <StatusBadge status={lead.status} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {fields.map((field) => {
              const value =
                field.key === "createdAt"
                  ? formatDate(lead.createdAt)
                  : lead[field.key];
              return (
                <div
                  key={field.key}
                  className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <field.icon size={12} className="text-white/30" />
                    <p className="text-[10px] font-medium text-white/40 uppercase tracking-wider">
                      {field.label}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-white">{value}</p>
                </div>
              );
            })}
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <MessageSquare size={12} className="text-white/30" />
              <p className="text-[10px] font-medium text-white/40 uppercase tracking-wider">
                Message
              </p>
            </div>
            <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3">
              <p className="text-sm text-white/70 leading-relaxed">
                {lead.message}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}