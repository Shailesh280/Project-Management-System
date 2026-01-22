import { Button, Card, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../auth/auth.hooks";
import { useAuthContext } from "../auth/AuthContext";

const { Title } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { mutate: login, isLoading } = useLogin();

  const onFinish = (values) => {
    login(values, {
      onSuccess: () => {
          navigate("/tickets", { replace: true });
      },
    });
  };

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
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input.Password />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          block
        >
          Login
        </Button>
      </Form>
    </Card>
  );
}
