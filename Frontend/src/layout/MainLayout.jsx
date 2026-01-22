import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import HeaderBar from "./HeaderBar";

const { Sider, Content } = Layout;

export default function MainLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={220}>
        <Sidebar />
      </Sider>

      <Layout>
        <HeaderBar />
        <Content style={{ padding: 24 }}>
          <Outlet /> 
        </Content>
      </Layout>
    </Layout>
  );
}
