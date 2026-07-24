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

const statusStyles: Record<string, string> = {
  NEW: "border-blue-200 bg-blue-50 text-blue-700",
  CONTACTED: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

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
        className={`w-[130px] h-8 text-xs font-medium border rounded-md ${statusStyles[value]}`}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="NEW" className="text-xs">
          NEW
        </SelectItem>
        <SelectItem value="CONTACTED" className="text-xs">
          CONTACTED
        </SelectItem>
      </SelectContent>
    </Select>
  );
}