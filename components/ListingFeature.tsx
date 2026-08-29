import Image from "next/image";
import Link from "next/link";

export function ListingFeature({
  href,
  n,
  title,
  body,
  specs,
  image,
  index,
}: {
  href: string;
  n: string;
  title: string;
  body: string;
  specs: string;
  image: string;
  index: number;
}) {
  const left = index % 2 === 0;

  return (
    <Link href={href} className="group relative block">
      <div className="relative aspect-[16/10] min-h-[480px] overflow-hidden md:min-h-[680px] lg:min-h-[820px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="100vw"
        />
        <div
          className={`absolute z-10 w-[min(calc(100%-2rem),440px)] bg-white px-8 py-10 md:px-12 md:py-14 ${
            left
              ? "left-4 top-6 md:left-[4%] md:top-[8%] md:w-[min(440px,38vw)]"
              : "left-4 top-6 md:left-auto md:right-[5%] md:top-1/2 md:w-[min(440px,38vw)] md:-translate-y-1/2"
          }`}
        >
          <p className="font-serif text-[17px] text-muted">{n}</p>
          <h3 className="mt-5 font-serif text-[1.85rem] leading-[1.15] text-ink md:text-[2.15rem]">
            {title}
          </h3>
          <p className="mt-5 text-[15px] leading-relaxed text-muted">{body}</p>
          <div className="mt-8 border-t border-ink/20 pt-5 text-[12px] tracking-[0.08em] uppercase text-ink">
            {specs}
          </div>
        </div>
      </div>
    </Link>
  );
}
