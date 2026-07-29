import { MessageCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import type { EstimatorSelection } from "@/data/container-options";
import {
  createTelHref,
  createWhatsAppHref,
  selectionToContactSelection,
} from "@/lib/contact-links";

interface ContactSectionProps {
  selection: EstimatorSelection;
  onCallback: () => void;
}

export function ContactSection({ selection, onCallback }: ContactSectionProps) {
  const telHref = createTelHref(siteConfig.contact.phoneE164);
  const whatsappHref = createWhatsAppHref(
    siteConfig.contact.whatsappE164,
    selectionToContactSelection(selection),
  );

  return (
    <section id="contact" className="scroll-mt-20 bg-brand-green py-8 text-white sm:py-10">
      <div className="container grid gap-7 lg:grid-cols-[1fr_auto_auto] lg:items-center lg:gap-6">
        <div className="flex items-center gap-5">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-brand-green shadow-green-glow sm:h-20 sm:w-20">
            <PhoneCall className="h-8 w-8 sm:h-9 sm:w-9" aria-hidden />
          </span>
          <div>
            <h2 className="font-display text-3xl font-black uppercase leading-none sm:text-4xl">
              Ai nevoie de ajutor?
            </h2>
            <p className="mt-2 text-sm font-medium text-white/85 sm:text-base">
              Sună-ne acum sau scrie-ne pe WhatsApp.
            </p>
          </div>
        </div>

        {telHref && siteConfig.contact.phoneDisplay ? (
          <Button asChild variant="dark" size="lg" className="min-w-64 border border-white/10">
            <a href={telHref}>
              <PhoneCall />
              {siteConfig.contact.phoneDisplay}
            </a>
          </Button>
        ) : (
          <Button
            type="button"
            variant="dark"
            size="lg"
            onClick={onCallback}
            className="min-w-64 border border-white/10"
          >
            <PhoneCall />
            Vreau să fiu sunat
          </Button>
        )}

        {whatsappHref ? (
          <Button
            asChild
            variant="outline"
            size="lg"
            className="min-w-64 border-white/70 bg-transparent text-white hover:border-white hover:bg-white/15"
          >
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle />
              Mesaj pe WhatsApp
            </a>
          </Button>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="lg"
            disabled
            className="min-w-64 border-white/35 bg-transparent text-white"
            aria-label={siteConfig.placeholders.whatsapp}
          >
            <MessageCircle />
            WhatsApp
          </Button>
        )}
      </div>
    </section>
  );
}
