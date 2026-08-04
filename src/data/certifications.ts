export interface Certification {
  id: string;
  title: string;
  issuer: string;
  domain: string;
  status: "En Progreso" | "Planificado";
}

export const certifications: Certification[] = [
  { id: "oracle-db", title: "Oracle Database Foundations", issuer: "Oracle", domain: "Bases de Datos", status: "Planificado" },
  { id: "sql-server", title: "SQL Server Administration", issuer: "Microsoft", domain: "Bases de Datos", status: "Planificado" },
  { id: "ai-cert", title: "AI Fundamentals", issuer: "Microsoft / Google", domain: "Inteligencia Artificial", status: "En Progreso" },
  { id: "data-eng", title: "Data Engineering Professional", issuer: "Databricks / Google", domain: "Data Engineering", status: "Planificado" },
  { id: "cloud", title: "Cloud Computing Fundamentals", issuer: "AWS / Azure", domain: "Cloud Computing", status: "Planificado" },
];
