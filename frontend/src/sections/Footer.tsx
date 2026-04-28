import { BrandLogo } from "../components/common/BrandLogo";
import { useI18n } from "../i18n/I18nProvider";

export function Footer() {
  const { locale, content } = useI18n();

  return (
    <footer className="site-footer" id="footer">
      <div className="site-footer__columns">
        <div className="site-footer__brand">
          <div>
            <BrandLogo compact />
            <p>{content.footer.description}</p>
          </div>
        </div>
        <div>
          <h3>{locale === "es" ? "Soluciones" : "Solutions"}</h3>
          <a href="/solutions/sprintpilot">SprintPilot</a>
          <a href="/solutions/comercia">ComerCia</a>
          <a href="/solutions/nervia">Nervia</a>
          <a href="/solutions/jornadalaboral360">JornadaLaboral360</a>
        </div>
        <div>
          <h3>{locale === "es" ? "Demos" : "Demos"}</h3>
          <a href="/demo/sprintpilot">Demo SprintPilot</a>
          <a href="/demo/comercia">Demo ComerCia</a>
        </div>
        <div>
          <h3>{locale === "es" ? "Noticias IA" : "AI news"}</h3>
          <a href="/blog">Blog REINPIA</a>
          <a href="/blog">{locale === "es" ? "Tendencias" : "Trends"}</a>
          <a href="/blog">{locale === "es" ? "Ventajas competitivas" : "Competitive advantages"}</a>
        </div>
        <div>
          <h3>{locale === "es" ? "Contacto" : "Contact"}</h3>
          <a href="mailto:hola@reinpia.com">hola@reinpia.com</a>
          <a href="https://wa.me/525512345678">WhatsApp +52 55 1234 5678</a>
          <a href="https://www.reinpia.com">www.reinpia.com</a>
          <span>Ciudad de Mexico, MX</span>
        </div>
        <div>
          <h3>{locale === "es" ? "Legal" : "Legal"}</h3>
          <a href="/#footer">{content.footer.legal.privacy}</a>
          <a href="/#footer">{content.footer.legal.terms}</a>
          <a href="/#footer">{content.footer.legal.legal}</a>
        </div>
      </div>

      <div className="site-footer__bottom">
        <strong>{content.footer.bottom}</strong>
      </div>
    </footer>
  );
}
