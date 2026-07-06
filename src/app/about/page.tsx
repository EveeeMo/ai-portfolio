import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import { SketchIllustration } from "@/components/SketchIllustration";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Tag } from "@/components/Tag";
import { illustrations } from "@/lib/illustrations";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "关于",
  description: `关于 ${siteConfig.name}`,
};

export default function AboutPage() {
  return (
    <Container className="py-10 sm:py-14 md:py-20">
      <div className="max-w-3xl">
        <SectionHeading title="关于我" />
        <div className="mt-6 grid gap-6 sm:mt-8 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-8">
          <p className="text-[15px] leading-relaxed text-muted sm:text-lg">
            {siteConfig.about.intro}
          </p>
          <SketchIllustration
            src={illustrations.trio}
            alt="猫、狗与狐狸的手绘合影"
            width={320}
            height={240}
            className="mx-auto hidden w-full max-w-xs sm:mx-0 sm:block sm:max-w-sm"
          />
        </div>

        <section className="mt-12">
          <h2 className="font-heading text-2xl text-ink">擅长</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {siteConfig.about.skills.map((skill) => (
              <Tag key={skill} label={skill} />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-2xl text-ink">背景</h2>
          <div className="mt-6 space-y-4">
            {siteConfig.about.experience.map((item) => (
              <div key={item.period} className="warm-card p-5">
                <p className="text-xs text-coral">{item.period}</p>
                <h3 className="mt-1 font-heading text-lg text-ink">{item.role}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 warm-card bg-blush/50 p-6 sm:p-8">
          <h2 className="font-heading text-xl text-ink">联系我</h2>
          <p className="mt-2 text-sm text-muted">{siteConfig.about.contactNote}</p>
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
            <ButtonLink href={siteConfig.github} external>GitHub</ButtonLink>
            <ButtonLink href={`mailto:${siteConfig.email}`} external>
              <span className="break-all sm:break-normal">{siteConfig.email}</span>
            </ButtonLink>
          </div>
        </section>
      </div>
    </Container>
  );
}
