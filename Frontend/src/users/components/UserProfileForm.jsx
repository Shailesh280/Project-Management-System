import { Button, Form, Input, Card } from "antd";

export default function UserProfileForm({ initialValues, onSubmit, loading }) {
  return (
    <Card title="My Profile">
      <Form layout="vertical" initialValues={initialValues} onFinish={onSubmit}>
        <Form.Item label="Username" name="username">
          <Input />
        </Form.Item>

        <Form.Item label="Display Picture URL" name="displayPicture">
          <Input />
        </Form.Item>

        <Form.Item label="Bio" name="bio">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading}>
          Update Profile
        </Button>
      </Form>
    </Card>
  );
}
