import type * as React from "react";
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
  compact?: boolean;
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
  compact = false,
}: ProjectOptionCardProps) {
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--touch-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--touch-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      className="touch-glow h-full rounded-lg"
      data-selected={selected}
      onPointerMove={handlePointerMove}
    >
      <RadioGroupItem id={id} value={value} className="peer sr-only" />
      <Label
        htmlFor={id}
        className={cn(
          "relative flex h-full min-h-[8.5rem] cursor-pointer flex-col justify-between gap-4 overflow-hidden rounded-lg border p-4 shadow-sm transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 sm:min-h-[9rem]",
          selected
            ? "border-2 border-brand-green bg-[#d8e8d5] text-foreground shadow-green-glow"
            : "border-border bg-white hover:border-brand-green/70",
          compact && "lg:min-h-0 lg:gap-2 lg:p-3",
        )}
      >
        {recommended ? (
          <Badge
            className={cn(
              "absolute right-3 top-3 z-10 shadow-sm",
              compact && "lg:right-2 lg:top-2",
            )}
          >
            Recomandat
          </Badge>
        ) : null}

        {imageSrc ? (
          <span
            className={cn(
              "flex aspect-[4/3] items-center justify-center rounded-md border p-2 transition-colors",
              selected
                ? "border-brand-green/35 bg-white/45"
                : "border-black/10 bg-gradient-to-br from-white to-brand-offwhite",
              compact && "lg:aspect-[16/9] lg:p-1",
            )}
          >
            <img
              src={imageSrc}
              alt={imageAlt ?? ""}
              className="h-full w-full scale-110 object-contain"
              loading="lazy"
            />
          </span>
        ) : null}
        <span>
          <span
            className={cn(
              "block font-display text-3xl font-extrabold leading-none tracking-normal",
              compact && "lg:text-2xl",
            )}
          >
            {title}
          </span>
          {description ? (
            <span
              className={cn(
                "mt-2 block text-sm font-medium leading-5",
                selected ? "text-brand-charcoal/75" : "text-muted-foreground",
                compact && "lg:mt-1 lg:text-xs lg:leading-4",
              )}
            >
              {description}
            </span>
          ) : null}
        </span>
        {meta ? (
          <span className="flex flex-wrap items-center gap-2">
            <Badge
              variant="muted"
              className={cn(
                selected && "border-brand-green/20 bg-white/55 text-brand-charcoal",
                compact && "lg:px-2 lg:py-0 lg:text-[10px]",
              )}
            >
              {meta}
            </Badge>
          </span>
        ) : null}
      </Label>
    </div>
  );
}
