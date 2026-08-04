export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: "current" | "next" | "goal" | "longterm";
  timeframe?: string;
}

export const milestones: Milestone[] = [
  {
    id: "student",
    title: "Estudiante de Ingeniería en Sistemas",
    description:
      "Formación sólida en desarrollo de software, bases de datos, backend, análisis de datos e inteligencia artificial, complementada con proyectos académicos y aplicaciones funcionales.",
    status: "current",
    timeframe: "Presente",
  },
  {
    id: "internship",
    title: "Software Engineering Intern",
    description:
      "Aplicar mis conocimientos técnicos en un entorno empresarial real, colaborar con equipos de desarrollo y fortalecer buenas prácticas de ingeniería, control de versiones, documentación y trabajo ágil.",
    status: "next",
    timeframe: "Próximo paso",
  },
  {
    id: "backend-engineer",
    title: "Backend & Platform Engineer",
    description:
      "Diseñar servicios, APIs y plataformas robustas, seguras y escalables, integrando bases de datos, servicios en la nube, automatización y componentes de inteligencia artificial.",
    status: "goal",
    timeframe: "Meta a mediano plazo",
  },
  {
    id: "ai-solutions-architect",
    title: "AI Solutions Architect / Technical Lead",
    description:
      "Liderar el diseño de soluciones tecnológicas empresariales y productos B2B, orquestando equipos, plataformas, datos, automatizaciones y modelos de inteligencia artificial para resolver problemas de negocio.",
    status: "longterm",
    timeframe: "Visión a largo plazo",
  },
];
