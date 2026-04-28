import { ButtonLink } from "../components/ButtonLink";

export function FinalCtaSection() {
  return (
    <section className="final-cta" id="contacto">
      <div>
        <p className="section-heading__eyebrow">CTA final</p>
        <h2>Convierte procesos en crecimiento con RENPIA</h2>
        <p>
          Consultoria, automatizacion y software inteligente para empresas que buscan evolucionar.
        </p>
      </div>

      <div className="final-cta__actions">
        <ButtonLink href="#agenda">Agendar llamada</ButtonLink>
        <ButtonLink href="#formulario" variant="secondary">
          Solicitar propuesta
        </ButtonLink>
        <ButtonLink href="#soluciones" variant="ghost">
          Ver soluciones
        </ButtonLink>
      </div>
    </section>
  );
}
