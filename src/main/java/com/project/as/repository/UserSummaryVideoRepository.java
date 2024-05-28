package com.project.as.repository;

import com.project.as.entity.UserSummaryVideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSummaryVideoRepository extends JpaRepository<UserSummaryVideoEntity, Integer> {
}