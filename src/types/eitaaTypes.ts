// src/types/eitaa-webapp.d.ts
interface EitaaWebApp {
  initData: string;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
      is_premium?: boolean;
    };
    chat?: {
      id: number;
      type: string;
    };
    start_param?: string;
  };
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: Record<string, string>;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;

  // متدهای اصلی
  ready(): void;
  expand(): void;
  close(): void;
  isVersionAtLeast(version: string): boolean;

  // دکمه‌ها
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    setText(text: string): void;
    setParams(params: {
      text?: string;
      color?: string;
      text_color?: string;
      is_active?: boolean;
      is_visible?: boolean;
    }): void;
    show(): void;
    hide(): void;
    enable(): void;
    disable(): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
  };

  // پاپ‌آپ و تأیید
  showPopup(params: {
    title?: string;
    message: string;
    buttons?: Array<{ type: 'default' | 'destructive' | 'cancel'; text: string; id?: string }>;
  }, callback?: (buttonId: string) => void): void;

  showConfirm(message: string, callback?: (confirmed: boolean) => void): void;

  showAlert(message: string, callback?: () => void): void;

  // لینک و دسترسی
  openLink(url: string, options?: { try_instant_view?: boolean }): void;
  openTelegramLink(url: string): void;
  requestWriteAccess(callback?: (granted: boolean) => void): void;
  requestPhone(callback?: (granted: boolean) => void): void;

  // تم و رنگ
  setHeaderColor(color: string): void;
  setBackgroundColor(color: string): void;

  // رویدادها
  onEvent(eventType: string, callback: (...args: any[]) => void): void;
  offEvent(eventType: string, callback: (...args: any[]) => void): void;

  // حسگرها (فقط اندروید)
  Accelerometer?: {
    start(params?: { refresh_rate?: number }): void;
    stop(): void;
    onEvent(eventType: string, callback: (...args: any[]) => void): void;
  };
}

interface Window {
  Eitaa?: {
    WebApp?: EitaaWebApp;
  };
}

declare var Eitaa: {
  WebApp: EitaaWebApp;
};