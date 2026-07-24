"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StatusDropdownProps {
  value: "NEW" | "CONTACTED";
  onChange: (value: "NEW" | "CONTACTED") => void;
  disabled?: boolean;
}

export function StatusDropdown({
  value,
  onChange,
  disabled,
}: StatusDropdownProps) {
  return (
    <Select
      value={value}
      onValueChange={(v) => onChange(v as "NEW" | "CONTACTED")}
      disabled={disabled}
    >
      <SelectTrigger
        className={`w-[100px] h-7 text-xs font-medium border rounded-md bg-transparent ${
          value === "NEW"
            ? "border-emerald-500/20 text-emerald-400"
            : "border-blue-500/20 text-blue-400"
        }`}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-[#1a1a1a] border-white/[0.08] text-white">
        <SelectItem value="NEW" className="text-xs text-white/80 hover:text-white hover:bg-white/5">
          NEW
        </SelectItem>
        <SelectItem value="CONTACTED" className="text-xs text-white/80 hover:text-white hover:bg-white/5">
          CONTACTED
        </SelectItem>
      </SelectContent>
    </Select>
  );
}