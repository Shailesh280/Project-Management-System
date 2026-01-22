import { Table, Button, Space, Modal, Form, Input, message } from "antd";
import { useState } from "react";
import UserStatusTag from "../components/UserStatusTag";
import {
  useUsers,
  useDeleteUser,
  useChangeUserPassword,
} from "../users.hooks";

export default function UsersList() {
  const { data, isLoading } = useUsers();
  const { mutate: removeUser } = useDeleteUser();
  const { mutateAsync: changePassword } = useChangeUserPassword();

  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();

  const handleRemove = (id) => {
    removeUser(id);
  };

  const openPasswordModal = (user) => {
    setSelectedUser(user);
    form.resetFields();
    setPasswordModalOpen(true);
  };

  const handleChangePassword = async () => {
    try {
      const values = await form.validateFields();

      await changePassword({
        userId: selectedUser.id,
        password: values.password,
      });

      message.success("Password updated successfully");
      setPasswordModalOpen(false);
    } catch (err) {
      message.error("Failed to update password");
    }
  };

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
      render: (_, record) => (
        <Space>
          {record.role !== "ADMIN" && (
            <Button danger onClick={() => handleRemove(record.id)}>
              Remove
            </Button>
          )}

          <Button
            type="primary"
            ghost
            onClick={() => openPasswordModal(record)}
          >
            Change Password
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data || []}
        loading={isLoading}
        pagination={{ pageSize: 8 }}
      />

      <Modal
        title={`Change Password – ${selectedUser?.username}`}
        open={passwordModalOpen}
        onOk={handleChangePassword}
        onCancel={() => setPasswordModalOpen(false)}
        okText="Update Password"
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="New Password"
            name="password"
            rules={[
              { required: true, message: "Please enter a password" },
              { min: 6, message: "Minimum 6 characters" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirm"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Passwords do not match")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
