package com.project.as.repository;

import com.project.as.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {

    void deleteByBoardNumber(int boardNumber);

    BoardEntity findByBoardNumber(int boardNumber);
}
