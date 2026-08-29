"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EnquirePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/contact");
  }, [router]);

  return (
    <div className="site-pad py-24">
      <p className="text-sm text-muted">Taking you to contact…</p>
    </div>
  );
}
