import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative group">
      <Search
        size={16}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none group-focus-within:text-purple-400 transition"
      />
      <input
        type="text"
        placeholder="Search leads by name or email..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-16 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-sm text-white placeholder-white/30 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition"
      />
      <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md border border-white/[0.06] bg-white/[0.03] text-[10px] font-medium text-white/30">
        <span className="text-[9px]">⌘</span>K
      </kbd>
    </div>
  );
}