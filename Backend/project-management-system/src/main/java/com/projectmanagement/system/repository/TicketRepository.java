package com.projectmanagement.system.repository;

import com.projectmanagement.system.entity.Ticket;
import com.projectmanagement.system.entity.enums.TicketStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    List<Ticket> findByAssignedToId(Long userId);

    long countByAssignedToId(Long userId);

    long countByAssignedToIdAndStatus(Long userId, TicketStatus status);

    long countByAssignedToIdAndStatusNot(Long userId, TicketStatus status);
}


