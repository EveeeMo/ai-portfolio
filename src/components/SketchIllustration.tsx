import Image from "next/image";

type SketchIllustrationProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

/** 全站手绘位图插画（PNG 保留透明通道，不走图片优化） */
export function SketchIllustration({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: SketchIllustrationProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      unoptimized
      className={className}
    />
  );
}
