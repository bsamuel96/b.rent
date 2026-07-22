import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  variant: "dark" | "light";
  className?: string;
}

export function BrandLogo({ variant, className }: BrandLogoProps) {
  const src =
    variant === "dark" ? siteConfig.logos.darkBackground : siteConfig.logos.lightBackground;

  return (
    <img
      src={src}
      alt={siteConfig.logoAlt}
      className={cn("h-auto w-full max-w-[9.5rem] object-contain", className)}
      loading="eager"
      decoding="async"
    />
  );
}
