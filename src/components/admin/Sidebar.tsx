"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  ExternalLink,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

function NavLink({
  href,
  icon: Icon,
  label,
  active,
  onClick,
}: {
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
        active
          ? "text-white"
          : "text-white/40 hover:text-white hover:bg-white/[0.04]"
      }`}
    >
      {active && (
        <motion.span
          layoutId="sidebarActive"
          className="absolute left-0 w-1 h-6 rounded-full bg-purple-400 shadow-sm shadow-purple-500/50"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <Icon
        size={18}
        className={`shrink-0 transition-colors duration-200 ${
          active
            ? "text-purple-400"
            : "text-white/30 group-hover:text-white/60"
        }`}
      />
      <span>{label}</span>
    </Link>
  );
}

function SidebarContent({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 h-16 shrink-0">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition-transform duration-200 group-hover:scale-105">
            L
          </div>
          <div>
            <p className="text-sm font-bold text-white">LeadDesk Mini</p>
            <p className="text-[10px] text-white/40 -mt-0.5">CRM Dashboard</p>
          </div>
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.label}
            href={item.href}
            icon={item.icon}
            label={item.label}
            active={pathname === item.href}
            onClick={onClose}
          />
        ))}

        <div className="pt-6 mt-6 border-t border-white/[0.06]">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-white/[0.04] transition-all duration-200 group"
          >
            <ExternalLink
              size={18}
              className="text-white/30 group-hover:text-white/60 shrink-0 transition-colors duration-200"
            />
            <span>Landing Page</span>
          </Link>
        </div>
      </nav>

      <div className="px-3 py-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl">
          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  "w-8 h-8 rounded-full ring-2 ring-white/10 hover:ring-purple-500/50 transition-all duration-200",
              },
            }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.firstName ||
                user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] ||
                "User"}
            </p>
            <p className="text-xs text-white/40 truncate">
              {user?.emailAddresses?.[0]?.emailAddress || ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/[0.06] bg-[#0d0d0d] h-screen sticky top-0 shrink-0">
        <SidebarContent onClose={onClose} />
      </aside>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-64 h-full bg-[#0d0d0d] border-r border-white/[0.06]"
            >
              <SidebarContent onClose={onClose} />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}