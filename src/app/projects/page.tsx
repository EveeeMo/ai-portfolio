import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { SketchIllustration } from "@/components/SketchIllustration";
import { SectionHeading } from "@/components/SectionHeading";
import { getProjects } from "@/lib/content";
import { illustrations } from "@/lib/illustrations";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "项目",
  description: "独立开发的 AI 应用",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <Container className="py-10 sm:py-14 md:py-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          title={siteConfig.projectsTitle}
          description="独立开发的 AI 应用，持续迭代中。"
        />
        <SketchIllustration
          src={illustrations.dog.sniffing}
          alt=""
          width={200}
          height={200}
          className="hidden w-36 sm:block sm:w-44"
        />
      </div>
      <div className="mt-8 space-y-3 sm:mt-10 sm:space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Container>
  );
}
