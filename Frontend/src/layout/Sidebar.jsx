import { Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../auth/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthContext();

  if (!user) return null;

  const dashboardPath =
    user.role === "ADMIN"
      ? "/admin/dashboard"
      : "/employee/dashboard";

  const items = [
    {
      key: dashboardPath,
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/tickets",
      icon: <FileTextOutlined />,
      label: "Tickets",
    },
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: "My Profile",
    },
  ];

  if (user.role === "ADMIN") {
    items.push(
      {
        key: "/users",
        icon: <UserOutlined />,
        label: "Users",
      },
      {
        key: "/users/pending",
        icon: <ClockCircleOutlined />,
        label: "Pending Approvals",
      }
    );
  }

  return (
    <Menu
      mode="inline"
      theme="dark"
      selectedKeys={[location.pathname]}
      items={items}
      onClick={({ key }) => navigate(key)}
    />
  );
}
