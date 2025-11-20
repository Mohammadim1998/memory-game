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
    
    // تابع برای تنظیم fullscreen
    const setFullscreen = () => {
      if (platform === "android" || platform === "ios" || platform === "mobile_web") {
        webApp.requestFullscreen();
      }
    };

    // تنظیم fullscreen در ابتدا
    setFullscreen();

    // تنظیم وضعیت اولیه بر اساس مسیر فعلی
    if (pathname === "/") {
      webApp.BackButton.hide();
      webApp.enableClosingConfirmation();
    } else {
      webApp.BackButton.show();
      webApp.disableClosingConfirmation();
    }

    const handleBack = () => {
      if (pathname !== "/") {
        router.back();
      } else {
        webApp.showConfirm("آیا می‌خواهید خارج شوید؟", (confirmed) => {
          if (confirmed) webApp.close();
        });
      }
    };

    webApp.BackButton.offClick();
    webApp.BackButton.onClick(handleBack);

    // اضافه کردن event listener برای زمانی که برنامه دوباره visible می‌شود
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // وقتی صفحه دوباره visible شد، fullscreen را تنظیم کن
        setTimeout(setFullscreen, 100); // تاخیر کوچک برای اطمینان
      }
    };

    // همچنین برای eventهای مربوط به بازگشت اپ از حالت minimize
    const handleResize = () => {
      setTimeout(setFullscreen, 100);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("resize", handleResize);
    
    // همچنین از eventهای داخلی Eitaa استفاده می‌کنیم
    webApp.onEvent('viewportChanged', setFullscreen);

    return () => {
      webApp.BackButton.offClick(handleBack);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      webApp.offEvent('viewportChanged', setFullscreen);
    };
  }, [pathname, router]);

  return null;
}