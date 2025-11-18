"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function Home() {
  const [isInEitaa, setIsInEitaa] = useState(false);
  const [version, setVersion] = useState("");

  // فقط یک بار ready() صدا بزنیم
  useEffect(() => {
    if (window.Eitaa?.WebApp) {
      const webApp = window.Eitaa.WebApp;

      console.log("Eitaa WebApp Loaded!", webApp.version);
      setVersion(webApp.version);
      setIsInEitaa(true);

      webApp.ready();           // خیلی مهمه! به ایتا می‌گه اپ آماده است
      webApp.expand();          // اختیاری: تمام صفحه رو بگیره (توصیه میشه)
    }
  }, []);

  const handleClose = () => {
    window.Eitaa?.WebApp?.close();
  };

  const handleShowConfirm = () => {
    window.Eitaa?.WebApp?.showConfirm(
      "آیا مطمئن هستید؟",
      (confirmed) => {
        if (confirmed) {
          alert("تأیید شد ");
        } else {
          alert("لغو شد ");
        }
      }
    );
  };

  const handleShowAlert = () => {
    window.Eitaa?.WebApp?.showAlert("سلام! این یک هشدار ساده است ");
  };

  const handleOpenLink = () => {
    window.Eitaa?.WebApp?.openLink("https://eitaa.com");
  };

  return (
    <>
      {/* اسکریپت Eitaa */}
      <Script
        src="https://developer.eitaa.com/eitaa-web-app.js"
        strategy="beforeInteractive"
        onLoad={() => console.log("Eitaa SDK script loaded")}
        onError={(e) => console.error("خطا در لود Eitaa SDK:", e)}
      />

      <main className="p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">
          برنامک ایتا با Next.js
        </h1>

        {isInEitaa ? (
          <div className="space-y-4 text-center">
            <p className="text-green-600 font-medium">
              داخل ایتا هستی! نسخه SDK: {version}
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <button
                onClick={handleClose}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                بستن برنامک
              </button>

              <button
                onClick={handleShowConfirm}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                تأیید (Confirm)
              </button>

              <button
                onClick={handleShowAlert}
                className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
              >
                هشدار (Alert)
              </button>

              <button
                onClick={handleOpenLink}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                باز کردن لینک
              </button>
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <p>user id: {window.Eitaa?.WebApp?.initDataUnsafe?.user?.id}</p>
              <p>نام: {window.Eitaa?.WebApp?.initDataUnsafe?.user?.first_name}</p>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600">
            <p className="text-xl mb-4">
              در حال بارگذاری SDK ایتا...
            </p>
            <p className="text-sm">
              این صفحه فقط داخل پیام‌رسان <strong>ایتا</strong> کار می‌کند.
            </p>
            <p className="mt-4 text-xs text-gray-500">
              برای تست، برنامک رو از داخل ایتا باز کن.
            </p>
          </div>
        )}
      </main>
    </>
  );
}