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

    if (["android", "ios", "mobile_web"].includes(webApp.platform)) {
      webApp.requestFullscreen();
    }

    // اول همه listenerها رو پاک کن
    webApp.BackButton.offClick();

    if (isHome) {
      // صفحه اصلی → ضربدر
      webApp.enableClosingConfirmation(); // اول این
      webApp.BackButton.show();            // بعد دوباره show (مهم!)

      webApp.BackButton.onClick(() => {
        webApp.showConfirm("آیا می‌خواهید خارج شوید؟", (ok) => {
          if (ok) webApp.close();
        });
      });
    } else {
      // صفحات دیگر → فلش معمولی
      webApp.disableClosingConfirmation(); // اول این
      webApp.BackButton.show();            // بعد show

      webApp.BackButton.onClick(() => router.back());
    }

    return () => {
      webApp.BackButton.offClick();
    };
  }, [pathname, router]);

  return null;
}