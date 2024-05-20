package com.project.as.service;

import com.project.as.dto.ResponseDto;
import com.project.as.dto.SignInDto;
import com.project.as.dto.SignInResponseDto;
import com.project.as.dto.SignUpDto;
import com.project.as.entity.UserInfoEntity;
import com.project.as.repository.UserInfoRepository;
import com.project.as.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    UserInfoRepository userRepository;
    @Autowired
    TokenProvider tokenProvider;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    public ResponseDto<?> signUp(SignUpDto dto){
        String userId = dto.getUserId();
        String userPassword = dto.getUserPassword();
        String userPasswordCheck = dto.getUserPasswordCheck();

        try{
            // Id 중복 확인
            if(userRepository.existsById(userId)){
                return ResponseDto.setFailed("Existed Id");
            }
        }catch (Exception e){
            return ResponseDto.setFailed("Database Error");
        }

        if(!userPassword.equals(userPasswordCheck)){
            return ResponseDto.setFailed("Password does not matched");
        }

        // UserEntity 생성
        UserInfoEntity userEntity = new UserInfoEntity(dto);
        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(userPassword);
        userEntity.setUserPassword(encodedPassword);

        try{
            // UserRepository를 이용해서 데이터베이스에 Entity 저장
            userRepository.save(userEntity);
        }catch (Exception e){
            return ResponseDto.setFailed("Database Error");
        }

        // 성공시 success response 반환
        return ResponseDto.setSuccess("Sign Up Success", null);
    }

    public ResponseDto<SignInResponseDto> signIn(SignInDto dto){
        String userId = dto.getUserId();
        String userPassword = dto.getUserPassword();

        UserInfoEntity userEntity = null;
        try {
            userEntity = userRepository.findByUserId(userId);
            // 잘못된 이메일
            if(userEntity == null){
                return ResponseDto.setFailed("Sign In Failed");
            }
            // 잘못된 비밀번호
            if(!passwordEncoder.matches(userPassword, userEntity.getUserPassword())){
                return ResponseDto.setFailed("Sign In Failed");
            }
        }catch (Exception e){
            return ResponseDto.setFailed("Database Error");
        }
        userEntity.setUserPassword("");

        String token = tokenProvider.create(userId);
        int exprTime = 3600000;

        SignInResponseDto signInResponseDto = new SignInResponseDto(token, exprTime, userEntity);
        return ResponseDto.setSuccess("Sign In Success", signInResponseDto);
    }

    public boolean isIdDuplicate(String userId) {
        return userRepository.existsByUserId(userId);
    }

    public boolean verifyUserPassword(String userId, String userPassword) {
        UserInfoEntity userEntity = userRepository.findByUserId(userId);
        if (userEntity != null) {
            return passwordEncoder.matches(userPassword, userEntity.getUserPassword());
        }
        return false;
    }

    public UserInfoEntity getUserByEmail(String userId) {
        return userRepository.findByUserId(userId);
    }

    public ResponseDto<?> updateUserInfo(String userId, UserInfoEntity updatedInfo) {
        try {
            // 기존 사용자 정보 불러오기
            UserInfoEntity currentUser = userRepository.findByUserId(userId);

            // 사용자 정보가 없으면 오류 반환
            if (currentUser == null) {
                return ResponseDto.setFailed("User not found");
            }

            // 수정된 정보 반영
            currentUser.setUserName(updatedInfo.getUserName());
            currentUser.setUserPhone(updatedInfo.getUserPhone());
            currentUser.setUserProfile(updatedInfo.getUserProfile());
            currentUser.setUserName(updatedInfo.getUserName());


            // 데이터베이스에 저장
            userRepository.save(currentUser);

            return ResponseDto.setSuccess("User info updated successfully", null);

        } catch (Exception e) {
            return ResponseDto.setFailed("Database Error");
        }
    }

}
