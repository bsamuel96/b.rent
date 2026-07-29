const projectTypes = [
  {
    title: "Renovări",
    description: "Pentru lucrări interioare, apartamente și spații care trebuie eliberate rapid.",
    image: "/images/renovari.jpg",
    alt: "Lucrări de renovare cu materiale de construcție",
  },
  {
    title: "Debarasări",
    description: "Pentru obiecte voluminoase, curți, beciuri, garaje sau spații comerciale.",
    image: "/images/debarasari.jpg",
    alt: "Șantier exterior cu utilaje și materiale de lucru",
  },
  {
    title: "Construcții și demolări",
    description: "Pentru volum ridicat, lucrări grele și etape succesive pe șantier.",
    image: "/images/constructii-demolari.jpg",
    alt: "Clădire în lucru pe un șantier de construcții",
  },
];

export function ProjectTypes() {
  return (
    <section id="proiecte" className="scroll-mt-20 bg-brand-offwhite py-14 sm:py-20">
      <div className="container">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-black uppercase leading-none sm:text-6xl">Lucrări obișnuite</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Trei situații frecvente în care containerul potrivit scutește drumuri și improvizații.
            </p>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {projectTypes.map((project) => (
            <article key={project.title} className="group overflow-hidden rounded-lg border border-black/10 bg-black text-white shadow-sm">
              <figure className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.alt}
                  className="h-full w-full object-cover opacity-[0.76] transition duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/[0.38] to-brand-green/10" aria-hidden="true" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-3xl font-extrabold leading-none">{project.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/[0.76]">{project.description}</p>
                </figcaption>
              </figure>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
