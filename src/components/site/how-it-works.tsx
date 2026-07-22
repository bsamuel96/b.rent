import { CalendarClock, ListChecks, Truck } from "lucide-react";

const steps = [
  {
    title: "Alegi",
    description: "Selectezi lucrarea și capacitatea orientativă.",
    icon: ListChecks,
  },
  {
    title: "Programăm",
    description: "Stabilim livrarea și confirmăm detaliile.",
    icon: CalendarClock,
  },
  {
    title: "Livrăm și ridicăm",
    description: "Primești containerul, iar ridicarea se face conform programării.",
    icon: Truck,
  },
];

export function HowItWorks() {
  return (
    <section id="cum-functioneaza" className="scroll-mt-20 bg-white py-14 sm:py-20">
      <div className="container">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-black uppercase leading-none sm:text-6xl">Cum funcționează</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Pași simpli, cu detalii confirmate înainte ca utilajul să pornească la drum.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="rounded-lg border border-border bg-brand-offwhite p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-black text-brand-yellow">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="font-display text-5xl font-black leading-none text-black/10">0{index + 1}</span>
                </div>
                <h3 className="font-display text-3xl font-extrabold leading-none">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
