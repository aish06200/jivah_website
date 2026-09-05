"use client";

import { useEffect } from "react";

export default function LegacyCourtyardRedirect() {
  useEffect(() => {
    window.location.replace("/projects/jivah-gardens-nagpur/");
  }, []);

  return (
    <p className="site-pad py-20 text-muted">
      Redirecting to Jivah Gardens…
    </p>
  );
}
