import { FOOTER_TEXT, FOOTER_LINK } from "@/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-near-black py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold tracking-tight text-white">
              LeadDesk
            </span>
            <span className="text-white/10">/</span>
            <span className="text-xs text-white/20">
              {FOOTER_TEXT.split("Training Task")[0]}
              <a
                href={FOOTER_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 underline underline-offset-4 transition-colors hover:text-white/50"
              >
                Digital Heroes
              </a>
              {" Training Task"}
            </span>
          </div>
          <p className="text-xs text-white/15">
            &copy; {new Date().getFullYear()} LeadDesk Mini.
          </p>
        </div>
      </div>
    </footer>
  );
}