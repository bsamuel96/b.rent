import * as React from "react";
import { siteConfig } from "@/config/site";
import type { SiteRoute } from "@/lib/routes";

interface Metadata {
  title: string;
  description: string;
  pathname: string;
  robots?: string;
}

const metadataByRoute: Record<SiteRoute["kind"], Metadata> = {
  home: {
    title: "Închirieri containere București–Ilfov | b.rent",
    description:
      "Containere de 7 și 10 m³ pentru renovări, debarasări și șantiere. Estimează capacitatea și programează livrarea în București–Ilfov.",
    pathname: "/",
  },
  privacy: {
    title: "Politica de confidențialitate | b.rent",
    description:
      "Află ce date personale prelucrează b.rent, în ce scop, pentru cât timp și ce drepturi ai.",
    pathname: "/politica-de-confidentialitate/",
  },
  terms: {
    title: "Termeni și condiții | b.rent",
    description:
      "Condițiile de utilizare a site-ului b.rent și informații despre solicitarea serviciilor de închiriere a containerelor.",
    pathname: "/termeni-si-conditii/",
  },
  imprint: {
    title: "Date legale | b.rent",
    description:
      "Datele de identificare și contact ale CIOCIOSANU SRL, operatorul website-ului b.rent.",
    pathname: "/date-legale/",
  },
  thanks: {
    title: "Solicitare trimisă | b.rent",
    description: "Solicitarea ta a fost înregistrată. Echipa b.rent te va contacta pentru confirmare.",
    pathname: "/multumim/",
    robots: "noindex, nofollow",
  },
  "not-found": {
    title: "Pagina nu a fost găsită | b.rent",
    description: "Pagina căutată nu există sau a fost mutată. Revino la pagina principală b.rent.",
    pathname: "/404.html",
    robots: "noindex, follow",
  },
};

const setMeta = (selector: string, attribute: "content" | "href", value: string) => {
  document.querySelector<HTMLElement>(selector)?.setAttribute(attribute, value);
};

export function PageMetadata({ route }: { route: SiteRoute }) {
  React.useEffect(() => {
    const metadata = metadataByRoute[route.kind];
    const canonicalUrl = new URL(metadata.pathname, siteConfig.siteUrl).toString();
    const imageUrl = new URL("/og/b-rent-og.jpg", siteConfig.siteUrl).toString();

    document.title = metadata.title;
    setMeta('meta[name="description"]', "content", metadata.description);
    setMeta('meta[name="robots"]', "content", metadata.robots ?? "index, follow");
    setMeta('meta[property="og:title"]', "content", metadata.title);
    setMeta('meta[property="og:description"]', "content", metadata.description);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[property="og:image"]', "content", imageUrl);
    setMeta('meta[name="twitter:title"]', "content", metadata.title);
    setMeta('meta[name="twitter:description"]', "content", metadata.description);
    setMeta('meta[name="twitter:image"]', "content", imageUrl);
    setMeta('link[rel="canonical"]', "href", canonicalUrl);
  }, [route.kind]);

  return null;
}
