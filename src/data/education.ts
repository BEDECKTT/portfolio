export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  period: string;
  status: "En Curso" | "Completado";
  location: string;
  expectedGraduation?: string;
  description?: string;
}

export const educationEntries: EducationEntry[] = [
  {
    id: "systems-engineering",
    institution: "Universidad Nacional Autónoma de Honduras",
    degree: "Ingeniería en Sistemas",
    period: "2019 — Presente",
    status: "En Curso",
    location: "Comayagua, Honduras",
    expectedGraduation: "Diciembre de 2027",
    description:
      "Formación enfocada en desarrollo de software, bases de datos, backend, análisis de datos e inteligencia artificial.",
  },
  {
    id: "high-school",
    institution: "Liceo Jesús de Nazareth",
    degree: "Bachillerato en Ciencias y Humanidades",
    period: "2013 — 2018",
    status: "Completado",
    location: "Comayagua, Honduras",
  },
];
