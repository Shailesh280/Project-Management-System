import { Card, CardContent, Typography } from "@mui/material";

const DashboardStatCard = ({ title, value }) => {
  return (
    <Card className="dashboard-stat-card">
      <CardContent>
        <Typography className="dashboard-stat-title">
          {title}
        </Typography>
        <Typography className="dashboard-stat-value">
          {value ?? 0}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardStatCard;
