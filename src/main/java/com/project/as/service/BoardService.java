package com.project.as.service;

import com.project.as.dto.BoardDto;
import com.project.as.entity.BoardEntity;
import com.project.as.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    public List<BoardEntity> getAllBoards() {
        return boardRepository.findAll();
    }

    public Optional<BoardEntity> getBoardByBoardNumber(int boardNumber) {
        return boardRepository.findById(boardNumber);
    }

    public BoardEntity saveBoard(BoardEntity board) {
        return boardRepository.save(board);
    }

    public void deleteBoard(int boardNumber) {
        boardRepository.deleteByBoardNumber(boardNumber);
    }

    public void createPost(BoardDto boardDto) {
        BoardEntity board = new BoardEntity();
        board.setBoardTitle(boardDto.getBoardTitle());
        board.setBoardContent(boardDto.getBoardContent());
        board.setBoardWriterId(boardDto.getBoardWriterId());
        board.setBoardWriteDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))); // 현재 시간 설정
        board.setBoardImage(boardDto.getBoardImage());
        board.setBoardVideo(boardDto.getBoardVideo());
        boardRepository.save(board);
    }

    public void incrementViewCount(int boardNumber) {
        BoardEntity board = boardRepository.findByBoardNumber(boardNumber);
        board.setBoardClickCount(board.getBoardClickCount() + 1);
        boardRepository.save(board);
    }


}
