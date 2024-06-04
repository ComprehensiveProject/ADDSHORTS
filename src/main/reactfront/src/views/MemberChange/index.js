import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Avatar, Container } from '@mui/material';
import { useCookies } from "react-cookie";
import {useNavigate} from "react-router-dom";
import Navigation from "../Navigation";
import Modal from '../../logm/Modal';
import lockP from './images/lockP.png';
import '../../logm/Modal.css';
import {styled} from '@mui/system';

export default function MemberChange() {
    const [isVerified, setIsVerified] = useState(false);
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [cookies] = useCookies(['token']);
    const [userProfile, setUserProfile] = useState(null);
    const [userProfilePreview, setUserProfilePreview] = useState(null);
    const navigate = useNavigate();
    const [loginModalOpen, setLoginModalOpen] = useState(false);

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
                    setLoginModalOpen(true);
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
                setLoginModalOpen(false);
            } else {
                setErrorMessage('비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    const Container = styled(Box)({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#eceff1',
    });

    const StyledForm = styled(Box)({
        width: '100%',
        maxWidth: '600px',
        padding: '40px',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    });

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

    const handleBlur = (field, value) => {
        setUser(prev => ({ ...prev, [field]: value }));
        // validation logic here
        if (!value) {
            setValidationErrors(prev => ({ ...prev, [field]: `${field} is required` }));
        } else {
            setValidationErrors(prev => ({ ...prev, [field]: '' }));
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

    if (loginModalOpen) {
        return (
            <Modal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)}>

                <div className="speechModalCenter">
                    <img src={lockP} alt='개인정보 이미지' className="speechLoginImga"/>
                    <h4>비밀번호를 한번 더 입력해주세요</h4>
                    <div style={{marginTop : '30px'}}/>
                    <TextField
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ marginBottom: 1 }}
                    />

                    <button onClick={handlePasswordVerification} type="submit" className="modal-custom-button">
                        확인
                    </button>
                    {errorMessage && <Typography color="error" sx={{ marginBottom: 2 }}>{errorMessage}</Typography>}
                </div>
            </Modal>
        );
    }

    return (
        <div className='App'>
            <Navigation/>
            <Container>
                <StyledForm>
                    <Typography variant="h5" sx={{mb: 4, color: '#0d47a1' , fontFamily: "Noto Sans KR Medium"}}>개인정보 수정</Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mb: 3 }}>
                        <Avatar className="user-avatar" src={userProfilePreview || user.userProfile} style={{ width: 100, height: 100, marginBottom: 20 }} />
                        <input accept="image/*" style={{ display: 'none' }} id="icon-button-file" type="file" onChange={handleImageChange} />
                        <label htmlFor="icon-button-file">
                            <Button variant="outlined" color="primary" component="span"
                                    sx={{width: '150px',fontFamily: "Noto Sans KR Medium"}}>프로필 사진 변경</Button>
                        </label>
                    </Box>

                    <TextField
                        fullWidth
                        type="email"
                        variant="standard"
                        value={`이메일 주소 : ${user.userEmail}`}
                        disabled
                        InputProps={{
                            readOnly: true,
                            style: {
                                color: 'midnightblue',
                                fontWeight: 'bold',
                                fontSize: '16px'
                            }
                        }}
                    />

                    <TextField
                        fullWidth
                        variant="outlined"
                        defaultValue={user.userName}
                        error={!!validationErrors.userName}
                        helperText={validationErrors.userName}
                        onBlur={(e) => handleBlur('userName', e.target.value)}
                        sx={{ mb: 2 }}
                        id="name"
                        label="이름"
                        name="name"
                        autoComplete="name"
                        placeholder="이름 입력"
                    />
                    <TextField
                        fullWidth
                        label="휴대폰 번호"
                        variant="outlined"
                        defaultValue={user.userPhone}
                        error={!!validationErrors.userPhone}
                        helperText={validationErrors.userPhone}
                        onBlur={(e) => handleBlur('userPhone', e.target.value)}
                        sx={{ mb: 3 }}
                        name="phone"
                        id="phone"
                        placeholder="번호 입력"
                    />

                    {/*<TextField*/}
                    {/*    fullWidth*/}
                    {/*    label="비밀번호"*/}
                    {/*    variant="outlined"*/}
                    {/*    value={user.userPhone}*/}
                    {/*    error={!!validationErrors.userPhone}*/}
                    {/*    helperText={validationErrors.userPhone}*/}
                    {/*    onChange={(e) => setUser(prev => ({ ...prev, userPhone: e.target.value }))}*/}
                    {/*    sx={{mb: 3}}*/}
                    {/*    name="phone"*/}
                    {/*    id="phone"*/}
                    {/*    placeholder="번호 입력"*/}
                    {/*/>*/}


                    <Box sx={{display: 'flex', justifyContent: 'center', gap: 2, mt: 2}}>
                        <Button variant="contained" color="primary" onClick={handleUpdate}
                                sx={{width: '150px',fontFamily: "Noto Sans KR Medium"}}>저장</Button>
                    </Box>
                </StyledForm>
            </Container>


        </div>
    );
}