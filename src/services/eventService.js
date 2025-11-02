const API_URL = 'http://localhost:3000';

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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData)
        });
        return response.json();
    },

    updateEvent: async (id, eventData) => {
        const response = await fetch(`${API_URL}/events/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData)
        });
        return response.json();
    },

    deleteEvent: async (id) => {
        const response = await fetch(`${API_URL}/events/${id}`, {
            method: 'DELETE'
        });
        return response.ok;
    }
};