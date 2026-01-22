import { Select } from "antd";

const ADMIN_STATUSES = [
  { value: "TODO", label: "Todo" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "PAUSED", label: "Paused" },
  { value: "PR_REVIEW", label: "PR Review" },
  { value: "READY_TO_DEPLOY", label: "Ready To Deploy" },
  { value: "DEPLOYED_DONE", label: "Deployed / Done" },
];

const EMPLOYEE_STATUSES = [
  { value: "TODO", label: "Todo" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "PAUSED", label: "Paused" },
  { value: "PR_REVIEW", label: "PR Review" },
];

export default function TicketStatusSelect({ ticket, user, loading, onChange }) {
  if (!ticket || ticket.status === "DEPLOYED_DONE") return null;

  const options =
    user?.role === "ADMIN"
      ? ADMIN_STATUSES
      : EMPLOYEE_STATUSES;

  return (
    <Select
      value={ticket.status}
      options={options}
      loading={loading}
      onChange={onChange}
      style={{ width: 220, marginBottom: 16 }}
    />
  );
}
