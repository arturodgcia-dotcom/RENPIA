import { createCalendarEvent } from "./calendarService";
import { notifyTelegram } from "./telegramService";
import { readCollection, writeCollection } from "./storage";

const APPOINTMENTS_KEY = "reinpia-appointments";

export type AppointmentInput = {
  reason: string;
  responsible: string;
  date: string;
  slot: string;
  notes?: string;
};

export type AppointmentRecord = AppointmentInput & {
  id: string;
  createdAt: string;
  status: "requested";
};

export const defaultSlots = ["09:00", "11:30", "13:00", "16:00"];

export function getNextAvailableDates() {
  const formatter = new Intl.DateTimeFormat("es-MX", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return Array.from({ length: 5 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index + 1);

    return {
      value: date.toISOString().slice(0, 10),
      label: formatter.format(date),
    };
  });
}

export async function createAppointment(input: AppointmentInput) {
  const record: AppointmentRecord = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "requested",
  };

  const appointments = [record, ...readCollection<AppointmentRecord>(APPOINTMENTS_KEY)];
  writeCollection(APPOINTMENTS_KEY, appointments);

  await createCalendarEvent({
    title: input.reason,
    responsible: input.responsible,
    date: input.date,
    slot: input.slot,
    note: input.notes,
  });

  await notifyTelegram(
    "new_appointment",
    `Nueva cita REINPIA: ${record.reason} con ${record.responsible} el ${record.date} a las ${record.slot}`,
  );

  return record;
}

export function getAppointments() {
  return readCollection<AppointmentRecord>(APPOINTMENTS_KEY);
}
