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
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getInitialEstimatorSelection, type EstimatorSelection } from "@/data/container-options";

export function App() {
  const [selection, setSelection] = React.useState<EstimatorSelection>(getInitialEstimatorSelection);
  const [callbackOpen, setCallbackOpen] = React.useState(false);

  return (
    <TooltipProvider delayDuration={120}>
      <div className="min-h-screen pb-24 md:pb-0">
        <SiteHeader onCallback={() => setCallbackOpen(true)} />
        <main>
          <HeroSection onCallback={() => setCallbackOpen(true)} />
          <HowItWorks />
          <ProjectEstimator
            selection={selection}
            onSelectionChange={setSelection}
            onCallback={() => setCallbackOpen(true)}
          />
          <AvailableContainers />
          <ProjectTypes />
          <BenefitsSection />
          <ContactSection selection={selection} onCallback={() => setCallbackOpen(true)} />
        </main>
        <SiteFooter />
        <MobileContactBar selection={selection} onCallback={() => setCallbackOpen(true)} />
        <CallbackDrawer open={callbackOpen} onOpenChange={setCallbackOpen} selection={selection} />
      </div>
      <Toaster />
    </TooltipProvider>
  );
}
