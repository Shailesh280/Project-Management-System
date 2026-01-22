package com.projectmanagement.system.controller;

import com.projectmanagement.system.dto.comment.AddCommentRequest;
import com.projectmanagement.system.dto.comment.CommentDetailsDto;
import com.projectmanagement.system.dto.comment.CommentDto;
import com.projectmanagement.system.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/ticket/{ticketId}")
    public ResponseEntity<List<CommentDto>> getComments(@PathVariable Long ticketId) {
        return ResponseEntity.ok(commentService.getCommentsByTicketId(ticketId));
    }

    @PostMapping
    public ResponseEntity<CommentDto> addComment(@RequestBody AddCommentRequest request) {
        return ResponseEntity.ok(commentService.addComment(request));
    }

    @GetMapping("/{id}/details")
    public ResponseEntity<CommentDetailsDto> getCommentDetails(@PathVariable Long id) {
        return ResponseEntity.ok(commentService.getCommentDetails(id));
    }


}