import { siteConfig } from "@/config/site";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

const SCRIPT_ID = "brent-google-analytics";

export const enableAnalytics = () => {
  const measurementId = siteConfig.analytics.googleMeasurementId;

  if (!measurementId || document.getElementById(SCRIPT_ID)) {
    return;
  }

  window[`ga-disable-${measurementId}`] = false;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    anonymize_ip: true,
    page_path: `${window.location.pathname}${window.location.search}`,
  });

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.append(script);
};

export const disableAnalytics = () => {
  const measurementId = siteConfig.analytics.googleMeasurementId;

  if (measurementId) {
    window[`ga-disable-${measurementId}`] = true;
  }
};
