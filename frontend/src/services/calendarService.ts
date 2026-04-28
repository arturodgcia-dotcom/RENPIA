export type CalendarEventPayload = {
  title: string;
  responsible: string;
  date: string;
  slot: string;
  note?: string;
};

export async function createCalendarEvent(payload: CalendarEventPayload) {
  const response = {
    provider: import.meta.env.VITE_GOOGLE_CALENDAR_ENABLED === "true" ? "google-ready" : "mock",
    eventId: `reinpia-${Date.now()}`,
    payload,
  };

  console.info("[calendarService]", response);

  return response;
}
