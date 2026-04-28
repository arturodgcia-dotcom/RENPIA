import { FormEvent, useMemo, useState } from "react";
import { Button } from "../components/Button";

type LeadFormData = {
  fullName: string;
  company: string;
  position: string;
  email: string;
  whatsapp: string;
  companyType: string;
  mainNeed: string;
  budget: string;
  solutionType: string;
  implementationTime: string;
  challenge: string;
  verification: string;
  honeypot: string;
};

const initialForm: LeadFormData = {
  fullName: "",
  company: "",
  position: "",
  email: "",
  whatsapp: "",
  companyType: "",
  mainNeed: "",
  budget: "",
  solutionType: "",
  implementationTime: "",
  challenge: "",
  verification: "",
  honeypot: "",
};

const freeDomains = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "icloud.com"];

function isBusinessEmail(email: string) {
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  return Boolean(domain) && !freeDomains.includes(domain);
}

function classifyProspect(form: LeadFormData) {
  let score = 0;

  if (form.company.trim()) score += 15;
  if (isBusinessEmail(form.email)) score += 20;
  if (form.whatsapp.trim().length >= 10) score += 10;
  if (form.budget.trim()) score += 15;
  if (form.mainNeed.trim().length >= 12) score += 15;
  if (form.challenge.trim().length >= 40) score += 15;
  if (["Inmediato", "1 a 3 meses"].includes(form.implementationTime)) score += 10;

  if (score >= 75) return "Prospecto potencial alto";
  if (score >= 50) return "Prospecto potencial medio";
  return "Prospecto en exploracion";
}

export function LeadFormSection() {
  const [form, setForm] = useState<LeadFormData>(initialForm);
  const [feedback, setFeedback] = useState("");

  const businessEmail = useMemo(() => isBusinessEmail(form.email), [form.email]);
  const verificationOk = form.verification.trim() === "7";
  const automaticClassification = useMemo(() => classifyProspect(form), [form]);
  const antiBotOk = !form.honeypot.trim();

  function updateField<K extends keyof LeadFormData>(field: K, value: LeadFormData[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!businessEmail) {
      setFeedback("Necesitamos un correo empresarial para continuar.");
      return;
    }

    if (!verificationOk || !antiBotOk) {
      setFeedback("La validacion de seguridad no fue aprobada.");
      return;
    }

    setFeedback(
      `Solicitud lista para enviarse en la siguiente fase. Clasificacion actual: ${automaticClassification}.`,
    );
    setForm(initialForm);
  }

  return (
    <section className="landing-section landing-section--surface landing-section--form" id="formulario">
      <div className="prospect-layout">
        <div className="prospect-layout__form">
          <div className="section-heading">
            <p className="section-heading__eyebrow">Formulario inteligente para prospectos</p>
            <h2>Formulario inteligente para prospectos</h2>
            <p className="section-heading__description">
              Captura informacion estrategica para entender necesidad, prioridad y tipo de
              solucion que requiere tu empresa.
            </p>
          </div>

          <form className="prospect-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre completo"
              value={form.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Empresa"
              value={form.company}
              onChange={(event) => updateField("company", event.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Cargo"
              value={form.position}
              onChange={(event) => updateField("position", event.target.value)}
            />
            <input
              type="email"
              placeholder="Correo empresarial"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="WhatsApp"
              value={form.whatsapp}
              onChange={(event) => updateField("whatsapp", event.target.value)}
              required
            />
            <select
              value={form.companyType}
              onChange={(event) => updateField("companyType", event.target.value)}
              required
            >
              <option value="">Tipo de empresa</option>
              <option>PyME</option>
              <option>Corporativo</option>
              <option>Startup</option>
              <option>Industria / manufactura</option>
              <option>Comercio / retail</option>
              <option>Servicios</option>
            </select>
            <input
              type="text"
              placeholder="Principal necesidad"
              value={form.mainNeed}
              onChange={(event) => updateField("mainNeed", event.target.value)}
              required
            />
            <select
              value={form.budget}
              onChange={(event) => updateField("budget", event.target.value)}
              required
            >
              <option value="">Presupuesto estimado</option>
              <option>Hasta 50 mil MXN</option>
              <option>50 mil a 150 mil MXN</option>
              <option>150 mil a 500 mil MXN</option>
              <option>500 mil MXN o mas</option>
            </select>
            <select
              value={form.solutionType}
              onChange={(event) => updateField("solutionType", event.target.value)}
              required
            >
              <option value="">Buscas comprar una solucion existente o un desarrollo a la medida?</option>
              <option>Solucion existente</option>
              <option>Desarrollo a la medida</option>
              <option>Necesito diagnostico</option>
            </select>
            <select
              value={form.implementationTime}
              onChange={(event) => updateField("implementationTime", event.target.value)}
              required
            >
              <option value="">En cuanto tiempo deseas implementar?</option>
              <option>Inmediato</option>
              <option>1 a 3 meses</option>
              <option>3 a 6 meses</option>
              <option>Mas adelante</option>
            </select>
            <textarea
              placeholder="Describe brevemente tu reto"
              value={form.challenge}
              onChange={(event) => updateField("challenge", event.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Pregunta de verificacion: 3 + 4 ="
              value={form.verification}
              onChange={(event) => updateField("verification", event.target.value)}
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
            <Button type="submit">Quiero mi diagnostico</Button>
          </form>

          {feedback ? <p className="form-feedback">{feedback}</p> : null}
        </div>

        <aside className="prospect-layout__security">
          <div className="security-card">
            <p className="security-card__eyebrow">Filtro de seguridad para prospectos reales</p>
            <h3>Validacion previa</h3>
            <ul className="security-checks">
              <li className={businessEmail ? "is-valid" : ""}>Correo empresarial requerido</li>
              <li className={antiBotOk ? "is-valid" : ""}>Validacion anti-bot</li>
              <li className={verificationOk ? "is-valid" : ""}>Pregunta de verificacion</li>
              <li className="is-highlighted">{automaticClassification}</li>
            </ul>

            <div className="security-card__note">
              <span>Clasificacion automatica de prospecto</span>
              <strong>{automaticClassification}</strong>
            </div>

            <div className="security-card__mini">
              <span>Validacion activa</span>
              <strong>Prospectos empresariales priorizados</strong>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
