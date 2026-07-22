import { ArrowDown, PhoneCall, Ruler } from "lucide-react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  onCallback: () => void;
}

const scrollToEstimator = () => {
  document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export function HeroSection({ onCallback }: HeroSectionProps) {
  return (
    <section className="bg-brand-black text-white">
      <BackgroundGradientAnimation containerClassName="min-h-[82svh]" className="container flex min-h-[82svh] items-center py-14 sm:py-18">
        <div className="max-w-3xl animate-fade-in-up">
          <Badge variant="outline" className="mb-5 border-brand-yellow/50 bg-black/35 text-brand-yellow">
            Recomandare rapidă. Fără calcule complicate.
          </Badge>
          <h1 className="text-balance font-display text-5xl font-black uppercase leading-[0.92] tracking-normal text-white sm:text-7xl lg:text-8xl">
            Containerul potrivit pentru treaba ta grea.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/[0.78] sm:text-lg">
            Alege dimensiunea lucrării, iar noi îți recomandăm capacitatea potrivită. Livrare rapidă și ridicare programată.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button type="button" size="lg" onClick={scrollToEstimator}>
              <Ruler />
              Alege containerul
            </Button>
            <Button type="button" size="lg" variant="outline" className="border-white/30 bg-white/[0.08] text-white hover:bg-white/[0.14]" onClick={onCallback}>
              <PhoneCall />
              Vreau să fiu sunat
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-3 text-sm font-semibold text-white/[0.64]">
            <ArrowDown className="h-4 w-4 text-brand-yellow" />
            Estimatorul este imediat mai jos.
          </div>
        </div>
      </BackgroundGradientAnimation>
    </section>
  );
}
