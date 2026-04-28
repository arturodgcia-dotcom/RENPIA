import { FormEvent, useState } from "react";
import { Button } from "../components/Button";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) {
      setMessage("Ingresa tu correo empresarial para continuar.");
      return;
    }

    setMessage("Tu correo quedo listo para la siguiente fase de suscripcion.");
    setEmail("");
  }

  return (
    <section className="landing-section" id="newsletter">
      <div className="newsletter-card">
        <div className="newsletter-card__copy">
          <div className="section-heading">
            <p className="section-heading__eyebrow">Newsletter</p>
            <h2>Recibe ideas, noticias y oportunidades con IA</h2>
            <p className="section-heading__description">
              Suscribete para recibir tendencias, casos de uso y oportunidades de automatizacion
              para tu empresa.
            </p>
          </div>

          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Tu correo empresarial"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-label="Tu correo empresarial"
            />
            <Button type="submit">Suscribirme</Button>
          </form>

          {message ? <p className="form-feedback">{message}</p> : null}
        </div>

        <div className="newsletter-card__seals" aria-label="Sellos de confianza">
          <span>Contenido util</span>
          <span>Sin spam</span>
          <span>Enfoque empresarial</span>
        </div>
      </div>
    </section>
  );
}
