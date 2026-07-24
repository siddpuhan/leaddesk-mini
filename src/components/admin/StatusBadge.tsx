interface StatusBadgeProps {
  status: "NEW" | "CONTACTED";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (status === "NEW") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        NEW
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400 border border-blue-500/20">
      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
      CONTACTED
    </span>
  );
}