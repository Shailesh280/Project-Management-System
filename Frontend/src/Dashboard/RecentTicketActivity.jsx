import { Table, Tag, Empty } from "antd";
import { Link } from "react-router-dom";
import { getStatusColor } from "../tickets/tickets.utils";

const RecentTicketActivity = ({ tickets }) => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      key: "assignedTo",
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date) =>
        new Date(date).toLocaleString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link
          to={`/tickets/${record.id}`}
          className="admin-view-link"
        >
          View
        </Link>
      ),
    },
  ];

  return (
    <div className="admin-recent-table">
      <h3 className="admin-section-title">
        Recent Ticket Activity
      </h3>

      <Table
        columns={columns}
        dataSource={tickets}
        rowKey="id"
        pagination={false}
        locale={{ emptyText: <Empty /> }}
      />
    </div>
  );
};

export default RecentTicketActivity;
