package com.project.as.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.as.entity.UserInfoEntity;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfoEntity, String> {
    public boolean existsByUserIdAndUserPassword(String userId, String userPassword);
    public UserInfoEntity findByUserId(String userId);
    public boolean existsByUserId(String userId);

}
