package com.projectmanagement.system.controller;

import com.projectmanagement.system.dto.ticket.RecentTicketActivityDto;
import com.projectmanagement.system.entity.enums.TicketStatus;
import com.projectmanagement.system.repository.TicketRepository;
import com.projectmanagement.system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminDashboardController {

    private final UserRepository userRepository;
    private final TicketRepository ticketRepository;

    @GetMapping("/stats")
    public Map<String, Long> getDashboardStats() {

        long totalUsers = userRepository.count();
        long pendingApprovals = userRepository.countByApprovedFalse();
        long deployedTickets =
                ticketRepository.countByStatus(TicketStatus.DEPLOYED_DONE);
        long activeTickets =
                ticketRepository.countByStatusIn(
                        List.of(
                                TicketStatus.TODO,
                                TicketStatus.IN_PROGRESS,
                                TicketStatus.PAUSED,
                                TicketStatus.PR_REVIEW
                        )
                );

        return Map.of(
                "totalUsers", totalUsers,
                "pendingApprovals", pendingApprovals,
                "deployedTickets", deployedTickets,
                "activeTickets", activeTickets
        );
    }

    @GetMapping("/recent-tickets")
    public List<RecentTicketActivityDto> getRecentTickets() {
        return ticketRepository
                .findTop5ByOrderByUpdatedAtDesc()
                .stream()
                .map(RecentTicketActivityDto::from)
                .toList();
    }
}
