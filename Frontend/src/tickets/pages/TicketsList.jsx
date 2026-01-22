import { useState } from "react";
import { Table, Tag, Button, Popconfirm, message } from "antd";
import { useTickets, useDeleteTicket } from "../tickets.hooks";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../auth/AuthContext";
import { getStatusColor, getRowClassByStatus } from "../tickets.utils";

export default function TicketList() {
  const { data: tickets, isLoading } = useTickets();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { mutate: deleteTicket } = useDeleteTicket();

  if (isLoading || !tickets) return null;

  const isAdmin = user?.role === "ADMIN" || user?.role === "ROLE_ADMIN";

  const handleDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Select at least one ticket to delete");
      return;
    }

    await Promise.all(selectedRowKeys.map((id) => deleteTicket(id)));

    message.success("Selected tickets deleted successfully");
    setSelectedRowKeys([]);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
      render: (label) => <Tag color="blue">{label}</Tag>,
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
      render: (user) => user?.username || "—",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link to={`/tickets/${record.id}`} style={{ color: "#1677ff" }}>
          View
        </Link>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>Tickets</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          {isAdmin && (
            <Button type="primary" onClick={() => navigate("/tickets/create")}>
              Create Ticket
            </Button>
          )}

          {isAdmin && selectedRowKeys.length > 0 && (
            <Popconfirm
              title="Delete Selected Tickets?"
              description="This action cannot be undone"
              onConfirm={handleDelete}
              okText="Delete"
              cancelText="Cancel"
            >
              <Button danger>Delete Selected</Button>
            </Popconfirm>
          )}
        </div>
      </div>

      <Table
        dataSource={tickets}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 8 }}
        rowSelection={
          isAdmin
            ? {
                selectedRowKeys,
                onChange: (keys) => setSelectedRowKeys(keys),
              }
            : null
        }
        rowClassName={(record) =>
          getRowClassByStatus(record.status)
        }
      />
    </div>
  );
}
