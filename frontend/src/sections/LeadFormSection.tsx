import { FormEvent, useMemo, useState } from "react";
import { Button } from "../components/Button";
import { useI18n } from "../i18n/I18nProvider";
import { scoreLead, type LeadFormInput } from "../services/leadScoring";
import { submitLead } from "../services/leadService";

const initialForm: LeadFormInput = {
  fullName: "",
  company: "",
  position: "",
  email: "",
  whatsapp: "",
  companyType: "",
  companySize: "",
  mainNeed: "",
  budget: "",
  implementationTime: "",
  challenge: "",
  verification: "",
  consent: false,
  honeypot: "",
};

const THROTTLE_KEY = "reinpia-last-lead-submission";
const THROTTLE_MS = 30 * 1000;

export function LeadFormSection() {
  const { locale, content } = useI18n();
  const [form, setForm] = useState<LeadFormInput>(initialForm);
  const [feedback, setFeedback] = useState("");
  const scoring = useMemo(() => scoreLead(form), [form]);

  function updateField<K extends keyof LeadFormInput>(field: K, value: LeadFormInput[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const lastSubmittedAt = Number(window.localStorage.getItem(THROTTLE_KEY) ?? "0");
    if (Date.now() - lastSubmittedAt < THROTTLE_MS) {
      setFeedback(content.leadForm.throttled);
      return;
    }

    if (!scoring.businessEmail) {
      setFeedback(content.leadForm.invalidBusinessEmail);
      return;
    }

    if (!scoring.verificationOk || !scoring.antiBotOk) {
      setFeedback(content.leadForm.invalidVerification);
      return;
    }

    if (!form.consent) {
      setFeedback(content.leadForm.invalidConsent);
      return;
    }

    const result = await submitLead(form);
    window.localStorage.setItem(THROTTLE_KEY, String(Date.now()));
    setFeedback(
      `${content.leadForm.success} | Score: ${result.scoring.score} | ${getClassificationLabel(
        result.scoring.classification,
        content.leadForm.classes,
      )}`,
    );
    setForm(initialForm);
  }

  return (
    <section className="landing-section landing-section--surface landing-section--form" id="formulario">
      <div className="prospect-layout">
        <div className="prospect-layout__form">
          <div className="section-heading">
            <p className="section-heading__eyebrow">{content.leadForm.eyebrow}</p>
            <h2>{content.leadForm.title}</h2>
            <p className="section-heading__description">{content.leadForm.description}</p>
          </div>

          <form className="prospect-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={content.leadForm.fields.fullName}
              value={form.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              required
            />
            <input
              type="text"
              placeholder={content.leadForm.fields.company}
              value={form.company}
              onChange={(event) => updateField("company", event.target.value)}
              required
            />
            <input
              type="text"
              placeholder={content.leadForm.fields.position}
              value={form.position}
              onChange={(event) => updateField("position", event.target.value)}
            />
            <input
              type="email"
              placeholder={content.leadForm.fields.email}
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              required
            />
            <input
              type="tel"
              placeholder={content.leadForm.fields.whatsapp}
              value={form.whatsapp}
              onChange={(event) => updateField("whatsapp", event.target.value)}
              required
            />
            <select
              value={form.companyType}
              onChange={(event) => updateField("companyType", event.target.value)}
              required
            >
              <option value="">{content.leadForm.fields.companyType}</option>
              {content.leadForm.options.companyTypes.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <select
              value={form.companySize}
              onChange={(event) => updateField("companySize", event.target.value)}
              required
            >
              <option value="">{content.leadForm.fields.companySize}</option>
              {content.leadForm.options.companySizes.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder={content.leadForm.fields.mainNeed}
              value={form.mainNeed}
              onChange={(event) => updateField("mainNeed", event.target.value)}
              required
            />
            <select
              value={form.budget}
              onChange={(event) => updateField("budget", event.target.value)}
              required
            >
              <option value="">{content.leadForm.fields.budget}</option>
              {content.leadForm.options.budgets.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <select
              value={form.implementationTime}
              onChange={(event) => updateField("implementationTime", event.target.value)}
              required
            >
              <option value="">{content.leadForm.fields.implementationTime}</option>
              {content.leadForm.options.timelines.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder={content.leadForm.fields.verification}
              value={form.verification}
              onChange={(event) => updateField("verification", event.target.value)}
              required
            />
            <textarea
              placeholder={content.leadForm.fields.challenge}
              value={form.challenge}
              onChange={(event) => updateField("challenge", event.target.value)}
              required
            />
            <input
              className="honeypot-field"
              type="text"
              value={form.honeypot}
              onChange={(event) => updateField("honeypot", event.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <label className="consent-check">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(event) => updateField("consent", event.target.checked)}
              />
              <span>{content.leadForm.fields.consent}</span>
            </label>
            <Button type="submit">{content.leadForm.button}</Button>
          </form>

          {feedback ? <p className="form-feedback">{feedback}</p> : null}
        </div>

        <aside className="prospect-layout__security">
          <div className="security-card">
            <p className="security-card__eyebrow">{content.leadForm.securityEyebrow}</p>
            <h3>{content.leadForm.securityTitle}</h3>
            <ul className="security-checks">
              <li className={scoring.businessEmail ? "is-valid" : ""}>
                {content.leadForm.securityChecks.businessEmail}
              </li>
              <li className={scoring.antiBotOk ? "is-valid" : ""}>
                {content.leadForm.securityChecks.antiBot}
              </li>
              <li className={scoring.verificationOk ? "is-valid" : ""}>
                {content.leadForm.securityChecks.verification}
              </li>
              <li className={form.consent ? "is-valid" : ""}>
                {content.leadForm.securityChecks.consent}
              </li>
              <li className="is-highlighted">
                {getClassificationLabel(scoring.classification, content.leadForm.classes)}
              </li>
            </ul>

            <div className="security-card__note">
              <span>{locale === "es" ? "Lead score" : "Lead score"}</span>
              <strong>{scoring.score}</strong>
            </div>

            <div className="security-card__mini">
              <span>{locale === "es" ? "Clasificacion automatica" : "Automatic classification"}</span>
              <strong>{getClassificationLabel(scoring.classification, content.leadForm.classes)}</strong>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function getClassificationLabel(
  classification: "curious" | "initial" | "potential" | "expansion",
  labels: Record<"curious" | "initial" | "potential" | "expansion", string>,
) {
  return labels[classification];
}
