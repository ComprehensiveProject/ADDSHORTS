package com.project.as.controller;

import com.project.as.dto.ResponseDto;
import com.project.as.entity.UserOriginalVideoEntity;
import com.project.as.entity.UserSummaryVideoEntity;
import com.project.as.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @PostMapping("/uploadOriginal")
    public ResponseEntity<ResponseDto<?>> uploadVideo(
            @RequestParam("video") MultipartFile videoFile,
            @RequestParam("userId") String userId) {

        try {
            UserOriginalVideoEntity savedVideo = videoService.saveVideo(videoFile, userId);
            return ResponseEntity.ok(ResponseDto.setSuccess("Video uploaded successfully", savedVideo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ResponseDto.setFailed("Failed to upload video"));
        }
    }

    @PostMapping("/uploadSummary")
    public ResponseEntity<ResponseDto<?>> uploadSummaryVideo(
            @RequestParam("summaryVideoUrl") String summaryVideoUrl,
            @RequestParam("oriNo") int oriNo,
            @RequestParam("userId") String userId) {

        try {
            // 요약 영상을 저장합니다.
            UserSummaryVideoEntity savedSummaryVideo = videoService.saveSummaryVideo(summaryVideoUrl, oriNo, userId);
            return ResponseEntity.ok(ResponseDto.setSuccess("Summary video uploaded successfully", savedSummaryVideo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ResponseDto.setFailed("Failed to upload summary video"));
        }
    }
    @GetMapping("/latestOriginal")
    public ResponseEntity<ResponseDto<?>> getLatestOriginalVideo(@RequestParam("userId") String userId) {
        try {
            UserOriginalVideoEntity latestVideo = videoService.getLatestOriginalVideo(userId);
            return ResponseEntity.ok(ResponseDto.setSuccess("Latest original video fetched successfully", latestVideo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ResponseDto.setFailed("Failed to fetch latest original video"));
        }
    }

}