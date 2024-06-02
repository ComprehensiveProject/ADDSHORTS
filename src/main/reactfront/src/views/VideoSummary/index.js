import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Container, MenuItem, Select, FormControl, InputLabel, Grid, IconButton, Paper, Card, CardContent } from '@mui/material';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation";
import { styled } from "@mui/material/styles";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

export default function VideoSummary() {
    const [videoFile, setVideoFile] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [videoDuration, setVideoDuration] = useState(0);
    const [userId, setUserId] = useState('');
    const [summaryTime, setSummaryTime] = useState('');
    const [cookies] = useCookies(['token']);
    const navigate = useNavigate();

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
            }
        };
        fetchUserData();
    }, [cookies.token]);

    const StyledContainer = styled(Container)(({ theme }) => ({
        marginTop: '150px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: theme.spacing(4),
        borderRadius: theme.spacing(2),
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        border: '3px solid #0288d1',
        width: '80%',
        maxWidth: '800px',
        backgroundColor: '#f0f4f8',
    }));

    const CustomButton = styled(Button)(({ theme }) => ({
        backgroundColor: '#0288d1',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#0277bd',
        },
        width: '100%',
        maxWidth: '300px',
        padding: theme.spacing(2),
        fontSize: '1.2rem',
        fontWeight: 'bold',
        marginBottom: theme.spacing(2),
        borderRadius: '20px',
    }));

    const ChangeVideoButton = styled(Button)(({ theme }) => ({
        backgroundColor: '#ffb300',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#ffa000',
        },
        width: '100%',
        maxWidth: '300px',
        padding: theme.spacing(1),
        fontSize: '1rem',
        fontWeight: 'bold',
        marginBottom: theme.spacing(2),
        borderRadius: '20px',
    }));

    const StyledVideo = styled('video')(({ theme }) => ({
        width: '100%',
        height: 'auto',
        borderRadius: theme.spacing(1),
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        maxHeight: '50vh',
        border: '2px solid #0288d1',
    }));


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
            alert('Please provide a video and summary time.');
            return;
        }

        const fileData = videoFile;
        const formData = new FormData();
        formData.append('video', videoFile);
        formData.append('userId', userId);
        formData.append('summaryTime', summaryTime);

        navigate('/loading', {
            state: {
                fileData,
                userId,
                summaryTime
            }
        });
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

    return (
        <div>
            <Navigation />
            <StyledContainer>
                <Grid container spacing={4} alignItems="center" justifyContent="center">
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#0288d1', marginBottom: 4 }}>
                            비디오 업로드
                        </Typography>
                    </Grid>
                    {!videoPreview && (
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                                <input
                                    accept="video/*"
                                    style={{ display: 'none' }}
                                    id="raised-button-file"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="raised-button-file" style={{ width: '100%' }}>
                                    <CustomButton variant="contained" component="span">
                                        비디오 선택
                                    </CustomButton>
                                </label>
                            </Box>
                        </Grid>
                    )}
                    {videoPreview && (
                        <>
                            <Grid item xs={12} md={8}>
                                <Box display="flex" justifyContent="center">
                                    <StyledVideo controls>
                                        <source src={videoPreview} type="video/mp4" />
                                        브라우저가 비디오 태그를 지원하지 않습니다.
                                    </StyledVideo>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                                    <Box display="flex" flexDirection="column" alignItems="center" sx={{ marginBottom: 3 }}>
                                        <IconButton color="primary" onClick={() => setVideoPreview(null)}>
                                            <ChangeCircleIcon sx={{ fontSize: 40, color: '#ffb300' }} />
                                        </IconButton>
                                        <Typography variant="body1" sx={{ color: '#0288d1' }}>
                                            다른 비디오 선택
                                        </Typography>
                                    </Box>
                                    {videoDuration > 0 && (
                                        <FormControl fullWidth sx={{ marginBottom: 3, maxWidth: '300px' }}>
                                            <InputLabel id="summary-time-label">요약 시간</InputLabel>
                                            <Select
                                                labelId="summary-time-label"
                                                value={summaryTime}
                                                onChange={(e) => setSummaryTime(e.target.value)}
                                                label="요약 시간"
                                            >
                                                {generateSummaryTimeOptions().map((option) => (
                                                    <MenuItem key={option} value={option}>
                                                        {formatTime(option)}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                    <CustomButton variant="contained" onClick={handleUpload} disabled={!summaryTime}>
                                        업로드
                                    </CustomButton>
                                </Box>
                            </Grid>
                        </>
                    )}
                    {!videoPreview && (
                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, textAlign: 'center', backgroundColor: '#e3f2fd', marginBottom: 2 }}>
                                <Typography variant="body1" sx={{ color: '#0288d1', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: 2 }}>
                                    이 페이지에서는 비디오 파일을 업로드하여 요약할 수 있습니다. 아래 버튼을 클릭하여 비디오 파일을 선택하세요.
                                </Typography>
                            </Paper>
                        </Grid>
                    )}
                    {!videoPreview && (
                        <Grid item xs={12}>
                            <Card sx={{ padding: 2, borderRadius: 2, marginBottom: 2, backgroundColor: '#e0f7fa', border: '1px solid #0288d1' }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ marginBottom: 2, color: '#0288d1', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                        사용 방법
                                    </Typography>
                                    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                                        <Typography variant="body1" sx={{ marginBottom: 1, color: '#0288d1', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                            1. 비디오 파일을 선택합니다.
                                        </Typography>
                                        <Typography variant="body1" sx={{ marginBottom: 1, color: '#0288d1', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                            2. 원하는 요약 시간을 선택합니다.
                                        </Typography>
                                        <Typography variant="body1" sx={{ marginBottom: 1, color: '#0288d1', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                            3. 업로드 버튼을 눌러 비디오 요약을 시작합니다.
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </StyledContainer>
        </div>

    );
}