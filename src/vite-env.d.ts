/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_CONTACT_PHONE_DISPLAY?: string;
  readonly VITE_CONTACT_PHONE_E164?: string;
  readonly VITE_CONTACT_WHATSAPP_E164?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  /** @deprecated Use VITE_BUSINESS_REGISTERED_OFFICE. */
  readonly VITE_BUSINESS_ADDRESS?: string;
  readonly VITE_BUSINESS_REGISTERED_OFFICE?: string;
  readonly VITE_BUSINESS_NAME?: string;
  readonly VITE_BUSINESS_FISCAL_CODE?: string;
  readonly VITE_BUSINESS_REGISTRATION_NUMBER?: string;
  readonly VITE_BUSINESS_CURRENT_REGISTRATION_NUMBER?: string;
  readonly VITE_BUSINESS_EUID?: string;
  readonly VITE_BUSINESS_PRIMARY_ACTIVITY?: string;
  readonly VITE_SERVICE_AREA?: string;
  readonly VITE_BUSINESS_HOURS?: string;
  readonly VITE_CALLBACK_ENDPOINT?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_META_PIXEL_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
