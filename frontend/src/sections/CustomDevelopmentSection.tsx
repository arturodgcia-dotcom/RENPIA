import { Button } from "../components/Button";
import { ProductPreview } from "../components/ProductPreview";
import { siteAssets } from "../config/siteAssets";
import { useI18n } from "../i18n/I18nProvider";

export function CustomDevelopmentSection() {
  const { locale, content } = useI18n();

  return (
    <section className="landing-section landing-section--feature" id="desarrollo-medida">
      <div className="custom-layout">
        <div className="custom-layout__copy">
          <div className="section-heading">
            <p className="section-heading__eyebrow">{content.customDevelopment.eyebrow}</p>
            <h2>{content.customDevelopment.title}</h2>
            <p className="section-heading__description">{content.customDevelopment.description}</p>
          </div>

          <ul className="check-list">
            {content.customDevelopment.capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <Button href="#formulario">{content.customDevelopment.cta}</Button>
        </div>

        <aside className="custom-layout__panel">
          <div className="custom-panel">
            <ProductPreview
              image={siteAssets.solutions.customDevelopment}
              fallbackType="dashboard"
              title={content.customDevelopment.eyebrow}
              mode="laptop"
            />
            <div className="custom-panel__floating custom-panel__floating--one">
              {locale === "es" ? "CRM personalizado" : "Custom CRM"}
            </div>
            <div className="custom-panel__floating custom-panel__floating--two">
              {locale === "es" ? "Agente IA 24/7" : "24/7 AI agent"}
            </div>
            <div className="custom-panel__floating custom-panel__floating--three">
              {locale === "es" ? "Integraciones Google Suite" : "Google Suite integrations"}
            </div>
            <div className="custom-panel__floating custom-panel__floating--four">
              Marketplace B2B/B2C
            </div>
            <div className="custom-panel__floating custom-panel__floating--five">
              {locale === "es" ? "Dashboards inteligentes" : "Smart dashboards"}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
