// components/eitaaProvider.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EitaaProvider() {
  const router = useRouter();

  useEffect(() => {
    // صبر کن تا SDK لود بشه
    if (typeof window === "undefined" || !window.Eitaa?.WebApp) return;

    const webApp = window.Eitaa.WebApp;

    // تنظیمات اولیه
    webApp.ready();
    webApp.expand();
    webApp.isVerticalSwipesEnabled = false;

    // تابع هندلر اصلی
    const handleBack = () => {
      if (window.history.length > 1) {
        router.back(); // برگشت به صفحه قبلی
      } else {
        webApp.close(); // در صفحه اصلی → مستقیم ببند
      }
    };

    // مهم: همیشه دکمه رو نشون بده
    webApp.BackButton.show();

    // پاک کردن هندلرهای قبلی (برای جلوگیری از باگ)
    webApp.BackButton.offClick();

    // وصل کردن هندلر جدید
    webApp.BackButton.onClick(handleBack);

    // وقتی کامپوننت unmount شد (مثلاً صفحه بسته شد)
    return () => {
      webApp.BackButton.offClick(handleBack);
    };
  }, []); // فقط یک بار اجرا بشه

  return null;
}