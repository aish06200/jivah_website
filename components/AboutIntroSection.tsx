import Image from "next/image";
import { withBase } from "@/lib/base";

const GALLERY = [
  {
    src: "/images/figma/about/about-us-courtyard.jpg",
    alt: "Families in a Jivah neighbourhood courtyard",
  },
  {
    src: "/images/figma/about/design-first.png",
    alt: "Design-first streets and open space",
  },
  {
    src: "/images/figma/about/mixed-use-card.png",
    alt: "Mixed-use ground floor with daily conveniences",
  },
  {
    src: "/images/figma/project-detail/lifestyle-community.png",
    alt: "Community spaces planned for everyday life",
  },
] as const;

const GALLERY_LOOP = [...GALLERY, ...GALLERY] as const;

function AboutGalleryMarquee() {
  return (
    <div
      className="about-gallery-marquee relative w-full overflow-hidden py-1"
      aria-label="Neighbourhood gallery"
    >
      <div className="about-gallery-track flex w-max gap-4 px-4 md:gap-5 md:px-5">
        {GALLERY_LOOP.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="relative h-[220px] w-[min(78vw,320px)] shrink-0 overflow-hidden rounded-xl bg-[#efefef] sm:w-[300px] md:h-[254px] md:w-[340px]"
          >
            <Image
              src={withBase(image.src)}
              alt={index < GALLERY.length ? image.alt : ""}
              fill
              className="object-cover"
              sizes="340px"
              aria-hidden={index >= GALLERY.length}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AboutIntroSection() {
  return (
    <section className="bg-white py-20 md:py-28 lg:py-[112px]">
      <div className="site-pad">
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-6 text-center">
          <p className="editorial-label">About Us</p>
          <h1 className="page-title text-[#172023]">
            Delivering since 2001
          </h1>
          <div className="space-y-4 text-[18px] leading-[1.5] tracking-[-0.01em] text-[#172023]/50">
            <p>
              Jivah develops thoughtfully planned mixed-use neighbourhoods across West Bengal,
              Andhra Pradesh and Odisha — so people do not have to leave their hometown to live
              better.
            </p>
            <p>
              Design-first streets where groceries, open space and family life share one address —
              neighbourhoods built for the Tuesday, not the brochure.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 w-full md:mt-20 lg:mt-24">
        <AboutGalleryMarquee />
      </div>
    </section>
  );
}
