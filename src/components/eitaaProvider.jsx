"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function EitaaProvider() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!window.Eitaa?.WebApp) return;

    const webApp = window.Eitaa.WebApp;
    const isHome = pathname === "/" || pathname === "/home"; // در صورت نیاز /home رو هم اضافه کن

    webApp.ready();
    webApp.expand();
    webApp.isVerticalSwipesEnabled = false;
    webApp.setHeaderColor("#155DFD");

    if (["android", "ios", "mobile_web"].includes(webApp.platform)) {
      webApp.requestFullscreen();
    }

    // خیلی مهم: اول همه listenerها رو پاک کن
    webApp.BackButton.offClick();

    if (isHome) {
      // صفحه اصلی → آیکون به ✕ تبدیل می‌شه
      webApp.enableClosingConfirmation();   // این خط آیکون رو به ضربدر تبدیل می‌کنه
      webApp.BackButton.show();              // دوباره show کن (حتماً بعد از enable)

      webApp.BackButton.onClick(() => {
        webApp.showConfirm("آیا می‌خواهید خارج شوید؟", (confirmed) => {
          if (confirmed) webApp.close();
        });
      });
    } else {
      // صفحات دیگر → آیکون معمولی ←
      webApp.disableClosingConfirmation();   // آیکون به فلش برمی‌گرده
      webApp.BackButton.show();

      webApp.BackButton.onClick(() => {
        router.back();
      });
    }

    // cleanup
    return () => {
      webApp.BackButton.offClick();
    };
  }, [pathname, router]);

  return null;
}