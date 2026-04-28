import { Button } from "../components/Button";
import { agendaOptions } from "../data/siteContent";

export function AppointmentSection() {
  return (
    <section className="landing-section" id="agenda">
      <div className="agenda-layout">
        <div>
          <div className="section-heading">
            <p className="section-heading__eyebrow">Agenda</p>
            <h2>Agenda una llamada con RENPIA</h2>
            <p className="section-heading__description">
              Si tu empresa esta lista para mejorar sus procesos, automatizar tareas, implementar
              agentes de IA o desarrollar una solucion a la medida, agenda una llamada con nuestro
              equipo.
            </p>
          </div>

          <p className="agenda-description">
            Nuestro asistente inteligente revisara tu solicitud, clasificara tu necesidad y te
            ayudara a encontrar el mejor horario disponible con Arturo o Isa.
          </p>

          <div className="agenda-options">
            {agendaOptions.map((option) => (
              <article key={option} className="agenda-option">
                <span className="agenda-option__dot" />
                <strong>{option}</strong>
              </article>
            ))}
          </div>

          <p className="agenda-note">
            Si requieres videollamada, nuestro equipo te enviara la liga de acceso por correo o
            WhatsApp despues de confirmar tu reunion.
          </p>

          <Button href="#contacto">Agendar llamada con RENPIA</Button>
        </div>

        <aside className="agenda-visual">
          <div className="agenda-visual__card">
            <span>Disponibilidad asistida</span>
            <strong>Arturo + Isa</strong>
            <div className="agenda-visual__calendar">
              <span>Mar</span>
              <span>Mie</span>
              <span>Jue</span>
              <span>Vie</span>
            </div>
            <div className="agenda-visual__slots">
              <span>09:00</span>
              <span>11:30</span>
              <span>16:00</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
