"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Mail, MoreHorizontal, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface ActionsMenuProps {
  onView: () => void;
  email: string;
}

export function ActionsMenu({ onView, email }: ActionsMenuProps) {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      toast.success("Email copied to clipboard");
    } catch {
      toast.error("Failed to copy email");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center w-8 h-8 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition">
          <MoreHorizontal size={16} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 bg-[#1a1a1a] border-white/[0.08]">
        <DropdownMenuItem onClick={onView} className="text-white/80 hover:text-white hover:bg-white/5">
          <Eye size={15} />
          View Lead
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyEmail} className="text-white/80 hover:text-white hover:bg-white/5">
          <Mail size={15} />
          Copy Email
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/[0.06]" />
        <DropdownMenuItem className="text-white/40 hover:text-white hover:bg-white/5" disabled>
          <RefreshCw size={15} />
          Change Status
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}