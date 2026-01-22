import { Layout, Avatar, Dropdown, Typography } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuthContext } from "../auth/AuthContext";

const { Header } = Layout;
const { Text } = Typography;

export default function HeaderBar() {
  const { user, logout } = useAuthContext();

  if (!user) return null;

  const menuItems = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: logout,
    },
  ];

  const profileImageUrl = user.displayPicture
    ? `http://localhost:8080/uploads/${user.displayPicture}`
    : null;

  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 24px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Dropdown menu={{ items: menuItems }} placement="bottomRight">
        <div
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Avatar
            src={profileImageUrl}
            icon={!profileImageUrl && <UserOutlined />}
            style={{ objectFit: "cover" }}
          />
          <Text>{user.username}</Text>
        </div>
      </Dropdown>
    </Header>
  );
}
