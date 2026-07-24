"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LeadCaptureAnimation } from "@/components/hero/LeadCaptureAnimation";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-near-black pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="absolute top-1/4 right-0 h-[500px] w-[500px] -translate-y-1/2 rounded-full border border-white/5" />
      <div className="absolute top-1/3 right-[10%] h-[300px] w-[300px] rounded-full bg-lime/5 blur-3xl" />
      <div className="absolute bottom-20 left-[5%] h-32 w-32 rounded-2xl border border-white/10 rotate-12" />
      <div className="absolute top-[15%] right-[5%]">
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="h-3 w-3 rounded-full border border-white/10" />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="space-y-0">
              <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-black leading-[0.85] tracking-tighter text-white">
                CAPTURE
              </h1>
              <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-black leading-[0.85] tracking-tighter text-white">
                EVERY
              </h1>
              <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-black leading-[0.85] tracking-tighter text-lime">
                LEAD.
              </h1>
            </div>

            <p className="mt-8 max-w-md text-base leading-relaxed text-white/40">
              A premium CRM designed for teams who move fast and never let an opportunity slip.
            </p>

            <div className="mt-10 flex items-center gap-6">
              <Link
                href="#lead-form"
                className="group inline-flex items-center gap-3 rounded-full bg-lime px-8 py-4 text-sm font-semibold text-near-black transition-all hover:bg-lime/90 active:scale-[0.98]"
              >
                Get Started
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <Link
                href="#features"
                className="text-sm text-white/30 transition-colors hover:text-white/60"
              >
                Learn more
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <LeadCaptureAnimation />
          </div>
        </div>
      </div>
    </section>
  );
}