import DashboardStats from "../Dashboard/DashboardStats";
import RecentTicketActivity from "../Dashboard/RecentTicketActivity";
import { useEmployeeDashboard } from "./employee.hooks";

export default function EmployeeDashboard() {
  const { stats, recentTickets, isLoading } = useEmployeeDashboard();

  if (isLoading) return null;

  const employeeStatsConfig = [
  { key: "myActive", title: "My Active Tickets", value: stats?.myActiveTickets },
  { key: "myCompleted", title: "My Completed Tickets", value: stats?.myCompletedTickets },
  { key: "overallActive", title: "Overall Active Tickets", value: stats?.overallActiveTickets },
  { key: "overallCompleted", title: "Overall Completed Tickets", value: stats?.overallCompletedTickets },
];


  return (
    <div className="dashboard-container">
      <DashboardStats statsConfig={employeeStatsConfig} />
      <RecentTicketActivity tickets={recentTickets} />
    </div>
  );
}
