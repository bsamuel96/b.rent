export type ProjectOptionId = "mic" | "mediu" | "mare" | "santier";
export type ContainerCapacity = 7 | 10;

export interface ProjectOption {
  id: ProjectOptionId;
  label: string;
  summaryLabel: string;
  description: string;
  recommendedCapacity: ContainerCapacity;
}

export interface CapacityOption {
  value: ContainerCapacity;
  label: string;
  imageSrc: string;
  imageAlt: string;
}

export interface EstimatorSelection {
  projectId: ProjectOptionId;
  projectLabel: string;
  projectSummaryLabel: string;
  capacity: ContainerCapacity;
}

export const projectOptions = [
  {
    id: "mic",
    label: "Mică",
    summaryLabel: "Proiect mic",
    description: "Debarasare, balcon, baie sau renovare ușoară",
    recommendedCapacity: 7,
  },
  {
    id: "mediu",
    label: "Mediu",
    summaryLabel: "Proiect mediu",
    description: "Apartament, acoperiș sau renovare parțială",
    recommendedCapacity: 7,
  },
  {
    id: "mare",
    label: "Mare",
    summaryLabel: "Proiect mare",
    description: "Casă sau renovare completă",
    recommendedCapacity: 7,
  },
  {
    id: "santier",
    label: "Șantier",
    summaryLabel: "Proiect de șantier",
    description: "Construcție, demolare sau volum ridicat",
    recommendedCapacity: 10,
  },
] as const satisfies readonly ProjectOption[];

export const capacityOptions = [
  {
    value: 7,
    label: "7 m³",
    imageSrc: "/figma/hero-waste-bin-green.png",
    imageAlt: "Container skip mare de 7 metri cubi",
  },
  {
    value: 10,
    label: "10 m³",
    imageSrc: "/figma/hero-waste-bin-green.png",
    imageAlt: "Container skip de șantier de 10 metri cubi",
  },
] as const satisfies readonly CapacityOption[];

export const defaultProjectId: ProjectOptionId = "mediu";

export function getProjectOption(projectId: ProjectOptionId): ProjectOption {
  return projectOptions.find((project) => project.id === projectId) ?? projectOptions[1];
}

export function getInitialEstimatorSelection(): EstimatorSelection {
  const project = getProjectOption(defaultProjectId);

  return {
    projectId: project.id,
    projectLabel: project.label,
    projectSummaryLabel: project.summaryLabel,
    capacity: project.recommendedCapacity,
  };
}
