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

export const siteConfig = {
  brandName: "b.rent",
  logoAlt: "b.rent — Închirieri containere",
  logos: {
    darkBackground: "/brand/greu-logo-dark-background.png",
    lightBackground: "/brand/greu-logo-light-background.png",
  },
  contact: {
    phoneDisplay: nullableEnv(import.meta.env.VITE_CONTACT_PHONE_DISPLAY),
    phoneE164: nullableEnv(import.meta.env.VITE_CONTACT_PHONE_E164),
    whatsappE164: nullableEnv(import.meta.env.VITE_CONTACT_WHATSAPP_E164),
    email: nullableEnv(import.meta.env.VITE_CONTACT_EMAIL),
    serviceArea: nullableEnv(import.meta.env.VITE_SERVICE_AREA),
    businessHours: nullableEnv(import.meta.env.VITE_BUSINESS_HOURS),
    callbackEndpoint: nullableEnv(import.meta.env.VITE_CALLBACK_ENDPOINT),
  } satisfies SiteContactConfig,
  placeholders: {
    phone: "Număr de telefon în curs de configurare",
    headerPhone: "Lasă-ne numărul tău și te contactăm noi",
    whatsapp: "WhatsApp în curs de configurare",
    email: "Adresa de email va fi afișată aici",
    serviceArea: "Aria de livrare va fi afișată aici",
    businessHours: "Programul va fi afișat aici",
  },
} as const;
