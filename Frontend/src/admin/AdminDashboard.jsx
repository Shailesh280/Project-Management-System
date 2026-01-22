import DashboardStats from "../Dashboard/DashboardStats";
import RecentTicketActivity from "../Dashboard/RecentTicketActivity";
import { useAdminDashboard } from "./admin.hooks";

export default function AdminDashboard() {
  const { stats, recentTickets, isLoading } = useAdminDashboard();

  if (isLoading) return null;

  const adminStatsConfig = [
    { key: "users", title: "Total Users", value: stats?.totalUsers },
    { key: "pending", title: "Pending Approvals", value: stats?.pendingApprovals },
    { key: "deployed", title: "Deployed Tickets", value: stats?.deployedTickets },
    { key: "active", title: "Active Tickets", value: stats?.activeTickets },
  ];

  return (
    <div className="dashboard-container">
      <DashboardStats statsConfig={adminStatsConfig} />
      <RecentTicketActivity tickets={recentTickets} />
    </div>
  );
}
