import * as React from "react";
import { Menu, PhoneCall } from "lucide-react";
import { BrandLogo } from "@/components/site/brand-logo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { createTelHref } from "@/lib/contact-links";

interface SiteHeaderProps {
  onCallback: () => void;
}

const navItems = [
  { href: "#calculator", label: "Estimator" },
  { href: "#cum-functioneaza", label: "Cum funcționează" },
  { href: "#proiecte", label: "Proiecte" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader({ onCallback }: SiteHeaderProps) {
  const telHref = createTelHref(siteConfig.contact.phoneE164);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleMobileCallback = () => {
    setMenuOpen(false);
    onCallback();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/45 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,255,255,0.42)_54%,rgba(79,143,70,0.16))] shadow-[0_18px_60px_rgba(8,8,8,0.18)] ring-1 ring-white/25 backdrop-blur-2xl backdrop-saturate-[1.8]">
      <div className="container flex min-h-16 items-center justify-between gap-3 py-2">
        <a href="#" className="inline-flex items-center" aria-label="b.rent pagina principală">
          <BrandLogo variant="light" className="max-w-[4.4rem]" />
        </a>

        <nav className="hidden items-center gap-5 text-sm font-semibold text-brand-charcoal lg:flex" aria-label="Navigație principală">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-black focus-visible:rounded-sm">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {telHref && siteConfig.contact.phoneDisplay ? (
            <Button asChild variant="ghost" size="sm" className="text-brand-charcoal">
              <a href={telHref}>
                <PhoneCall />
                {siteConfig.contact.phoneDisplay}
              </a>
            </Button>
          ) : (
            <span className="max-w-48 text-right text-xs font-semibold text-muted-foreground">
              {siteConfig.placeholders.headerPhone}
            </span>
          )}
          <Button type="button" size="sm" onClick={onCallback}>
            Vreau să fiu sunat
          </Button>
        </div>

        <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Deschide meniul">
              <Menu />
            </Button>
          </DialogTrigger>
          <DialogContent className="top-5 translate-y-0">
            <DialogHeader>
              <BrandLogo variant="light" className="max-w-[6.2rem]" />
              <DialogTitle>Meniu</DialogTitle>
              <DialogDescription>Acces rapid la estimator și contact.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md border border-border px-4 py-3 text-sm font-semibold transition-colors hover:border-primary hover:bg-primary/10"
                >
                  {item.label}
                </a>
              ))}
              <Separator />
              <p className="text-sm text-muted-foreground">
                {siteConfig.contact.phoneDisplay ?? siteConfig.placeholders.phone}
              </p>
              <Button type="button" onClick={handleMobileCallback}>
                <PhoneCall />
                Vreau să fiu sunat
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
