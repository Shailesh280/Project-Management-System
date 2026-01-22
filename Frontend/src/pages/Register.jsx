import { Button, Card, Form, Input, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../auth/auth.hooks";

const { Title, Text } = Typography;

export default function Register() {
  const navigate = useNavigate();
  const { mutate: register, isLoading } = useRegister();

  const onFinish = (values) => {
    register(values);
  };

  return (
    <Card style={{ maxWidth: 450, margin: "80px auto" }}>
      <Title level={3}>Register</Title>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Username required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email required" },
            { type: "email", message: "Invalid email" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Password required" },
            { min: 8, message: "Minimum 8 characters" },
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
            Register
          </Button>

          <Text style={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Button
              type="link"
              onClick={() => navigate("/login")}
              style={{ padding: 0 }}
            >
              Login
            </Button>
          </Text>
        </Space>
      </Form>
    </Card>
  );
}
