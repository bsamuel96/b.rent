export type SiteRoute =
  | { kind: "home" }
  | { kind: "privacy" }
  | { kind: "terms" }
  | { kind: "imprint" }
  | { kind: "thanks" }
  | { kind: "not-found" };

const normalizePathname = (pathname: string) => {
  const normalized = pathname.replace(/\/+$/, "");
  return normalized || "/";
};

export const getRoute = (pathname: string): SiteRoute => {
  switch (normalizePathname(pathname)) {
    case "/":
    case "/index.html":
      return { kind: "home" };
    case "/politica-de-confidentialitate":
    case "/politica-de-confidentialitate/index.html":
      return { kind: "privacy" };
    case "/termeni-si-conditii":
    case "/termeni-si-conditii/index.html":
      return { kind: "terms" };
    case "/date-legale":
    case "/date-legale/index.html":
      return { kind: "imprint" };
    case "/multumim":
    case "/multumim/index.html":
      return { kind: "thanks" };
    case "/404.html":
      return { kind: "not-found" };
    default:
      return { kind: "not-found" };
  }
};
