import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export type CookieChoice = "accepted" | "rejected" | null;

interface CookieConsentProps {
  open: boolean;
  analyticsConfigured: boolean;
  currentChoice: CookieChoice;
  onAccept: () => void;
  onReject: () => void;
  onClose: () => void;
}

export function CookieConsent({
  open,
  analyticsConfigured,
  currentChoice,
  onAccept,
  onReject,
  onClose,
}: CookieConsentProps) {
  if (!open) {
    return null;
  }

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-3xl rounded-xl border border-black/10 bg-white p-5 shadow-[0_24px_80px_rgba(8,8,8,0.3)] sm:bottom-5 sm:p-6"
    >
      <div className="flex items-start gap-4">
        <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-brand-green sm:flex">
          <Cookie className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-green">
                Preferințe cookie
              </p>
              <h2 id="cookie-consent-title" className="mt-1 font-display text-2xl font-black uppercase">
                Tu alegi ce măsurăm
              </h2>
            </div>
            {currentChoice ? (
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Închide preferințele cookie"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            ) : null}
          </div>

          <p id="cookie-consent-description" className="mt-3 text-sm leading-6 text-muted-foreground">
            Folosim stocare strict necesară pentru a reține alegerea ta. Analiza traficului și măsurarea
            reclamelor (Meta Pixel) sunt activate numai dacă accepți
            {analyticsConfigured ? "." : " și după configurarea serviciului de analiză."}
            Detalii în{" "}
            <a className="font-semibold text-foreground underline underline-offset-4" href="/politica-de-confidentialitate/">
              politica de confidențialitate
            </a>
            .
          </p>

          <div className="mt-5 grid gap-2 sm:flex sm:flex-row-reverse">
            <Button type="button" onClick={onAccept}>
              Acceptă analiza
            </Button>
            <Button type="button" variant="outline" onClick={onReject}>
              Doar necesare
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
