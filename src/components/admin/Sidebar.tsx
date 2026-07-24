import Link from "next/link";
import {
  LayoutDashboard,
  Mail,
  Settings,
  ExternalLink,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Leads", href: "/admin", icon: Mail },
  { label: "Settings", href: "#", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-neutral-200 bg-white h-screen sticky top-0">
      <div className="flex items-center gap-3 px-6 h-16 border-b border-neutral-200">
        <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center text-sm font-bold text-white">
          L
        </div>
        <div>
          <p className="text-sm font-bold text-neutral-900">LeadDesk Mini</p>
          <p className="text-[10px] text-neutral-500 -mt-0.5">CRM Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition"
          >
            <item.icon size={18} className="text-neutral-500" />
            {item.label}
          </Link>
        ))}

        <div className="pt-4 mt-4 border-t border-neutral-200">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition"
          >
            <ExternalLink size={18} className="text-neutral-500" />
            Landing Page
          </Link>
        </div>
      </nav>

      <div className="px-3 py-4 border-t border-neutral-200">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition cursor-pointer">
          <LogOut size={18} />
          Logout
        </div>
      </div>
    </aside>
  );
}