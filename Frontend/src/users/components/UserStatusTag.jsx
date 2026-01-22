import { Tag } from "antd";

export default function UserStatusTag({ status }) {
  const colorMap = {
    ACTIVE: "green",
    PENDING: "orange",
    DECLINED: "red",
  };

  return <Tag color={colorMap[status]}>{status}</Tag>;
}
