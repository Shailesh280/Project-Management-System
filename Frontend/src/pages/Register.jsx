import { Button, Card, Form, Input, Typography } from "antd";
import { useRegister } from "../auth/auth.hooks";

const { Title } = Typography;

export default function Register() {
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

        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          block
        >
          Register
        </Button>
      </Form>
    </Card>
  );
}
