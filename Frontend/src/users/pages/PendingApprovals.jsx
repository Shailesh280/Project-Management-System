import { Table, Button, Space } from "antd";
import {
  usePendingUsers,
  useApproveUser,
  useDeclineUser,
} from "../users.hooks";

export default function PendingApprovals() {
  const { data, isLoading } = usePendingUsers();
  const { mutate: approve } = useApproveUser();
  const { mutate: decline } = useDeclineUser();

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => approve(record.id)}
          >
            Approve
          </Button>
          <Button
            danger
            onClick={() => decline(record.id)}
          >
            Decline
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data || []}
      loading={isLoading}
      pagination={{ pageSize: 8 }}
    />
  );
}
