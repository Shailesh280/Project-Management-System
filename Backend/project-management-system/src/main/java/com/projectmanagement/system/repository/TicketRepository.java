package com.projectmanagement.system.repository;

import com.projectmanagement.system.entity.Ticket;
import com.projectmanagement.system.entity.enums.TicketStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    long countByAssignedToIdAndStatus(
            Long userId,
            TicketStatus status
    );

    long countByAssignedToIdAndStatusNot(
            Long userId,
            TicketStatus status
    );

    List<Ticket> findTop5ByAssignedToIdOrderByUpdatedAtDesc(Long userId);


    long countByStatusNot(TicketStatus status);

    long countByStatus(TicketStatus status);

    long countByStatusIn(List<TicketStatus> statuses);

    List<Ticket> findTop5ByOrderByUpdatedAtDesc();
}


