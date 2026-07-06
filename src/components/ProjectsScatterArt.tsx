import { SketchIllustration } from "@/components/SketchIllustration";
import { illustrations } from "@/lib/illustrations";

const scatter = [
  {
    src: illustrations.dog.headTilt,
    alt: "",
    width: 140,
    height: 170,
    className:
      "pointer-events-none absolute right-4 top-16 hidden w-24 -rotate-6 opacity-80 md:block lg:right-8 lg:w-28",
  },
  {
    src: illustrations.fox.playful,
    alt: "",
    width: 160,
    height: 170,
    className:
      "pointer-events-none absolute -left-2 bottom-32 hidden w-28 rotate-3 opacity-80 md:block lg:left-4 lg:w-32",
  },
  {
    src: illustrations.cat.lyingBelly,
    alt: "",
    width: 180,
    height: 150,
    className:
      "pointer-events-none absolute bottom-8 right-1/4 hidden w-32 rotate-2 opacity-85 md:block lg:w-36",
  },
] as const;

export function ProjectsScatterArt() {
  return (
    <>
      {scatter.map((item) => (
        <SketchIllustration
          key={item.src}
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          className={`${item.className} animate-sway select-none`}
          aria-hidden
        />
      ))}
    </>
  );
}
