import "./globals.css";
import EitaaProvider from "@/components/eitaaProvider";
import ClientWrapper from "@/components/ClientWrapper";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <Script
          src="https://developer.eitaa.com/eitaa-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body suppressHydrationWarning>
        <ClientWrapper>
          <EitaaProvider />
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
