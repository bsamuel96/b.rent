import { MessageCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { siteConfig } from "@/config/site";
import type { EstimatorSelection } from "@/data/container-options";
import { createWhatsAppHref, selectionToContactSelection } from "@/lib/contact-links";
import { cn } from "@/lib/utils";

interface ContactActionsProps {
  selection: EstimatorSelection;
  onCallback: () => void;
  compact?: boolean;
  className?: string;
}

export function ContactActions({ selection, onCallback, compact = false, className }: ContactActionsProps) {
  const contactSelection = selectionToContactSelection(selection);
  const whatsappHref = createWhatsAppHref(siteConfig.contact.whatsappE164, contactSelection);

  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row", compact && "grid grid-cols-2 sm:flex", className)}>
      <Button type="button" size={compact ? "default" : "lg"} onClick={onCallback} className="w-full sm:w-auto">
        <PhoneCall />
        {compact ? "Sună-mă" : "Vreau să fiu sunat"}
      </Button>

      {whatsappHref ? (
        <Button
          asChild
          size={compact ? "default" : "lg"}
          variant="outline"
          className="w-full border-brand-green bg-white/90 text-foreground hover:bg-brand-green/15 sm:w-auto"
        >
          <a href={whatsappHref} target="_blank" rel="noreferrer">
            <MessageCircle />
            WhatsApp
          </a>
        </Button>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="w-full sm:w-auto" tabIndex={0}>
              <Button
                type="button"
                size={compact ? "default" : "lg"}
                variant="outline"
                className="w-full border-border bg-muted text-muted-foreground sm:w-auto"
                disabled
                aria-describedby="whatsapp-config-helper"
              >
                <MessageCircle />
                WhatsApp
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p id="whatsapp-config-helper">{siteConfig.placeholders.whatsapp}</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
