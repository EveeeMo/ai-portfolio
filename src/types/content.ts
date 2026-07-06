export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectVersion {
  name: string;
  stack: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  description: string;
  cover: string;
  tags: string[];
  github?: string;
  demo?: string;
  storyUrl?: string;
  date: string;
  featured?: boolean;
  status?: string;
  period?: string;
  role?: string;
  highlight?: string;
  links?: ProjectLink[];
  metrics?: ProjectMetric[];
  versions?: ProjectVersion[];
}

export interface Project extends ProjectFrontmatter {
  content: string;
}
