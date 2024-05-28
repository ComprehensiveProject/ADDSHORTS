package com.project.as.repository;

import com.project.as.entity.UserOriginalVideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserOriginalVideoRepository extends JpaRepository<UserOriginalVideoEntity, Integer> {
    UserOriginalVideoEntity findTopByOriUserIdOrderByOriSaveDateDesc(String userId);
}