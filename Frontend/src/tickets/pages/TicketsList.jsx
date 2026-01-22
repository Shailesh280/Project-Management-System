import { useState } from "react";
import { Table, Tag, Button, Popconfirm, message } from "antd";
import { useTickets, useDeleteTicket } from "../tickets.hooks";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../auth/AuthContext";

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

  const deletes = selectedRowKeys.map((id) =>
    deleteTicket(id)
  );

  await Promise.all(deletes);

  message.success("Selected tickets deleted successfully"); // ✅ ONE TOAST

  setSelectedRowKeys([]);
};


  // Table columns
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
        <Tag color={status === "DEPLOYED_DONE" ? "green" : "cyan"}>{status}</Tag>
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
      {/* HEADER WITH BUTTONS */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>Tickets</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          {/* CREATE TICKET – only Admin */}
          {isAdmin && (
            <Button type="primary" onClick={() => navigate("/tickets/create")}>
              Create Ticket
            </Button>
          )}

          {/* DELETE SELECTED – only Admin */}
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

      {/* TABLE */}
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
          record.status === "DEPLOYED_DONE"
            ? "ticket-row-deployed"
            : "ticket-row-normal"
        }
      />
    </div>
  );
}
