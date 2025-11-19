"use client";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function Home() {
  const [isInEitaa, setIsInEitaa] = useState(false);
  const [version, setVersion] = useState("");
  const [isExpanded, setIsExpanded] = useState(true); // وضعیت ارتفاع (تمام صفحه یا کوچک)
  const [platorm, setPlatform] = useState(null);

  useEffect(() => {
    if (window.Eitaa?.WebApp) {
      const webApp = window.Eitaa.WebApp;
      setPlatform(webApp.platform);

      console.log("Eitaa WebApp Loaded!", webApp.version);
      setVersion(webApp.version);
      setIsInEitaa(true);
      webApp.isVerticalSwipesEnabled = false;

      // آماده‌سازی اولیه
      webApp.ready();
      webApp.expand(); // اول کامل باز بشه
      setIsExpanded(true);

      // قابلیت جدید ۱: دکمه برگشت + تأیید خروج
      const handleBackButton = () => {
        webApp.showConfirm(
          "آیا مطمئن هستید که می‌خواهید از برنامک خارج شوید؟",
          (confirmed) => {
            if (confirmed) {
              webApp.close(); // فقط اگه تأیید کرد بسته بشه
            }
            // اگه لغو کرد → برنامک باز می‌مونه
          }
        );
      };

      webApp.BackButton.show();
      webApp.BackButton.onClick(handleBackButton);

      // قابلیت جدید ۲: کنترل ارتفاع با API خود ایتا
      // این متغیر رو برای دسترسی از دکمه نگه می‌داریم
      window.toggleEitaaHeight = () => {
        if (isExpanded) {
          // کوچک کردن → فقط expand() رو صدا نزن
          setIsExpanded(false);
          // ایتا خودش ارتفاع رو محدود می‌کنه (حدود 65-70%)
        } else {
          // تمام صفحه → دوباره expand() بزن
          webApp.expand();
          setIsExpanded(true);
        }
      };

      // تمیز کردن موقع unmount
      return () => {
        webApp.BackButton.offClick(handleBackButton);
        webApp.BackButton.hide();
      };
    }
  }, [isExpanded]); // isExpanded رو به dependency اضافه کردیم تا درست کار کنه

  // دکمه‌های قبلی — همه هستن!
  const handleClose = () => window.Eitaa?.WebApp?.close();
  const handleShowConfirm = () => {
    window.Eitaa?.WebApp?.showConfirm("آیا مطمئن هستید؟", (confirmed) => {
      alert(confirmed ? "تأیید شد" : "لغو شد");
    });
  };
  const handleShowAlert = () =>
    window.Eitaa?.WebApp?.showAlert("سلام! این یک هشدار ساده است");
  const handleOpenLink = () =>
    window.Eitaa?.WebApp?.openLink("https://eitaa.com");
  const showPlatform = () => window.Eitaa?.WebApp.showAlert(platorm);
  const handleChangeHeaderColor = () => {
    window.Eitaa.WebApp.setHeaderColor("#2596be");
  };
  return (
    <>
      <Script
        src="https://developer.eitaa.com/eitaa-web-app.js"
        strategy="beforeInteractive"
        onLoad={() => console.log("Eitaa SDK script loaded")}
        onError={(e) => console.error("خطا در لود Eitaa SDK:", e)}
      />

      <main className="p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-purple-700">
          برنامک حرفه‌ای ایتا
        </h1>

        {isInEitaa ? (
          <div className="space-y-8 text-center">
            {/* قابلیت جدید: دکمه کنترل ارتفاع با API خود ایتا */}
            <div className="p-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl">
              <button
                onClick={() => window.toggleEitaaHeight?.()}
                className="px-12 py-6 bg-white text-purple-700 font-bold text-2xl rounded-2xl shadow-2xl hover:shadow-purple-700 transition-all transform hover:scale-110 active:scale-95"
              >
                {isExpanded ? "کوچک کردن برنامک" : "تمام صفحه کردن"}
              </button>
              <p className="text-white text-xl mt-4 font-medium">
                وضعیت فعلی:{" "}
                {isExpanded ? "تمام صفحه" : "کوچک شده (روش رسمی ایتا)"}
              </p>
              <button onClick={showPlatform}>نمایش بستر کاربر</button>
            </div>

            <p className="text-green-600 font-bold text-xl">
              داخل ایتا هستی! نسخه SDK: {version}
            </p>

            {/* همه دکمه‌های قبلی — هیچی حذف نشده! */}
            <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
              <button
                onClick={handleClose}
                className="px-8 py-5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition shadow-lg"
              >
                بستن برنامک
              </button>
              <button
                onClick={handleShowConfirm}
                className="px-8 py-5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg"
              >
                تأیید (Confirm)
              </button>
              <button
                onClick={handleShowAlert}
                className="px-8 py-5 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition shadow-lg"
              >
                هشدار (Alert)
              </button>
              <button
                onClick={handleOpenLink}
                className="px-8 py-5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg"
              >
                باز کردن لینک
              </button>
              <button
                onClick={handleChangeHeaderColor}
                className="px-8 py-5 bg-purple-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg"
              >
                تغییر رنگ هدر
              </button>
            </div>

            <div className="mt-8 p-6 bg-gray-900 text-white rounded-2xl text-right">
              <p className="font-medium">
                آیدی کاربر: {window.Eitaa?.WebApp?.initDataUnsafe?.user?.id}
              </p>
              <p className="font-medium">
                نام: {window.Eitaa?.WebApp?.initDataUnsafe?.user?.first_name}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600 space-y-4">
            <p className="text-2xl">در حال بارگذاری SDK ایتا...</p>
            <p className="text-lg">
              این صفحه فقط داخل پیام‌رسان <strong>ایتا</strong> کار می‌کند.
            </p>
          </div>
        )}
      </main>
    </>
  );
}
