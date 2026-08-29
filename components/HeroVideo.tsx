"use client";

import { useEffect, useRef } from "react";
import { withBase } from "@/lib/base";

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    const play = () => {
      video.muted = true;
      video.volume = 0;
      void video.play().catch(() => {});
    };
    play();
    video.addEventListener("canplay", play);
    return () => video.removeEventListener("canplay", play);
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={withBase("/images/hero-poster.jpg")}
      aria-hidden
    >
      <source src={`${withBase("/videos/hero.mp4")}?v=2`} type="video/mp4" />
    </video>
  );
}
