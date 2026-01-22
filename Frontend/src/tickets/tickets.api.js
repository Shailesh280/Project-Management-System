import api from "../services/apiClient";

export const fetchTickets = async () => {
  const { data } = await api.get("/tickets");
  return data;
};

export const fetchTicketById = async (id) => {
  const { data } = await api.get(`/tickets/${id}`);
  return data;
};

export const createTicket = async (payload) => {
  const { data } = await api.post("/tickets", payload);
  return data;
};

export const updateTicketStatus = async ({ id, ticketStatus }) => {
  const { data } = await api.put(`/tickets/${id}/status`, {
    status: ticketStatus,
  });
  return data;
};


export const deleteTicket = async (id) => {
  await api.delete(`/tickets/${id}`);
};

export const addComment = async ({ ticketId, content }) => {
  const { data } = await api.post("/comments", {
    ticketId,
    content,
  });
  return data;
};
