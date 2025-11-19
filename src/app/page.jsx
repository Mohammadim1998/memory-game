"use client";
import Link from "next/link";

export default function Home() {
  const user = typeof window !== "undefined" ? window.Eitaa?.WebApp?.initDataUnsafe?.user : null;

  return (
    <main className="p-8 space-y-8">
      <h1 className="text-4xl font-bold text-center text-purple-700">
        برنامک حرفه‌ای ایتا
      </h1>

      <p className="text-center text-green-600 text-xl font-bold">
        سلام {user?.first_name || "کاربر"}!
      </p>

      <div className="grid gap-6 max-w-md mx-auto">
        <Link href="/tel" className="py-6 bg-blue-600 text-white text-center rounded-2xl text-xl font-bold">
          صفحه تلگرام
        </Link>
        <Link href="/eitaa" className="py-6 bg-purple-600 text-white text-center rounded-2xl text-xl font-bold">
          صفحه ایتا
        </Link>
        <Link href="/whats" className="py-6 bg-red-600 text-white text-center rounded-2xl text-xl font-bold">
          صفحه واتساپ
        </Link>
      </div>
    </main>
  );
}