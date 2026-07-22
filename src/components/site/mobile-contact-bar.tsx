import { MessageCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import type { EstimatorSelection } from "@/data/container-options";
import { createWhatsAppHref, selectionToContactSelection } from "@/lib/contact-links";

interface MobileContactBarProps {
  selection: EstimatorSelection;
  onCallback: () => void;
}

export function MobileContactBar({ selection, onCallback }: MobileContactBarProps) {
  const whatsappHref = createWhatsAppHref(siteConfig.contact.whatsappE164, selectionToContactSelection(selection));

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-brand-offwhite/[0.96] px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-[0_-12px_32px_rgba(0,0,0,0.14)] backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" onClick={onCallback} aria-label="Lasă-ne numărul tău și te contactăm noi">
          <PhoneCall />
          Sună-mă
        </Button>
        {whatsappHref ? (
          <Button asChild variant="dark">
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle />
              WhatsApp
            </a>
          </Button>
        ) : (
          <Button type="button" variant="outline" disabled aria-label={siteConfig.placeholders.whatsapp}>
            <MessageCircle />
            WhatsApp
          </Button>
        )}
      </div>
    </div>
  );
}
