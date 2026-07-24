"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Clock, Users, Star } from "lucide-react";
import { leadSchema, type LeadInput } from "@/lib/validation";
import { Button } from "@/components/buttons/button";

export function LeadFormSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadInput) => {
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        const message = body.errors
          ? Object.values(body.errors).flat().join(", ")
          : body.error ?? "Something went wrong";
        toast.error(message);
        return;
      }

      toast.success("Lead submitted successfully.");
      reset();
    } catch {
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <section id="lead-form" className="relative overflow-hidden bg-near-black py-24 sm:py-32 lg:py-40">
      <div className="absolute left-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full border border-white/5" />
      <div className="absolute bottom-10 right-[10%] h-24 w-24 rounded-xl border border-white/5 -rotate-6" />
      <div className="absolute top-20 left-[35%] hidden lg:block" aria-hidden="true">
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-2 w-2 rounded-full border border-white/10" />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-lime">
              Get in touch
            </span>

            <div className="mt-4 h-px w-12 bg-white/10" />

            <h2 className="mt-8 text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.9] tracking-tighter text-white">
              Let&apos;s
              <br />
              Build
              <br />
              <span className="text-lime">Together.</span>
            </h2>

            <p className="mt-6 max-w-sm text-base leading-relaxed text-white/30">
              We love working with ambitious teams. Tell us about your project and we&apos;ll take it from there.
            </p>

            <div className="mt-10 h-px w-full bg-white/5" />

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <div className="flex items-center gap-2">
                <Clock size={12} className="text-lime/60" strokeWidth={1.5} />
                <span className="text-xs text-white/30">Avg. reply: 2h</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={12} className="text-lime/60" strokeWidth={1.5} />
                <span className="text-xs text-white/30">500+ teams</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={12} className="text-lime/60" strokeWidth={1.5} />
                <span className="text-xs text-white/30">99% satisfaction</span>
              </div>
            </div>

            <div className="mt-10 border-l-2 border-white/10 pl-5">
              <p className="text-sm leading-relaxed text-white/25 italic">
                &ldquo;LeadDesk changed how we manage leads. It&rsquo;s become essential to our workflow.&rdquo;
              </p>
              <p className="mt-2 text-xs text-white/15">
                — Alex Chen, Operations at Stellar
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="relative">
              <div className="absolute -inset-1.5 rounded-[2.5rem] bg-gradient-to-b from-lime/15 to-transparent opacity-60 blur-sm" />
              <div className="absolute inset-0 rounded-[2.5rem] border border-white/5" />

              <div className="relative rounded-[2.5rem] bg-warm-white shadow-2xl shadow-black/20">
                <div className="rounded-t-[2.5rem] border-b border-near-black/5 bg-warm-white px-8 pb-5 pt-8 sm:px-10 lg:px-12 lg:pt-10">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-lime" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-near-black/40">
                      Send us a message
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-near-black/30">
                    We&apos;ll reply within 24 hours.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="px-8 pb-8 pt-6 sm:px-10 lg:px-12 lg:pb-10"
                >
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="lead-name"
                        className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-near-black/50"
                      >
                        Name
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        id="lead-name"
                        placeholder="Your name"
                        className="w-full rounded-xl border border-near-black/10 bg-white px-4 py-3 text-sm text-near-black outline-none transition-all hover:border-near-black/20 focus:border-lime focus:ring-2 focus:ring-lime/20 placeholder:text-near-black/15"
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="lead-email"
                        className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-near-black/50"
                      >
                        Email
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        id="lead-email"
                        placeholder="you@company.com"
                        className="w-full rounded-xl border border-near-black/10 bg-white px-4 py-3 text-sm text-near-black outline-none transition-all hover:border-near-black/20 focus:border-lime focus:ring-2 focus:ring-lime/20 placeholder:text-near-black/15"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="lead-budget"
                        className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-near-black/50"
                      >
                        Budget
                      </label>
                      <select
                        {...register("budget")}
                        id="lead-budget"
                        className="w-full rounded-xl border border-near-black/10 bg-white px-4 py-3 text-sm text-near-black outline-none transition-all hover:border-near-black/20 focus:border-lime focus:ring-2 focus:ring-lime/20 appearance-none cursor-pointer"
                      >
                        <option value="">Select budget</option>
                        <option value="$5k — $10k">$5k — $10k</option>
                        <option value="$10k — $25k">$10k — $25k</option>
                        <option value="$25k — $50k">$25k — $50k</option>
                        <option value="$50k+">$50k+</option>
                      </select>
                      {errors.budget && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.budget.message}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="lead-message"
                        className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-near-black/50"
                      >
                        Project
                      </label>
                      <textarea
                        {...register("message")}
                        id="lead-message"
                        rows={3}
                        placeholder="Tell us about your project..."
                        className="w-full rounded-xl border border-near-black/10 bg-white px-4 py-3 text-sm text-near-black outline-none transition-all hover:border-near-black/20 focus:border-lime focus:ring-2 focus:ring-lime/20 placeholder:text-near-black/15 resize-none"
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.message.message}</p>
                      )}
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                      <p className="mt-3 text-center text-xs text-near-black/25">
                        We&apos;ll reply within 24 hours.
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}