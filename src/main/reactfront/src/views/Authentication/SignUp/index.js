import React, {useEffect, useState} from "react";
import axios from "axios";
import {Box, Button, Card, FormControl, InputLabel, Select, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {signUpApi} from "../../../apis";
import MenuItem from "@mui/material/MenuItem";

export default function SignUp({setAuthView}){
    const Purple4th = '#999aae';
    const [userId, setUserId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordCheck, setUserPasswordCheck] = useState('');
    const [userName, setUserName] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userProfile, setUserProfile] = useState('');
    const defaultProfilePic = "../../../assets/images/default_profile.png";

    // 유효성 검사 상태 추가
    const [validationErrors, setValidationErrors] = useState({});
    const [isIdValid, setIsIdValid] = useState(null);
    const [isIdChecked, setIsIdChecked] = useState(false);

    const validateForm = () => {
        let errors = {};

        // 이메일 유효성 검사
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(userEmail)) {
            errors.userEmail = "올바른 이메일 주소를 입력해주세요.";
        }

        // 비밀번호 유효성 검사
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,12}$/;
        if (!passwordPattern.test(userPassword)) {
            errors.userPassword = "비밀번호는 4~12자의 영문 대소문자, 숫자로만 입력해야 합니다.";
        }

        // 비밀번호 확인 검사
        if (userPassword !== userPasswordCheck) {
            errors.userPasswordCheck = "비밀번호가 일치하지 않습니다.";
        }

        // 이름 유효성 검사
        const namePattern = /^[가-힣]{2,4}$/;
        if (!namePattern.test(userName)) {
            errors.userName = "이름이 올바르지 않습니다.";
        }

        // 휴대폰 번호 유효성 검사
        const phonePattern = /^[0-9]{10,11}$/;
        if (!phonePattern.test(userPhone)) {
            errors.userPhoneNumber = "올바른 휴대폰 번호를 입력해주세요.";
        }

        // 닉네임 유효성 검사
        if (!userId) {
            errors.userId = "아이디를 입력해주세요.";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const checkIdDuplicate = async () => {
        const response = await axios.post('/api/auth/checkId', { userId });
        setIsIdChecked(true);
        if (response.data.isDuplicate) {
            alert('아이디가 이미 사용 중입니다.');
            setIsIdValid(false);
        } else {
            alert('사용 가능한 아이디입니다.');
            setIsIdValid(true);
        }
    }

    const signUpHandler = async () => {

        if (!validateForm()) return;
        if (!isIdValid) {
            return;
        }

        const data = {
            userId,
            userEmail,
            userPassword,
            userPasswordCheck,
            userGender,
            userName,
            userPhone,
            userProfile: ''
        }

        const signUpResponse = await signUpApi(data);
        if(!signUpResponse){
            alert("회원가입 실패1");
            return;
        }

        if(!signUpResponse.result){
            alert("회원가입 실패2");
            return;
        }
        alert("회원가입 성공");
        setAuthView(false);
    }

    return (
        <Box sx={{
            position: 'absolute', top: 0, left: 0, width: "100%", height: "100%", backgroundColor: Purple4th,
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 3
        }}>
            <Typography variant="h6" gutterBottom>회원가입</Typography>
            <TextField fullWidth label="이메일 주소" type="email" variant="outlined" sx={{ mb: 2 }}
                       error={!!validationErrors.userEmail}
                       helperText={validationErrors.userEmail}
                       onChange={(e) => setUserEmail(e.target.value)}
            />
            <TextField fullWidth label="비밀번호" type="password" variant="outlined" sx={{ mb: 2 }}
                       error={!!validationErrors.userPassword}
                       helperText={validationErrors.userPassword}
                       onChange={(e) => setUserPassword(e.target.value)}
            />
            <TextField fullWidth label="비밀번호 확인" type="password" variant="outlined" sx={{ mb: 2 }}
                       error={!!validationErrors.userPasswordCheck}
                       helperText={validationErrors.userPasswordCheck}
                       onChange={(e) => setUserPasswordCheck(e.target.value)}
            />
            <TextField fullWidth label="이름" variant="outlined" sx={{ mb: 2 }}
                       error={!!validationErrors.userName}
                       helperText={validationErrors.userName}
                       onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
                fullWidth
                label="아이디"
                variant="outlined"
                sx={{ mb: 1 }}
                error={!!validationErrors.userId}
                helperText={validationErrors.userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <Button variant="outlined" onClick={checkIdDuplicate} sx={{ mb: 2 }}>아이디 중복 검사</Button>
            <TextField fullWidth label="휴대폰 번호" variant="outlined" sx={{ mb: 2 }}
                       error={!!validationErrors.userPhoneNumber}
                       helperText={validationErrors.userPhoneNumber}
                       onChange={(e) => setUserPhone(e.target.value)}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="gender-label">성별</InputLabel>
                <Select
                    labelId="gender-label"
                    id="gender-select"
                    value={userGender}
                    label="성별"
                    onChange={(e) => setUserGender(e.target.value)}
                >
                    <MenuItem value="none" disabled>선택하세요</MenuItem>
                    <MenuItem value="male">남자</MenuItem>
                    <MenuItem value="female">여자</MenuItem>
                    <MenuItem value="other">기타</MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained" onClick={signUpHandler} sx={{ mt: 2 }}>회원가입</Button>
            <Button variant="text" onClick={() => setAuthView(false)} sx={{ mt: 1 }}>로그인 화면으로</Button>
        </Box>
    );
}