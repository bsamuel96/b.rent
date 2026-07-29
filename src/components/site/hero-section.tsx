import { BadgePercent, Boxes, MessageCircle, PhoneCall, Ruler, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getInitialEstimatorSelection } from "@/data/container-options";
import { createWhatsAppHref, selectionToContactSelection } from "@/lib/contact-links";

interface HeroSectionProps {
  onCallback: () => void;
}

const HERO_ICON_COLOR = "#4f8f46";

const heroBenefits = [
  {
    icon: Truck,
    title: "Livrare rapidă",
    description: "și ridicare programată",
  },
  {
    icon: BadgePercent,
    title: "Prețuri clare",
    description: "fără costuri ascunse",
  },
  {
    icon: Boxes,
    title: "Dimensiuni multiple",
    description: "pentru orice proiect",
  },
];

const initialSelection = getInitialEstimatorSelection();
const whatsappHref = createWhatsAppHref(
  siteConfig.contact.whatsappE164,
  selectionToContactSelection(initialSelection),
);

const scrollToEstimator = () => {
  document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export function HeroSection({ onCallback }: HeroSectionProps) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-black text-white">
      <img
        src="/figma/constructed-hero-tall.png"
        alt=""
        className="absolute inset-y-0 right-0 -z-30 h-full w-full object-cover object-[62%_bottom] sm:object-[58%_bottom] lg:w-[60%] lg:object-bottom lg:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_22%,black_100%)] lg:[mask-image:linear-gradient(to_right,transparent_0%,black_22%,black_100%)] xl:-right-[5%] xl:w-[55%]"
        loading="eager"
        decoding="async"
      />
      <div className="absolute inset-0 -z-20 bg-black/20" aria-hidden />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.93)_30%,rgba(0,0,0,0.58)_46%,rgba(0,0,0,0.18)_60%,rgba(0,0,0,0.04)_76%)] max-lg:bg-[linear-gradient(90deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.85)_58%,rgba(0,0,0,0.38)_100%)]"
        aria-hidden
      />

      <div className="container relative grid min-h-[36rem] items-center py-16 pb-80 sm:min-h-[37.5rem] sm:py-20 sm:pb-80 lg:min-h-[calc(85svh-4rem)] lg:grid-cols-12 lg:py-20">
        <div className="relative z-10 max-w-3xl animate-fade-in-up lg:col-span-7">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-brand-green">
            Containere pentru renovări și șantiere
          </p>
          <h1 className="text-balance font-sans text-[clamp(3rem,4.7vw,4.15rem)] font-black leading-[1.03] tracking-[-0.04em] text-white">
            Containerul potrivit
            <span className="mt-1 block text-brand-green">pentru orice proiect.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/[0.82] sm:text-lg">
            Închiriază rapid containerul potrivit pentru renovări, debarasări și șantiere. Livrare și ridicare programată în zona ta.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button type="button" size="lg" onClick={scrollToEstimator}>
              <Ruler
                className="rounded-sm bg-white p-0.5 text-brand-green"
                stroke={HERO_ICON_COLOR}
              />
              Calculează containerul
            </Button>

            {whatsappHref ? (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-brand-green/80 bg-black/40 text-white backdrop-blur-sm hover:bg-brand-green/15"
              >
                <a href={whatsappHref} target="_blank" rel="noreferrer">
                  <MessageCircle className="text-brand-green" stroke={HERO_ICON_COLOR} />
                  Scrie pe WhatsApp
                </a>
              </Button>
            ) : (
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="border-brand-green/80 bg-black/40 text-white backdrop-blur-sm hover:bg-brand-green/15"
                onClick={onCallback}
              >
                <PhoneCall className="text-brand-green" stroke={HERO_ICON_COLOR} />
                Vreau să fiu sunat
              </Button>
            )}
          </div>

          <div className="mt-10 hidden max-w-2xl gap-5 border-t border-white/15 pt-6 sm:grid sm:grid-cols-3">
            {heroBenefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div key={benefit.title} className="flex items-start gap-3">
                  <Icon
                    className="mt-0.5 h-6 w-6 shrink-0 text-brand-green"
                    stroke={HERO_ICON_COLOR}
                    aria-hidden
                  />
                  <p className="text-sm leading-5 text-white/[0.7]">
                    <strong className="block font-bold text-white">{benefit.title}</strong>
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
