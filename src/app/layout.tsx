import EitaaProvider from "@/components/eitaaProvider";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head />
      <body>
        {/* SDK رو یک بار لود کن */}
        <Script
          src="https://developer.eitaa.com/eitaa-web-app.js"
          strategy="beforeInteractive"
        />

        {/* این کامپوننت همیشه مونته و BackButton رو مدیریت می‌کنه */}
        <EitaaProvider />

        {/* محتوای صفحات */}
        {children}
      </body>
    </html>
  );
}