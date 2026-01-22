import { Button, Card, Form, Input, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLogin } from "../auth/auth.hooks";
import { useAuthContext } from "../auth/AuthContext";

const { Title, Text } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthContext();
  const { mutate: login, isLoading } = useLogin();

  const onFinish = (values) => {
    login(values);
  };

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    if (user.role === "ADMIN") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/employee/dashboard", { replace: true });
    }
  }, [user, isAuthenticated, navigate]);

  return (
    <Card style={{ maxWidth: 400, margin: "100px auto" }}>
      <Title level={3}>Login</Title>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Invalid email format" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Password is required" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Space direction="vertical" style={{ width: "100%" }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            block
          >
            Login
          </Button>

          <Text style={{ textAlign: "center" }}>
            Don’t have an account?{" "}
            <Button
              type="link"
              onClick={() => navigate("/register")}
              style={{ padding: 0 }}
            >
              Register
            </Button>
          </Text>
        </Space>
      </Form>
    </Card>
  );
}
