import * as React from "react";
import { cn } from "@/lib/utils";

export interface BackgroundGradientAnimationProps {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: React.CSSProperties["mixBlendMode"];
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  interactive?: boolean;
}

export function BackgroundGradientAnimation({
  gradientBackgroundStart = "rgb(5, 5, 5)",
  gradientBackgroundEnd = "rgb(34, 34, 34)",
  firstColor = "79, 143, 70",
  secondColor = "111, 169, 102",
  thirdColor = "93, 102, 112",
  fourthColor = "255, 255, 255",
  fifthColor = "79, 143, 70",
  pointerColor = "79, 143, 70",
  size = "70%",
  blendingValue = "screen",
  children,
  className,
  containerClassName,
  interactive = true,
}: BackgroundGradientAnimationProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const interactiveRef = React.useRef<HTMLDivElement>(null);
  const frameRef = React.useRef<number>();
  const pressTimeoutRef = React.useRef<number>();
  const currentPosition = React.useRef({ x: 0, y: 0 });
  const targetPosition = React.useRef({ x: 0, y: 0 });

  const scopedStyle = {
    "--gradient-background-start": gradientBackgroundStart,
    "--gradient-background-end": gradientBackgroundEnd,
    "--first-color": firstColor,
    "--second-color": secondColor,
    "--third-color": thirdColor,
    "--fourth-color": fourthColor,
    "--fifth-color": fifthColor,
    "--pointer-color": pointerColor,
    "--size": size,
    "--blending-value": blendingValue,
  } as React.CSSProperties;

  const setTargetFromEvent = React.useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const rect = root.getBoundingClientRect();
    targetPosition.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }, []);

  React.useEffect(() => {
    const root = rootRef.current;

    if (!root || !interactive) {
      return undefined;
    }

    const rect = root.getBoundingClientRect();
    currentPosition.current = { x: rect.width / 2, y: rect.height / 2 };
    targetPosition.current = { ...currentPosition.current };

    const animate = () => {
      const current = currentPosition.current;
      const target = targetPosition.current;

      current.x += (target.x - current.x) / 16;
      current.y += (target.y - current.y) / 16;

      if (interactiveRef.current) {
        interactiveRef.current.style.setProperty("--pointer-x", `${current.x}px`);
        interactiveRef.current.style.setProperty("--pointer-y", `${current.y}px`);
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }

      if (pressTimeoutRef.current) {
        window.clearTimeout(pressTimeoutRef.current);
      }
    };
  }, [interactive]);

  const handlePointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      setTargetFromEvent(event);

      if (!interactiveRef.current) {
        return;
      }

      interactiveRef.current.style.setProperty("--pointer-scale", "1.08");

      if (pressTimeoutRef.current) {
        window.clearTimeout(pressTimeoutRef.current);
      }

      pressTimeoutRef.current = window.setTimeout(() => {
        interactiveRef.current?.style.setProperty("--pointer-scale", "1");
      }, 180);
    },
    [setTargetFromEvent],
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative min-h-[76svh] w-full overflow-hidden bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName,
      )}
      style={scopedStyle}
      onPointerMove={interactive ? setTargetFromEvent : undefined}
      onPointerDown={interactive ? handlePointerDown : undefined}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-80 blur-2xl saturate-[1.04] sm:opacity-90 md:blur-3xl"
      >
        <div className="absolute left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] origin-center animate-first rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--first-color),0.48)_0,rgba(var(--first-color),0)_58%)] mix-blend-[var(--blending-value)]" />
        <div className="absolute left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] origin-[calc(50%-280px)] animate-second rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--second-color),0.28)_0,rgba(var(--second-color),0)_60%)] mix-blend-[var(--blending-value)]" />
        <div className="absolute left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] origin-[calc(50%+260px)] animate-third rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--third-color),0.34)_0,rgba(var(--third-color),0)_60%)] mix-blend-[var(--blending-value)]" />
        <div className="absolute left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] origin-[calc(50%-160px)] animate-fourth rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--fourth-color),0.12)_0,rgba(var(--fourth-color),0)_62%)] mix-blend-soft-light" />
        <div className="absolute left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] origin-[calc(50%+180px)] animate-fifth rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--fifth-color),0.22)_0,rgba(var(--fifth-color),0)_62%)] mix-blend-[var(--blending-value)]" />
        {interactive ? (
          <div
            ref={interactiveRef}
            className="absolute left-0 top-0 h-[var(--size)] w-[var(--size)] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--pointer-color),0.48)_0,rgba(var(--pointer-color),0)_54%)] opacity-70 mix-blend-screen transition-transform duration-150 ease-out"
            style={{
              transform:
                "translate3d(calc(var(--pointer-x, 50%) - 50%), calc(var(--pointer-y, 50%) - 50%), 0) scale(var(--pointer-scale, 1))",
            }}
          />
        ) : null}
      </div>
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}
