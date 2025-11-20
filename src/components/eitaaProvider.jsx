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
        router.back();
      } else if (pathname === "/") {
        webApp.BackButton.show();
        webApp.BackButton.isVisible = true;
        webApp.enableClosingConfirmation();

        webApp.BackButton.onClick(() => {
          webApp.showConfirm(
            "آیا می‌خواهید از برنامه خارج شوید؟",
            (confirmed) => {
              if (confirmed) webApp.close();
            }
          );
        });
      }
    };

    webApp.BackButton.show();
    webApp.BackButton.offClick();
    webApp.BackButton.onClick(handleBack);

    return () => {
      webApp.BackButton.offClick(handleBack);
    };
  }, [pathname]);

  return null;
}
