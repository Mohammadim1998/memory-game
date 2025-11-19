// app/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (window.Eitaa?.WebApp?.initDataUnsafe?.user) {
      setUser(window.Eitaa.WebApp.initDataUnsafe.user);
    }
  }, []);

  return (
    <main className="p-8 space-y-8 min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <h1 className="text-4xl font-bold text-center text-purple-800 mt-10">
        برنامک حرفه‌ای ایتا
      </h1>

      <div className="text-center text-green-600 font-bold text-xl">
        خوش آمدید، {user?.first_name || "در حال بارگذاری..."}
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-md mx-auto mt-10">
        <Link href="/tel" className="py-6 bg-blue-600 text-white text-xl font-bold rounded-2xl text-center shadow-lg">
          صفحه تلگرام
        </Link>
        <Link href="/eitaa" className="py-6 bg-purple-600 text-white text-xl font-bold rounded-2xl text-center shadow-lg">
          صفحه ایتا
        </Link>
        <Link href="/whats" className="py-6 bg-green-600 text-white text-xl font-bold rounded-2xl text-center shadow-lg">
          صفحه واتساپ
        </Link>
      </div>
    </main>
  );
}