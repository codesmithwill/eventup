const API_URL = "http://localhost:3000";

export const eventService = {
  getAllEvents: async () => {
    const response = await fetch(`${API_URL}/events`);
    return response.json();
  },

  getEvent: async (id) => {
    const response = await fetch(`${API_URL}/events/${id}`);
    return response.json();
  },

  createEvent: async (eventData) => {
    const response = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    return response.json();
  },

  updateEvent: async (id, eventData) => {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    return response.json();
  },

  deleteEvent: async (id) => {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  },
  addParticipant: async (id, username) => {
    const getRes = await fetch(`${API_URL}/events/${id}`);
    if (!getRes.ok) throw new Error("Evento não encontrado");
    const ev = await getRes.json();

    const participants = Array.isArray(ev.participants)
      ? [...ev.participants]
      : [];
    if (!participants.includes(username)) {
      participants.push(username);
    }

    const updated = {
      ...ev,
      participants,
      confirmed: participants.length,
    };

    const response = await fetch(`${API_URL}/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    if (!response.ok) throw new Error("Erro ao atualizar evento");
    return response.json();
  },

  removeParticipant: async (id, username) => {
    const getRes = await fetch(`${API_URL}/events/${id}`);
    if (!getRes.ok) throw new Error("Evento não encontrado");
    const ev = await getRes.json();

    const participants = Array.isArray(ev.participants)
      ? ev.participants.filter((p) => p !== username)
      : [];

    const updated = {
      ...ev,
      participants,
      confirmed: participants.length,
    };

    const response = await fetch(`${API_URL}/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    if (!response.ok) throw new Error("Erro ao atualizar evento");
    return response.json();
  },

  getRandomTrendingUpcomingEvent: async () => {
    const response = await fetch(`${API_URL}/events`);
    const events = await response.json();

    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const filtered = events.filter((ev) => {
      const isTrending = !!ev.isTrending;
      if (!isTrending) return false;
      if (!ev.date) return false;
      const evDate = new Date(ev.date + "T00:00:00");
      return evDate >= startOfToday;
    });

    if (!filtered || filtered.length === 0) return null;

    const idx = Math.floor(Math.random() * filtered.length);
    return filtered[idx];
  },
};
