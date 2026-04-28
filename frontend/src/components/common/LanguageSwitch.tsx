import { useI18n } from "../../i18n/I18nProvider";

export function LanguageSwitch() {
  const { locale, setLocale, content } = useI18n();

  return (
    <div className="language-switch" aria-label={content.nav.localeLabel}>
      <button
        className={`language-switch__button ${locale === "es" ? "is-active" : ""}`}
        type="button"
        onClick={() => setLocale("es")}
      >
        ES
      </button>
      <button
        className={`language-switch__button ${locale === "en" ? "is-active" : ""}`}
        type="button"
        onClick={() => setLocale("en")}
      >
        EN
      </button>
    </div>
  );
}
