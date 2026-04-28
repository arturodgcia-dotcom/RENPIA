import { Button } from "../components/Button";

export function FinalCTA() {
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
        <Button href="#agenda">Agendar llamada</Button>
        <Button href="#formulario" variant="secondary">
          Solicitar propuesta
        </Button>
        <Button href="#soluciones" variant="ghost">
          Ver soluciones
        </Button>
      </div>
    </section>
  );
}
