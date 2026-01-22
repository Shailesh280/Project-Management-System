import { TICKET_STATUS } from "./tickets.types";

export const canUpdateStatus = ({ user, ticket }) => {
  if (!user || !ticket) return false;

  if (ticket.status === TICKET_STATUS.DEPLOYED_DONE) return false;

  if (user.role === "ADMIN" || user.role === "ROLE_ADMIN") return true;

  return ticket.assignedTo?.id === user.id;
};

export const getAllowedStatuses = (user, currentStatus) => {
  if (!user) return [];

  if (currentStatus === TICKET_STATUS.DEPLOYED_DONE) return [];

  if (user.role === "ADMIN" || user.role === "ROLE_ADMIN") {
    return Object.values(TICKET_STATUS);
  }

  return Object.values(TICKET_STATUS).filter(
    (status) =>
      status !== TICKET_STATUS.READY_TO_DEPLOY &&
      status !== TICKET_STATUS.DEPLOYED_DONE
  );
};

export function canComment({ user, ticket }) {
  if (!user || !ticket) return false;

  if (ticket.status === "DEPLOYED_DONE") return false;

  const isAdmin =
    user.role === "ADMIN" || user.role === "ROLE_ADMIN";

  if (isAdmin) return true;

  if (!ticket.assignedTo) return false;

  return (
    Number(ticket.assignedTo.id) === Number(user.id)
  );
}

export const getStatusColor = (status) => {
  switch (status) {
    case "DEPLOYED_DONE":
      return "green";
    case "IN_PROGRESS":
      return "blue";
    case "PAUSED":
      return "orange";
    case "PR_REVIEW":
      return "purple";
    case "TODO":
      return "default";
    default:
      return "cyan";
  }
};

export const getRowClassByStatus = (status) => {
  switch (status) {
    case "DEPLOYED_DONE":
      return "ticket-row-deployed";
    case "PAUSED":
      return "ticket-row-paused";
    default:
      return "ticket-row-normal";
  }
};