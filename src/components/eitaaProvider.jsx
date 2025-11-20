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

    // مدیریت BackButton بر اساس مسیر
    if (isHome) {
      // در صفحه اصلی: نمایش BackButton با رفتار close
      webApp.BackButton.show();
      
      webApp.enableClosingConfirmation();
      
      webApp.BackButton.onClick(() => {
        webApp.showConfirm("آیا می‌خواهید خارج شوید؟", (confirmed) => {
          if (confirmed) webApp.close();
        });
      });
    } else {
      // در صفحات دیگر: نمایش BackButton با رفتار back
      webApp.BackButton.show();
      
      webApp.disableClosingConfirmation();
      
      webApp.BackButton.onClick(() => {
        router.back();
      });
    }

    // Fullscreen فقط در موبایل
    if (["android", "ios", "mobile_web"].includes(webApp.platform)) {
      webApp.requestFullscreen();
    }

    // cleanup
    return () => {
      webApp.BackButton?.offClick();
      webApp.BackButton?.hide();
    };
  }, [pathname, router]);

  return null;
}