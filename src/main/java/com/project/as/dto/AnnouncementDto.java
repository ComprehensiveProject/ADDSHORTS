package com.project.as.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnnouncementDto {
    private int annoId;
    private String annoTitle;
    private String annoContent;
    private int annoViews;
    private LocalDateTime annoRegist;
}
