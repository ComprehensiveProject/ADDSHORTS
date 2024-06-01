package com.project.as.service;

import com.project.as.dto.BoardCommentDto;
import com.project.as.entity.BoardCommentEntity;
import com.project.as.repository.BoardCommentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BoardCommentService {

    @Autowired
    private BoardCommentRepository commentRepository;

    public List<BoardCommentEntity> findCommentsByBoardNumber(int boardNumber) {
        return commentRepository.findByBoardNumber(boardNumber);
    }

    @Transactional
    public BoardCommentEntity save(BoardCommentEntity comment) {
        return commentRepository.save(comment);
    }
}
