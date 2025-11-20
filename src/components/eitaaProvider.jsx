"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function EitaaProvider() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!window.Eitaa?.WebApp) return;

    const webApp = window.Eitaa.WebApp;
    const isHome = pathname === "/";

    webApp.ready();
    webApp.expand();
    webApp.isVerticalSwipesEnabled = false;
    webApp.setHeaderColor("#155DFD");

    // تغییر آیکون BackButton
    if (isHome) {
      webApp.enableClosingConfirmation();
      webApp.BackButton.onClick(() => {
        webApp.showConfirm("آیا می‌خواهید خارج شوید؟", (confirmed) => {
          if (confirmed) webApp.close();
        });
      });
    } else {
      webApp.BackButton.onClick(() => {
        router.back();
      });
      webApp.disableClosingConfirmation();
    }

    // Fullscreen فقط در موبایل
    if (["android", "ios", "mobile_web"].includes(webApp.platform)) {
      webApp.requestFullscreen();
    }

    // cleanup
    return () => {
      webApp.MainButton.offClick();
      webApp.BackButton?.offClick();
    };
  }, [pathname, router]);

  return null;
}
