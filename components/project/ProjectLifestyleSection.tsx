import Image from "next/image";
import { withBase } from "@/lib/base";
import type { Project } from "@/lib/types";

type Props = {
  project: Project;
  images: string[];
};

function LifestyleIcon() {
  return (
    <span className="flex size-6 items-center justify-center text-forest" aria-hidden>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M3.5 9.5 10 3.5l6.5 6v7.5H3.5V9.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M8 17V11h4v6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function LifestyleWaves() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <path
        d="M-80 120C180 40 420 180 720 100C980 30 1180 160 1520 80"
        stroke="#0c7b54"
        strokeOpacity="0.12"
        strokeWidth="1.5"
      />
      <path
        d="M-60 680C220 760 480 620 760 700C1020 770 1240 640 1500 720"
        stroke="#0c7b54"
        strokeOpacity="0.1"
        strokeWidth="1.5"
      />
      <path
        d="M200 400C420 320 640 460 900 380C1100 320 1280 420 1480 360"
        stroke="#0c7b54"
        strokeOpacity="0.08"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function LifestyleImage({
  src,
  alt,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
}) {
  return (
    <Image
      src={withBase(src)}
      alt={alt}
      fill
      className={`object-cover ${className ?? ""}`}
      sizes={sizes}
    />
  );
}

export function ProjectLifestyleSection({ project, images }: Props) {
  const [topRight, featured, portraitLeft, portraitRight] = images;

  return (
    <section id="lifestyle" className="relative scroll-mt-24 overflow-hidden bg-white py-14 md:py-20 lg:py-24">
      <LifestyleWaves />

      <div className="site-pad relative z-10">
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
          {/* Copy */}
          <div className="flex w-full flex-col items-start justify-center text-left lg:col-span-5 lg:row-start-1">
            <div className="flex items-center gap-2">
              <LifestyleIcon />
              <p className="text-[15px] font-medium text-ink">Lifestyle</p>
            </div>
            <h2 className="section-heading mt-4 w-full max-w-none lg:max-w-md">
              A place you can call home
            </h2>
            <p className="mt-5 w-full max-w-none text-[15px] leading-[1.7] text-muted lg:max-w-md">{project.excerpt}</p>
            <p className="mt-4 w-full max-w-none text-[15px] leading-[1.7] text-muted lg:max-w-md">{project.overview}</p>
          </div>

          {/* Top-right landscape */}
          {topRight ? (
            <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-paper lg:col-span-7 lg:row-start-1 lg:aspect-[16/11]">
              <LifestyleImage
                src={topRight}
                alt={`${project.name} exterior`}
                className="object-bottom"
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
            </div>
          ) : null}

          {/* Featured image */}
          {featured ? (
            <div className="relative min-h-[240px] overflow-hidden rounded-[20px] bg-paper sm:min-h-[280px] lg:col-span-5 lg:row-start-2 lg:min-h-[320px]">
              <LifestyleImage
                src={featured}
                alt={`${project.name} lifestyle`}
                sizes="(min-width: 1024px) 30vw, 100vw"
              />
            </div>
          ) : null}

          {/* Portrait pair */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-7 lg:row-start-2 lg:min-h-[320px]">
            {portraitLeft ? (
              <div className="relative min-h-[220px] overflow-hidden rounded-[20px] bg-paper sm:min-h-[280px] lg:min-h-0 lg:h-full">
                <LifestyleImage
                  src={portraitLeft}
                  alt={`${project.name} neighbourhood`}
                  sizes="(min-width: 1024px) 20vw, 45vw"
                />
              </div>
            ) : null}
            {portraitRight ? (
              <div className="relative min-h-[220px] overflow-hidden rounded-[20px] bg-paper sm:min-h-[280px] lg:min-h-0 lg:h-full">
                <LifestyleImage
                  src={portraitRight}
                  alt={`${project.name} amenities`}
                  sizes="(min-width: 1024px) 20vw, 45vw"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
