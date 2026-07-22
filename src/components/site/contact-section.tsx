import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { BrandLogo } from "@/components/site/brand-logo";
import { ContactActions } from "@/components/site/contact-actions";
import { siteConfig } from "@/config/site";
import type { EstimatorSelection } from "@/data/container-options";
import { createMailtoHref, createTelHref, selectionToContactSelection } from "@/lib/contact-links";

interface ContactSectionProps {
  selection: EstimatorSelection;
  onCallback: () => void;
}

export function ContactSection({ selection, onCallback }: ContactSectionProps) {
  const telHref = createTelHref(siteConfig.contact.phoneE164);
  const mailtoHref = createMailtoHref(siteConfig.contact.email, selectionToContactSelection(selection));

  return (
    <section id="contact" className="scroll-mt-20 bg-brand-black py-14 text-white sm:py-20">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <BrandLogo variant="dark" className="mb-8 max-w-[8.5rem]" />
            <h2 className="text-balance font-display text-5xl font-black uppercase leading-[0.92] sm:text-7xl">
              Ai o lucrare grea?
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/[0.72] sm:text-lg">
              Spune-ne ce ai de făcut și stabilim împreună containerul potrivit.
            </p>
            <ContactActions selection={selection} onCallback={onCallback} className="mt-8" />
          </div>

          <div className="grid gap-3 rounded-lg border border-white/[0.14] bg-white/[0.06] p-5">
            <ContactLine icon={Phone} label="Telefon">
              {telHref && siteConfig.contact.phoneDisplay ? (
                <a href={telHref} className="font-semibold text-white underline-offset-4 hover:underline">
                  {siteConfig.contact.phoneDisplay}
                </a>
              ) : (
                <span>{siteConfig.placeholders.phone}</span>
              )}
            </ContactLine>
            <ContactLine icon={Mail} label="Email">
              {mailtoHref && siteConfig.contact.email ? (
                <a href={mailtoHref} className="font-semibold text-white underline-offset-4 hover:underline">
                  {siteConfig.contact.email}
                </a>
              ) : (
                <span>{siteConfig.placeholders.email}</span>
              )}
            </ContactLine>
            <ContactLine icon={MapPin} label="Arie de livrare">
              <span>{siteConfig.contact.serviceArea ?? siteConfig.placeholders.serviceArea}</span>
            </ContactLine>
            <ContactLine icon={Clock} label="Program">
              <span>{siteConfig.contact.businessHours ?? siteConfig.placeholders.businessHours}</span>
            </ContactLine>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ContactLineProps {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}

function ContactLine({ icon: Icon, label, children }: ContactLineProps) {
  return (
    <div className="flex gap-3 rounded-md border border-white/10 bg-black/25 p-4">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-yellow" aria-hidden />
      <div>
        <p className="text-xs font-bold uppercase text-white/[0.52]">{label}</p>
        <p className="mt-1 text-sm leading-6 text-white/[0.78]">{children}</p>
      </div>
    </div>
  );
}
