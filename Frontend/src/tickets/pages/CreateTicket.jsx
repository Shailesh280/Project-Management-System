import { Button, Card, Form, Input, Select, Typography } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../auth/AuthContext";
import { useCreateTicket } from "../tickets.hooks";
import { useUsers } from "../../users/users.hooks";

const { Title } = Typography;
const { TextArea } = Input;

export default function CreateTicket() {
  const navigate = useNavigate();
  const { isAdmin, loading } = useAuthContext();
  const { data: users = [], isLoading: usersLoading } = useUsers();
  const { mutate: createTicket, isLoading } = useCreateTicket();

  if (loading) return null;
  if (!isAdmin) return <Navigate to="/unauthorized" replace />;

  const onFinish = (values) => {
    createTicket(values, {
      onSuccess: () => {
        navigate("/tickets", { replace: true });
      },
    });
  };

  return (
    <Card style={{ maxWidth: 600, margin: "40px auto" }}>
      <Title level={3}>Create Ticket</Title>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Label"
          name="label"
          rules={[{ required: true }]}
        >
          <Select
            options={[
              { value: "BUG", label: "Bug" },
              { value: "TASK", label: "Task" },
              { value: "IMPROVEMENT", label: "Improvement" },
              { value: "SUPPORT_REQUEST", label: "Support Request" },
              { value: "NEW_FEATURE", label: "New Feature" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Assign To"
          name="assignedToUserId"
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            placeholder="Search user by username or email"
            loading={usersLoading}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {users.map((u) => (
              <Select.Option key={u.id} value={u.id}>
                {u.username} ({u.email})
              </Select.Option>
            ))}
          </Select>
        </Form.Item>


        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          block
        >
          Create Ticket
        </Button>
      </Form>
    </Card>
  );
}
