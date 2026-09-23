import * as React from "react";
import { AvailableContainers } from "@/components/site/available-containers";
import { CallbackDrawer } from "@/components/site/callback-drawer";
import { BenefitsSection } from "@/components/site/benefits-section";
import { ContactSection } from "@/components/site/contact-section";
import { HeroSection } from "@/components/site/hero-section";
import { HowItWorks } from "@/components/site/how-it-works";
import { MobileContactBar } from "@/components/site/mobile-contact-bar";
import { ProjectEstimator } from "@/components/site/project-estimator";
import { ProjectTypes } from "@/components/site/project-types";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { WhatsAppAssistant } from "@/components/site/whatsapp-assistant";
import { CookieConsent, type CookieChoice } from "@/components/site/cookie-consent";
import { LegalPage } from "@/components/site/legal-page";
import { NotFoundPage } from "@/components/site/not-found-page";
import { PageMetadata } from "@/components/site/page-metadata";
import { ThankYouPage } from "@/components/site/thank-you-page";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { siteConfig } from "@/config/site";
import { getInitialEstimatorSelection, type EstimatorSelection } from "@/data/container-options";
import { disableAnalytics, enableAnalytics } from "@/lib/analytics";
import { getRoute, type SiteRoute } from "@/lib/routes";

const COOKIE_CHOICE_KEY = "brent-cookie-choice-v1";

const readCookieChoice = (): CookieChoice => {
  try {
    const savedChoice = window.localStorage.getItem(COOKIE_CHOICE_KEY);
    return savedChoice === "accepted" || savedChoice === "rejected" ? savedChoice : null;
  } catch {
    return null;
  }
};

function HomePage({
  selection,
  onSelectionChange,
  onCallback,
}: {
  selection: EstimatorSelection;
  onSelectionChange: (selection: EstimatorSelection) => void;
  onCallback: () => void;
}) {
  return (
    <>
      <HeroSection onCallback={onCallback} />
      <HowItWorks />
      <ProjectEstimator
        selection={selection}
        onSelectionChange={onSelectionChange}
        onCallback={onCallback}
      />
      <AvailableContainers />
      <ProjectTypes />
      <BenefitsSection />
      <ContactSection selection={selection} onCallback={onCallback} />
    </>
  );
}

const renderPage = (
  route: SiteRoute,
  selection: EstimatorSelection,
  setSelection: (selection: EstimatorSelection) => void,
  onCallback: () => void,
) => {
  switch (route.kind) {
    case "home":
      return (
        <HomePage
          selection={selection}
          onSelectionChange={setSelection}
          onCallback={onCallback}
        />
      );
    case "privacy":
      return <LegalPage type="privacy" />;
    case "terms":
      return <LegalPage type="terms" />;
    case "imprint":
      return <LegalPage type="imprint" />;
    case "thanks":
      return <ThankYouPage />;
    case "not-found":
      return <NotFoundPage />;
  }
};

export function App() {
  const [selection, setSelection] = React.useState<EstimatorSelection>(getInitialEstimatorSelection);
  const [callbackOpen, setCallbackOpen] = React.useState(false);
  const [cookieChoice, setCookieChoice] = React.useState<CookieChoice>(readCookieChoice);
  const [cookiePanelOpen, setCookiePanelOpen] = React.useState(() => cookieChoice === null);
  const route = getRoute(window.location.pathname);

  React.useEffect(() => {
    if (cookieChoice === "accepted") {
      enableAnalytics();
      return;
    }

    disableAnalytics();
  }, [cookieChoice]);

  const saveCookieChoice = (choice: Exclude<CookieChoice, null>) => {
    try {
      window.localStorage.setItem(COOKIE_CHOICE_KEY, choice);
    } catch {
      // The preference remains valid for the current page when storage is unavailable.
    }
    setCookieChoice(choice);
    setCookiePanelOpen(false);
  };

  return (
    <TooltipProvider delayDuration={120}>
      <div className={route.kind === "home" ? "min-h-screen pb-24 md:pb-0" : "min-h-screen"}>
        <PageMetadata route={route} />
        <SiteHeader onCallback={() => setCallbackOpen(true)} />
        <main>{renderPage(route, selection, setSelection, () => setCallbackOpen(true))}</main>
        <SiteFooter onCookieSettings={() => setCookiePanelOpen(true)} />
        {route.kind === "home" ? (
          <>
            <MobileContactBar selection={selection} onCallback={() => setCallbackOpen(true)} />
            <WhatsAppAssistant selection={selection} />
          </>
        ) : null}
        <CallbackDrawer open={callbackOpen} onOpenChange={setCallbackOpen} selection={selection} />
        <CookieConsent
          open={cookiePanelOpen}
          analyticsConfigured={Boolean(siteConfig.analytics.googleMeasurementId || siteConfig.analytics.metaPixelId)}
          currentChoice={cookieChoice}
          onAccept={() => saveCookieChoice("accepted")}
          onReject={() => saveCookieChoice("rejected")}
          onClose={() => setCookiePanelOpen(false)}
        />
      </div>
      <Toaster />
    </TooltipProvider>
  );
}
