package com.project.as.controller;

import com.project.as.dto.PatchUserInfoDto;
import com.project.as.dto.PatchUserInfoResponseDto;
import com.project.as.dto.ResponseDto;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserInfoController {
    @PatchMapping("/")
    public ResponseDto<PatchUserInfoResponseDto> patchUser(@RequestBody PatchUserInfoDto requestBody,  @AuthenticationPrincipal String userId){
        return null;
    }
}
