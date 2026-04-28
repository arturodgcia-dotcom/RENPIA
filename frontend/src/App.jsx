import { useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { api } from "./services/api";

const products = [
  {
    name: "SprintPilot",
    description: "Seguimiento operativo, coordinacion y visibilidad para equipos que necesitan ejecutar con orden.",
    accent: "Operaciones",
  },
  {
    name: "ComerCia",
    description: "Impulsa procesos comerciales, seguimiento de oportunidades y ritmo de conversion.",
    accent: "Ventas",
  },
  {
    name: "Nervia",
    description: "Automatizacion inteligente y orquestacion de datos para decisiones mas rapidas.",
    accent: "Automatizacion",
  },
  {
    name: "JornadaLaboral360",
    description: "Control, productividad y trazabilidad para la operacion diaria del talento.",
    accent: "Talento",
  },
];

const faqs = [
  "Que tipo de empresas pueden implementar soluciones de RENPIA?",
  "RENPIA ofrece demos antes de contratar?",
  "Cuanto tiempo toma implementar una solucion?",
  "RENPIA desarrolla software a la medida?",
  "Como agenda una llamada con RENPIA?",
  "Que incluye el seguimiento despues de una demo?",
];

const initialLeadForm = {
  full_name: "",
  company: "",
  position: "",
  email: "",
  phone: "",
  company_type: "Empresa",
  solution_interest: "SprintPilot",
  main_need: "",
  budget_range: "Sin definir",
  implementation_time: "1 a 3 meses",
  challenge_description: "",
  preferred_contact_method: "whatsapp",
  preferred_responsible: "Pendiente",
  source: "landing_form",
  honeypot: "",
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

function LandingPage() {
  const [news, setNews] = useState([]);
  const [leadForm, setLeadForm] = useState(initialLeadForm);
  const [leadMessage, setLeadMessage] = useState("");
  const [leadStatus, setLeadStatus] = useState("idle");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [appointmentForm, setAppointmentForm] = useState({
    title: "Llamada de diagnostico RENPIA",
    appointment_type: "call",
    responsible: "Isa",
    start_datetime: "",
    end_datetime: "",
    notes: "",
  });
  const [appointmentMessage, setAppointmentMessage] = useState("");

  useEffect(() => {
    api.getNews().then(setNews).catch(() => setNews([]));
  }, []);

  async function handleLeadSubmit(event) {
    event.preventDefault();
    setLeadStatus("loading");
    setLeadMessage("");

    try {
      const result = await api.createLead(leadForm);
      setLeadStatus("success");
      setLeadMessage(
        `Prospecto registrado con clasificacion ${result.lead_classification} y responsable sugerido ${result.assigned_to}.`,
      );
      setLeadForm(initialLeadForm);
    } catch (error) {
      setLeadStatus("error");
      setLeadMessage(error.message);
    }
  }

  async function handleNewsletterSubmit(event) {
    event.preventDefault();
    setNewsletterMessage("");
    try {
      const result = await api.subscribeNewsletter({
        email: newsletterEmail,
        source: "landing_newsletter",
      });
      setNewsletterMessage(`Suscripcion registrada con estado ${result.status}.`);
      setNewsletterEmail("");
    } catch (error) {
      setNewsletterMessage(error.message);
    }
  }

  async function handleAppointmentSubmit(event) {
    event.preventDefault();
    setAppointmentMessage("");
    try {
      const result = await api.createAppointment(appointmentForm);
      setAppointmentMessage(
        `Solicitud registrada para ${result.responsible}. Estado actual: ${result.status}.`,
      );
      setAppointmentForm({
        title: "Llamada de diagnostico RENPIA",
        appointment_type: "call",
        responsible: "Isa",
        start_datetime: "",
        end_datetime: "",
        notes: "",
      });
    } catch (error) {
      setAppointmentMessage(error.message);
    }
  }

  return (
    <div className="page-shell">
      <header className="site-header">
        <div>
          <p className="eyebrow">Header RENPIA</p>
          <h1>RENPIA</h1>
        </div>
        <nav>
          <a href="#soluciones">Soluciones</a>
          <a href="#demos">Demos</a>
          <a href="#formulario">Diagnostico</a>
          <NavLink to="/admin">Panel interno</NavLink>
        </nav>
      </header>

      <main>
        <section className="hero-card">
          <div>
            <p className="eyebrow">Hero principal</p>
            <h2>IA, automatizacion y soluciones digitales para operar y vender mejor.</h2>
            <p className="lead">
              Esta vista conecta la landing aprobada con backend real para leads, agenda, newsletter,
              noticias IA y seguimiento comercial.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#formulario">
                Solicitar diagnostico
              </a>
              <a className="button secondary" href="#agenda">
                Solicitar llamada o demo
              </a>
            </div>
          </div>
          <aside className="hero-stats">
            <Stat label="Captacion" value="Activa" />
            <Stat label="Agenda" value="Lista" />
            <Stat label="Telegram" value="Preparado" />
            <Stat label="SMTP" value="Configurable" />
          </aside>
        </section>

        <Section id="que-hacemos" eyebrow="Que hacemos en RENPIA" title="Transformamos necesidades de negocio en soluciones ejecutables.">
          <div className="grid-three">
            <FeatureCard
              title="Diagnostico comercial"
              text="Convertimos formularios, demos y solicitudes en prospectos clasificados con seguimiento."
            />
            <FeatureCard
              title="Automatizacion operativa"
              text="Disenamos procesos con IA, datos conectados y trazabilidad para equipos internos."
            />
            <FeatureCard
              title="Desarrollo orientado a valor"
              text="Implementamos soluciones propias o a la medida sin romper la experiencia de marca aprobada."
            />
          </div>
        </Section>

        <Section id="soluciones" eyebrow="Nuestros desarrollos" title="Cuatro soluciones base dentro del ecosistema RENPIA.">
          <div className="grid-four">
            {products.map((product) => (
              <article className="product-card" key={product.name}>
                <span>{product.accent}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <a href="#formulario">Quiero informacion</a>
              </article>
            ))}
          </div>
        </Section>

        <Section eyebrow="Desarrollo a la medida" title="Tambien construimos software adaptado a procesos reales.">
          <div className="wide-panel">
            <p>
              Cuando una solucion empaquetada no cubre el proceso completo, RENPIA puede disenar una ruta
              de desarrollo a la medida con foco en retorno, adopcion y escalabilidad.
            </p>
          </div>
        </Section>

        <Section id="demos" eyebrow="Demos disponibles" title="Solicita una demo de SprintPilot o ComerCia.">
          <div className="grid-two">
            <FeatureCard title="Demo SprintPilot" text="Explora tableros, seguimiento operativo y control de ejecucion." />
            <FeatureCard title="Demo ComerCia" text="Visualiza pipeline, seguimiento comercial y priorizacion de oportunidades." />
          </div>
        </Section>

        <Section eyebrow="Noticias IA & Blog RENPIA" title="Contenido activo para contexto, tendencias y oportunidades.">
          <div className="news-grid">
            {news.map((item) => (
              <article key={item.id} className="news-card">
                <p className="eyebrow">{item.category}</p>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <small>Publicado: {new Date(item.published_at).toLocaleDateString("es-MX")}</small>
              </article>
            ))}
          </div>
        </Section>

        <Section eyebrow="Newsletter / Suscripcion" title="Captura suscriptores con doble opt-in preparado.">
          <form className="inline-form" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="correo@empresa.com"
              value={newsletterEmail}
              onChange={(event) => setNewsletterEmail(event.target.value)}
              required
            />
            <button className="button primary" type="submit">
              Suscribirme
            </button>
          </form>
          {newsletterMessage ? <p className="form-message">{newsletterMessage}</p> : null}
        </Section>

        <Section id="formulario" eyebrow="Formulario inteligente para prospectos" title="Registra el lead, lo clasifica y asigna seguimiento sugerido.">
          <form className="smart-form" onSubmit={handleLeadSubmit}>
            <input
              type="text"
              placeholder="Nombre completo"
              value={leadForm.full_name}
              onChange={(event) => setLeadForm({ ...leadForm, full_name: event.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Empresa"
              value={leadForm.company}
              onChange={(event) => setLeadForm({ ...leadForm, company: event.target.value })}
            />
            <input
              type="text"
              placeholder="Cargo"
              value={leadForm.position}
              onChange={(event) => setLeadForm({ ...leadForm, position: event.target.value })}
            />
            <input
              type="email"
              placeholder="Correo"
              value={leadForm.email}
              onChange={(event) => setLeadForm({ ...leadForm, email: event.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="WhatsApp"
              value={leadForm.phone}
              onChange={(event) => setLeadForm({ ...leadForm, phone: event.target.value })}
            />
            <select
              value={leadForm.solution_interest}
              onChange={(event) => setLeadForm({ ...leadForm, solution_interest: event.target.value })}
            >
              <option>SprintPilot</option>
              <option>ComerCia</option>
              <option>Nervia</option>
              <option>JornadaLaboral360</option>
              <option>Desarrollo a la medida</option>
            </select>
            <input
              type="text"
              placeholder="Necesidad principal"
              value={leadForm.main_need}
              onChange={(event) => setLeadForm({ ...leadForm, main_need: event.target.value })}
              required
            />
            <select
              value={leadForm.budget_range}
              onChange={(event) => setLeadForm({ ...leadForm, budget_range: event.target.value })}
            >
              <option>Sin definir</option>
              <option>Hasta 50 mil MXN</option>
              <option>50 a 150 mil MXN</option>
              <option>150 mil MXN o mas</option>
            </select>
            <select
              value={leadForm.implementation_time}
              onChange={(event) => setLeadForm({ ...leadForm, implementation_time: event.target.value })}
            >
              <option>Inmediata</option>
              <option>1 a 3 meses</option>
              <option>3 a 6 meses</option>
              <option>Sin definir</option>
            </select>
            <select
              value={leadForm.preferred_contact_method}
              onChange={(event) => setLeadForm({ ...leadForm, preferred_contact_method: event.target.value })}
            >
              <option value="whatsapp">WhatsApp</option>
              <option value="email">Correo</option>
              <option value="call">Llamada</option>
              <option value="videocall">Videollamada</option>
            </select>
            <select
              value={leadForm.preferred_responsible}
              onChange={(event) => setLeadForm({ ...leadForm, preferred_responsible: event.target.value })}
            >
              <option value="Pendiente">Asignacion sugerida</option>
              <option value="Arturo">Arturo</option>
              <option value="Isa">Isa</option>
            </select>
            <textarea
              placeholder="Describe el reto, proceso o meta que quieres resolver"
              value={leadForm.challenge_description}
              onChange={(event) =>
                setLeadForm({ ...leadForm, challenge_description: event.target.value })
              }
              required
            />
            <input
              className="honeypot"
              type="text"
              tabIndex="-1"
              autoComplete="off"
              value={leadForm.honeypot}
              onChange={(event) => setLeadForm({ ...leadForm, honeypot: event.target.value })}
            />
            <button className="button primary" type="submit" disabled={leadStatus === "loading"}>
              {leadStatus === "loading" ? "Enviando..." : "Enviar formulario"}
            </button>
          </form>
          {leadMessage ? <p className="form-message">{leadMessage}</p> : null}
        </Section>

        <Section id="agenda" eyebrow="Agenda RENPIA" title="Solicita llamada, videollamada o demo con Arturo o Isa.">
          <form className="smart-form compact" onSubmit={handleAppointmentSubmit}>
            <input
              type="text"
              placeholder="Titulo"
              value={appointmentForm.title}
              onChange={(event) => setAppointmentForm({ ...appointmentForm, title: event.target.value })}
              required
            />
            <select
              value={appointmentForm.appointment_type}
              onChange={(event) => setAppointmentForm({ ...appointmentForm, appointment_type: event.target.value })}
            >
              <option value="call">Llamada</option>
              <option value="videocall">Videollamada</option>
              <option value="demo">Demo</option>
            </select>
            <select
              value={appointmentForm.responsible}
              onChange={(event) => setAppointmentForm({ ...appointmentForm, responsible: event.target.value })}
            >
              <option value="Isa">Isa</option>
              <option value="Arturo">Arturo</option>
            </select>
            <input
              type="datetime-local"
              value={appointmentForm.start_datetime}
              onChange={(event) => setAppointmentForm({ ...appointmentForm, start_datetime: event.target.value })}
              required
            />
            <input
              type="datetime-local"
              value={appointmentForm.end_datetime}
              onChange={(event) => setAppointmentForm({ ...appointmentForm, end_datetime: event.target.value })}
              required
            />
            <textarea
              placeholder="Notas de la solicitud"
              value={appointmentForm.notes}
              onChange={(event) => setAppointmentForm({ ...appointmentForm, notes: event.target.value })}
            />
            <button className="button primary" type="submit">
              Registrar solicitud
            </button>
          </form>
          {appointmentMessage ? <p className="form-message">{appointmentMessage}</p> : null}
        </Section>

        <Section eyebrow="Preguntas frecuentes SEO/AEO" title="Contenido preparado para schema FAQ sin alterar el layout.">
          <div className="faq-list">
            {faqs.map((question) => (
              <article key={question} className="faq-item">
                <h3>{question}</h3>
                <p>
                  RENPIA puede acompañar el diagnostico, demo, ruta de implementacion y seguimiento
                  comercial de forma modular y medible.
                </p>
              </article>
            ))}
          </div>
        </Section>

        <section className="cta-banner">
          <div>
            <p className="eyebrow">CTA final</p>
            <h2>Activa tu diagnostico y convierte la landing en una maquina real de captacion.</h2>
          </div>
          <a className="button primary" href="#formulario">
            Quiero hablar con RENPIA
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <p className="eyebrow">Footer</p>
          <strong>RENPIA</strong>
        </div>
        <p>Landing publica, panel interno, agenda, newsletter y noticias IA conectadas a backend local.</p>
      </footer>
    </div>
  );
}

function AdminPage() {
  const [summary, setSummary] = useState(null);
  const [leads, setLeads] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    Promise.all([api.getDashboardSummary(), api.getLeads(), api.getAppointments()])
      .then(([summaryData, leadsData, appointmentsData]) => {
        setSummary(summaryData);
        setLeads(leadsData);
        setAppointments(appointmentsData);
      })
      .catch(() => {
        setSummary(null);
      });
  }, []);

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div>
          <p className="eyebrow">Panel interno RENPIA</p>
          <h1>Vista operativa</h1>
        </div>
        <NavLink className="button secondary" to="/">
          Volver a landing
        </NavLink>
      </header>

      {summary ? (
        <section className="admin-grid">
          <AdminMetric title="Total prospectos" value={summary.total_leads} />
          <AdminMetric title="Calientes" value={summary.hot_leads} />
          <AdminMetric title="Medios" value={summary.medium_leads} />
          <AdminMetric title="Curiosos" value={summary.curious_leads} />
          <AdminMetric title="Bots sospechosos" value={summary.suspicious_bots} />
          <AdminMetric title="Llamadas de hoy" value={summary.today_calls} />
          <AdminMetric title="Demos" value={summary.requested_demos} />
          <AdminMetric title="Solucion top" value={summary.most_requested_solution} />
        </section>
      ) : (
        <p className="form-message">No fue posible cargar el dashboard.</p>
      )}

      <section className="admin-panels">
        <article className="admin-panel">
          <h2>Prospectos recientes</h2>
          <div className="table-like">
            {leads.length ? (
              leads.map((lead) => (
                <div className="table-row" key={lead.id}>
                  <strong>{lead.full_name}</strong>
                  <span>{lead.company || "Sin empresa"}</span>
                  <span>{lead.solution_interest}</span>
                  <span>{lead.lead_classification}</span>
                  <span>{lead.assigned_to}</span>
                </div>
              ))
            ) : (
              <p>Aun no hay prospectos registrados.</p>
            )}
          </div>
        </article>

        <article className="admin-panel">
          <h2>Agenda</h2>
          <div className="table-like">
            {appointments.length ? (
              appointments.map((appointment) => (
                <div className="table-row" key={appointment.id}>
                  <strong>{appointment.title}</strong>
                  <span>{appointment.appointment_type}</span>
                  <span>{appointment.responsible}</span>
                  <span>{appointment.status}</span>
                  <span>{new Date(appointment.start_datetime).toLocaleString("es-MX")}</span>
                </div>
              ))
            ) : (
              <p>Aun no hay solicitudes de agenda.</p>
            )}
          </div>
        </article>
      </section>
    </div>
  );
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="content-section">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function FeatureCard({ title, text }) {
  return (
    <article className="feature-card">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function Stat({ label, value }) {
  return (
    <div className="stat-pill">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function AdminMetric({ title, value }) {
  return (
    <article className="admin-metric">
      <span>{title}</span>
      <strong>{value}</strong>
    </article>
  );
}

export default App;
