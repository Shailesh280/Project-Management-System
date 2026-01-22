package com.projectmanagement.system.repository;

import com.projectmanagement.system.entity.Ticket;
import com.projectmanagement.system.entity.enums.TicketLabel;
import com.projectmanagement.system.entity.enums.TicketStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface TicketRepository
        extends JpaRepository<Ticket, Long>, JpaSpecificationExecutor<Ticket> {

    List<Ticket> findByCreatedById(Long userId);

    List<Ticket> findByAssignedToId(Long userId);

    List<Ticket> findByStatus(TicketStatus status);

    List<Ticket> findByLabel(TicketLabel label);
}
