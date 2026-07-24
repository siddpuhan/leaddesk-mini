"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  
  { label: "Pricing", href: "#", disabled: true },
  { label: "Contact", href: "#lead-form" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    const onScrollSpy = () => {
      const sections = NAV_LINKS.filter((l) => !l.disabled && l.href.startsWith("#")).map(
        (l) => l.href.slice(1)
      );
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScrollSpy, { passive: true });
    onScroll();
    onScrollSpy();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScrollSpy);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-near-black/80 backdrop-blur-xl border-b border-white/[0.04] h-16"
          : "bg-transparent h-[72px]"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lime to-lime/70 flex items-center justify-center text-sm font-bold text-near-black shadow-lg shadow-lime/20 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lime/30">
            L
          </div>
          <div>
            <p className="text-sm font-bold text-white transition-colors duration-300 group-hover:text-lime">
              LeadDesk Mini
            </p>
            <p className="text-[10px] text-white/30 -mt-0.5">Lead Management CRM</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              !link.disabled && link.href.startsWith("#") && activeSection === link.href.slice(1);
            return (
              <Link
                key={link.label}
                href={link.disabled ? "#" : link.href}
                onClick={(e) => {
                  if (link.disabled) e.preventDefault();
                  setOpen(false);
                }}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full ${
                  link.disabled
                    ? "text-white/20 cursor-not-allowed"
                    : isActive
                    ? "text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {link.label}
                {link.disabled && (
                  <span className="ml-1.5 text-[9px] text-white/15 align-super">Soon</span>
                )}
                {!link.disabled && (
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-lime transition-all duration-300 ${
                      isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-50 group-hover:scale-x-100"
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="#lead-form"
            className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 py-2.5 text-sm font-semibold text-near-black transition-all duration-300 hover:bg-lime/90 hover:-translate-y-[1px] hover:shadow-lg hover:shadow-lime/25 active:scale-[0.98]"
          >
            Get Started
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
            />
          </Link>
          <Link
            href="/admin"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/60 transition-all duration-300 hover:bg-white/[0.08] hover:text-white hover:border-white/20 hover:-translate-y-[1px] active:scale-[0.98]"
          >
            Admin Portal
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
            />
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/admin"
            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/60 transition-all hover:bg-white/[0.08] hover:text-white"
          >
            Admin
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-near-black border-l border-white/[0.06] shadow-2xl"
            >
              <div className="flex flex-col h-full pt-20 pb-8 px-6">
                <nav className="flex-1 space-y-1">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      href={link.disabled ? "#" : link.href}
                      onClick={(e) => {
                        if (link.disabled) e.preventDefault();
                        setOpen(false);
                      }}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        link.disabled
                          ? "text-white/20 cursor-not-allowed"
                          : "text-white/50 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        {link.label}
                        {link.disabled && (
                          <span className="text-[9px] text-white/15">Soon</span>
                        )}
                      </span>
                    </Link>
                  ))}
                </nav>
                <div className="space-y-3 pt-6 border-t border-white/[0.06]">
                  <Link
                    href="#lead-form"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-lime/90"
                  >
                    Get Started
                    <ArrowUpRight size={14} />
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white/60 transition-all hover:bg-white/[0.08] hover:text-white"
                  >
                    Admin Portal
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}