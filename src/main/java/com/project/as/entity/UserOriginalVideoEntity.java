package com.project.as.entity;

import com.project.as.dto.SignUpDto;
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
@Entity(name = "UserOriginalVideo")
@Table(name = "UserOriginalVideo")
public class UserOriginalVideoEntity {
    @Id
    private int oriNo;
    private String oriUserId;
    private String oriVideo;
    private LocalDateTime oriSaveDate;
}
