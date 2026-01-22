import api from "../services/apiClient";

export const fetchAdminDashboardStats = async () => {
  const { data } = await api.get("/admin/dashboard/stats");
  return data;
};

export const fetchRecentTicketActivity = async () => {
  const { data } = await api.get("/admin/dashboard/recent-tickets");
  return data;
};
