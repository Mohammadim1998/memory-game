"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function EitaaProvider() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!window.Eitaa?.WebApp) return;

    const webApp = window.Eitaa.WebApp;

    webApp.ready();
    webApp.expand();
    webApp.isVerticalSwipesEnabled = false;
    webApp.requestFullscreen()

    const handleBack = () => {
      if (pathname !== "/") {
        router.back();
      } else {
        webApp.showConfirm("آیا می‌خواهید خارج شوید؟", (confirmed) => {
          if (confirmed) webApp.close();
        });
      }
    };

    webApp.BackButton.show();
    webApp.BackButton.offClick();
    webApp.BackButton.onClick(handleBack);

    return () => {
      webApp.BackButton.offClick(handleBack);
    };
  }, [pathname]);

  return null;
}
