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
@Entity(name = "Announcement")
@Table(name = "Announcement")
public class AnnouncementEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int annoId;
    private String annoTitle;
    private String annoContent;
    private int annoViews;
    private LocalDateTime annoRegist;
}
