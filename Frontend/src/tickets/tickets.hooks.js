import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import api from "../services/apiClient";

import {
  fetchTickets,
  fetchTicketById,
  createTicket,
  updateTicketStatus,
  addComment,
  deleteTicket,
} from "./tickets.api";

export const useTickets = () =>
  useQuery({
    queryKey: ["tickets"],
    queryFn: fetchTickets,
  });

export const useTicket = (id) =>
  useQuery({
    queryKey: ["tickets", id],
    queryFn: () => fetchTicketById(id),
    enabled: !!id,
  });

export const useTicketComments = (ticketId) =>
  useQuery({
    queryKey: ["comments", ticketId],
    queryFn: () =>
      api.get(`/comments/ticket/${ticketId}`).then((res) => res.data),
    enabled: !!ticketId,
  });

export const useCommentDetails = (commentId) =>
  useQuery({
    queryKey: ["commentDetails", commentId],
    queryFn: () =>
      api.get(`/comments/${commentId}/details`).then((res) => res.data),
    enabled: !!commentId,
  });


export const useAddComment = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ ticketId, content }) =>
      addComment({ ticketId, content }),

    onSuccess: (_, { ticketId }) => {
      qc.invalidateQueries(["comments", ticketId]);
      qc.refetchQueries(["comments", ticketId]);   // ← FORCES refresh
    },
  });
};



export const useUpdateTicketStatus = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ticketStatus }) =>
      updateTicketStatus({ id, ticketStatus }),

    onSuccess: (_, { id }) => {
      message.success("Status updated");

      qc.invalidateQueries({ queryKey: ["tickets"] });
      qc.invalidateQueries({ queryKey: ["tickets", id] });
    },
  });
};

export const useCreateTicket = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      message.success("Ticket created");
      qc.invalidateQueries({ queryKey: ["tickets"] });
    },
  });
};

export const useDeleteTicket = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteTicket,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tickets"] });
    },
  });
};
