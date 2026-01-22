import { useQuery } from "@tanstack/react-query";
import {
  fetchEmployeeDashboardStats,
  fetchEmployeeRecentTickets,
} from "./employee.api";

export const useEmployeeDashboard = () => {
  const statsQuery = useQuery({
    queryKey: ["employee-dashboard-stats"],
    queryFn: fetchEmployeeDashboardStats,
  });

  const recentTicketsQuery = useQuery({
    queryKey: ["employee-dashboard-recent-tickets"],
    queryFn: fetchEmployeeRecentTickets,
  });

  return {
    stats: statsQuery.data,
    recentTickets: recentTicketsQuery.data,
    isLoading: statsQuery.isLoading || recentTicketsQuery.isLoading,
    isError: statsQuery.isError || recentTicketsQuery.isError,
  };
};
