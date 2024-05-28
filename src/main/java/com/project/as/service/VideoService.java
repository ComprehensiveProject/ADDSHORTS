package com.project.as.service;

import com.project.as.config.GcsConfig;
import com.project.as.entity.UserOriginalVideoEntity;
import com.project.as.entity.UserSummaryVideoEntity;
import com.project.as.repository.UserOriginalVideoRepository;
import com.project.as.repository.UserSummaryVideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class VideoService {

    @Autowired
    private UserOriginalVideoRepository videoRepository;

    @Autowired
    private UserSummaryVideoRepository summaryVideoRepository;

    @Autowired
    private GcsConfig gcsConfig;

    public UserOriginalVideoEntity saveVideo(MultipartFile videoFile, String userId) throws IOException {
        // GCS에 영상 파일을 업로드합니다.
        String videoUrl = gcsConfig.uploadFile(videoFile);

        // 데이터베이스에 저장할 비디오 엔티티를 생성합니다.
        UserOriginalVideoEntity videoEntity = UserOriginalVideoEntity.builder()
                .oriUserId(userId)
                .oriVideo(videoUrl)
                .oriSaveDate(LocalDateTime.now())
                .build();

        // 엔티티를 저장합니다.
        return videoRepository.save(videoEntity);
    }

    public UserSummaryVideoEntity saveSummaryVideo(String summaryVideoUrl, int oriNo, String userId) {
        // 데이터베이스에 저장할 요약 비디오 엔티티를 생성합니다.
        UserSummaryVideoEntity summaryVideoEntity = UserSummaryVideoEntity.builder()
                .sumOriNo(oriNo)
                .sumUserId(userId)
                .sumVideo(summaryVideoUrl)
                .sumSaveDate(LocalDateTime.now())
                .build();

        // 엔티티를 저장합니다.
        return summaryVideoRepository.save(summaryVideoEntity);
    }

    public UserOriginalVideoEntity getLatestOriginalVideo(String userId) {
        return videoRepository.findTopByOriUserIdOrderByOriSaveDateDesc(userId);
    }
}