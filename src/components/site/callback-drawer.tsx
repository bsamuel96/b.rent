import * as React from "react";
import { Mail, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { EstimatorSelection } from "@/data/container-options";
import { submitCallbackRequest, type CallbackFormData, type CallbackSubmissionResult } from "@/lib/callback-service";
import { cn } from "@/lib/utils";

interface CallbackDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selection: EstimatorSelection;
}

interface CallbackFormValues {
  name: string;
  phone: string;
  locality: string;
  details: string;
  consent: boolean;
}

type FormErrors = Partial<Record<keyof CallbackFormValues, string>>;

const initialValues: CallbackFormValues = {
  name: "",
  phone: "",
  locality: "",
  details: "",
  consent: false,
};

const phonePattern = /^[+()0-9\s.-]{6,24}$/;

const validateValues = (values: CallbackFormValues): FormErrors => {
  const errors: FormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Introdu cel puțin 2 caractere.";
  }

  if (!phonePattern.test(values.phone.trim())) {
    errors.phone = "Introdu un număr de telefon valid.";
  }

  if (!values.consent) {
    errors.consent = "Confirmă acordul pentru a putea fi contactat.";
  }

  return errors;
};

export function CallbackDrawer({ open, onOpenChange, selection }: CallbackDrawerProps) {
  const [values, setValues] = React.useState<CallbackFormValues>(initialValues);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [submission, setSubmission] = React.useState<CallbackSubmissionResult | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setSubmission(null);
    }
  }, [open, selection]);

  const updateValue =
    (field: keyof CallbackFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = field === "consent" && event.target instanceof HTMLInputElement ? event.target.checked : event.target.value;
      setValues((current) => ({ ...current, [field]: value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateValues(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const payload: CallbackFormData = {
      ...values,
      name: values.name.trim(),
      phone: values.phone.trim(),
      locality: values.locality.trim(),
      details: values.details.trim(),
      projectLabel: selection.projectLabel,
      capacity: selection.capacity,
    };

    setIsSubmitting(true);
    const result = await submitCallbackRequest(payload);
    setSubmission(result);
    setIsSubmitting(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <DrawerTitle>Vreau să fiu sunat</DrawerTitle>
              <DrawerDescription>
                Lasă-ne numărul tău și selecția curentă. Confirmăm capacitatea potrivită înainte de livrare.
              </DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" aria-label="Închide formularul">
                <X />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <form className="grid gap-4 overflow-y-auto px-5 pb-3" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-2">
            <Label htmlFor="callback-name">Nume</Label>
            <Input
              id="callback-name"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={updateValue("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "callback-name-error" : undefined}
              autoFocus
            />
            {errors.name ? <p id="callback-name-error" className="text-sm font-medium text-destructive">{errors.name}</p> : null}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="callback-phone">Telefon</Label>
            <Input
              id="callback-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={updateValue("phone")}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "callback-phone-error" : undefined}
            />
            {errors.phone ? <p id="callback-phone-error" className="text-sm font-medium text-destructive">{errors.phone}</p> : null}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="callback-locality">Localitate</Label>
            <Input
              id="callback-locality"
              name="locality"
              autoComplete="address-level2"
              value={values.locality}
              onChange={updateValue("locality")}
              placeholder="Opțional"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="callback-project">Dimensiune proiect selectată</Label>
              <Input id="callback-project" value={selection.projectSummaryLabel} readOnly />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="callback-capacity">Capacitate selectată</Label>
              <Input id="callback-capacity" value={`${selection.capacity} m³`} readOnly />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="callback-details">Detalii opționale</Label>
            <Textarea
              id="callback-details"
              name="details"
              value={values.details}
              onChange={updateValue("details")}
              placeholder="Ex.: tip lucrare, acces, interval preferat"
            />
          </div>

          <div className="grid gap-2">
            <label className="flex min-h-11 items-start gap-3 rounded-md border border-border bg-white p-3 text-sm font-medium leading-5">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-brand-yellow"
                checked={values.consent}
                onChange={updateValue("consent")}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? "callback-consent-error" : undefined}
              />
              <span>Sunt de acord să fiu contactat în legătură cu această solicitare.</span>
            </label>
            {errors.consent ? (
              <p id="callback-consent-error" className="text-sm font-medium text-destructive">
                {errors.consent}
              </p>
            ) : null}
          </div>

          {submission ? (
            <div
              className={cn(
                "rounded-lg border p-4 text-sm leading-6",
                submission.status === "error"
                  ? "border-destructive/40 bg-destructive/10 text-destructive"
                  : "border-brand-yellow/50 bg-primary/10 text-foreground",
              )}
              aria-live="polite"
            >
              <p>{submission.message}</p>
              {submission.status === "mailto" ? (
                <Button asChild className="mt-3" size="sm">
                  <a href={submission.mailtoHref}>
                    <Mail />
                    Deschide emailul
                  </a>
                </Button>
              ) : null}
            </div>
          ) : null}

          <DrawerFooter className="px-0">
            <Button type="submit" disabled={isSubmitting}>
              <Send />
              {isSubmitting ? "Se verifică..." : "Trimite solicitarea"}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
