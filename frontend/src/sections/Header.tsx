import { Button } from "../components/Button";
import { BrandLogo } from "../components/common/BrandLogo";
import { LanguageSwitch } from "../components/common/LanguageSwitch";
import { useI18n } from "../i18n/I18nProvider";

export function Header() {
  const { content } = useI18n();

  return (
    <header className="site-header">
      <a href="/#inicio" aria-label="REINPIA inicio">
        <BrandLogo />
      </a>

      <nav className="site-nav" aria-label="Principal">
        {content.nav.menu.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="site-header__actions">
        <LanguageSwitch />
        <Button href="/#formulario" variant="secondary">
          {content.nav.primaryCta}
        </Button>
        <Button href="/#agenda">{content.nav.secondaryCta}</Button>
      </div>
    </header>
  );
}
