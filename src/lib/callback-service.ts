import { siteConfig, type SiteContactConfig } from "@/config/site";
import { createMailtoHref, type ContactSelection } from "@/lib/contact-links";

export interface CallbackFormData {
  name: string;
  phone: string;
  locality: string;
  details: string;
  projectLabel: string;
  capacity: number;
  consent: boolean;
}

export type CallbackSubmissionResult =
  | {
      status: "posted";
      message: string;
    }
  | {
      status: "mailto";
      message: string;
      mailtoHref: string;
    }
  | {
      status: "unconfigured";
      message: string;
    }
  | {
      status: "error";
      message: string;
    };

const getSelection = (data: CallbackFormData): ContactSelection => ({
  projectLabel: data.projectLabel,
  capacity: data.capacity,
});

export async function submitCallbackRequest(
  data: CallbackFormData,
  contactConfig: SiteContactConfig = siteConfig.contact,
): Promise<CallbackSubmissionResult> {
  if (contactConfig.callbackEndpoint) {
    try {
      const response = await fetch(contactConfig.callbackEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        return {
          status: "error",
          message: "Solicitarea nu a putut fi trimisă momentan. Te rugăm să încerci din nou.",
        };
      }

      return {
        status: "posted",
        message: "Solicitarea a fost trimisă. Te vom contacta folosind datele introduse.",
      };
    } catch {
      return {
        status: "error",
        message: "Conexiunea către formular nu este disponibilă momentan. Te rugăm să încerci din nou.",
      };
    }
  }

  const mailtoHref = createMailtoHref(contactConfig.email, getSelection(data), data.details);

  if (mailtoHref) {
    return {
      status: "mailto",
      message: "Trimiterea online este în configurare. Poți deschide un email precompletat cu solicitarea ta.",
      mailtoHref,
    };
  }

  return {
    status: "unconfigured",
    message:
      "Cererile online de callback sunt în curs de configurare. Formularul rămâne pregătit, iar datele de contact vor apărea aici când sunt publicate.",
  };
}
