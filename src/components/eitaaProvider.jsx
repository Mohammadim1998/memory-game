"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function EitaaProvider() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!window.Eitaa?.WebApp) return;

    const webApp = window.Eitaa.WebApp;

    webApp.ready();
    webApp.expand();
    webApp.isVerticalSwipesEnabled = false;
    webApp.setHeaderColor("#155DFD");

    const platform = webApp.platform;
    if (
      platform === "android" ||
      platform === "ios" ||
      platform === "mobile_web"
    ) {
      webApp.requestFullscreen();
    }
    const handleBack = () => {
      if (pathname !== "/") {
        webApp.BackButton.show();
        webApp.disableClosingConfirmation();
        router.back();
      } else {
        webApp.enableClosingConfirmation();
        webApp.BackButton.hide();
        webApp.showConfirm("آیا می‌خواهید خارج شوید؟", (confirmed) => {
          if (confirmed) webApp.close();
        });
      }
    };

    webApp.BackButton.show();
    webApp.BackButton.offClick();
    webApp.BackButton.onClick(handleBack);

    return () => {
      webApp.BackButton.offClick(handleBack);
    };
  }, [pathname,router]);

  return null;
}
