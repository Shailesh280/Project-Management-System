package com.projectmanagement.system.controller;

import com.projectmanagement.system.dto.ticket.CreateTicketRequest;
import com.projectmanagement.system.dto.ticket.TicketDto;
import com.projectmanagement.system.dto.ticket.UpdateTicketStatusRequest;
import com.projectmanagement.system.entity.Ticket;
import com.projectmanagement.system.mapper.TicketMapper;
import com.projectmanagement.system.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @GetMapping
    public List<TicketDto> getAllTickets() {
        return ticketService.getAllTickets()
                .stream()
                .map(TicketMapper::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public TicketDto getTicketById(@PathVariable Long id) {
        Ticket ticket = ticketService.getTicketById(id);
        return TicketMapper.toDto(ticket);
    }

    @PostMapping
    public TicketDto createTicket(@RequestBody CreateTicketRequest request) {
        Ticket ticket = ticketService.createTicket(request);
        return TicketMapper.toDto(ticket);
    }

    @PutMapping("/{id}/status")
    public void updateStatus(
            @PathVariable Long id,
            @RequestBody UpdateTicketStatusRequest request
    ) {
        ticketService.updateTicketStatus(id, request.getTicketStatus());
    }

    @DeleteMapping("/{id}")
    public void deleteTicket(@PathVariable Long id) {
        ticketService.deleteTicket(id);
    }
}
