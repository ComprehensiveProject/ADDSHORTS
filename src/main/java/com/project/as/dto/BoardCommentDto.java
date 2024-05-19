package com.project.as.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardCommentDto {
    private int commentId;
    private int boardNumber;
    private String commentWriterId;
    private String commentContent;
    private LocalDateTime commentWriteDate;
}
