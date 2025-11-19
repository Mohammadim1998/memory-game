// components/EitaaProvider.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function EitaaProvider() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!window.Eitaa?.WebApp) return;

    const webApp = window.Eitaa.WebApp;

    webApp.ready();
    webApp.expand();
    webApp.isVerticalSwipesEnabled = false;

    const handleBack = () => {
      if (window.history.length > 1) {
        router.back();
      } else {
        webApp.close(); // مستقیم ببند — بهترین رفتار!
      }
    };

    webApp.BackButton.show();
    webApp.BackButton.onClick(handleBack);

    return () => {
      webApp.BackButton.offClick(handleBack);
    };
  }, [pathname, router]);

  return null;
}