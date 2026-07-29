import { CheckCircle2, ChevronRight, Container, House, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "Alege tipul proiectului",
    description: "Renovare, construcție, debarasare sau lucrări în grădină.",
    icon: House,
  },
  {
    title: "Primești recomandarea",
    description: "Îți indicăm instant capacitatea potrivită pentru lucrarea ta.",
    icon: Container,
  },
  {
    title: "Confirmă capacitatea",
    description: "Ajustezi dimensiunea și ne trimiți solicitarea când ești gata.",
    icon: CheckCircle2,
  },
];

const scrollToEstimator = () => {
  document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export function HowItWorks() {
  return (
    <section id="cum-functioneaza" className="scroll-mt-20 bg-muted/80 py-14 sm:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-green">Calculează rapid</p>
          <h2 className="mt-4 text-balance font-display text-4xl font-black uppercase leading-[0.95] sm:text-6xl">
            Alege containerul potrivit în 3 pași simpli
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                className="relative flex min-h-52 items-start gap-5 rounded-xl border border-black/10 bg-white p-6 shadow-[0_16px_40px_rgba(8,8,8,0.08)]"
              >
                <div className="flex shrink-0 flex-col items-center gap-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green font-display text-xl font-black text-white">
                    {index + 1}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center text-brand-black">
                    <Icon className="h-10 w-10" strokeWidth={1.8} aria-hidden />
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="font-display text-2xl font-extrabold leading-none">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.description}</p>
                </div>

                {index < steps.length - 1 ? (
                  <span
                    className="absolute -right-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-brand-green shadow-sm md:flex"
                    aria-hidden
                  >
                    <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
                  </span>
                ) : null}
              </article>
            );
          })}
        </div>

        <div className="relative z-20 mx-auto -mt-5 flex w-fit justify-center">
          <Button
            type="button"
            size="lg"
            className="min-w-60 shadow-industrial"
            onClick={scrollToEstimator}
          >
            <Ruler className="text-white" />
            Începe calculul
          </Button>
        </div>
      </div>
    </section>
  );
}
