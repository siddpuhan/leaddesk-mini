"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const STAGES = ["NEW", "CONTACTED", "CLOSED"] as const;

function sleepInactive(ms: number, cancelledRef: React.MutableRefObject<boolean>) {
  return new Promise<void>((resolve) => {
    const check = () => {
      if (cancelledRef.current) return;
      if (document.hidden) {
        requestAnimationFrame(check);
        return;
      }
      const timer = setTimeout(() => {
        if (!cancelledRef.current) resolve();
      }, ms);
      return () => clearTimeout(timer);
    };
    check();
  });
}

async function typeText(
  text: string,
  // eslint-disable-next-line no-unused-vars
  setter: (_: string) => void,
  cancelledRef: React.MutableRefObject<boolean>,
  speed = 55
) {
  for (let i = 1; i <= text.length; i++) {
    if (cancelledRef.current) return;
    setter(text.slice(0, i));
    await sleepInactive(speed + Math.random() * 45, cancelledRef);
  }
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <path d="M8 2a6 6 0 0 1 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function LeadCaptureAnimation() {
  const [phase, setPhase] = useState<
    "idle" | "name" | "email" | "budget" | "message" | "loading" | "success" | "pipeline"
  >("idle");
  const [nameText, setNameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [messageText, setMessageText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [budgetSelected, setBudgetSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pipelineStage, setPipelineStage] = useState(0);
  const cancelledRef = useRef(false);

  const run = useCallback(async () => {
    while (!cancelledRef.current) {
      setPhase("idle");
      setNameText("");
      setEmailText("");
      setMessageText("");
      setShowDropdown(false);
      setBudgetSelected(false);
      setIsLoading(false);
      setShowSuccess(false);
      setPipelineStage(0);

      await sleepInactive(1200, cancelledRef);
      if (cancelledRef.current) return;

      setPhase("name");
      await typeText("John Doe", setNameText, cancelledRef);
      if (cancelledRef.current) return;
      await sleepInactive(600, cancelledRef);
      if (cancelledRef.current) return;

      setPhase("email");
      await typeText("john@example.com", setEmailText, cancelledRef, 50);
      if (cancelledRef.current) return;
      await sleepInactive(500, cancelledRef);
      if (cancelledRef.current) return;

      setPhase("budget");
      setShowDropdown(true);
      await sleepInactive(500, cancelledRef);
      if (cancelledRef.current) return;
      setBudgetSelected(true);
      await sleepInactive(700, cancelledRef);
      if (cancelledRef.current) return;

      setPhase("message");
      await typeText("Need a landing page for my startup.", setMessageText, cancelledRef, 45);
      if (cancelledRef.current) return;
      await sleepInactive(800, cancelledRef);
      if (cancelledRef.current) return;

      setPhase("loading");
      setIsLoading(true);
      await sleepInactive(1600, cancelledRef);
      if (cancelledRef.current) return;

      setPhase("success");
      setIsLoading(false);
      setShowSuccess(true);
      await sleepInactive(2000, cancelledRef);
      if (cancelledRef.current) return;

      setPhase("pipeline");
      setPipelineStage(1);
      await sleepInactive(1200, cancelledRef);
      if (cancelledRef.current) return;
      setPipelineStage(2);
      await sleepInactive(1400, cancelledRef);
      if (cancelledRef.current) return;
    }
  }, []);

  useEffect(() => {
    cancelledRef.current = false;
    run();
    return () => {
      cancelledRef.current = true;
    };
  }, [run]);

  const isFormVisible = !showSuccess;
  const isSuccessVisible = showSuccess && phase !== "pipeline";
  const isPipelineVisible = phase === "pipeline";

  return (
    <div className="mx-auto w-full max-w-sm lg:max-w-md" role="img" aria-label="Lead capture demo animation">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/40 backdrop-blur-sm transition-all duration-500">
        <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-3">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
          <span className="ml-3 font-mono text-[10px] tracking-wide text-white/15">
            leaddesk.app
          </span>
        </div>

        <div className="relative min-h-[360px] p-5 sm:p-6">
          <div
            className={`transition-all duration-500 ${
              isFormVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[-16px] opacity-0"
            }`}
          >
            <div className="space-y-4">
              <Field label="Full Name" active={phase === "name"}>
                <input
                  readOnly
                  value={nameText}
                  placeholder="Full Name"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-white/10"
                />
                {phase === "name" && nameText.length > 0 && nameText.length < 8 && (
                  <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-lime align-middle" />
                )}
              </Field>

              <Field label="Email" active={phase === "email"}>
                <input
                  readOnly
                  value={emailText}
                  placeholder="email@company.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-white/10"
                />
                {phase === "email" && emailText.length > 0 && (
                  <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-lime align-middle" />
                )}
              </Field>

              <Field label="Budget" active={phase === "budget"}>
                <div className="relative">
                  <div
                    className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-sm transition-colors ${
                      budgetSelected
                        ? "border-lime/30 bg-lime/5 text-white"
                        : "border-white/10 bg-white/5 text-white/30"
                    }`}
                  >
                    {budgetSelected ? "$10k — $25k" : "Select budget"}
                    <svg
                      className={`h-4 w-4 transition-transform ${
                        showDropdown ? "rotate-180" : ""
                      } ${budgetSelected ? "text-lime/50" : "text-white/20"}`}
                      fill="none"
                      viewBox="0 0 16 16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div
                    className={`absolute top-full left-0 right-0 z-10 mt-1 overflow-hidden rounded-xl border border-white/10 bg-stone/95 backdrop-blur-sm transition-all duration-300 ${
                      showDropdown && !budgetSelected
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {["$5k — $10k", "$10k — $25k", "$25k — $50k", "$50k+"].map(
                      (opt) => (
                        <div
                          key={opt}
                          className={`px-3.5 py-2 text-xs transition-colors ${
                            opt === "$10k — $25k"
                              ? "bg-lime/10 text-lime"
                              : "text-white/40 hover:bg-white/5 hover:text-white/70"
                          }`}
                        >
                          {opt}
                          {opt === "$10k — $25k" && budgetSelected && (
                            <span className="ml-2 text-lime/60">✓</span>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </Field>

              <Field label="Message" active={phase === "message"}>
                <textarea
                  readOnly
                  value={messageText}
                  placeholder="Tell us about your project..."
                  rows={2}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-white/10"
                />
                {phase === "message" && messageText.length > 0 && (
                  <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-lime align-middle" />
                )}
              </Field>

              <div className="pt-2">
                <button
                  type="button"
                  disabled
                  className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                    isLoading
                      ? "bg-lime/80 text-near-black"
                      : "bg-lime text-near-black"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Spinner />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </div>
          </div>

          <div
            className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500 ${
              isSuccessVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-lime/20">
              <svg
                className="text-lime"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
                width="24"
                height="24"
              >
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h4 className="mt-5 text-lg font-bold tracking-tight text-white">
              Lead Captured
            </h4>
            <p className="mt-1 text-xs text-white/30">
              We&apos;ll reach out within 24h.
            </p>
          </div>

          <div
            className={`absolute inset-x-0 bottom-0 flex items-center justify-center gap-4 px-6 pb-6 transition-all duration-500 ${
              isPipelineVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex items-center gap-0 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
              {STAGES.map((stage, i) => (
                <div key={stage} className="flex items-center">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-700 ${
                        i <= pipelineStage
                          ? "bg-lime text-near-black shadow-[0_0_12px_rgba(212,247,74,0.3)]"
                          : "bg-white/10 text-white/25"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider transition-colors duration-700 ${
                        i <= pipelineStage ? "text-white/70" : "text-white/20"
                      }`}
                    >
                      {stage}
                    </span>
                  </div>
                  {i < STAGES.length - 1 && (
                    <div className="mx-2 flex flex-col items-center">
                      <div className="h-px w-6 bg-white/10" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime/20 to-transparent" />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .animate-pulse {
          animation: pulse 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  active,
  children,
}: {
  label: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <span
          className={`text-[11px] font-semibold uppercase tracking-widest transition-colors ${
            active ? "text-lime/80" : "text-white/25"
          }`}
        >
          {label}
        </span>
        {active && (
          <span className="h-1.5 w-1.5 rounded-full bg-lime/60" />
        )}
      </div>
      {children}
    </div>
  );
}