import { Button, Form, Input, Card, Space, message } from "antd";
import { useEffect, useState } from "react";
import api from "../../services/apiClient";
import ChangePasswordModal from "./ChangePasswordModal";

export default function UserProfileForm({
  initialValues,
  onSubmit,
  loading,
  onChangePassword,
}) {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [form] = Form.useForm();

  const displayPicture = Form.useWatch("displayPicture", form);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleProfileSubmit = async (values) => {
    try {
      await onSubmit(values);
      message.success("Profile updated successfully");
    } catch {
      message.error("Failed to update profile");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post(
        "/users/me/profile-picture",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      form.setFieldValue("displayPicture", res.data);

      message.success("Profile picture uploaded");
    } catch {
      message.error("Image upload failed");
    }
  };

  const profileImageUrl = displayPicture
    ? `http://localhost:8080/uploads/${displayPicture}`
    : "/default-avatar.png";

  return (
    <Card title="My Profile">
      <div style={{ marginBottom: 16 }}>
        <img
          src={profileImageUrl}
          alt="Profile"
          onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            objectFit: "cover",
            display: "block",
            marginBottom: 8,
          }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleProfileSubmit}
      >
        <Form.Item label="Username" name="username">
          <Input disabled />
        </Form.Item>

        <Form.Item name="displayPicture" hidden>
          <Input />
        </Form.Item>

        <Form.Item label="Bio" name="bio">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Profile
          </Button>

          <Button onClick={() => setShowPasswordModal(true)}>
            Change Password
          </Button>
        </Space>
      </Form>

      {showPasswordModal && (
        <ChangePasswordModal
          open
          username={initialValues?.username}
          onClose={() => setShowPasswordModal(false)}
          onSubmit={onChangePassword}
        />
      )}
    </Card>
  );
}
