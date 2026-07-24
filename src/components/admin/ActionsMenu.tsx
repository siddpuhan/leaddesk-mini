"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Mail, MoreHorizontal } from "lucide-react";
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
        <button className="flex items-center justify-center w-8 h-8 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition">
          <MoreHorizontal size={16} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={onView}>
          <Eye size={15} />
          View details
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={copyEmail}>
          <Mail size={15} />
          Copy email
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}