package com.projectmanagement.system.service;

import com.projectmanagement.system.dto.ticket.RecentTicketActivityDto;
import com.projectmanagement.system.entity.User;
import com.projectmanagement.system.entity.enums.TicketStatus;
import com.projectmanagement.system.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmployeeDashboardService {

    private final TicketRepository ticketRepository;

    public Map<String, Long> getEmployeeStats(User user) {

        Long userId = user.getId();

        // 👤 USER-SPECIFIC
        long myCompleted =
                ticketRepository.countByAssignedToIdAndStatus(
                        userId,
                        TicketStatus.DEPLOYED_DONE
                );

        long myActive =
                ticketRepository.countByAssignedToIdAndStatusNot(
                        userId,
                        TicketStatus.DEPLOYED_DONE
                );

        // 🌍 GLOBAL
        long overallCompleted =
                ticketRepository.countByStatus(
                        TicketStatus.DEPLOYED_DONE
                );

        long overallActive =
                ticketRepository.countByStatusNot(
                        TicketStatus.DEPLOYED_DONE
                );

        return Map.of(
                "myActiveTickets", myActive,
                "myCompletedTickets", myCompleted,
                "overallActiveTickets", overallActive,
                "overallCompletedTickets", overallCompleted
        );
    }

    public List<RecentTicketActivityDto> getRecentActivity(User user) {
        return ticketRepository
                .findTop5ByAssignedToIdOrderByUpdatedAtDesc(user.getId())
                .stream()
                .map(RecentTicketActivityDto::from)
                .toList();
    }
}
