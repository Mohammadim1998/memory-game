"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function EitaaProvider() {
  const router = useRouter();

  useEffect(() => {
    // صبر کن تا SDK لود بشه
    if (!window.Eitaa?.WebApp) return;

    const webApp = window.Eitaa.WebApp;

    // تنظیمات اولیه
    webApp.ready();
    webApp.expand();
    webApp.isVerticalSwipesEnabled = false;

    const handleBack = () => {
      if (window.history.length > 1) {
        router.back();
      } else {
        webApp.showConfirm("آیا می‌خواهید خارج شوید؟", (ok) => {
          if (ok) webApp.close();
        });
      }
    };

    // همیشه نشون بده!
    webApp.BackButton.show();
    webApp.BackButton.onClick(handleBack);

    // هر بار که صفحه عوض شد دوباره اجرا بشه
    return () => {
      webApp.BackButton.offClick(handleBack);
    };
  }, []); // ← این باعث می‌شه هر بار صفحه عوض بشه دوباره اجرا بشه!

  // این کامپوننت هیچی رندر نمی‌کنه
  return null;
}