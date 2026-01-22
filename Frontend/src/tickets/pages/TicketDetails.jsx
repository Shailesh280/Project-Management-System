import { Card } from "antd";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../../auth/AuthContext";

import {
  useTicket,
  useUpdateTicketStatus,
  useAddComment,
  useTicketComments
} from "../tickets.hooks";

import TicketStatusSelect from "../components/TicketStatusSelect";
import TicketComments from "../components/TicketComments";
import CommentDetailsModal from "../components/CommentDetailsModal";

import { canUpdateStatus, canComment } from "../tickets.utils";

export default function TicketDetails() {
  const { id } = useParams();
  const { user } = useAuthContext();

  const [selectedComment, setSelectedComment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: ticket, isLoading } = useTicket(id);
  const { data: comments } = useTicketComments(id);

  const { mutate: updateStatus, isLoading: updating } =
    useUpdateTicketStatus();

  // ✅ FIXED — useAddComment no longer requires ticketId here
  const { mutate: addComment } = useAddComment();

  if (isLoading || !ticket) return null;

  return (
    <Card title={ticket.title}>
      <p>{ticket.description}</p>

      {canUpdateStatus({ user, ticket }) && (
        <TicketStatusSelect
          ticket={ticket}
          user={user}
          loading={updating}
          onChange={(status) =>
            updateStatus({ id: ticket.id, ticketStatus: status })
          }
        />
      )}

      <TicketComments
        comments={comments}
        ticket={ticket}   // <-- Add this
        canComment={canComment({ user, ticket })}
        onAdd={(content) => addComment({ ticketId: ticket.id, content })}
        onSelectComment={(comment) => {
          setSelectedComment(comment.id);
          setModalOpen(true);
        }}
/>


      <CommentDetailsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        commentId={selectedComment}
      />

    </Card>
  );
}
