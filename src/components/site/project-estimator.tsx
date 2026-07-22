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
    : 5;
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
    <section id="calculator" className="scroll-mt-20 bg-brand-offwhite py-14 sm:py-20">
      <div className="container">
        <div className="mb-8 max-w-2xl">
          <Badge variant="secondary" className="mb-4">
            Estimator orientativ
          </Badge>
          <h2 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-normal sm:text-6xl">
            Alege lucrarea. Ajustezi capacitatea.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Datele sunt provizorii și ușor de actualizat. Recomandarea se schimbă instant când alegi tipul proiectului.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <div className="grid gap-8">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Ruler className="h-5 w-5 text-brand-yellow" aria-hidden="true" />
                <h3 className="font-display text-3xl font-extrabold tracking-normal">Ce fel de lucrare ai?</h3>
              </div>
              <RadioGroup
                value={selection.projectId}
                onValueChange={setProject}
                className="grid gap-3 sm:grid-cols-2"
                aria-label="Tipul lucrării"
              >
                {projectOptions.map((project) => (
                  <ProjectOptionCard
                    key={project.id}
                    id={`project-${project.id}`}
                    value={project.id}
                    title={project.label}
                    description={project.description}
                    meta={`${project.recommendedCapacity} m³ orientativ`}
                    selected={selection.projectId === project.id}
                  />
                ))}
              </RadioGroup>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-brand-yellow" aria-hidden="true" />
                <h3 className="font-display text-3xl font-extrabold tracking-normal">Alege capacitatea containerului</h3>
              </div>
              <RadioGroup
                value={String(selection.capacity)}
                onValueChange={setCapacity}
                className="grid grid-cols-2 gap-3 sm:grid-cols-4"
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
                    />
                  );
                })}
              </RadioGroup>
            </div>
          </div>

          <Card className="sticky top-24 overflow-hidden border-black/10 shadow-industrial">
            <CardHeader className="bg-brand-black text-white">
              <CardTitle>Selecția ta</CardTitle>
              <p
                className="text-sm font-medium text-white/[0.72]"
                aria-live="polite"
              >
                Recomandare actualizată: container de {recommendedCapacity} m³.
              </p>
            </CardHeader>
            <CardContent className="space-y-5 p-5">
              <div className="grid gap-3">
                <div className="rounded-lg border border-border bg-muted/60 p-4">
                  <span className="text-xs font-bold uppercase text-muted-foreground">Proiect</span>
                  <p className="mt-1 font-display text-3xl font-extrabold leading-none">{selection.projectSummaryLabel}</p>
                </div>
                <div className="rounded-lg border border-brand-yellow/60 bg-primary/[0.14] p-4">
                  <span className="text-xs font-bold uppercase text-muted-foreground">Container ales</span>
                  <p className="mt-1 font-display text-3xl font-extrabold leading-none">Container de {selection.capacity} m³</p>
                  {selection.capacity !== recommendedCapacity ? (
                    <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                      <ArrowRight className="h-3.5 w-3.5 text-brand-yellow" aria-hidden="true" />
                      Ai ales manual peste recomandarea de {recommendedCapacity} m³.
                    </p>
                  ) : null}
                </div>
              </div>

              <Separator />

              <p className="text-sm leading-6 text-muted-foreground">
                Recomandarea este orientativă. Confirmăm capacitatea potrivită înainte de livrare.
              </p>

              <ContactActions selection={selection} onCallback={onCallback} className={cn("sm:flex-col")} />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
