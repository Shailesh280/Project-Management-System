import DashboardStatCard from "./DashboardStatCard";

const DashboardStats = ({ statsConfig }) => {
  return (
    <div className="dashboard-stats-grid">
      {statsConfig.map((item) => (
        <DashboardStatCard
          key={item.key}
          title={item.title}
          value={item.value}
        />
      ))}
    </div>
  );
};

export default DashboardStats;
