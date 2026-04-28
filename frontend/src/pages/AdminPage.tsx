import { getAppointments } from "../services/appointmentService";
import { getLeads } from "../services/leadService";
import { getNewsletterSubscribers } from "../services/newsletterService";
import { useI18n } from "../i18n/I18nProvider";

type AdminPageProps = {
  section: "leads" | "appointments" | "newsletter";
};

export function AdminPage({ section }: AdminPageProps) {
  const { locale, content } = useI18n();
  const leads = getLeads();
  const appointments = getAppointments();
  const newsletter = getNewsletterSubscribers();

  const data =
    section === "leads"
      ? leads
      : section === "appointments"
        ? appointments
        : newsletter;

  return (
    <main className="landing-main admin-main">
      <section className="landing-section admin-shell">
        <aside className="admin-sidebar">
          <strong>{content.pages.admin.title}</strong>
          <a href="/admin/leads">{content.pages.admin.leads}</a>
          <a href="/admin/appointments">{content.pages.admin.appointments}</a>
          <a href="/admin/newsletter">{content.pages.admin.newsletter}</a>
        </aside>

        <div className="admin-content">
          <div className="admin-stats">
            <article className="admin-stat-card">
              <span>{locale === "es" ? "Total leads" : "Total leads"}</span>
              <strong>{leads.length}</strong>
            </article>
            <article className="admin-stat-card">
              <span>{locale === "es" ? "Total citas" : "Total appointments"}</span>
              <strong>{appointments.length}</strong>
            </article>
            <article className="admin-stat-card">
              <span>{locale === "es" ? "Total newsletter" : "Total newsletter"}</span>
              <strong>{newsletter.length}</strong>
            </article>
          </div>

          <div className="admin-table-wrap">
            <h1>{section === "leads" ? content.pages.admin.leads : section === "appointments" ? content.pages.admin.appointments : content.pages.admin.newsletter}</h1>

            {!data.length ? (
              <p>{content.pages.admin.empty}</p>
            ) : (
              <div className="admin-table">
                {data.map((entry) => (
                  <article key={entry.id} className="admin-table__row">
                    <code>{entry.id}</code>
                    {"company" in entry ? <strong>{entry.company || entry.fullName}</strong> : null}
                    {"reason" in entry ? <strong>{entry.reason}</strong> : null}
                    {"email" in entry ? <span>{entry.email}</span> : null}
                    {"classification" in entry ? <span>{entry.classification}</span> : null}
                    {"slot" in entry ? <span>{`${entry.date} | ${entry.slot}`}</span> : null}
                    {"status" in entry ? <span>{entry.status}</span> : null}
                    <small>{entry.createdAt}</small>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
