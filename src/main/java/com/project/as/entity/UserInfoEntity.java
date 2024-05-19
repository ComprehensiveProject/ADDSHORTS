package com.project.as.entity;

import com.project.as.dto.SignUpDto;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "UserInfo")
@Table(name = "UserInfo")
public class UserInfoEntity {
    @Id
    private String userId;
    private String userName;
    private String userEmail;
    private String userPassword;
    private String userPhone;
    private String userGender;
    private String userProfile;

    public UserInfoEntity(SignUpDto dto){
        this.userId = dto.getUserId();
        this.userEmail = dto.getUserEmail();
        this.userPassword = dto.getUserPassword();
        this.userName = dto.getUserName();
        this.userPhone = dto.getUserPhone();
        this.userGender = dto.getUserGender();
        this.userProfile = dto.getUserProfile() != null && !dto.getUserProfile().isEmpty()
                ? dto.getUserProfile()
                : "src/main/reactfront/src/assets/images/default_profile.png";

    }
}
