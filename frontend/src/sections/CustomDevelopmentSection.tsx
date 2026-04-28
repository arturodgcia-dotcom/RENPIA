import { Button } from "../components/Button";
import { ProductPreview } from "../components/ProductPreview";
import { customDevelopmentItems } from "../data/siteContent";

export function CustomDevelopmentSection() {
  return (
    <section className="landing-section" id="desarrollo-medida">
      <div className="custom-layout">
        <div className="custom-layout__copy">
          <div className="section-heading">
            <p className="section-heading__eyebrow">Desarrollo a la medida</p>
            <h2>
              Si tu empresa necesita algo unico, en RENPIA disenamos y construimos soluciones
              personalizadas.
            </h2>
            <p className="section-heading__description">
              Pensamos sistemas desde el proceso, la experiencia del equipo y la necesidad del
              negocio. Eso permite construir plataformas mas utiles, conectadas y sostenibles.
            </p>
          </div>

          <ul className="check-list">
            {customDevelopmentItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <Button href="#formulario">Solicitar solucion a la medida</Button>
        </div>

        <aside className="custom-layout__panel">
          <div className="custom-panel">
            <ProductPreview
              image="/renpia-assets/desarrollo-medida.png"
              fallbackType="dashboard"
              title="Desarrollo a la medida"
              mode="laptop"
            />
            <div className="custom-panel__floating custom-panel__floating--one">CRM personalizado</div>
            <div className="custom-panel__floating custom-panel__floating--two">Agente IA Atencion 24/7</div>
            <div className="custom-panel__floating custom-panel__floating--three">Integraciones Google Suite</div>
            <div className="custom-panel__floating custom-panel__floating--four">Marketplace B2B/B2C</div>
            <div className="custom-panel__floating custom-panel__floating--five">Dashboards inteligentes</div>
          </div>
        </aside>
      </div>
    </section>
  );
}
