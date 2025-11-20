"use client";

import { useEffect, useState } from "react";
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
    webApp.setHeaderColor("#155DFD");

    const platform = webApp.platform;
    if (
      platform === "android" ||
      platform === "ios" ||
      platform === "mobile_web"
    ) {
      webApp.requestFullscreen();
    }

   const updateBackButton = () => {
      webApp.BackButton.offClick(); // اول همه event listenerهای قبلی رو پاک کن

      if (pathname === "/") {
        // صفحه اصلی: آیکون به ✕ تبدیل می‌شه + confirm
        webApp.enableClosingConfirmation(); // این خط آیکون رو به ضربدر تغییر می‌ده
        webApp.BackButton.show(); // مطمئن شو visible باشه

        webApp.BackButton.onClick(() => {
          webApp.showConfirm("آیا می‌خواهید از برنامه خارج شوید؟", (confirmed) => {
            if (confirmed) webApp.close();
          });
        });
      } else {
        // صفحات دیگه: آیکون فلش معمولی + back
        webApp.disableClosingConfirmation(); // آیکون به فلش برمی‌گرده
        webApp.BackButton.show();

        webApp.BackButton.onClick(() => {
          router.back();
        });
      }
    };

    updateBackButton();

    // webApp.BackButton.show();
    // webApp.BackButton.offClick();
    // webApp.BackButton.onClick(handleBack);

    return () => {
     webApp.BackButton.offClick();
      webApp.disableClosingConfirmation();
    };
  }, [pathname,router]);

  return null;
}
