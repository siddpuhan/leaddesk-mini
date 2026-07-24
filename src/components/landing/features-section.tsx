import { EditorialBlock } from "@/components/landing/feature-card";

export function FeaturesSection() {
  return (
    <section id="features" className="bg-warm-white py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 sm:mb-20">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-near-black/30">
            Why LeadDesk
          </span>
          <h2 className="mt-4 text-5xl font-black leading-[0.9] tracking-tighter text-near-black sm:text-6xl lg:text-7xl">
            From First
            <br />
            <span className="text-lime">Click to Closed.</span>
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          <EditorialBlock
            number="01"
            icon="Sparkles"
            title="Capture Leads"
            subtitle="From first touch to first contact"
            type="process"
            className="lg:col-span-7"
          />
          <EditorialBlock
            number="02"
            icon="ArrowUpRight"
            title="Track Pipeline"
            subtitle="Know where every deal stands"
            type="stat"
            className="lg:col-span-5 lg:row-span-2"
          />
          <EditorialBlock
            number="03"
            icon="Users"
            title="Close Deals"
            subtitle="Together, in real time"
            type="benefits"
            className="lg:col-span-12"
          />
        </div>
      </div>
    </section>
  );
}