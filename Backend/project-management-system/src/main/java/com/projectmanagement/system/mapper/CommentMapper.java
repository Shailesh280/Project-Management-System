package com.projectmanagement.system.mapper;

import com.projectmanagement.system.dto.comment.CommentDto;
import com.projectmanagement.system.dto.user.UserSummary;
import com.projectmanagement.system.entity.Comment;

public class CommentMapper {

    public static CommentDto toDto(Comment comment) {
        return CommentDto.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .ticketStatus(comment.getTicketStatus())
                .author(
                        UserSummary.builder()
                                .id(comment.getAuthor().getId())
                                .username(comment.getAuthor().getUsername())
                                .email(comment.getAuthor().getEmail())
                                .build()
                )
                .build();
    }
}

