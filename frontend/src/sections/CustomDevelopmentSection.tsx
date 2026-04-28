import { Button } from "../components/Button";
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
            <span className="custom-panel__eyebrow">Arquitectura funcional</span>
            <h3>Consultoria + sistema + automatizacion</h3>
            <p>
              Disenamos experiencias empresariales creibles con visuales tipo dashboard, flujos
              conectados y una capa tecnica preparada para crecer.
            </p>
            <div className="custom-panel__stack">
              <span>CRM</span>
              <span>BI</span>
              <span>IA</span>
              <span>Integraciones</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
