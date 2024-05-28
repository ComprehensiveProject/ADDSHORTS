import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Avatar, Container } from '@mui/material';
import { useCookies } from "react-cookie";
import {useNavigate} from "react-router-dom";
import Navigation from "../Navigation";

export default function MemberChange() {
    const [isVerified, setIsVerified] = useState(false);
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [cookies] = useCookies(['token']);
    const [userProfile, setUserProfile] = useState(null);
    const [userProfilePreview, setUserProfilePreview] = useState(null);
    const navigate = useNavigate();

    const [user, setUser] = useState({
        userEmail: '',
        userName: '',
        userPhone: ''
    });

    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            const token = cookies.token;

            if (token) {
                try {
                    const userDetails = await axios.get('/api/auth/currentUser', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(userDetails.data);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        fetchUserData();
    }, [cookies.token]);

    const validateForm = () => {
        let errors = {};

        const namePattern = /^[가-힣]{2,4}$/;
        if (!namePattern.test(user.userName)) {
            errors.userName = "이름이 올바르지 않습니다.";
        }

        const phonePattern = /^[0-9]{10,11}$/;
        if (!phonePattern.test(user.userPhone)) {
            errors.userPhone = "올바른 휴대폰 번호를 입력해주세요.";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handlePasswordVerification = async () => {
        try {
            const token = cookies.token;
            if (!token) {
                setErrorMessage('Token not found. Please log in again.');
                return;
            }
            const response = await axios.post('/api/auth/verifyPassword', { password, token });
            if (response.data.isValid) {
                setIsVerified(true);
                const userDetails = await axios.get('/api/auth/currentUser', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(userDetails.data);
            } else {
                setErrorMessage('비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let selectedFile = e.target.files[0];

            // 파일 객체를 userProfile 상태에 저장
            setUserProfile(selectedFile);

            // 이미지 프리뷰를 위해 FileReader를 사용
            let reader = new FileReader();
            reader.onload = (event) => {
                setUserProfilePreview(event.target.result);
            }
            reader.readAsDataURL(selectedFile);
        }
    };


    const uploadProfileImageToServer = async (imageFile) => {
        const formData = new FormData();
        formData.append('profileImage', imageFile);

        try {
            const response = await axios.post('/api/uploadProfileImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data && response.data.imageUrl) {
                return response.data.imageUrl;
            }
            console.error("Error from server:", response.data);
        } catch (error) {
            console.error("Error uploading the image:", error.response.data);
        }
    };



    const handleUpdate = async () => {
        if (!validateForm()) return;

        let updatedUser = { ...user };

        if (userProfile) {
            console.error("userProfile:", userProfile);
            const imageUrl = await uploadProfileImageToServer(userProfile);
            console.error("imageUrl:", imageUrl);
            if (imageUrl) {
                updatedUser.userProfile = imageUrl;
            }
        }

        try {
            const token = cookies.token;
            const response = await axios.post('/api/auth/updateUserInfo', updatedUser, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);

            if (response.data.result) {
                alert("사용자 정보가 성공적으로 수정되었습니다.");
                navigate('/main');
                window.location.reload();
            } else {
                alert("사용자 정보 수정 중 오류가 발생했습니다.");
            }
        } catch (error) {
            alert("사용자 정보 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    if (!isVerified) {
        return (
            <div>
                <Navigation/>
                <Container
                    maxWidth="xs"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                        backgroundColor: '#f4f4f8',
                        padding: 3
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{ marginBottom: 2 }}
                    >
                        비밀번호 확인
                    </Typography>
                    <TextField
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ marginBottom: 1 }}
                    />
                    {errorMessage && <Typography color="error" sx={{ marginBottom: 2 }}>{errorMessage}</Typography>}
                    <Button
                        sx={{
                            backgroundColor: '#3f51b5',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#303f9f'
                            }
                        }}
                        onClick={handlePasswordVerification}
                    >
                        확인
                    </Button>
                </Container>
            </div>
        );
    }

    return (
        <div>
            <Navigation/>
            <Container maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Avatar className="user-avatar" src={userProfilePreview || user.userProfile} style={{ width: 100, height: 100, marginBottom: 20 }} />
                <input accept="image/*" style={{ display: 'none' }} id="icon-button-file" type="file" onChange={handleImageChange} />
                <label htmlFor="icon-button-file">
                    <Button variant="contained" component="span">프로필 사진 변경</Button>
                </label>
                <Box mt={2} width="100%">
                    <Box display="flex" alignItems="center" mt={2}>
                        <TextField
                            fullWidth
                            label="이메일 주소"
                            type="email"
                            variant="standard"
                            value={user.userEmail}
                            disabled
                        />
                    </Box>
                    <Box display="flex" alignItems="center" mt={2}>
                        <TextField
                            fullWidth
                            label="이름"
                            variant="standard"
                            value={user.userName}
                            error={!!validationErrors.userName}
                            helperText={validationErrors.userName}
                            onChange={(e) => setUser(prev => ({ ...prev, userName: e.target.value }))}
                        />
                    </Box>
                    <Box display="flex" alignItems="center" mt={2}>
                        <TextField
                            fullWidth
                            label="휴대폰 번호"
                            variant="standard"
                            value={user.userPhone}
                            error={!!validationErrors.userPhone}
                            helperText={validationErrors.userPhone}
                            onChange={(e) => setUser(prev => ({ ...prev, userPhone: e.target.value }))}
                        />
                    </Box>
                    <Box mt={4}>
                        <Button fullWidth onClick={handleUpdate}>
                            수정하기
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}