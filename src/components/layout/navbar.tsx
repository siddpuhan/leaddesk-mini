"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Contact", href: "#lead-form" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-near-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-white"
        >
          LeadDesk
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/50 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#lead-form"
            className="rounded-full bg-lime px-6 py-2.5 text-sm font-semibold text-near-black transition-all hover:bg-lime/90 active:scale-[0.98]"
          >
            Get Started
          </Link>
          {isSignedIn ? (
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-8 w-8",
                },
              }}
            />
          ) : (
            <div className="flex items-center gap-3">
              <SignInButton mode="modal">
                <button className="text-sm text-white/50 transition-colors hover:text-white">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-white/5 active:scale-[0.98]">
                  Sign up
                </button>
              </SignUpButton>
            </div>
          )}
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          {isSignedIn ? (
            <UserButton />
          ) : (
            <SignInButton mode="modal">
              <button className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-white transition-all hover:bg-white/5">
                Sign in
              </button>
            </SignInButton>
          )}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="text-white"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/5 md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/50 transition-colors hover:text-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#lead-form"
              className="mt-2 rounded-full bg-lime px-6 py-3 text-center text-sm font-semibold text-near-black"
              onClick={() => setOpen(false)}
            >
              Get Started
            </Link>
            {!isSignedIn && (
              <div className="mt-2 flex gap-3">
                <SignUpButton mode="modal">
                  <button className="flex-1 rounded-full border border-white/20 px-5 py-2.5 text-center text-sm font-medium text-white transition-all hover:bg-white/5">
                    Sign up
                  </button>
                </SignUpButton>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}