import { Modal, Typography, Tag, Divider, Space } from "antd";
import { useCommentDetails } from "../tickets.hooks";

const { Title, Text } = Typography;

export default function CommentDetailsModal({ open, onClose, commentId }) {
  // Fetch REAL comment details from backend
  const { data: details, isLoading } = useCommentDetails(commentId);

  if (isLoading || !details) {
    return (
      <Modal open={open} onCancel={onClose} footer={null} centered>
        Loading...
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      title={<Title level={4}>Comment Details</Title>}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Text strong>Comment</Text>
        <div
          style={{ marginLeft: 12 }}
          dangerouslySetInnerHTML={{ __html: details.content }}
        />
      </Space>

      <Divider />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Text strong>Author</Text>
        <div style={{ marginLeft: 12 }}>
          <Text>{details.author.username}</Text>
          <br />
          <Text type="secondary">{details.author.email}</Text>
        </div>
      </Space>

      <Divider />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Text strong>Ticket Info</Text>

        <div style={{ marginLeft: 12 }}>
          <Text strong>Title:</Text> <Text>{details.ticketTitle}</Text>
          <br />

          <Text strong>Label:</Text>{" "}
          <Tag color="blue">{details.ticketLabel}</Tag>
          <br />

          <Text strong>Status:</Text>{" "}
          <Tag color="cyan">{details.ticketStatus}</Tag>
        </div>
      </Space>

      <Divider />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Text strong>Assignment</Text>

        <div style={{ marginLeft: 12 }}>
          <Text strong>Assigned To:</Text>{" "}
          <Text>{details.assignedTo?.username || "None"}</Text>
          <br />

          <Text strong>Created By:</Text>{" "}
          <Text>{details.createdBy.username}</Text>
        </div>
      </Space>

      <Divider />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Text strong>Created At</Text>
        <Text style={{ marginLeft: 12 }}>
          {new Date(details.createdAt).toLocaleString()}
        </Text>
      </Space>
    </Modal>
  );
}
