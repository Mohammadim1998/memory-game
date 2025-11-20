// app/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const [webApp,setWebApp] =useState(null);
  const [platform,setPlatform] = useState(null);

  // فقط یک بار بعد از مونت شدن (در مرورگر)
  useEffect(() => {
    setMounted(true);
    if (window.Eitaa?.WebApp?.initDataUnsafe?.user) {
      setUser(window.Eitaa.WebApp.initDataUnsafe.user);
    }
    setWebApp(window.Eitaa.WebApp);
    setPlatform(webApp?.platform)
  }, []);

  const handleShowPlatform = () => {
    webApp.showConfirm(platform)
  };
  // تا وقتی مونت نشده، هیچی نشون نده (یا یه اسکلتون ساده)
  if (!mounted) {
    return (
      <main className="p-8 min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
        <div className="text-center pt-20">
          <div className="text-4xl font-bold text-purple-800">
            در حال بارگذاری...
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="p-8 space-y-8 min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <h1 className="text-4xl font-bold text-center text-purple-800 mt-10">
        برنامک حرفه‌ای ایتا
      </h1>

      <p className="text-center text-green-600 text-2xl font-bold">
        سلام {user?.first_name || "کاربر عزیز"}!
      </p>

      <button onClick={handleShowPlatform} className="text-blue-600">
        Platform
      </button>

      <div className="grid gap-6 max-w-md mx-auto mt-10">
        <Link
          href="/tel"
          className="py-6 bg-blue-600 text-white text-center rounded-2xl text-xl font-bold shadow-lg hover:scale-105 transition"
        >
          صفحه تلگرام
        </Link>
        <Link
          href="/eitaa"
          className="py-6 bg-purple-600 text-white text-center rounded-2xl text-xl font-bold shadow-lg hover:scale-105 transition"
        >
          صفحه ایتا
        </Link>
        <Link
          href="/whats"
          className="py-6 bg-red-600 text-white text-center rounded-2xl text-xl font-bold shadow-lg hover:scale-105 transition"
        >
          صفحه واتساپ
        </Link>
      </div>

      {user && (
        <div className="text-center mt-10 text-gray-600">
          <p>آیدی: {user.id}</p>
          {user.username && <p>یوزرنیم: @{user.username}</p>}
        </div>
      )}
    </main>
  );
}
