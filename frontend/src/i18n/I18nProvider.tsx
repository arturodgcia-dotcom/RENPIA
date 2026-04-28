import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { landingEn } from "../content/landing.en";
import { landingEs } from "../content/landing.es";
import type { SupportedLocale } from "./types";

type I18nContextValue = {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  content: typeof landingEs;
};

const STORAGE_KEY = "reinpia-locale";

const I18nContext = createContext<I18nContextValue | null>(null);

const translations = {
  es: landingEs,
  en: landingEn,
} as const;

function getInitialLocale(): SupportedLocale {
  if (typeof window === "undefined") return "es";

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "es" || saved === "en") return saved;

  return "es";
}

export function I18nProvider({ children }: PropsWithChildren) {
  const [locale, setLocaleState] = useState<SupportedLocale>(getInitialLocale);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
      content: translations[locale],
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }

  return context;
}
