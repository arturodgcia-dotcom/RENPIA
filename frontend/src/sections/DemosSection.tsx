import { ButtonLink } from "../components/ButtonLink";
import { SectionHeader } from "../components/SectionHeader";
import { demos } from "../data/siteContent";

export function DemosSection() {
  return (
    <section className="landing-section" id="demos">
      <SectionHeader
        eyebrow="Demos disponibles"
        title="Conoce el producto antes de decidir."
        description="La experiencia de demo permite visualizar con claridad como RENPIA organiza procesos, seguimiento y crecimiento."
      />

      <div className="demo-grid">
        {demos.map((demo) => (
          <article key={demo.title} className="demo-card">
            <span className="demo-card__badge">{demo.badge}</span>
            <h3>{demo.title}</h3>
            <p>{demo.description}</p>
            <ButtonLink href="#agenda">Entrar al demo</ButtonLink>
          </article>
        ))}
      </div>
    </section>
  );
}
