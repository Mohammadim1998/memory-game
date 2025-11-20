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
      // در صفحه اصلی: مخفی کردن BackButton و فعال‌سازی تایید خروج
      webApp.BackButton.hide();
      webApp.enableClosingConfirmation();
    } else {
      // در صفحات دیگر: نمایش BackButton با رفتار back
      webApp.BackButton.show();
      webApp.disableClosingConfirmation();

      webApp.BackButton.onClick(() => {
        // استفاده از replace به جای back برای جلوگیری از حلقه بی‌نهایت
        router.back();
      });
    }

    // مدیریت event بستن اپ
    const handleClosing = () => {
      if (isHome) {
        webApp.showConfirm("آیا می‌خواهید خارج شوید؟", (confirmed) => {
          if (confirmed) {
            webApp.close();
          }
        });
        return false; // جلوگیری از بستن فوری
      }
      return true;
    };

    // اضافه کردن event listener برای بستن
    webApp.onEvent("closingConfirmation", handleClosing);

    // Fullscreen فقط در موبایل
    if (["android", "ios", "mobile_web"].includes(webApp.platform)) {
      webApp.requestFullscreen();
    }

    // cleanup
    return () => {
      webApp.BackButton?.offClick();
      webApp.offEvent("closingConfirmation", handleClosing);
    };
  }, [pathname, router]);

  return null;
}
