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

    // Fullscreen فقط در موبایل
    if (["android", "ios", "mobile_web"].includes(webApp.platform)) {
      webApp.requestFullscreen();
    }

    if (isHome) {
      // صفحه اصلی → BackButton مخفی، MainButton با آیکون close
      // webApp.BackButton.hide();
      webApp.enableClosingConfirmation();

      webApp.BackButton.onClick(() => {
        // webApp.showConfirm("آیا می‌خواهید خارج شوید؟", (confirmed) => {
        //   if (confirmed) webApp.close();
        // });
      });
    } else {
      disableClosingConfirmation();
      router.back();
    }

    // cleanup
    return () => {
      webApp.MainButton.offClick();
    };
  }, [pathname, router]);

  return null;
}
