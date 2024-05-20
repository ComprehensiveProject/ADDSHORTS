package com.project.as.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "BoardComment")
@Table(name = "BoardComment")
public class BoardCommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentId;
    private int boardNumber;
    private String commentWriterId;
    private String commentContent;
    private LocalDateTime commentWriteDate;

    @PrePersist
    public void prePersist() {
        this.commentWriteDate = LocalDateTime.now();
    }
}
