"use client";
import App from "@/components/app"; // اگر نیاز دارید، uncomment کنید
import Script from "next/script";
import { useEffect, useState } from "react";

export default function Home() {
  const [sdkLoaded, setSdkLoaded] = useState(false);

  // هندلرها با چک وجود SDK
  const handleClose = () => {
    if (window.Eitaa?.WebApp) {
      window.Eitaa.WebApp.close();
    } else {
      console.warn("Eitaa SDK is not available. Are you in Eitaa app?");
    }
  };

  const handleShowConfirm = () => {
    if (window.Eitaa?.WebApp) {
      window.Eitaa.WebApp.showConfirm('آیا مطمئن هستید؟', (confirmed: boolean) => {
        if (confirmed) {
          console.log('تأیید شد');
        } else {
          console.log('لغو شد');
        }
      });
    } else {
      console.warn("Eitaa SDK is not available.");
      // Fallback: یک alert ساده برای تست
      if (confirm('آیا مطمئن هستید؟')) {
        console.log('تأیید شد (fallback)');
      }
    }
  };

  useEffect(() => {
    // چک دوره‌ای برای SDK (اگر onLoad کافی نبود)
    const checkSdk = () => {
      if (window.Eitaa?.WebApp && !sdkLoaded) {
        console.log("Eitaa SDK Loaded: ", window.Eitaa.WebApp.version);
        window.Eitaa.WebApp.ready(); // فقط یک بار
        setSdkLoaded(true);
      }
    };

    const interval = setInterval(checkSdk, 100); // هر ۱۰۰ms چک کن
    return () => clearInterval(interval);
  }, [sdkLoaded]);

  return (
    <>
      <Script
        src="https://developer.eitaa.com/eitaa-web-app.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('Eitaa SDK script loaded successfully');
          setSdkLoaded(true);
          // ready را اینجا هم فراخوانی کن (اگر useEffect دیر باشد)
          if (window.Eitaa?.WebApp) {
            window.Eitaa.WebApp.ready();
          }
        }}
        onError={(e) => {
          console.error('Failed to load Eitaa SDK:', e);
        }}
      />
      <div>
        {/* <App /> - uncomment اگر نیاز دارید */}
        {sdkLoaded && window.Eitaa?.WebApp ? (
          <div>
            <p>SDK آماده است! نسخه: {window.Eitaa.WebApp.version}</p>
            <button onClick={handleClose}>بستن</button>
            <button onClick={handleShowConfirm}>نمایش تأیید</button>
          </div>
        ) : (
          <div>
            <p>در حال لود SDK... (فقط در ایتا کار می‌کند)</p>
            <button onClick={handleClose} disabled>بستن (غیرفعال)</button>
            <button onClick={handleShowConfirm}>نمایش تأیید (تست fallback)</button>
          </div>
        )}
      </div>
    </>
  );
}