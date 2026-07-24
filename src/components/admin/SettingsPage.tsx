"use client";

import { UserProfile, useUser, useClerk } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  User,
  Monitor,
  Bell,
  Palette,
  Shield,
  LogOut,
  ChevronRight,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";

const SETTINGS_TABS = [
  { id: "profile", label: "Profile & Account", icon: User },
  { id: "application", label: "Application", icon: Monitor },
  { id: "danger", label: "Danger Zone", icon: Shield },
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-white/40">Manage your account and application preferences.</p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Sidebar Navigation */}
        <motion.nav
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05 }}
          className="space-y-1"
        >
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-2">
            {SETTINGS_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white bg-white/10"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={17} className={isActive ? "text-purple-400" : "text-white/30"} />
                  <span>{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="settingsTabIndicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.nav>

        {/* Content Panel */}
        <div className="min-w-0 space-y-8">
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden"
            >
              <div className="p-6 sm:p-8 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-purple-500/10 p-2.5">
                    <User size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Profile & Account</h2>
                    <p className="text-sm text-white/40">Manage your profile information and account security.</p>
                  </div>
                </div>
              </div>
              <div className="p-6 sm:p-8 pt-6">
                <UserProfile
                  routing="hash"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "bg-transparent shadow-none border-0 p-0",
                      header: "hidden",
                      profilePage: "p-0",
                      navbar: "hidden",
                      pageScrollBox: "p-0",
                      formFieldInput:
                        "bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500",
                      formFieldLabel: "text-white/60 text-sm",
                      formButtonPrimary:
                        "bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-medium shadow-lg shadow-purple-500/20 transition-all",
                      formHeaderTitle: "text-white text-base font-semibold",
                      formHeaderSubtitle: "text-white/40 text-sm",
                      profileSectionTitle: "text-white text-sm font-semibold",
                      profileSectionSubtitle: "text-white/40 text-xs",
                      profileSectionContent: "text-white/80 text-sm",
                      profileSection: "border border-white/[0.06] rounded-xl p-4 mb-3 bg-white/[0.02]",
                      avatarImage: "ring-2 ring-white/10 rounded-full",
                      avatarUploader: "text-purple-400",
                      menuList: "bg-[#141414] border border-white/[0.06] rounded-xl shadow-xl",
                      menuItem: "text-white/80 hover:bg-white/5 text-sm",
                      menuTrigger: "text-white/60 hover:text-white",
                      badge: "bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full px-2 py-0.5 text-xs",
                      scrollBox: "p-0",
                      socialButtonsBlockButton:
                        "bg-white/5 border border-white/10 rounded-xl text-white text-sm hover:bg-white/10 transition",
                      dividerLine: "bg-white/[0.06]",
                      dividerText: "text-white/30 text-xs",
                      footer: "hidden",
                      otpCodeFieldInput: "bg-white/5 border border-white/10 rounded-xl text-white",
                      alert: "bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm",
                      alertText: "text-red-400",
                      profileSectionContentText: "text-white/80",
                      profileSectionPrimaryButton: "text-purple-400 hover:text-purple-300 text-sm",
                    },
                  }}
                />
              </div>
            </motion.div>
          )}

          {activeTab === "application" && (
            <motion.div
              key="application"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Theme Card */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="rounded-xl bg-amber-500/10 p-2.5">
                    <Palette size={20} className="text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Theme</h2>
                    <p className="text-sm text-white/40">Customize your dashboard appearance.</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                      <Sparkles size={15} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Dark Mode</p>
                      <p className="text-xs text-white/40">Currently active</p>
                    </div>
                  </div>
                  <div className="w-10 h-6 rounded-full bg-purple-500/30 border border-purple-500/50 relative">
                    <div className="absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-purple-400 shadow" />
                  </div>
                </div>
              </div>

              {/* Notifications Card */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="rounded-xl bg-blue-500/10 p-2.5">
                    <Bell size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Notifications</h2>
                    <p className="text-sm text-white/40">Manage your notification preferences.</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "New lead notifications", description: "Get notified when a new lead submits a form" },
                    { label: "Status change alerts", description: "Receive updates when lead statuses change" },
                    { label: "Weekly summary", description: "Get a weekly digest of your lead activity" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] opacity-50"
                    >
                      <div>
                        <p className="text-sm font-medium text-white">{item.label}</p>
                        <p className="text-xs text-white/40">{item.description}</p>
                      </div>
                      <div className="w-10 h-6 rounded-full bg-white/10 border border-white/[0.06] relative">
                        <div className="absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white/20 shadow" />
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-white/30 text-center pt-2">Notification preferences coming soon</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "danger" && (
            <motion.div
              key="danger"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-red-500/20 bg-red-500/[0.02] overflow-hidden"
            >
              <div className="p-6 sm:p-8 border-b border-red-500/10">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-red-500/10 p-2.5">
                    <Shield size={20} className="text-red-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-red-400">Danger Zone</h2>
                    <p className="text-sm text-white/40">Destructive actions that cannot be undone.</p>
                  </div>
                </div>
              </div>
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center">
                      <LogOut size={18} className="text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Sign out</p>
                      <p className="text-xs text-white/40">Sign out of your account on this device</p>
                    </div>
                  </div>
                  <button
                    onClick={() => signOut({ redirectUrl: "/" })}
                    className="px-4 py-2 text-sm font-medium text-red-400 bg-red-500/10 rounded-xl hover:bg-red-500/20 transition-all"
                  >
                    Sign out
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] opacity-50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center">
                      <HelpCircle size={18} className="text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Delete account</p>
                      <p className="text-xs text-white/40">Permanently delete your account and all data</p>
                    </div>
                  </div>
                  <button
                    disabled
                    className="px-4 py-2 text-sm font-medium text-white/20 bg-white/5 rounded-xl cursor-not-allowed"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}