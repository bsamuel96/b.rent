import { MapPin, Star, Truck, UsersRound, type LucideIcon } from "lucide-react";

interface ProofMetric {
  value: string;
  label: string;
  icon: LucideIcon;
}

const proofMetrics: readonly ProofMetric[] = [
  { value: "10.000+", label: "clienți mulțumiți", icon: UsersRound },
  { value: "25.000+", label: "livrări efectuate", icon: Truck },
  { value: "80+", label: "zone acoperite", icon: MapPin },
  { value: "4,9/5", label: "rating din recenzii", icon: Star },
];

const testimonials = [
  {
    quote: "Serviciu rapid și profesionist. Containerul a fost exact ce aveam nevoie.",
    name: "Flora P.",
    location: "Cluj-Napoca",
    initials: "FP",
  },
  {
    quote: "Preț corect, livrare rapidă și personal foarte amabil.",
    name: "Maria S.",
    location: "Sibiu",
    initials: "MS",
  },
  {
    quote: "Recomand b.rent pentru orice proiect de construcție.",
    name: "Kenneth D.",
    location: "Brașov",
    initials: "KD",
  },
] as const;

export function BenefitsSection() {
  return (
    <section aria-labelledby="social-proof-title">
      <div className="bg-brand-black text-white">
        <div className="container grid sm:grid-cols-2 lg:grid-cols-4">
          {proofMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className="relative flex items-center gap-4 px-4 py-7 sm:px-6 lg:py-9"
              >
                <Icon className="h-9 w-9 shrink-0 text-brand-green" strokeWidth={1.8} aria-hidden />
                <div>
                  <strong className="block font-display text-3xl font-black leading-none sm:text-4xl">
                    {metric.value}
                  </strong>
                  <span className="mt-1 block text-base font-semibold text-white/85 sm:text-lg">
                    {metric.label}
                  </span>
                </div>
                {index < proofMetrics.length - 1 ? (
                  <span
                    className="absolute right-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-white/20 lg:block"
                    aria-hidden
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-[#e5e5e2] py-14 sm:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-green">
              Recenzii și proiecte
            </p>
            <h2
              id="social-proof-title"
              className="mt-3 font-display text-4xl font-black uppercase leading-none sm:text-6xl"
            >
              Clienți mulțumiți
            </h2>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="flex min-h-64 flex-col rounded-xl border border-black/10 bg-white p-6 shadow-[0_14px_34px_rgba(8,8,8,0.08)]"
              >
                <div className="flex gap-1 text-brand-green" aria-label="5 din 5 stele">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-5 text-base font-semibold leading-7 text-brand-charcoal">
                  “{testimonial.quote}”
                </blockquote>
                <footer className="mt-auto flex items-center gap-3 pt-7">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-brand-green/30 bg-brand-green/10 text-xs font-black text-brand-green">
                    {testimonial.initials}
                  </span>
                  <div>
                    <p className="text-sm font-extrabold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
