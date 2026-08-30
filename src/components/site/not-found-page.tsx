import { ArrowLeft, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <section className="relative isolate flex min-h-[65svh] items-center overflow-hidden bg-brand-black py-16 text-white">
      <div className="absolute inset-y-0 right-0 -z-20 w-2/3 bg-[radial-gradient(circle_at_center,rgba(79,143,70,0.24),transparent_64%)]" aria-hidden />
      <div className="container">
        <div className="max-w-2xl">
          <p className="font-display text-[8rem] font-black leading-[0.75] text-brand-green sm:text-[11rem]">404</p>
          <h1 className="mt-8 text-balance font-display text-5xl font-black uppercase leading-none sm:text-7xl">
            Pagina nu a fost găsită
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/70">
            Adresa poate fi greșită sau pagina a fost mutată. Estimatorul și datele de contact sunt la
            un click distanță.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="/">
                <ArrowLeft />
                Pagina principală
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/35 bg-transparent text-white hover:bg-white/10">
              <a href="/#calculator">
                <Ruler />
                Deschide estimatorul
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
