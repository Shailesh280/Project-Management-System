import { Modal, Form, Input, message } from "antd";

export default function ChangePasswordModal({
  open,
  onClose,
  onSubmit,
  username,
}) {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      await onSubmit(values.password);

      message.success("Password updated successfully");
      form.resetFields();
      onClose();
    } catch {
      message.error("Failed to update password");
    }
  };

  return (
    <Modal
      title={`Change Password – ${username}`}
      open={open}
      onOk={handleOk}
      onCancel={onClose}
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
  );
}
