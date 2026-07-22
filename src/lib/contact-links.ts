import type { EstimatorSelection } from "@/data/container-options";

export interface ContactSelection {
  projectLabel: string;
  capacity: number;
}

const onlyDigitsAndPlus = (value: string) => value.replace(/[^\d+]/g, "");

export function normalizeRomanianPhoneNumber(input: string | null): string | null {
  if (!input) {
    return null;
  }

  const compact = onlyDigitsAndPlus(input.trim());

  if (!compact) {
    return null;
  }

  if (compact.startsWith("+")) {
    return compact.length >= 8 ? compact : null;
  }

  if (compact.startsWith("00")) {
    return `+${compact.slice(2)}`;
  }

  if (compact.startsWith("0")) {
    return `+40${compact.slice(1)}`;
  }

  if (compact.startsWith("40")) {
    return `+${compact}`;
  }

  if (compact.startsWith("7")) {
    return `+40${compact}`;
  }

  return compact.length >= 8 ? `+${compact}` : null;
}

export function normalizeE164WhatsAppNumber(input: string | null): string | null {
  const normalized = normalizeRomanianPhoneNumber(input);
  return normalized ? normalized.replace(/[^\d]/g, "") : null;
}

export function createTelHref(phoneE164: string | null): string | null {
  const normalized = normalizeRomanianPhoneNumber(phoneE164);
  return normalized ? `tel:${normalized}` : null;
}

export function buildWhatsAppMessage(selection: ContactSelection): string {
  return `Bună! Am un proiect ${selection.projectLabel.toLowerCase()} și sunt interesat de un container de ${selection.capacity} m³. Aș dori mai multe informații.`;
}

export function createWhatsAppHref(
  whatsappE164: string | null,
  selection: ContactSelection,
): string | null {
  const normalized = normalizeE164WhatsAppNumber(whatsappE164);

  if (!normalized) {
    return null;
  }

  return `https://wa.me/${normalized}?text=${encodeURIComponent(buildWhatsAppMessage(selection))}`;
}

export function createEmailSubject(selection: ContactSelection): string {
  return `Solicitare container ${selection.capacity} m³`;
}

export function createEmailBody(selection: ContactSelection, extraDetails?: string): string {
  const lines = [
    `Bună! Am un proiect ${selection.projectLabel.toLowerCase()} și sunt interesat de un container de ${selection.capacity} m³.`,
    "Aș dori mai multe informații.",
  ];

  if (extraDetails?.trim()) {
    lines.push("", `Detalii: ${extraDetails.trim()}`);
  }

  return lines.join("\n");
}

export function createMailtoHref(
  email: string | null,
  selection: ContactSelection,
  extraDetails?: string,
): string | null {
  const trimmedEmail = email?.trim();

  if (!trimmedEmail) {
    return null;
  }

  const params = new URLSearchParams({
    subject: createEmailSubject(selection),
    body: createEmailBody(selection, extraDetails),
  });

  return `mailto:${trimmedEmail}?${params.toString()}`;
}

export function selectionToContactSelection(selection: EstimatorSelection): ContactSelection {
  return {
    projectLabel: selection.projectLabel,
    capacity: selection.capacity,
  };
}
