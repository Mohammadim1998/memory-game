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
    webApp.setHeaderColor("#155DFD");

    const platform = webApp.platform;
    if (
      platform === "android" ||
      platform === "ios" ||
      platform === "mobile_web"
    ) {
      webApp.requestFullscreen();
    }

    // تنظیم وضعیت اولیه بر اساس مسیر فعلی
    if (pathname === "/") {
      // در صفحه اصلی: مخفی کردن BackButton و فعال کردن تایید خروج
      webApp.BackButton.hide();
      webApp.enableClosingConfirmation();
    } else {
      // در صفحات دیگر: نمایش BackButton و غیرفعال کردن تایید خروج
      webApp.BackButton.show();
      webApp.disableClosingConfirmation();
    }

    const handleBack = () => {
      if (pathname !== "/") {
        // در صفحات دیگر: بازگشت به صفحه قبلی
        router.back();
      } else {
        // در صفحه اصلی: نمایش پیام تایید برای خروج
        webApp.showConfirm("آیا می‌خواهید خارج شوید؟", (confirmed) => {
          if (confirmed) webApp.close();
        });
      }
    };

    // همیشه event listener را تنظیم کنیم
    webApp.BackButton.offClick();
    webApp.BackButton.onClick(handleBack);

    return () => {
      webApp.BackButton.offClick(handleBack);
    };
  }, [pathname, router]);

  return null;
}