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
  logoAlt: "b.rent — Închirieri containere",
  logos: {
    darkBackground: "/brand/greu-logo-dark-background.png",
    lightBackground: "/brand/greu-logo-light-background.png",
  },
  contact: {
    phoneDisplay: nullableEnv(import.meta.env.VITE_CONTACT_PHONE_DISPLAY) ?? businessPhones[0].display,
    phoneE164: nullableEnv(import.meta.env.VITE_CONTACT_PHONE_E164) ?? businessPhones[0].phoneE164,
    whatsappE164:
      nullableEnv(import.meta.env.VITE_CONTACT_WHATSAPP_E164) ?? businessPhones[0].whatsappE164,
    email: nullableEnv(import.meta.env.VITE_CONTACT_EMAIL),
    serviceArea: nullableEnv(import.meta.env.VITE_SERVICE_AREA),
    businessHours: nullableEnv(import.meta.env.VITE_BUSINESS_HOURS),
    callbackEndpoint: nullableEnv(import.meta.env.VITE_CALLBACK_ENDPOINT),
  } satisfies SiteContactConfig,
  businessPhones,
  compliance: {
    sal: {
      href: "https://anpc.ro/sal/",
      imageSrc: "/figma/sol%20n%20apnc/anpc.png",
    },
    sol: {
      href: "https://consumer-redress.ec.europa.eu/index_en",
      imageSrc: "/figma/sol%20n%20apnc/sol.png",
    },
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
