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
