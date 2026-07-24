"use client";

import { UserButton } from "@clerk/nextjs";
import { Bell, Menu } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0d0d0d]/80 backdrop-blur-xl">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition"
          >
            <Menu size={20} />
          </button>
          <div className="hidden sm:block">
            <h1 className="text-base font-bold text-white">LeadDesk Mini</h1>
            <p className="text-[11px] text-white/40 -mt-0.5">CRM Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500 ring-2 ring-[#0d0d0d]" />
          </button>
          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  "w-8 h-8 rounded-full ring-2 ring-white/10 hover:ring-purple-500/50 transition-all",
                userButtonTrigger: "focus:shadow-outline",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}