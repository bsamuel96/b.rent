import * as React from "react";
import { X } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { EstimatorSelection } from "@/data/container-options";
import { createWhatsAppHref, selectionToContactSelection } from "@/lib/contact-links";

const INACTIVITY_DELAY_MS = 8_000;
const ACTIVITY_EVENTS = ["pointermove", "pointerdown", "keydown", "scroll", "touchstart"] as const;

interface WhatsAppAssistantProps {
  selection: EstimatorSelection;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.172.198-.297.298-.495.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.009-.371-.011-.57-.011-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.875 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.57-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.647-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.89-9.884a9.82 9.82 0 0 1 7.021 2.91 9.83 9.83 0 0 1 2.898 7.027c-.002 5.45-4.436 9.884-9.885 9.884M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.82 11.82 0 0 0 20.465 3.48 11.82 11.82 0 0 0 12.05 0" />
    </svg>
  );
}

export function WhatsAppAssistant({ selection }: WhatsAppAssistantProps) {
  const [isPromptVisible, setIsPromptVisible] = React.useState(false);
  const hasPromptedRef = React.useRef(false);
  const contactSelection = selectionToContactSelection(selection);
  const launcherHref = createWhatsAppHref(
    siteConfig.businessPhones[0].whatsappE164,
    contactSelection,
  );

  React.useEffect(() => {
    let inactivityTimer = 0;

    const schedulePrompt = () => {
      if (hasPromptedRef.current) {
        return;
      }

      window.clearTimeout(inactivityTimer);
      inactivityTimer = window.setTimeout(() => {
        hasPromptedRef.current = true;
        setIsPromptVisible(true);
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

  return (
    <aside className="fixed bottom-[calc(env(safe-area-inset-bottom)+5.75rem)] right-4 z-[60] flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      {isPromptVisible ? (
        <div
          id="whatsapp-assistant-panel"
          role="region"
          aria-label="Contact rapid pe WhatsApp"
          className="w-[min(20rem,calc(100vw-2rem))] animate-fade-in-up rounded-2xl border border-white/55 bg-gradient-to-br from-white/50 via-white/35 to-white/20 p-4 text-brand-black shadow-[0_18px_55px_rgba(8,8,8,0.18),inset_0_1px_0_rgba(255,255,255,0.7)] ring-1 ring-black/5 backdrop-blur-2xl backdrop-saturate-150"
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
              onClick={() => setIsPromptVisible(false)}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-brand-black/60 transition-colors hover:bg-black/5 hover:text-brand-black"
              aria-label="Închide opțiunile WhatsApp"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <p className="mt-3 text-sm font-medium leading-6 text-brand-black/75">
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
                  <WhatsAppIcon className="h-4 w-4" />
                  {phone.display}
                </a>
              );
            })}
          </div>
        </div>
      ) : null}

      <a
        href={launcherHref ?? undefined}
        target="_blank"
        rel="noreferrer"
        className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-green text-white shadow-[0_12px_30px_rgba(79,143,70,0.42)] transition-transform hover:scale-105 hover:bg-[#447c3d] active:scale-95"
        aria-label={`Scrie pe WhatsApp la ${siteConfig.businessPhones[0].display}`}
      >
        <WhatsAppIcon className="h-7 w-7" />
        <span
          className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#25D366]"
          aria-hidden
        />
      </a>
    </aside>
  );
}
