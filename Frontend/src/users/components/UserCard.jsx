import { Card, Avatar, Typography } from "antd";

const { Text } = Typography;

export default function UserCard({ user }) {
  return (
    <Card>
      <Card.Meta
        avatar={<Avatar src={user.displayPicture} />}
        title={user.username}
        description={
          <>
            <Text>{user.email}</Text><br />
            <Text type="secondary">{user.role}</Text>
          </>
        }
      />
    </Card>
  );
}
