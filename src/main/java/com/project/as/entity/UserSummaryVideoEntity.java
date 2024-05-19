package com.project.as.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "UserSummaryVideo")
@Table(name = "UserSummaryVideo")
public class UserSummaryVideoEntity {
    @Id
    private int sumNo;
    private int sumOriNo;
    private String sumUserId;
    private String sumVideo;
    private LocalDateTime sumSaveDate;
}
