import { Table, Button } from "antd";
import UserStatusTag from "../components/UserStatusTag";
import { useUsers, useDeleteUser } from "../users.hooks";

export default function UsersList() {
  const { data, isLoading } = useUsers();
  const { mutate: removeUser } = useDeleteUser();

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
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <UserStatusTag
          status={record.approved ? "APPROVED" : "PENDING"}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.role === "EMPLOYEE" ? (
          <Button danger onClick={() => removeUser(record.id)}>
            Remove
          </Button>
        ) : (
          "—"
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
