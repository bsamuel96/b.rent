import type * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface ProjectOptionCardProps {
  id: string;
  value: string;
  title: string;
  description?: string;
  meta?: string;
  imageSrc?: string;
  imageAlt?: string;
  selected: boolean;
  recommended?: boolean;
}

export function ProjectOptionCard({
  id,
  value,
  title,
  description,
  meta,
  imageSrc,
  imageAlt,
  selected,
  recommended = false,
}: ProjectOptionCardProps) {
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--touch-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--touch-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      className="touch-glow rounded-lg"
      data-selected={selected}
      onPointerMove={handlePointerMove}
    >
      <RadioGroupItem id={id} value={value} className="peer sr-only" />
      <Label
        htmlFor={id}
        className={cn(
          "flex min-h-[8.5rem] cursor-pointer flex-col justify-between gap-4 rounded-lg border bg-white p-4 shadow-sm transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 sm:min-h-[9rem]",
          selected ? "border-brand-yellow shadow-yellow-glow" : "border-border hover:border-brand-yellow/70",
        )}
      >
        {imageSrc ? (
          <span className="flex aspect-[4/3] items-center justify-center rounded-md border border-black/10 bg-gradient-to-br from-white to-brand-offwhite p-2">
            <img src={imageSrc} alt={imageAlt ?? ""} className="h-full w-full object-contain" loading="lazy" />
          </span>
        ) : null}
        <span className="flex items-start justify-between gap-3">
          <span>
            <span className="block font-display text-3xl font-extrabold leading-none tracking-normal">
              {title}
            </span>
            {description ? (
              <span className="mt-2 block text-sm font-medium leading-5 text-muted-foreground">
                {description}
              </span>
            ) : null}
          </span>
          <span className={cn("mt-1 text-brand-yellow transition-opacity", selected ? "opacity-100" : "opacity-0")}>
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          </span>
        </span>
        {recommended || meta ? (
          <span className="flex flex-wrap items-center gap-2">
            <Badge variant={recommended ? "default" : "muted"}>{recommended ? "Recomandat" : meta}</Badge>
            {recommended && meta ? <span className="text-xs font-semibold text-muted-foreground">{meta}</span> : null}
          </span>
        ) : null}
      </Label>
    </div>
  );
}
