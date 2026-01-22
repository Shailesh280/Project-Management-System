package com.projectmanagement.system.service;

import com.projectmanagement.system.dto.ticket.CreateTicketRequest;
import com.projectmanagement.system.entity.Ticket;
import com.projectmanagement.system.entity.TicketStatusHistory;
import com.projectmanagement.system.entity.User;
import com.projectmanagement.system.entity.enums.Role;
import com.projectmanagement.system.entity.enums.TicketStatus;
import com.projectmanagement.system.exception.AccessDeniedException;
import com.projectmanagement.system.exception.ResourceNotFoundException;
import com.projectmanagement.system.repository.TicketRepository;
import com.projectmanagement.system.repository.TicketStatusHistoryRepository;
import com.projectmanagement.system.repository.UserRepository;
import com.projectmanagement.system.security.SecurityUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final TicketStatusHistoryRepository ticketStatusHistoryRepository;
    private final UserRepository userRepository;

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket getTicketById(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found"));
    }

    public Ticket createTicket(CreateTicketRequest request) {
        User currentUser = SecurityUtils.getCurrentUser();

        if (currentUser.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("Only admins can create tickets");
        }

        User assignedTo = userRepository.findById(request.getAssignedToUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Assigned user not found"));

        Ticket ticket = Ticket.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .label(request.getLabel())
                .status(TicketStatus.TODO)
                .assignedTo(assignedTo)
                .createdBy(currentUser)
                .createdAt(LocalDateTime.now())
                .build();

        return ticketRepository.save(ticket);
    }

    @Transactional
    public void updateTicketStatus(Long ticketId, TicketStatus newStatus) {

        User currentUser = SecurityUtils.getCurrentUser();

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found"));

        if (ticket.getStatus() == newStatus) {
            return;
        }

        ticket.setStatus(newStatus);

        TicketStatusHistory history = TicketStatusHistory.builder()
                .ticket(ticket)
                .newStatus(newStatus)
                .updatedBy(currentUser)
                .build();

        ticketStatusHistoryRepository.save(history);
    }



    public void deleteTicket(Long ticketId) {
        User currentUser = SecurityUtils.getCurrentUser();

        if (currentUser.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("Only admins can delete tickets");
        }

        Ticket ticket = getTicketById(ticketId);
        ticketRepository.delete(ticket);
    }
}
