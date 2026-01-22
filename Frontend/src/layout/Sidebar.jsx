import { Menu } from "antd";
import {
  DashboardOutlined,
  ProfileOutlined,
  UserOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../auth/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthContext();

  if (!user) {
    return null;
  }

  const items = [
    {
      key: "/tickets",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/tickets",
      icon: <ProfileOutlined />,
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
