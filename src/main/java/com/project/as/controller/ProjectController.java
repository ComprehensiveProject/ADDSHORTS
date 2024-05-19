package com.project.as.controller;

import com.project.as.dto.ResponseDto;
import com.project.as.entity.BoardEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/project")
public class ProjectController {
    @GetMapping("/")
    public String getProject(@AuthenticationPrincipal String userId){
        return "로그인된 사용자는 " + userId + "입니다. ";
    }
}
