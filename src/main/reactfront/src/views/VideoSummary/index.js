import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box, Button, Typography, Container, MenuItem, Select, FormControl, InputLabel, Grid, IconButton, Paper, Card, CardContent,
    LinearProgress, Tooltip, Divider, Alert, Stepper, Step, StepLabel, Snackbar
} from '@mui/material';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import Modal from '../../logm/Modal';
import loginImg from '../../logm/images/loginImg.png';
import './style.css';

export default function VideoSummary() {
    const [videoFile, setVideoFile] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [videoDuration, setVideoDuration] = useState(0);
    const [userId, setUserId] = useState('');
    const [summaryTime, setSummaryTime] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [cookies] = useCookies(['token']);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();
    const [loginModalOpen, setLoginModalOpen] = useState(false);

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
                    setUserId(userDetails.data.userId);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                setLoginModalOpen(true);
            }
        };
        fetchUserData();
    }, [cookies]);

    const closeModalAndNavigate = () => {
        setLoginModalOpen(false);
        navigate('/signin');
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setVideoFile(file);
        setVideoPreview(URL.createObjectURL(file));

        const videoElement = document.createElement('video');
        videoElement.preload = 'metadata';
        videoElement.onloadedmetadata = () => {
            setVideoDuration(videoElement.duration);
        };
        videoElement.src = URL.createObjectURL(file);
    };

    const handleUpload = async () => {
        if (!videoFile || !userId || !summaryTime) {
            setOpenSnackbar(true);
            return;
        }

        const fileData = videoFile;
        const formData = new FormData();
        formData.append('video', videoFile);
        formData.append('userId', userId);
        formData.append('summaryTime', summaryTime);

        // Mock upload progress
        const uploadInterval = setInterval(() => {
            setUploadProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(uploadInterval);
                    navigate('/loading', {
                        state: {
                            fileData,
                            userId,
                            summaryTime
                        }
                    });
                    return 100;
                }
                return prevProgress + 10;
            });
        }, 500);
    };

    const generateSummaryTimeOptions = () => {
        const options = [];
        for (let i = 10; i <= Math.floor(videoDuration); i += 10) {
            options.push(i);
        }
        return options;
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    if (loginModalOpen) {
        return (
            <Modal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)}>

                <div className="speechModalCenter">
                    <img src={loginImg} alt='로그인 이미지' className="speechLoginImg"/>
                    <h4>로그인 후 이용해 주세요</h4>
                    <button onClick={closeModalAndNavigate} className="modal-custom-button">
                        닫기
                    </button>
                </div>
            </Modal>
        );
    }

    return (
        <div>
            <Navigation />
            {!videoPreview ? (
                <Container className="styled-container">
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item xs={8}>
                            <Typography variant="h4" className="titles">
                                영상 요약
                            </Typography>
                        </Grid>

                        <Grid item xs={8}>
                            <Card className="info-card">
                                <CardContent>
                                    <Typography variant="h5" className="info-title">
                                        사용 방법
                                    </Typography>
                                    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                                        <Typography variant="body1" className="info-step">
                                            1. 비디오 파일을 선택합니다.
                                        </Typography>
                                        <Typography variant="body1" className="info-step">
                                            2. 원하는 요약 시간을 선택합니다.
                                        </Typography>
                                        <Typography variant="body1" className="info-step">
                                            3. 업로드 버튼을 눌러 비디오 요약을 시작합니다.
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={8}>
                            <Card className="info-card">
                                <CardContent>
                                    <Typography variant="h5" className="info-title">
                                        참고 사항
                                    </Typography>
                                    <Divider />
                                    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                                        <Typography variant="body1" className="info-note">
                                            <AccessTimeIcon style={{ verticalAlign: 'middle', marginRight: 4 }} /> 비디오 길이에 따라 영상 요약 시간이 달라질 수 있습니다.
                                        </Typography>
                                        <Typography variant="body1" className="info-note">
                                            <HelpOutlineIcon style={{ verticalAlign: 'middle', marginRight: 4 }} /> 요약 영상의 길이는 10초 단위로 선택할 수 있습니다.
                                        </Typography>
                                        <Typography variant="body1" className="info-note">
                                            <UploadFileIcon style={{ verticalAlign: 'middle', marginRight: 4 }} /> 업로드 후 요약 과정은 자동으로 진행됩니다.
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={8}>
                            <Paper elevation={3} className="info-paper">
                                <Typography variant="body1" className="info-text">
                                    아래 버튼을 클릭하여 비디오 파일을 선택하세요.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={8}>
                            <Alert severity="info" className="info-alert">
                                비디오 파일 형식은 mp4만 지원됩니다.
                            </Alert>
                            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                                <input
                                    accept="video/*"
                                    style={{ display: 'none' }}
                                    id="raised-button-file"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="raised-button-file" style={{ width: '100%' }}>
                                    <Tooltip title="비디오를 선택하여 업로드하세요" placement="right">
                                        <Button variant="contained" component="span" className="custom-buttons">
                                            <VideoLibraryIcon fontSize="large" style={{ marginRight: 8 }} />
                                            비디오 선택
                                        </Button>
                                    </Tooltip>
                                </label>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Stepper activeStep={0} className="stepper">
                                <Step key={1}>
                                    <StepLabel>비디오 선택</StepLabel>
                                </Step>
                                <Step key={2}>
                                    <StepLabel>요약 시간 선택</StepLabel>
                                </Step>
                                <Step key={3}>
                                    <StepLabel>업로드</StepLabel>
                                </Step>
                            </Stepper>
                        </Grid>
                    </Grid>
                </Container>
            ) : (
                <Container className="cd">
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" style={{ width: '100%' }}>
                        <Box className="video-box">
                            <video controls className="styled-video">
                                <source src={videoPreview} type="video/mp4" />
                                브라우저가 비디오 태그를 지원하지 않습니다.
                            </video>
                        </Box>
                        <Box className="content-box" display="flex" flexDirection="column" alignItems="center" style={{ width: '40%' }}>
                            <Box display="flex" flexDirection="column" alignItems="center" style={{ gap: '10px' }}>
                                <Tooltip title="다른 비디오를 선택하려면 클릭하세요" placement="right">
                                    <IconButton color="primary" onClick={() => setVideoPreview(null)}>
                                        <ChangeCircleIcon style={{ fontSize: 75, color: '#ffb300' }} />
                                    </IconButton>
                                </Tooltip>
                                <Typography variant="body1" style={{ fontSize: 24 }}>
                                    다른 비디오 선택
                                </Typography>
                            </Box>
                            {videoDuration > 0 && (
                                <FormControl fullWidth className="summary-time-form" style={{ marginTop: '20px' }}>
                                    <InputLabel id="summary-time-label">요약 시간</InputLabel>
                                    <Select
                                        labelId="summary-time-label"
                                        value={summaryTime}
                                        onChange={(e) => setSummaryTime(e.target.value)}
                                        label="요약 시간"
                                        style={{ fontSize: 18 }}
                                    >
                                        {generateSummaryTimeOptions().map((option) => (
                                            <MenuItem key={option} value={option} style={{ fontSize: 18 }}>
                                                {formatTime(option)}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                            <Button
                                variant="contained"
                                onClick={handleUpload}
                                disabled={!summaryTime}
                                className={`custom-buttons ${!summaryTime ? 'hidden' : ''}`}
                                startIcon={<UploadFileIcon />}
                                style={{ fontSize: 18, marginTop: '20px' }}
                            >
                                업로드
                            </Button>

                            {uploadProgress > 0 && (
                                <LinearProgress variant="determinate" value={uploadProgress} className="upload-progress-bar" style={{ width: '100%', marginTop: '20px' }} />
                            )}
                        </Box>
                    </Box>
                </Container>
            )}

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                message="비디오와 요약 시간을 모두 선택해주세요."
            />
        </div>
    );
}
