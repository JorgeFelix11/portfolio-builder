export type Project = {
  title: string;
  description: string;
  technologies: string[];
};

export type Template =
  | "clean"
  | "bold"
  | "minimal"
  | "classic"
  | "modern"
  | "terminal"
  | "soft";

export type Portfolio = {
  name: string;
  title: string;
  about: string;
  technologies: string[];
  projects: Project[];
  template?: Template;
};
