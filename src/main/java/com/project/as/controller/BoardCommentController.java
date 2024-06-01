package com.project.as.controller;

import com.project.as.dto.BoardCommentDto;
import com.project.as.entity.BoardCommentEntity;
import com.project.as.service.BoardCommentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/board/{boardNumber}")
public class BoardCommentController {

    @Autowired
    private BoardCommentService commentService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("/comments")
    public ResponseEntity<List<BoardCommentDto>> getComments(@PathVariable("boardNumber") int boardNumber) {
        List<BoardCommentEntity> comments = commentService.findCommentsByBoardNumber(boardNumber);
        List<BoardCommentDto> commentDtos = comments.stream()
                .map(comment -> modelMapper.map(comment, BoardCommentDto.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(commentDtos);
    }

    @PostMapping("/comments")
    public ResponseEntity<BoardCommentDto> addComment(@PathVariable("boardNumber") int boardNumber, @RequestBody BoardCommentDto commentDto) {
        commentDto.setBoardNumber(boardNumber);
        BoardCommentEntity comment = modelMapper.map(commentDto, BoardCommentEntity.class);
        BoardCommentEntity savedComment = commentService.save(comment);
        BoardCommentDto savedCommentDto = modelMapper.map(savedComment, BoardCommentDto.class);
        return ResponseEntity.ok(savedCommentDto);
    }
}
