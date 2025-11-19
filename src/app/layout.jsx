// app/layout.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; // ← این درسته!
import Script from "next/script";

export default function RootLayout({children}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // تا وقتی SDK لود نشده کاری نکن
    if (!window.Eitaa?.WebApp) return;

    const webApp = window.Eitaa.WebApp;

    // تنظیمات اولیه (یک بار برای کل اپ)
    webApp.ready();
    webApp.expand();
    webApp.isVerticalSwipesEnabled = false; // اختیاری

    // تابع اصلی برای دکمه Back
    const handleBack = () => {
      if (window.history.length > 1) {
        // صفحه قبلی داریم → برگرد
        router.back();
      } else {
        // صفحه اصلی هستیم → تأیید خروج
        webApp.showConfirm("آیا می‌خواهید از برنامک خارج شوید؟", (ok) => {
          if (ok) webApp.close();
        });
      }
    };

    // همیشه دکمه Back رو نشون بده (مهم!)
    webApp.BackButton.show();
    webApp.BackButton.onClick(handleBack);

    // پاک‌سازی
    return () => {
      webApp.BackButton.offClick(handleBack);
    };
  }, [pathname, router]); // هر بار که صفحه عوض شد، دوباره اجرا میشه

  return (
    <html lang="fa" dir="rtl">
      <head />
      <body>
        {/* فقط یک بار لود SDK برای کل اپ */}
        <Script
          src="https://developer.eitaa.com/eitaa-web-app.js"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}