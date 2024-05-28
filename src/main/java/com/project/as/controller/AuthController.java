package com.project.as.controller;

import com.project.as.dto.ResponseDto;
import com.project.as.dto.SignInDto;
import com.project.as.dto.SignInResponseDto;
import com.project.as.dto.SignUpDto;
import com.project.as.entity.UserInfoEntity;
import com.project.as.security.TokenProvider;
import com.project.as.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.Console;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthService authService;
    @Autowired
    TokenProvider tokenProvider;
    @PostMapping("/signUp")
    public ResponseDto<?> signUp(@RequestBody SignUpDto requestBody){
        ResponseDto<?> result = authService.signUp(requestBody);
        return result;
    }

    @PostMapping("/signIn")
    public ResponseDto<SignInResponseDto> signIn(@RequestBody SignInDto requestBody){
        ResponseDto<SignInResponseDto> result = authService.signIn(requestBody);
        return result;
    }

    @PostMapping("/checkId")
    public ResponseEntity<?> checkId(@RequestBody Map<String, String> request) {
        boolean isDuplicate = authService.isIdDuplicate(request.get("userId"));
        Map<String, Boolean> response = new HashMap<>();
        response.put("isDuplicate", isDuplicate);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verifyPassword")
    public ResponseEntity<?> verifyPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token"); // 토큰 가져오기

        // 토큰 값이 null이거나 비어 있으면 오류 응답을 반환합니다.
        if (token == null || token.isEmpty()) {
            return ResponseEntity.badRequest().body("Token is missing or empty: " + token);
        }

        String jwtToken = null;
        if (token.contains(" ")) {
            jwtToken = token.split(" ")[1];
        } else {
            jwtToken = token;
        }


        String userEmail = tokenProvider.getIdFromToken(jwtToken); // 토큰에서 이메일 주소 추출
        String userPassword = request.get("password");

        boolean isValid = authService.verifyUserPassword(userEmail, userPassword);

        Map<String, Boolean> response = new HashMap<>();
        response.put("isValid", isValid);
        return ResponseEntity.ok(response);
    }



    @GetMapping("/currentUser")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String token) {
        // Bearer 토큰에서 실제 토큰을 추출합니다.
        String jwtToken = token.split(" ")[1];

        // TokenProvider를 사용하여 토큰에서 이메일을 추출합니다.
        String userEmail = tokenProvider.getIdFromToken(jwtToken);

        UserInfoEntity user = authService.getUserByEmail(userEmail);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/updateUserInfo")
    public ResponseDto<?> updateUserInfo(@RequestBody UserInfoEntity updatedInfo, @RequestHeader("Authorization") String Authorization) {
        String token = Authorization.split(" ")[1];
        String userId = tokenProvider.getIdFromToken(token);
        return authService.updateUserInfo(userId, updatedInfo);
    }

    @GetMapping("/currentUserName")
    public ResponseEntity<?> getCurrentUserName(@RequestHeader("Authorization") String token) {
        String jwtToken = token.split(" ")[1];
        String userEmail = tokenProvider.getIdFromToken(jwtToken);
        UserInfoEntity user = authService.getUserByEmail(userEmail);

        if (user != null) {
            Map<String, String> response = new HashMap<>();
            response.put("name", user.getUserName());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }


}