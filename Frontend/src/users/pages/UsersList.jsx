import { Table, Button, Space } from "antd";
import { useState } from "react";
import UserStatusTag from "../components/UserStatusTag";
import ChangePasswordModal from "../components/ChangePasswordModal";

import {
  useUsers,
  useDeleteUser,
  useChangeUserPassword,
  useMyProfile,
} from "../users.hooks";

export default function UsersList() {
  const { data: users, isLoading } = useUsers();
  const { data: currentUser } = useMyProfile();
  const { mutate: removeUser } = useDeleteUser();
  const { mutateAsync: changePassword } = useChangeUserPassword();

  const [selectedUser, setSelectedUser] = useState(null);

  const isAdmin = currentUser?.role === "ADMIN";

  const columns = [
    { title: "Username", dataIndex: "username" },
    { title: "Email", dataIndex: "email" },
    { title: "Role", dataIndex: "role" },
    {
      title: "Status",
      render: (_, record) => (
        <UserStatusTag
          status={record.approved ? "APPROVED" : "PENDING"}
        />
      ),
    },
    {
      title: "Action",
      render: (_, record) => {
        if (!isAdmin) return null;

        return (
          <Space>
            {record.role !== "ADMIN" && (
              <Button danger onClick={() => removeUser(record.id)}>
                Remove
              </Button>
            )}

            <Button
              type="primary"
              ghost
              onClick={() => setSelectedUser(record)}
            >
              Change Password
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={users || []}
        loading={isLoading}
        pagination={{ pageSize: 8 }}
      />

      {selectedUser && (
        <ChangePasswordModal
          open
          username={selectedUser.username}
          onClose={() => setSelectedUser(null)}
          onSubmit={(password) =>
            changePassword({
              userId: selectedUser.id,
              password,
            })
          }
        />
      )}
    </>
  );
}
