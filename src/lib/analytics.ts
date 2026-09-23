import { siteConfig } from "@/config/site";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: MetaPixel;
    _fbq?: MetaPixel;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

type MetaPixel = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: MetaPixel;
  loaded: boolean;
  version: string;
};

const SCRIPT_ID = "brent-google-analytics";
const META_PIXEL_SCRIPT_ID = "brent-meta-pixel";

export const enableAnalytics = () => {
  enableGoogleAnalytics();
  enableMetaPixel();
};

export const disableAnalytics = () => {
  const measurementId = siteConfig.analytics.googleMeasurementId;

  if (measurementId) {
    window[`ga-disable-${measurementId}`] = true;
  }

  window.fbq?.("consent", "revoke");
};

const enableGoogleAnalytics = () => {
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

// Mirrors the official Meta Pixel base code, loaded only after consent.
const enableMetaPixel = () => {
  const pixelId = siteConfig.analytics.metaPixelId;

  if (!pixelId) {
    return;
  }

  if (document.getElementById(META_PIXEL_SCRIPT_ID)) {
    window.fbq?.("consent", "grant");
    return;
  }

  if (!window.fbq) {
    const fbq = ((...args: unknown[]) => {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue.push(args);
      }
    }) as MetaPixel;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = window._fbq ?? fbq;
  }

  window.fbq("consent", "grant");
  window.fbq("init", pixelId);
  window.fbq("track", "PageView");

  const script = document.createElement("script");
  script.id = META_PIXEL_SCRIPT_ID;
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.append(script);
};
