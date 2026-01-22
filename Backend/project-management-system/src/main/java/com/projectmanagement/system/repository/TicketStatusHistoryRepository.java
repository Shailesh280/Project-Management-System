package com.projectmanagement.system.repository;

import com.projectmanagement.system.entity.TicketStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketStatusHistoryRepository
        extends JpaRepository<TicketStatusHistory, Long> {
}
