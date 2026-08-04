export interface TechItem {
  name: string;
}

export interface TechCategory {
  id: string;
  category: string;
  categoryIcon: string;
  tech: TechItem[];
}

export const technologies: TechCategory[] = [
  {
    id: "languages",
    category: "Lenguajes de Programación",
    categoryIcon: "code",
    tech: [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Python" },
      { name: "Scala" },
      { name: "SQL" },
      { name: "C#" },
      { name: "Go" },
    ],
  },
  {
    id: "backend",
    category: "Backend & APIs",
    categoryIcon: "server",
    tech: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "APIs REST" },
      { name: "Entity Framework" },
      { name: "Swagger" },
      { name: "OpenAPI" },
      { name: "Postman" },
    ],
  },
  {
    id: "frontend",
    category: "Frontend & Data Apps",
    categoryIcon: "layout",
    tech: [
      { name: "React" },
      { name: "Next.js" },
      { name: "HTML" },
      { name: "CSS" },
      { name: "Streamlit" },
      { name: "DevExtreme" },
      { name: "Astro" },
    ],
  },
  {
    id: "databases",
    category: "Bases de Datos",
    categoryIcon: "database",
    tech: [
      { name: "SQL Server" },
      { name: "Oracle Database" },
      { name: "Supabase" },
      { name: "MySQL Workbench" },
      { name: "Modelado relacional" },
      { name: "Procedimientos, funciones & triggers" },
    ],
  },
  {
    id: "business-intelligence",
    category: "Business Intelligence & Data Warehouse",
    categoryIcon: "chart",
    tech: [
      { name: "Power BI" },
      { name: "SSIS" },
      { name: "SSAS" },
      { name: "ETL" },
      { name: "Data Warehousing" },
      { name: "Modelado dimensional" },
      { name: "Tablas de hechos & esquemas estrella" },
    ],
  },
  {
    id: "big-data",
    category: "Big Data & Analítica",
    categoryIcon: "network",
    tech: [
      { name: "Apache Spark" },
      { name: "Spark SQL" },
      { name: "Databricks" },
      { name: "Notebooks analíticos" },
    ],
  },
  {
    id: "machine-learning",
    category: "Inteligencia Artificial & Machine Learning",
    categoryIcon: "brain",
    tech: [
      { name: "Scikit-learn" },
      { name: "Pandas" },
      { name: "NumPy" },
      { name: "Matplotlib" },
      { name: "PCA & K-Means" },
      { name: "SVM" },
      { name: "Árboles de decisión & regresión logística" },
      { name: "CNNs & detección de objetos" },
    ],
  },
  {
    id: "generative-ai",
    category: "Inteligencia Artificial Generativa",
    categoryIcon: "sparkles",
    tech: [
      { name: "LM Studio" },
      { name: "Modelos de lenguaje locales" },
      { name: "APIs compatibles con OpenAI" },
      { name: "Diseño de prompts" },
      { name: "Agentes de IA" },
      { name: "Requests & comunicación HTTP" },
    ],
  },
  {
    id: "tools",
    category: "Cloud, DevOps & Herramientas",
    categoryIcon: "toolbox",
    tech: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Docker" },
      { name: "Microsoft Azure" },
      { name: "Google Colab" },
      { name: "Kaggle" },
      { name: "Visual Studio Code" },
      { name: "Visual Studio" },
    ],
  },
];
