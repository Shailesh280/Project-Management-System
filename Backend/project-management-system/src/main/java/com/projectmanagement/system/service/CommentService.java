package com.projectmanagement.system.service;

import com.projectmanagement.system.dto.comment.AddCommentRequest;
import com.projectmanagement.system.dto.comment.CommentDetailsDto;
import com.projectmanagement.system.dto.comment.CommentDto;
import com.projectmanagement.system.dto.user.UserSummary;
import com.projectmanagement.system.entity.Comment;
import com.projectmanagement.system.entity.enums.Role;
import com.projectmanagement.system.entity.Ticket;
import com.projectmanagement.system.entity.User;
import com.projectmanagement.system.exception.ResourceNotFoundException;
import com.projectmanagement.system.exception.UnauthorizedException;
import com.projectmanagement.system.mapper.CommentMapper;
import com.projectmanagement.system.repository.CommentRepository;
import com.projectmanagement.system.repository.TicketRepository;
import com.projectmanagement.system.repository.UserRepository;
import com.projectmanagement.system.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    public List<CommentDto> getCommentsByTicketId(Long ticketId) {
        return commentRepository.findByTicketIdOrderByCreatedAtAsc(ticketId)
                .stream()
                .map(CommentMapper::toDto)
                .toList();
    }
    public CommentDetailsDto getCommentDetails(Long commentId) {

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found"));

        Ticket ticket = comment.getTicket();

        return CommentDetailsDto.builder()
                .commentId(comment.getId())
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .author(UserSummary.builder()
                        .id(comment.getAuthor().getId())
                        .username(comment.getAuthor().getUsername())
                        .email(comment.getAuthor().getEmail())
                        .build()
                )
                .ticketId(ticket.getId())
                .ticketTitle(ticket.getTitle())
                .ticketLabel(ticket.getLabel().name())
                .ticketStatus(comment.getTicketStatus())
                .assignedTo(
                        ticket.getAssignedTo() == null ? null :
                                UserSummary.builder()
                                        .id(ticket.getAssignedTo().getId())
                                        .username(ticket.getAssignedTo().getUsername())
                                        .email(ticket.getAssignedTo().getEmail())
                                        .build()
                )
                .createdBy(
                        UserSummary.builder()
                                .id(ticket.getCreatedBy().getId())
                                .username(ticket.getCreatedBy().getUsername())
                                .email(ticket.getCreatedBy().getEmail())
                                .build()
                )
                .build();
    }


    public CommentDto addComment(AddCommentRequest request) {

        User currentUser = SecurityUtils.getCurrentUser();

        System.out.println(">>> [DEBUG] Logged-in user ID = " + currentUser.getId());
        System.out.println(">>> [DEBUG] Logged-in username = " + currentUser.getUsername());
        System.out.println(">>> [DEBUG] Logged-in role = " + currentUser.getRole());

        Ticket ticket = ticketRepository.findById(request.getTicketId())
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found"));

        System.out.println(">>> [DEBUG] Ticket ID = " + ticket.getId());
        System.out.println(">>> [DEBUG] Ticket createdBy ID = " + ticket.getCreatedBy().getId());

        if (ticket.getAssignedTo() == null) {
            System.out.println(">>> [DEBUG] Ticket assignedTo = NULL");
        } else {
            System.out.println(">>> [DEBUG] Ticket assignedTo ID = " + ticket.getAssignedTo().getId());
            System.out.println(">>> [DEBUG] Ticket assignedTo username = " + ticket.getAssignedTo().getUsername());
        }

        boolean isCreator = ticket.getCreatedBy().getId().equals(currentUser.getId());
        boolean isAssigned = ticket.getAssignedTo() != null &&
                ticket.getAssignedTo().getId().equals(currentUser.getId());
        boolean isAdmin = currentUser.getRole() == Role.ADMIN;

        System.out.println(">>> [DEBUG] isCreator = " + isCreator);
        System.out.println(">>> [DEBUG] isAssigned = " + isAssigned);
        System.out.println(">>> [DEBUG] isAdmin = " + isAdmin);

        if (!isCreator && !isAssigned && !isAdmin) {
            System.out.println(">>> [DEBUG] COMMENT BLOCKED");
            throw new UnauthorizedException("You are not authorized to comment on this ticket");
        }

        System.out.println(">>> [DEBUG] COMMENT AUTHORIZED");

        Comment comment = new Comment();
        comment.setContent(request.getContent());
        comment.setCreatedAt(LocalDateTime.now());
        comment.setAuthor(currentUser);
        comment.setTicket(ticket);
        comment.setTicketStatus(ticket.getStatus().name());

        Comment saved = commentRepository.save(comment);
        System.out.println(">>> [DEBUG] Comment saved with ID = " + saved.getId());

        return CommentMapper.toDto(saved);
    }

}
