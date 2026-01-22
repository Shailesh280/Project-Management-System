import { Button, Typography, Card, Space, Tag } from "antd";
import { useState } from "react";
import CommentEditor from "./CommentEditor";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
const { Text } = Typography;

export default function TicketComments({
  comments = [],
  ticket,
  canComment,
  onAdd,
  onSelectComment,
}) {
  const [value, setValue] = useState("");

  // ⛔️ SAFETY GUARD — prevents crash
  if (!ticket) return null;

  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const latestCommentId =
    ticket.status === "DEPLOYED_DONE"
      ? sortedComments[0]?.id
      : null;

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={24}>
      {/* COMMENT EDITOR */}
      {canComment === true && (
        <Card>
          <CommentEditor value={value} onChange={setValue} />
          <Button
            type="primary"
            style={{ marginTop: 12 }}
            disabled={!value.trim()}
            onClick={() => {
              onAdd(value.trim());
              setValue("");
            }}
          >
            Add Comment
          </Button>
        </Card>
      )}

      {/* COMMENTS LIST */}
      {sortedComments.map((item) => {
        const isLastBeforeDeployment =
          item.id === latestCommentId;

        return (
          <Card
            key={item.id}
            hoverable
            onClick={() => onSelectComment?.(item)}
            style={{
              borderLeft: isLastBeforeDeployment
                ? "5px solid #52c41a"
                : "5px solid #d9d9d9",
            }}
          >
            {isLastBeforeDeployment && (
              <Tag color="green">Last Update Before Deployment</Tag>
            )}

            <Text strong>{item.author.username}</Text>
            <br />
            <Text type="secondary">
              {dayjs(item.createdAt).fromNow()}
            </Text>

            <div
              style={{ marginTop: 10 }}
              dangerouslySetInnerHTML={{
                __html: item.content,
              }}
            />
          </Card>
        );
      })}
    </Space>
  );
}
