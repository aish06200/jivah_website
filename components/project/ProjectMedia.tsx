"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import type { ProjectStatus } from "@/lib/types";
import { statusLabel } from "@/lib/project";
import { ProjectLightbox } from "./ProjectLightbox";

export function ProjectMedia({
  images,
  name,
  status,
  soldOut,
}: {
  images: string[];
  name: string;
  status: ProjectStatus;
  soldOut?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const thumbs = images.slice(0, 4);
  const extra = images.length - thumbs.length;

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(() => {
    setOpen((i) => (i === null ? i : (i - 1 + images.length) % images.length));
  }, [images.length]);
  const next = useCallback(() => {
    setOpen((i) => (i === null ? i : (i + 1) % images.length));
  }, [images.length]);

  return (
    <>
      <div>
        <button
          type="button"
          onClick={() => setOpen(active)}
          className="relative block aspect-[16/9] w-full overflow-hidden bg-paper lg:aspect-[2/1]"
          aria-label={`Open gallery — ${name}`}
        >
          <Image
            src={images[active]}
            alt={name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <span className="absolute left-4 top-4 bg-accent px-3 py-1.5 text-[11px] tracking-[0.16em] uppercase text-on-accent md:left-5 md:top-5">
            {soldOut ? "Sold out" : statusLabel[status]}
          </span>
        </button>

        {thumbs.length > 1 ? (
          <div className="mt-2 grid grid-cols-4 gap-2">
            {thumbs.map((src, i) => {
              const isLast = i === thumbs.length - 1 && extra > 0;
              return (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  onClick={() => (isLast ? setOpen(i) : setActive(i))}
                  className={`relative aspect-[4/3] overflow-hidden bg-paper ${
                    active === i && !isLast ? "ring-1 ring-ink" : ""
                  }`}
                  aria-label={isLast ? `Open gallery, ${extra + 1} more photos` : `${name} photo ${i + 1}`}
                  aria-current={active === i && !isLast ? "true" : undefined}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="25vw" />
                  <span className="absolute left-2 top-2 font-mono text-[10px] tracking-wide text-white drop-shadow">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {isLast ? (
                    <span className="absolute inset-0 flex items-center justify-center bg-ink/55 text-[12px] tracking-[0.16em] uppercase text-on-accent">
                      +{extra + 1}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <ProjectLightbox images={images} index={open} alt={name} onClose={close} onPrev={prev} onNext={next} />
    </>
  );
}
