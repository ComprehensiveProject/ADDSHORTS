package com.project.as.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardDto {
    private String boardTitle;
    private String boardContent;
    private String boardImage;
    private String boardVideo;
    private String boardWriterId;
    private String boardWriteDate;
    private int boardClickCount;
}