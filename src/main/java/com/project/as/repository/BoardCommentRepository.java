package com.project.as.repository;

import com.project.as.entity.BoardCommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardCommentRepository extends JpaRepository<BoardCommentEntity, Integer> {
    List<BoardCommentEntity> findByBoardNumber(int boardNumber);
}
