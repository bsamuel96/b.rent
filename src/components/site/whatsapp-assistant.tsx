import * as React from "react";
import { MessageCircle, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { EstimatorSelection } from "@/data/container-options";
import { createWhatsAppHref, selectionToContactSelection } from "@/lib/contact-links";

const INACTIVITY_DELAY_MS = 8_000;
const ACTIVITY_EVENTS = ["pointermove", "pointerdown", "keydown", "scroll", "touchstart"] as const;

interface WhatsAppAssistantProps {
  selection: EstimatorSelection;
}

export function WhatsAppAssistant({ selection }: WhatsAppAssistantProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const hasOpenedRef = React.useRef(false);
  const contactSelection = selectionToContactSelection(selection);

  React.useEffect(() => {
    let inactivityTimer = 0;

    const schedulePrompt = () => {
      if (hasOpenedRef.current) {
        return;
      }

      window.clearTimeout(inactivityTimer);
      inactivityTimer = window.setTimeout(() => {
        hasOpenedRef.current = true;
        setIsOpen(true);
      }, INACTIVITY_DELAY_MS);
    };

    ACTIVITY_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, schedulePrompt, { passive: true });
    });
    schedulePrompt();

    return () => {
      window.clearTimeout(inactivityTimer);
      ACTIVITY_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, schedulePrompt);
      });
    };
  }, []);

  const toggleAssistant = () => {
    hasOpenedRef.current = true;
    setIsOpen((currentValue) => !currentValue);
  };

  return (
    <aside className="fixed bottom-[calc(env(safe-area-inset-bottom)+5.75rem)] right-4 z-[60] flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      {isOpen ? (
        <div
          id="whatsapp-assistant-panel"
          role="region"
          aria-label="Contact rapid pe WhatsApp"
          className="w-[min(20rem,calc(100vw-2rem))] animate-fade-in-up rounded-2xl border border-white/60 bg-white/75 p-4 text-brand-black shadow-[0_18px_55px_rgba(8,8,8,0.22)] backdrop-blur-xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-green">
                Suntem aici
              </p>
              <p className="mt-1 font-display text-2xl font-black uppercase leading-none">
                Vă putem ajuta cu ceva?
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-brand-steel transition-colors hover:bg-black/5 hover:text-brand-black"
              aria-label="Închide opțiunile WhatsApp"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <p className="mt-3 text-sm leading-6 text-brand-steel">
            Alege un număr și scrie-ne direct pe WhatsApp.
          </p>

          <div className="mt-4 grid gap-2">
            {siteConfig.businessPhones.map((phone) => {
              const whatsappHref = createWhatsAppHref(phone.whatsappE164, contactSelection);

              return (
                <a
                  key={phone.whatsappE164}
                  href={whatsappHref ?? undefined}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-green px-4 text-sm font-bold text-white transition-colors hover:bg-[#447c3d]"
                  aria-label={`Scrie pe WhatsApp la ${phone.display}`}
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  {phone.display}
                </a>
              );
            })}
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={toggleAssistant}
        className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-green text-white shadow-[0_12px_30px_rgba(79,143,70,0.42)] transition-transform hover:scale-105 hover:bg-[#447c3d] active:scale-95"
        aria-label={isOpen ? "Închide opțiunile WhatsApp" : "Deschide opțiunile WhatsApp"}
        aria-expanded={isOpen}
        aria-controls="whatsapp-assistant-panel"
      >
        <MessageCircle className="h-7 w-7" aria-hidden />
        <span
          className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#25D366]"
          aria-hidden
        />
      </button>
    </aside>
  );
}
