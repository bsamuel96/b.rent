const nullableEnv = (value: string | undefined): string | null => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

export interface SiteContactConfig {
  phoneDisplay: string | null;
  phoneE164: string | null;
  whatsappE164: string | null;
  email: string | null;
  serviceArea: string | null;
  businessHours: string | null;
  callbackEndpoint: string | null;
}

const businessPhones = [
  {
    display: "0723 527 552",
    phoneE164: "+40723527552",
    whatsappE164: "+40723527552",
  },
  {
    display: "0720 255 160",
    phoneE164: "+40720255160",
    whatsappE164: "+40720255160",
  },
] as const;

export const siteConfig = {
  brandName: "b.rent",
  siteUrl: nullableEnv(import.meta.env.VITE_SITE_URL) ?? "https://brent-romania.com",
  logoAlt: "b.rent — Închirieri containere",
  logos: {
    darkBackground: "/brand/greu-logo-dark-background.webp",
    lightBackground: "/brand/greu-logo-light-background.webp",
  },
  contact: {
    phoneDisplay: nullableEnv(import.meta.env.VITE_CONTACT_PHONE_DISPLAY) ?? businessPhones[0].display,
    phoneE164: nullableEnv(import.meta.env.VITE_CONTACT_PHONE_E164) ?? businessPhones[0].phoneE164,
    whatsappE164:
      nullableEnv(import.meta.env.VITE_CONTACT_WHATSAPP_E164) ?? businessPhones[0].whatsappE164,
    email: nullableEnv(import.meta.env.VITE_CONTACT_EMAIL) ?? "info@brentromania.com",
    serviceArea: nullableEnv(import.meta.env.VITE_SERVICE_AREA) ?? "București și Ilfov",
    businessHours: nullableEnv(import.meta.env.VITE_BUSINESS_HOURS),
    callbackEndpoint: nullableEnv(import.meta.env.VITE_CALLBACK_ENDPOINT),
  } satisfies SiteContactConfig,
  legal: {
    businessName: nullableEnv(import.meta.env.VITE_BUSINESS_NAME) ?? "CIOCIOSANU SRL",
    fiscalCode: nullableEnv(import.meta.env.VITE_BUSINESS_FISCAL_CODE) ?? "23291316",
    registrationNumber:
      nullableEnv(import.meta.env.VITE_BUSINESS_REGISTRATION_NUMBER) ?? "J51/117/2008",
    currentRegistrationNumber:
      nullableEnv(import.meta.env.VITE_BUSINESS_CURRENT_REGISTRATION_NUMBER) ?? "J2008000117519",
    euid: nullableEnv(import.meta.env.VITE_BUSINESS_EUID) ?? "ROONRC.J2008000117519",
    primaryActivity:
      nullableEnv(import.meta.env.VITE_BUSINESS_PRIMARY_ACTIVITY) ??
      "CAEN 3811 — Colectarea deșeurilor nepericuloase",
    registeredOffice:
      nullableEnv(import.meta.env.VITE_BUSINESS_REGISTERED_OFFICE) ??
      nullableEnv(import.meta.env.VITE_BUSINESS_ADDRESS) ??
      "Str. Albatrosului, sat Șoldanu, com. Șoldanu, jud. Călărași, 917235, România",
  },
  analytics: {
    googleMeasurementId: nullableEnv(import.meta.env.VITE_GA_MEASUREMENT_ID),
  },
  businessPhones,
  compliance: {
    sal: {
      href: "https://anpc.ro/sal/",
      imageSrc: "/figma/sol%20n%20apnc/anpc.webp",
    },
    sol: {
      href: "https://consumer-redress.ec.europa.eu/index_en",
      imageSrc: "/figma/sol%20n%20apnc/sol.webp",
    },
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61592897452715",
    instagram: "https://www.instagram.com/brentromania/",
    tiktok: "https://www.tiktok.com/@brentromania",
  },
  credits: {
    agencyName: "Digital Romanian SRL",
    agencyUrl: "https://digitalromanian.com",
    agencyDomain: "digitalromanian.com",
  },
  placeholders: {
    phone: "Număr de telefon în curs de configurare",
    headerPhone: "Lasă-ne numărul tău și te contactăm noi",
    whatsapp: "WhatsApp în curs de configurare",
    email: "Adresa de email va fi afișată aici",
    serviceArea: "Aria de livrare va fi afișată aici",
    businessHours: "Programul va fi afișat aici",
  },
} as const;
