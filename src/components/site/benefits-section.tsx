import { CalendarClock, Clock3, Container, ListChecks } from "lucide-react";

const benefits = [
  {
    title: "Recomandare rapidă",
    description: "Estimatorul pornește discuția cu o capacitate orientativă clară.",
    icon: ListChecks,
  },
  {
    title: "Programare clară",
    description: "Detaliile se confirmă înainte de livrare, fără promisiuni vagi.",
    icon: CalendarClock,
  },
  {
    title: "Ridicare la timp",
    description: "Ridicarea este stabilită în funcție de programarea agreată.",
    icon: Clock3,
  },
  {
    title: "Containere pentru lucrări mici și mari",
    description: "De la renovări ușoare la volume ridicate pe șantier.",
    icon: Container,
  },
];

export function BenefitsSection() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="container">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-black uppercase leading-none sm:text-6xl">
            De ce b<span className="text-brand-yellow">.</span>rent
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Un site practic pentru decizii rapide, construit în jurul datelor care pot fi completate când operațiunile sunt finalizate.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article key={benefit.title} className="rounded-lg border border-border bg-brand-offwhite p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-brand-yellow text-brand-black">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-base font-extrabold">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{benefit.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
