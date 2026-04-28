import { FormEvent, useState } from "react";
import { Button } from "../components/Button";
import { useI18n } from "../i18n/I18nProvider";
import { isValidEmail, subscribeNewsletter } from "../services/newsletterService";

export function NewsletterSection() {
  const { content } = useI18n();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      setMessage(content.newsletter.errorEmpty);
      return;
    }

    if (!isValidEmail(email)) {
      setMessage(content.newsletter.errorInvalid);
      return;
    }

    if (!consent) {
      setMessage(content.newsletter.errorConsent);
      return;
    }

    await subscribeNewsletter({
      email,
      consent,
      source: "landing_newsletter",
    });

    setMessage(content.newsletter.success);
    setEmail("");
    setConsent(false);
  }

  return (
    <section className="landing-section landing-section--dark" id="newsletter">
      <div className="newsletter-card">
        <div className="newsletter-card__icon">
          <div className="newsletter-card__envelope">
            <span />
          </div>
        </div>

        <div className="newsletter-card__copy">
          <div className="section-heading">
            <p className="section-heading__eyebrow">{content.newsletter.eyebrow}</p>
            <h2>{content.newsletter.title}</h2>
            <p className="section-heading__description">{content.newsletter.description}</p>
          </div>

          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder={content.newsletter.placeholder}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-label={content.newsletter.placeholder}
            />
            <Button type="submit">{content.newsletter.button}</Button>
          </form>

          <label className="consent-check consent-check--light">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
            />
            <span>{content.newsletter.consent}</span>
          </label>

          {message ? <p className="form-feedback">{message}</p> : null}
        </div>

        <div className="newsletter-card__seals" aria-label="Sellos de confianza">
          {content.newsletter.chips.map((chip) => (
            <span key={chip}>{chip}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
