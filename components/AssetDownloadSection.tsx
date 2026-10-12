import { withBase } from "@/lib/base";
import type { BrandAsset } from "@/lib/brandAssets";

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 3v9m0 0 3.5-3.5M10 12 6.5 8.5M4 14v2a1 1 0 001 1h10a1 1 0 001-1v-2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AssetDownloadSection({
  id,
  title,
  description,
  assets,
  zip,
}: {
  id: string;
  title: string;
  description: string;
  assets: BrandAsset[];
  zip?: { path: string; filename: string; label: string };
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-[22px] font-medium leading-8 text-ink md:text-[24px]">{title}</h2>
      <p className="mt-2 max-w-xl text-sm text-muted">{description}</p>

      {zip ? (
        <a
          href={withBase(zip.path)}
          download={zip.filename}
          className="btn-pill btn-forest mt-6 inline-flex items-center gap-2 px-6 py-3 text-[15px] font-semibold"
        >
          <DownloadIcon />
          {zip.label}
        </a>
      ) : null}

      <ul className={`divide-y divide-line border-y border-line ${zip ? "mt-8" : "mt-6"}`}>
        {assets.map((asset) => (
          <li key={asset.path}>
            <a
              href={withBase(asset.path)}
              download={asset.filename}
              className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <span>
                <span className="block text-[15px] font-medium text-ink group-hover:text-forest">
                  {asset.title}
                </span>
                {asset.description ? (
                  <span className="mt-0.5 block text-[13px] text-muted">{asset.description}</span>
                ) : null}
              </span>
              <span className="flex shrink-0 items-center gap-2 text-[13px] font-medium text-muted group-hover:text-forest">
                {asset.type}
                <span className="text-forest opacity-0 transition group-hover:opacity-100">
                  <DownloadIcon />
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
