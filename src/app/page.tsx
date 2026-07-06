import { ButtonLink } from "@/components/Button";
import { SketchIllustration } from "@/components/SketchIllustration";
import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectsScatterArt } from "@/components/ProjectsScatterArt";
import { SectionHeading } from "@/components/SectionHeading";
import { TextLink } from "@/components/TextLink";
import { getFeaturedProjects } from "@/lib/content";
import { illustrations } from "@/lib/illustrations";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects(3);

  return (
    <>
      <section>
        <Container className="py-12 sm:py-16 md:py-24">
          <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="order-2 lg:order-1">
              <h1 className="font-heading text-3xl leading-tight text-ink sm:text-5xl lg:text-6xl">
                {siteConfig.heroTitle}
              </h1>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted sm:mt-5 sm:text-lg">
                {siteConfig.tagline}
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
                <ButtonLink href="/projects">看项目</ButtonLink>
                <ButtonLink href="/about" variant="secondary">
                  关于我
                </ButtonLink>
              </div>
            </div>
            <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
              <SketchIllustration
                src={illustrations.cat.sittingCurious}
                alt="歪头好奇的虎斑白猫"
                width={400}
                height={480}
                priority
                className="w-full max-w-[200px] sm:max-w-xs"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-y border-border bg-paper/70 py-10 sm:py-14 md:py-20">
        <ProjectsScatterArt />
        <Container className="relative z-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              title={siteConfig.projectsTitle}
              description="独立开发的 AI 应用，持续迭代中"
            />
            <TextLink href="/projects">全部项目</TextLink>
          </div>
          <div className="mt-8 space-y-3 sm:mt-10 sm:space-y-4">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
