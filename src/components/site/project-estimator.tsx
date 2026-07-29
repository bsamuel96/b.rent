import * as React from "react";
import { ArrowRight, ClipboardCheck, Ruler } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ContactActions } from "@/components/site/contact-actions";
import { ProjectOptionCard } from "@/components/site/project-option-card";
import {
  capacityOptions,
  getProjectOption,
  projectOptions,
  type ContainerCapacity,
  type EstimatorSelection,
  type ProjectOptionId,
} from "@/data/container-options";
import { cn } from "@/lib/utils";

interface ProjectEstimatorProps {
  selection: EstimatorSelection;
  onSelectionChange: (selection: EstimatorSelection) => void;
  onCallback: () => void;
}

const toCapacity = (value: string): ContainerCapacity => {
  const numericValue = Number(value);
  return capacityOptions.some((option) => option.value === numericValue)
    ? (numericValue as ContainerCapacity)
    : 7;
};

export function ProjectEstimator({ selection, onSelectionChange, onCallback }: ProjectEstimatorProps) {
  const selectedProject = getProjectOption(selection.projectId);
  const recommendedCapacity = selectedProject.recommendedCapacity;

  const setProject = (value: string) => {
    const project = getProjectOption(value as ProjectOptionId);
    onSelectionChange({
      projectId: project.id,
      projectLabel: project.label,
      projectSummaryLabel: project.summaryLabel,
      capacity: project.recommendedCapacity,
    });
  };

  const setCapacity = (value: string) => {
    onSelectionChange({
      ...selection,
      capacity: toCapacity(value),
    });
  };

  return (
    <section
      id="calculator"
      className="scroll-mt-20 bg-brand-offwhite py-14 sm:py-16 lg:flex lg:min-h-[calc(100svh-5.5rem)] lg:items-center lg:py-6"
    >
      <div className="container">
        <div className="mb-8 max-w-2xl lg:mb-5 lg:max-w-none">
          <Badge variant="secondary" className="mb-3 lg:mb-2">
            Estimator orientativ
          </Badge>
          <h2 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-normal sm:text-6xl lg:text-5xl">
            Alege lucrarea. Ajustezi capacitatea.
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground lg:mt-2 lg:text-sm lg:leading-5">
            Datele sunt provizorii și ușor de actualizat. Recomandarea se schimbă instant când alegi tipul proiectului.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-5">
          <div className="grid gap-8 lg:gap-4">
            <div>
              <div className="mb-4 flex items-center gap-2 lg:mb-2">
                <Ruler className="h-5 w-5 text-brand-green" aria-hidden="true" />
                <h3 className="font-display text-3xl font-extrabold tracking-normal lg:text-2xl">
                  Ce fel de lucrare ai?
                </h3>
              </div>
              <RadioGroup
                value={selection.projectId}
                onValueChange={setProject}
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
                aria-label="Tipul lucrării"
              >
                {projectOptions.map((project) => (
                  <ProjectOptionCard
                    key={project.id}
                    id={`project-${project.id}`}
                    value={project.id}
                    title={project.label}
                    description={project.description}
                    selected={selection.projectId === project.id}
                    compact
                  />
                ))}
              </RadioGroup>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-2 lg:mb-2">
                <ClipboardCheck className="h-5 w-5 text-brand-green" aria-hidden="true" />
                <h3 className="font-display text-3xl font-extrabold tracking-normal lg:text-2xl">
                  Alege capacitatea disponibilă
                </h3>
              </div>
              <RadioGroup
                value={String(selection.capacity)}
                onValueChange={setCapacity}
                className="grid max-w-2xl grid-cols-2 gap-3 lg:max-w-none"
                aria-label="Capacitatea containerului"
              >
                {capacityOptions.map((capacity) => {
                  const isRecommended = capacity.value === recommendedCapacity;
                  return (
                    <ProjectOptionCard
                      key={capacity.value}
                      id={`capacity-${capacity.value}`}
                      value={String(capacity.value)}
                      title={capacity.label}
                      imageSrc={capacity.imageSrc}
                      imageAlt={capacity.imageAlt}
                      selected={selection.capacity === capacity.value}
                      recommended={isRecommended}
                      compact
                    />
                  );
                })}
              </RadioGroup>
            </div>
          </div>

          <Card className="sticky top-24 overflow-hidden border-black/10 shadow-industrial lg:static">
            <CardHeader className="bg-brand-black text-white lg:p-4">
              <CardTitle>Selecția ta</CardTitle>
              <p
                className="text-sm font-medium text-white/[0.72]"
                aria-live="polite"
              >
                Recomandare actualizată: container de {recommendedCapacity} m³.
              </p>
            </CardHeader>
            <CardContent className="space-y-5 p-5 lg:space-y-3 lg:p-4">
              <div className="grid gap-3">
                <div className="rounded-lg border border-border bg-muted/60 p-4 lg:p-3">
                  <span className="text-xs font-bold uppercase text-muted-foreground">Proiect</span>
                  <p className="mt-1 font-display text-3xl font-extrabold leading-none lg:text-2xl">
                    {selection.projectSummaryLabel}
                  </p>
                </div>
                <div className="rounded-lg border border-brand-green/60 bg-primary/[0.14] p-4 lg:p-3">
                  <span className="text-xs font-bold uppercase text-muted-foreground">Container ales</span>
                  <p className="mt-1 font-display text-3xl font-extrabold leading-none lg:text-2xl">
                    Container de {selection.capacity} m³
                  </p>
                  {selection.capacity !== recommendedCapacity ? (
                    <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                      <ArrowRight className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
                      Ai ales manual peste recomandarea de {recommendedCapacity} m³.
                    </p>
                  ) : null}
                </div>
              </div>

              <Separator />

              <p className="text-sm leading-6 text-muted-foreground lg:text-xs lg:leading-5">
                Recomandarea este orientativă. Confirmăm capacitatea potrivită înainte de livrare.
              </p>

              <ContactActions
                selection={selection}
                onCallback={onCallback}
                compact
                className={cn("sm:flex-col lg:grid lg:grid-cols-2 lg:gap-2")}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
