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

      webApp.ready(); // خیلی مهمه! به ایتا می‌گه اپ آماده است
      webApp.expand(); // اختیاری: تمام صفحه رو بگیره (توصیه میشه)
    }
  }, []);

  const handleClose = () => {
    window.Eitaa?.WebApp?.close();
  };

  const handleShowConfirm = () => {
    window.Eitaa?.WebApp?.showConfirm("آیا مطمئن هستید؟", (confirmed) => {
      if (confirmed) {
        alert("تأیید شد ");
      } else {
        alert("لغو شد ");
      }
    });
  };

  const handleShowAlert = () => {
    window.Eitaa?.WebApp?.showAlert("سلام! این یک هشدار ساده است ");
  };

  const handleOpenLink = () => {
    window.Eitaa?.WebApp?.openLink("https://eitaa.com");
  };

  return (
    <>
      {/*Eitaa Script */}
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
            <div>
              <section className="bg-gray-900 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-3">اطلاعات اولیه</h2>
              </section>
              <section>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <button
                    onClick={() =>
                      addLog(
                        `initData: ${window.Eitaa?.WebApp?.initData?.slice(
                          0,
                          100
                        )}...`
                      )
                    }
                    className="btn"
                  >
                    نمایش initData (کوتاه)
                  </button>
                  <button
                    onClick={() =>
                      addLog(
                        JSON.stringify(window.Eitaa?.WebApp?.initDataUnsafe)
                      )
                    }
                    className="btn"
                  >
                    نمایش initDataUnsafe
                  </button>
                  <button
                    onClick={() =>
                      addLog(`نسخه: ${window.Eitaa?.WebApp?.version}`)
                    }
                    className="btn"
                  >
                    نسخه SDK
                  </button>
                  <button
                    onClick={() =>
                      addLog(`تم: ${window.Eitaa?.WebApp?.colorScheme}`)
                    }
                    className="btn"
                  >
                    تم فعلی
                  </button>
                </div>
              </section>

              {/* ۲. UI و رنگ‌ها */}
              <section className="bg-blue-500 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-3">رنگ و ظاهر</h2>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() =>
                      window.Eitaa?.WebApp?.setHeaderColor("#ff0000") &&
                      addLog("هدر قرمز شد")
                    }
                    className="btn"
                  >
                    هدر قرمز
                  </button>
                  <button
                    onClick={() =>
                      window.Eitaa?.WebApp?.setBackgroundColor("#00ff00") &&
                      addLog("پس‌زمینه سبز شد")
                    }
                    className="btn"
                  >
                    پس‌زمینه سبز
                  </button>
                  <button
                    onClick={() =>
                      window.Eitaa?.WebApp?.setHeaderColor("bg_color") &&
                      addLog("هدر به تم برگشت")
                    }
                    className="btn"
                  >
                    ریست هدر
                  </button>
                </div>
              </section>

              {/* ۳. دکمه‌ها */}
              <section className="bg-green-500 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-3">دکمه‌ها</h2>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      window.Eitaa?.WebApp?.MainButton.setText("تست کلیک!");
                      window.Eitaa?.WebApp?.MainButton.show();
                      addLog("دکمه اصلی نمایش داده شد");
                    }}
                    className="btn"
                  >
                    نمایش MainButton
                  </button>
                  <button
                    onClick={() =>
                      window.Eitaa?.WebApp?.BackButton.show() &&
                      addLog("دکمه برگشت نمایش داده شد")
                    }
                    className="btn"
                  >
                    نمایش BackButton
                  </button>
                  <button
                    onClick={() =>
                      window.Eitaa?.WebApp?.MainButton.hide() &&
                      addLog("دکمه اصلی مخفی شد")
                    }
                    className="btn"
                  >
                    مخفی کردن MainButton
                  </button>
                  <button
                    onClick={() => window.Eitaa?.WebApp?.BackButton.hide()}
                    className="btn"
                  >
                    مخفی کردن BackButton
                  </button>
                </div>
              </section>

              {/* ۴. پاپ‌آپ‌ها */}
              <section className="bg-purple-500 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-3">پاپ‌آپ و دیالوگ</h2>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() =>
                      window.Eitaa?.WebApp?.showAlert(
                        "این یک هشدار ساده است!",
                        () => addLog("هشدار بسته شد")
                      )
                    }
                    className="btn"
                  >
                    showAlert
                  </button>
                  <button
                    onClick={() =>
                      window.Eitaa?.WebApp?.showConfirm("مطمئنی؟", (ok) =>
                        addLog(ok ? "تأیید شد" : "لغو شد")
                      )
                    }
                    className="btn"
                  >
                    showConfirm
                  </button>
                  <button
                    onClick={() =>
                      window.Eitaa?.WebApp?.showPopup(
                        {
                          title: "عنوان",
                          message: "این یک پاپ‌آپ کامل است",
                          buttons: [
                            { type: "ok", text: "باشه" },
                            { type: "cancel" },
                          ],
                        },
                        (id) => addLog(`دکمه ${id} کلیک شد`)
                      )
                    }
                    className="btn"
                  >
                    showPopup کامل
                  </button>
                  <button
                    onClick={() =>
                      window.Eitaa?.WebApp?.showScanQrPopup(
                        { text: "QR اسکن کن" },
                        (text) => addLog(`QR اسکن شد: ${text}`)
                      )
                    }
                    className="btn"
                  >
                    اسکن QR
                  </button>
                </div>
              </section>

              {/* ۵. لینک و مجوز */}
              <section className="bg-yellow-500 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-3">لینک و مجوز</h2>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() =>
                      window.Eitaa?.WebApp?.openLink("https://eitaa.com")
                    }
                    className="btn"
                  >
                    باز کردن eitaa.com
                  </button>
                  <button
                    onClick={() =>
                      window.Eitaa?.WebApp?.requestWriteAccess((ok) =>
                        addLog(ok ? "اجازه ارسال پیام داده شد" : "رد شد")
                      )
                    }
                    className="btn"
                  >
                    درخواست ارسال پیام
                  </button>
                </div>
              </section>

              {/* ۶. ناوبری */}
              <section className="bg-red-500 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-3">ناوبری</h2>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      window.Eitaa?.WebApp?.expand();
                      addLog("گسترش داده شد");
                    }}
                    className="btn"
                  >
                    expand()
                  </button>
                  <button
                    onClick={() => window.Eitaa?.WebApp?.close()}
                    className="btn bg-red-600 text-white"
                  >
                    بستن برنامک (close)
                  </button>
                </div>
              </section>
            </div>

            <div className="mt-8 p-4 bg-gray-500 rounded-lg">
              <p>user id: {window.Eitaa?.WebApp?.initDataUnsafe?.user?.id}</p>
              <p>
                نام: {window.Eitaa?.WebApp?.initDataUnsafe?.user?.first_name}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600">
            <p className="text-xl mb-4">در حال بارگذاری SDK ایتا...</p>
            <p className="text-sm">
              این صفحه فقط داخل پیام‌رسان <strong>ایتا</strong> کار می‌کند.
            </p>
            <p className="mt-4 text-xs text-white">
              برای تست، برنامک رو از داخل ایتا باز کن.
            </p>
          </div>
        )}
      </main>
    </>
  );
}
