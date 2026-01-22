package com.projectmanagement.system.controller;

import com.projectmanagement.system.dto.ticket.RecentTicketActivityDto;
import com.projectmanagement.system.entity.User;
import com.projectmanagement.system.security.SecurityUtils;
import com.projectmanagement.system.service.EmployeeDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employee/dashboard")
@RequiredArgsConstructor
@PreAuthorize("hasRole('EMPLOYEE')")
public class EmployeeDashboardController {

    private final EmployeeDashboardService dashboardService;

    @GetMapping("/stats")
    public Map<String, Long> getStats() {
        User user = SecurityUtils.getCurrentUser();
        return dashboardService.getEmployeeStats(user); // ✅ FIXED
    }

    @GetMapping("/recent-tickets")
    public List<RecentTicketActivityDto> getRecentTickets() {
        User user = SecurityUtils.getCurrentUser();
        return dashboardService.getRecentActivity(user); // ✅ FIXED
    }
}
