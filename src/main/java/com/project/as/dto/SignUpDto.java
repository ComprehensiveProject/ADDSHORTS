package com.project.as.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpDto {
    private String userId;
    private String userName;
    private String userEmail;
    private String userPassword;
    private String userPasswordCheck;
    private String userPhone;
    private String userGender;
    private String userProfile;
}
