package com.project.as.dto;

import com.project.as.entity.UserInfoEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatchUserInfoResponseDto {
    private UserInfoEntity user;
}
