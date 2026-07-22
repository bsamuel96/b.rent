/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_PHONE_DISPLAY?: string;
  readonly VITE_CONTACT_PHONE_E164?: string;
  readonly VITE_CONTACT_WHATSAPP_E164?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_SERVICE_AREA?: string;
  readonly VITE_BUSINESS_HOURS?: string;
  readonly VITE_CALLBACK_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
