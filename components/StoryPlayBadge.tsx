import { withBase } from "@/lib/base";

export function StoryPlayBadge() {
  return (
    <span
      className="pointer-events-none absolute bottom-4 right-4 z-10 flex size-12 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(18,22,29,0.18)]"
      aria-hidden
    >
      <img
        src={withBase("/images/figma/play.svg")}
        alt=""
        className="ml-0.5 size-4 rotate-90 object-contain brightness-0"
      />
    </span>
  );
}
