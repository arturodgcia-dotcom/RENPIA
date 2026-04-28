import { FormEvent, useMemo, useState } from "react";
import { Button } from "../components/Button";
import { appointmentReasons, teamMembers } from "../data/siteContent";
import { useI18n } from "../i18n/I18nProvider";
import { createAppointment, defaultSlots, getNextAvailableDates } from "../services/appointmentService";

type AppointmentForm = {
  reason: string;
  responsible: string;
  date: string;
  slot: string;
};

const initialForm: AppointmentForm = {
  reason: "",
  responsible: "",
  date: "",
  slot: "",
};

export function AppointmentSection() {
  const { locale, content } = useI18n();
  const [form, setForm] = useState<AppointmentForm>(initialForm);
  const [message, setMessage] = useState("");
  const dates = useMemo(() => getNextAvailableDates(), []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.reason || !form.responsible || !form.date || !form.slot) {
      setMessage(content.appointment.error);
      return;
    }

    await createAppointment(form);
    setMessage(content.appointment.success);
    setForm(initialForm);
  }

  return (
    <section className="landing-section landing-section--surface landing-section--agenda" id="agenda">
      <div className="agenda-layout">
        <div>
          <div className="section-heading">
            <p className="section-heading__eyebrow">{content.appointment.eyebrow}</p>
            <h2>{content.appointment.title}</h2>
            <p className="section-heading__description">{content.appointment.description}</p>
          </div>

          <p className="agenda-description">{content.appointment.intro}</p>

          <div className="agenda-options">
            {appointmentReasons.map((option) => (
              <article key={option.es} className="agenda-option">
                <span className="agenda-option__dot" />
                <strong>{option[locale]}</strong>
              </article>
            ))}
          </div>

          <p className="agenda-note">{content.appointment.note}</p>
        </div>

        <aside className="agenda-visual">
          <form className="agenda-visual__card" onSubmit={handleSubmit}>
            <span>{content.appointment.availabilityTitle}</span>
            <strong>Arturo / Isa</strong>

            <select
              value={form.reason}
              onChange={(event) => setForm((current) => ({ ...current, reason: event.target.value }))}
            >
              <option value="">{content.appointment.reasonLabel}</option>
              {appointmentReasons.map((reason) => (
                <option key={reason.es}>{reason[locale]}</option>
              ))}
            </select>

            <select
              value={form.responsible}
              onChange={(event) =>
                setForm((current) => ({ ...current, responsible: event.target.value }))
              }
            >
              <option value="">{content.appointment.responsibleLabel}</option>
              {teamMembers.map((person) => (
                <option key={person.slug} value={person.name}>
                  {person.name} | {person.role[locale]}
                </option>
              ))}
            </select>

            <select
              value={form.date}
              onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
            >
              <option value="">{content.appointment.dateLabel}</option>
              {dates.map((date) => (
                <option key={date.value} value={date.value}>
                  {date.label}
                </option>
              ))}
            </select>

            <div className="agenda-visual__slots">
              {defaultSlots.map((slot) => (
                <button
                  key={slot}
                  className={`slot-chip ${form.slot === slot ? "is-active" : ""}`}
                  type="button"
                  onClick={() => setForm((current) => ({ ...current, slot }))}
                >
                  {slot}
                </button>
              ))}
            </div>

            <div className="agenda-visual__people">
              {teamMembers.slice(0, 2).map((person) => (
                <article key={person.slug}>
                  <small>{person.name}</small>
                  <strong>{person.role[locale]}</strong>
                </article>
              ))}
            </div>

            <Button type="submit">{content.appointment.button}</Button>
            {message ? <p className="form-feedback">{message}</p> : null}
          </form>
        </aside>
      </div>
    </section>
  );
}
