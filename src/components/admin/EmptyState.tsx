import Link from "next/link";
import { Inbox } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-16 h-16 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
        <Inbox size={28} className="text-white/30" />
      </div>
      <h3 className="text-lg font-semibold text-white">No leads yet</h3>
      <p className="mt-1 text-sm text-white/40 text-center max-w-sm">
        Your submitted leads will appear here. Go to the landing page to submit
        your first lead.
      </p>
      <Link
        href="/"
        className="mt-5 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/15 transition"
      >
        Go to Landing Page
      </Link>
    </div>
  );
}