import { useQuery } from "@tanstack/react-query";
import {
  fetchAdminDashboardStats,
  fetchRecentTicketActivity,
} from "./admin.api";

export const useAdminDashboard = () => {
  const statsQuery = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: fetchAdminDashboardStats,
  });

  const recentQuery = useQuery({
    queryKey: ["admin-recent-tickets"],
    queryFn: fetchRecentTicketActivity,
  });

  return {
    stats: statsQuery.data,
    recentTickets: recentQuery.data,
    isLoading: statsQuery.isLoading || recentQuery.isLoading,
  };
};
