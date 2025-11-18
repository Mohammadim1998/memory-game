// app/eitaa/EitaaWebApp.tsx
'use client';

import { useEffect } from 'react';

// تایپ دقیق برای Eitaa WebApp (بر اساس مستندات رسمی)
interface EitaaWebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  colorScheme: 'light' | 'dark';
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    };
  };
}

interface Window {
  Eitaa?: {
    WebApp?: EitaaWebApp;
  };
}

declare global {
  interface Window {
    Eitaa?: {
      WebApp?: EitaaWebApp;
    };
  }
}

export default function EitaaWebApp() {
  useEffect(() => {
    const webApp = window.Eitaa?.WebApp;

    if (webApp) {
      webApp.ready();        // بگو آماده‌ایم
      webApp.expand();       // تمام صفحه کن

      // هماهنگی تم با ایتا
      const theme = webApp.colorScheme; // 'light' یا 'dark'
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);

      console.log('کاربر ایتا:', webApp.initDataUnsafe.user);
    }
  }, []);

  const closeWebApp = () => {
    window.Eitaa?.WebApp?.close?.();
  };

  return (
    <>
      {/* اسکریپت SDK ایتا */}
      <script src="https://developer.eitaa.com/eitaa-web-app.js" async />

      <div
        style={{
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
          paddingTop: '80px',
          minHeight: '100vh',
          background: 'var(--background)',
          color: 'var(--foreground)',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          سلام از برنامک من!
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
          این برنامک داخل ایتا اجرا شده
        </p>

        <button
          onClick={closeWebApp}
          style={{
            fontSize: '18px',
            padding: '14px 32px',
            marginTop: '40px',
            background: '#0088cc',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,136,204,0.3)',
          }}
        >
          بستن برنامک
        </button>
      </div>
    </>
  );
}