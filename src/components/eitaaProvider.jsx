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

    // پاک کردن همه listenerهای قبلی
    webApp.BackButton.offClick();
    webApp.MainButton.offClick();

    if (isHome) {
      // صفحه اصلی → BackButton مخفی، MainButton با آیکون close
      webApp.BackButton.hide();

      webApp.MainButton.setText("خروج");
      webApp.MainButton.show();

      webApp.MainButton.onClick(() => {
        webApp.showConfirm("آیا می‌خواهید خارج شوید؟", (confirmed) => {
          if (confirmed) webApp.close();
        });
      });
    } else {
      webApp.MainButton.hide();
      webApp.BackButton.show();
        router.back();
    }

    // cleanup
    return () => {
      webApp.BackButton.offClick();
      webApp.MainButton.offClick();
    };
  }, [pathname, router]);

  return null;
}