import { ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { createTelHref } from "@/lib/contact-links";

export function ThankYouPage() {
  const telHref = createTelHref(siteConfig.contact.phoneE164);

  return (
    <section className="flex min-h-[65svh] items-center bg-brand-offwhite py-16">
      <div className="container">
        <div className="mx-auto max-w-2xl rounded-2xl border border-black/10 bg-white p-7 text-center shadow-industrial sm:p-12">
          <CheckCircle2 className="mx-auto h-16 w-16 text-brand-green" strokeWidth={1.7} aria-hidden />
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
            Solicitare înregistrată
          </p>
          <h1 className="mt-3 text-balance font-display text-5xl font-black uppercase leading-none sm:text-7xl">
            Mulțumim!
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            Am primit datele tale. Te contactăm pentru a confirma capacitatea, disponibilitatea și
            detaliile livrării.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="/">
                Înapoi la site
                <ArrowRight />
              </a>
            </Button>
            {telHref && siteConfig.contact.phoneDisplay ? (
              <Button asChild size="lg" variant="outline">
                <a href={telHref}>
                  <PhoneCall />
                  {siteConfig.contact.phoneDisplay}
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
