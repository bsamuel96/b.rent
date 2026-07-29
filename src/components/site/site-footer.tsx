import { ArrowUpRight, Mail, MapPin, PhoneCall } from "lucide-react";
import { BrandLogo } from "@/components/site/brand-logo";
import { siteConfig } from "@/config/site";
import { createMailtoHref, createTelHref } from "@/lib/contact-links";
import { getInitialEstimatorSelection } from "@/data/container-options";

const footerLinks = [
  { href: "#calculator", label: "Estimator" },
  { href: "#cum-functioneaza", label: "Cum funcționează" },
  { href: "#proiecte", label: "Proiecte" },
  { href: "#contact", label: "Contact" },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const defaultSelection = getInitialEstimatorSelection();
  const telHref = createTelHref(siteConfig.contact.phoneE164);
  const mailtoHref = createMailtoHref(siteConfig.contact.email, {
    projectLabel: defaultSelection.projectLabel,
    capacity: defaultSelection.capacity,
  });

  return (
    <footer className="relative overflow-hidden border-t-4 border-brand-green bg-brand-black text-white">
      <div
        className="pointer-events-none absolute right-0 top-0 h-72 w-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-brand-green/15 blur-3xl"
        aria-hidden
      />

      <div className="container relative py-12 sm:py-14">
        <div className="grid gap-10 border-b border-white/15 pb-11 lg:grid-cols-[1.25fr_0.7fr_1fr] lg:gap-16">
          <div>
            <a href="#" className="inline-flex" aria-label="b.rent pagina principală">
              <BrandLogo variant="dark" className="max-w-[8rem]" />
            </a>
            <p className="mt-5 max-w-md text-base leading-7 text-white/65">
              Containere de 7 m³ și 10 m³ pentru renovări, debarasări și șantiere.
              Alegem împreună capacitatea potrivită și programăm livrarea.
            </p>
            <a
              href="#calculator"
              className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-md bg-brand-green px-5 text-sm font-bold text-white transition-colors hover:bg-[#447c3d]"
            >
              Calculează containerul
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>

          <div>
            <h2 className="font-display text-lg font-black uppercase tracking-[0.12em] text-white">
              Navigație
            </h2>
            <nav className="mt-5 grid gap-3" aria-label="Navigație footer">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-white/65 transition-colors hover:text-white"
                >
                  <span className="h-px w-4 bg-brand-green transition-all group-hover:w-6" aria-hidden />
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
              Hai să discutăm
            </p>
            <h2 className="mt-3 font-display text-3xl font-black uppercase leading-none">
              Ai un proiect?
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">
              Spune-ne ce ai de evacuat. Confirmăm capacitatea, disponibilitatea și
              detaliile livrării.
            </p>

            <div className="mt-6 grid gap-3 text-sm">
              {telHref && siteConfig.contact.phoneDisplay ? (
                <a
                  href={telHref}
                  className="inline-flex w-fit items-center gap-3 font-semibold text-white transition-colors hover:text-brand-green"
                >
                  <PhoneCall className="h-4 w-4 text-brand-green" aria-hidden />
                  {siteConfig.contact.phoneDisplay}
                </a>
              ) : null}
              {mailtoHref && siteConfig.contact.email ? (
                <a
                  href={mailtoHref}
                  className="inline-flex w-fit items-center gap-3 font-semibold text-white transition-colors hover:text-brand-green"
                >
                  <Mail className="h-4 w-4 text-brand-green" aria-hidden />
                  {siteConfig.contact.email}
                </a>
              ) : null}
              {siteConfig.contact.serviceArea ? (
                <p className="inline-flex items-start gap-3 text-white/70">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden />
                  {siteConfig.contact.serviceArea}
                </p>
              ) : null}
              {!telHref && !mailtoHref ? (
                <a
                  href="#contact"
                  className="inline-flex w-fit items-center gap-2 border-b border-brand-green pb-1 font-bold text-white transition-colors hover:text-brand-green"
                >
                  Solicită să fii contactat
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs font-medium text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {siteConfig.brandName}. Toate drepturile rezervate.
          </p>
          <p className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-green" aria-hidden />
            7 m³ și 10 m³ · livrare și ridicare programată
          </p>
        </div>
      </div>
    </footer>
  );
}
