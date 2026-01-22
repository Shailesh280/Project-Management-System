import api from "../services/apiClient";

export const fetchEmployeeDashboardStats = async () => {
  const { data } = await api.get("/employee/dashboard/stats");
  return data;
};

export const fetchEmployeeRecentTickets = async () => {
  const { data } = await api.get("/employee/dashboard/recent-tickets");
  return data;
};
