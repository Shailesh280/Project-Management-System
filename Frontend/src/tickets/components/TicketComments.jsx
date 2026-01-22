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
  onAdd,
  canComment,
  onSelectComment,
}) {
  const [value, setValue] = useState("");

  const formatRelativeTime = (date) => dayjs(date).fromNow();

  // ✅ Always sort newest first
  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // ✅ latest comment BEFORE deployment
  const latestCommentId =
    ticket.status === "DEPLOYED_DONE" ? sortedComments[0]?.id : null;

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={24}>
      {/* COMMENT EDITOR — hidden after deployment */}
      {canComment && (
        <Card>
          <CommentEditor value={value} onChange={setValue} />
          <Button
            type="primary"
            style={{ marginTop: 12 }}
            disabled={!value}
            onClick={() => {
              onAdd(value);
              setValue("");
            }}
          >
            Add Comment
          </Button>
        </Card>
      )}

      {/* RENDER SORTED COMMENTS */}
      {sortedComments.map((item) => {
        const isLastBeforeDeployment = item.id === latestCommentId;

        return (
          <Card
            key={item.id}
            hoverable
            onClick={() => onSelectComment?.(item)}
            style={{
              borderLeft: isLastBeforeDeployment
                ? "5px solid #52c41a"
                : "5px solid #d9d9d9",
              background: isLastBeforeDeployment ? "#e8ffe8" : "#fafafa",
            }}
          >
            {isLastBeforeDeployment && (
              <Tag color="green" style={{ marginBottom: 6 }}>
                Last Update Before Deployment
              </Tag>
            )}

            <Text strong>{item.author.username}</Text>
            <br />
            <Text type="secondary">{formatRelativeTime(item.createdAt)}</Text>

            <div
              style={{ marginTop: 10 }}
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </Card>
        );
      })}
    </Space>
  );
}