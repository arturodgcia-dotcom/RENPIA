const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Error inesperado" }));
    throw new Error(error.detail || "No fue posible completar la solicitud");
  }

  return response.json();
}

export const api = {
  health: () => request("/health"),
  getNews: () => request("/api/news"),
  getDashboardSummary: () => request("/api/dashboard/summary"),
  getLeads: () => request("/api/leads"),
  getAppointments: () => request("/api/appointments"),
  createLead: (payload) =>
    request("/api/leads", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  createAppointment: (payload) =>
    request("/api/appointments", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  subscribeNewsletter: (payload) =>
    request("/api/newsletter/subscribe", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
