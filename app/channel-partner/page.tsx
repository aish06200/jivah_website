"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ChannelPartnerPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/contact/?type=channel-partner");
  }, [router]);

  return (
    <div className="site-pad py-24">
      <p className="text-sm text-muted">Taking you to contact…</p>
    </div>
  );
}
