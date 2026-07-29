import { CheckCircle2, Ruler } from "lucide-react";

const availableContainers = [
  {
    capacity: "7 m³",
    projectSize: "Proiecte mari",
    dimensions: "3,6 × 1,8 × 1,6 m",
    suitableFor: "Construcții, renovări ample, moloz și deșeuri diverse.",
    imageSrc: "/figma/hero-waste-bin-green.png",
    imageAlt: "Container b.rent de 7 metri cubi",
    featured: true,
  },
  {
    capacity: "10 m³",
    projectSize: "Proiecte extra mari",
    dimensions: "4,0 × 2,0 × 1,8 m",
    suitableFor: "Șantiere mari, demolări și cantități ridicate de deșeuri.",
    imageSrc: "/figma/hero-waste-bin-green.png",
    imageAlt: "Container b.rent de 10 metri cubi",
    featured: false,
  },
] as const;

export function AvailableContainers() {
  return (
    <section className="bg-muted/80 py-14 sm:py-20" aria-labelledby="available-containers-title">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-green">
            Containere disponibile
          </p>
          <h2
            id="available-containers-title"
            className="mt-4 text-balance font-display text-4xl font-black uppercase leading-[0.95] sm:text-6xl"
          >
            Două dimensiuni pentru orice proiect
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Alegi între 7 și 10 m³, iar noi confirmăm capacitatea potrivită înainte de livrare.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-2">
          {availableContainers.map((container) => (
            <article
              key={container.capacity}
              className={
                container.featured
                  ? "relative overflow-hidden rounded-xl border-2 border-brand-green bg-white shadow-industrial"
                  : "relative overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_16px_40px_rgba(8,8,8,0.08)]"
              }
            >
              {container.featured ? (
                <span className="absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded-b-lg bg-brand-green px-5 py-2 text-xs font-bold uppercase tracking-wide text-white">
                  Cel mai ales
                </span>
              ) : null}

              <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-white to-brand-offwhite px-8 pt-8">
                <img
                  src={container.imageSrc}
                  alt={container.imageAlt}
                  className="h-full w-full scale-110 object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="p-6 sm:p-7">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-display text-5xl font-black leading-none">{container.capacity}</h3>
                    <p className="mt-2 font-semibold text-brand-charcoal">{container.projectSize}</p>
                  </div>
                  <CheckCircle2 className="h-7 w-7 shrink-0 text-brand-green" aria-hidden />
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-black/10 pt-5">
                  <Ruler className="h-5 w-5 shrink-0 text-brand-green" aria-hidden />
                  <span className="font-semibold text-brand-charcoal">{container.dimensions}</span>
                </div>

                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  <strong className="text-foreground">Potrivit pentru:</strong> {container.suitableFor}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
