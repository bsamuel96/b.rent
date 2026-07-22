import { BrandLogo } from "@/components/site/brand-logo";
import { siteConfig } from "@/config/site";
import { createMailtoHref, createTelHref } from "@/lib/contact-links";
import { getInitialEstimatorSelection } from "@/data/container-options";

const footerLinks = [
  { href: "#calculator", label: "Estimator" },
  { href: "#cum-functioneaza", label: "Cum funcționează" },
  { href: "#proiecte", label: "Proiecte" },
  { href: "#contact", label: "Contact" },
];

export function SiteFooter() {
  const defaultSelection = getInitialEstimatorSelection();
  const telHref = createTelHref(siteConfig.contact.phoneE164);
  const mailtoHref = createMailtoHref(siteConfig.contact.email, {
    projectLabel: defaultSelection.projectLabel,
    capacity: defaultSelection.capacity,
  });

  return (
    <footer className="bg-brand-offwhite py-8 text-brand-charcoal">
      <div className="container grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
        <BrandLogo variant="light" className="max-w-[6.5rem]" />
        <div className="grid gap-4 md:justify-items-end">
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold" aria-label="Navigație footer">
            {footerLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-black">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-1 text-sm text-muted-foreground md:items-end">
            <p>
              {telHref && siteConfig.contact.phoneDisplay ? (
                <a href={telHref} className="underline-offset-4 hover:underline">
                  {siteConfig.contact.phoneDisplay}
                </a>
              ) : (
                siteConfig.placeholders.phone
              )}
            </p>
            <p>
              {mailtoHref && siteConfig.contact.email ? (
                <a href={mailtoHref} className="underline-offset-4 hover:underline">
                  {siteConfig.contact.email}
                </a>
              ) : (
                siteConfig.placeholders.email
              )}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
