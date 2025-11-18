"use client";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function Home() {
  const [isInEitaa, setIsInEitaa] = useState(false);
  const [version, setVersion] = useState("");
  const [isExpanded, setIsExpanded] = useState(true); // جدید: وضعیت ارتفاع

  useEffect(() => {
    if (window.Eitaa?.WebApp) {
      const webApp = window.Eitaa.WebApp;

      console.log("Eitaa WebApp Loaded!", webApp.version);
      setVersion(webApp.version);
      setIsInEitaa(true);

      webApp.ready();
      webApp.expand();
      setIsExpanded(true); // اول کامل باز بشه

      // قابلیت جدید ۱: وقتی روی دکمه برگشت کلیک شد → تأیید بگیر
      const onBackButtonClicked = () => {
        webApp.showConfirm(
          "آیا مطمئن هستید که می‌خواهید خارج شوید؟",
          (confirmed) => {
            if (confirmed) {
              webApp.close(); // فقط اگه تأیید کرد بسته بشه
            }
            // اگه لغو کرد → هیچی، برنامک باز می‌مونه
          }
        );
      };

      // فعال کردن دکمه برگشت + ثبت هندلر
      webApp.BackButton.show();
      webApp.BackButton.onClick(onBackButtonClicked);

      // تمیز کردن موقع unmount (خیلی مهمه!)
      return () => {
        webApp.BackButton.offClick(onBackButtonClicked);
        webApp.BackButton.hide();
      };
    }
  }, []);

  // قابلیت جدید ۲: کنترل دستی ارتفاع (فول اسکرین / کوچک)
  const toggleExpand = () => {
    if (!window.Eitaa?.WebApp) return;

    if (isExpanded) {
      // کوچک کردن (در اندروید با عدم فراخوانی expand کار می‌کنه + CSS)
      document.body.style.height = "70vh";
      document.body.style.overflow = "hidden";
      setIsExpanded(false);
    } else {
      // دوباره تمام صفحه
      window.Eitaa.WebApp.expand();
      document.body.style.height = "100vh";
      document.body.style.overflow = "auto";
      setIsExpanded(true);
    }
  };

  const handleClose = () => {
    window.Eitaa?.WebApp?.close();
  };

  const handleShowConfirm = () => {
    window.Eitaa?.WebApp?.showConfirm(
      "آیا مطمئن هستید؟",
      (confirmed) => {
        alert(confirmed ? "تأیید شد" : "لغو شد");
      }
    );
  };

  const handleShowAlert = () => {
    window.Eitaa?.WebApp?.showAlert("سلام! این یک هشدار ساده است");
  };

  const handleOpenLink = () => {
    window.Eitaa?.WebApp?.openLink("https://eitaa.com");
  };

  return (
    <>
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
          <div className="space-y-6 text-center">
            <p className="text-green-600 font-medium text-lg">
              داخل ایتا هستی! نسخه SDK: {version}
            </p>

            {/* دکمه جدید: کنترل ارتفاع */}
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <button
                onClick={toggleExpand}
                className="px-8 py-4 bg-white text-purple-600 font-bold rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105"
              >
                {isExpanded ? "کوچک کردن برنامک" : "تمام صفحه کردن"}
              </button>
              <p className="text-white text-sm mt-2">
                وضعیت فعلی: {isExpanded ? "تمام صفحه" : "کوچک شده"}
              </p>
            </div>

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

            {/* راهنما */}
            <div className="mt-10 p-6 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
              <p className="font-bold text-lg text-yellow-800">
                دکمه برگشت بالا فعال است!
              </p>
              <p className="text-sm text-gray-700 mt-2">
                روش کلیک کن → یه تأیید میاد → فقط اگه بگی "باشه" برنامک بسته میشه
              </p>
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
          </div>
        )}
      </main>
    </>
  );
}