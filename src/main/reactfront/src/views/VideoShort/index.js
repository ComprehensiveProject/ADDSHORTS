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
import './style.css';

export default function VideoShort() {
    const [videoFile, setVideoFile] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [userId, setUserId] = useState('');
    const [category, setCategory] = useState('');
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setVideoFile(file);
        setVideoPreview(URL.createObjectURL(file));
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleUpload = async () => {
        if (!videoFile || !userId || !category) {
            alert('Please provide a video, user ID, and select a category.');
            return;
        }

        if(category === 'sports'){
            navigate('/sportsShortsLoading', {
                state: {
                    fileData: videoFile,
                    userId
                }
            });
        } else if(category === 'general'){
            navigate('/shortsLoading', {
                state: {
                    fileData: videoFile,
                    userId
                }
            });
        } else {
            alert('This feature is currently available for news category only.');
        }
    };

    return (
        <div>
            <Navigation />
            {!videoPreview ? (
                <Container className="styled-containert">
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item xs={8}>
                            <Typography variant="h4" className="titlest">
                                쇼츠 제작
                            </Typography>
                        </Grid>

                        <Grid item xs={8}>
                            <Card className="info-cardt">
                                <CardContent>
                                    <Typography variant="h5" className="info-titlet">
                                        사용 방법
                                    </Typography>
                                    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                                        <Typography variant="body1" className="info-stept">
                                            1. 영상의 카테고리를 선택합니다.
                                        </Typography>
                                        <Typography variant="body1" className="info-stept">
                                            2. 해당 카테고리에 맞는 영상 파일을 첨부합니다.
                                        </Typography>
                                        <Typography variant="body1" className="info-stept">
                                            3. 업로드 버튼을 눌러 쇼츠 컨텐츠 제작을 시작합니다.
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={8}>
                            <Card className="info-cardt">
                                <CardContent>
                                    <Typography variant="h5" className="info-titlet">
                                        참고 사항
                                    </Typography>
                                    <Divider />
                                    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                                        <Typography variant="body1" className="info-notet">
                                            <AccessTimeIcon style={{ verticalAlign: 'middle', marginRight: 4 }} /> 비디오 길이에 따라 영상 제작 시간이 달라질 수 있습니다.
                                        </Typography>
                                        <Typography variant="body1" className="info-notet">
                                            <HelpOutlineIcon style={{ verticalAlign: 'middle', marginRight: 4 }} /> 영상의 길이는 최소 5초~60초로 제작되며 영상의 하이라이트가 되는 장면을 추출합니다.

                                        </Typography>
                                        <Typography variant="body1" className="info-notet">
                                            <UploadFileIcon style={{ verticalAlign: 'middle', marginRight: 4 }} /> 업로드 후 분석 및 컨텐츠 제작 과정은 자동으로 진행됩니다.
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={8}>
                            <Paper elevation={3} className="info-papert">
                                <Typography variant="body1" className="info-textt">
                                    아래 버튼을 클릭하여 비디오 파일을 선택하세요.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={8}>
                            <Alert severity="error" className="info-alertt">
                                비디오 파일 형식은 mp4만 지원됩니다.
                            </Alert>


                            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                                <FormControl
                                    fullWidth
                                    variant="outlined"
                                    sx={{
                                        width: '300px',
                                        marginBottom: 2,
                                        backgroundColor: '#FFEBEE',
                                        borderRadius: '10px',
                                        padding: '10px'
                                    }}>
                                    <Select
                                        labelId="category-label"
                                        id="category"
                                        value={category}
                                        onChange={handleCategoryChange}
                                        placeholder="Select a category"
                                        sx={{
                                            color: '#D32F2F',
                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#D32F2F' },
                                            '&:focus': {
                                                color: '#D32F2F',
                                                borderColor: '#D32F2F',
                                            }
                                        }}
                                    >
                                        <MenuItem value="sports" sx={{ color: '#D32F2F' }}>스포츠</MenuItem>
                                        <MenuItem value="general" sx={{ color: '#D32F2F' }}>일반 영상</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>




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
                                        <Button variant="contained" component="span" className="custom-buttonst">
                                            <VideoLibraryIcon fontSize="large" style={{ marginRight: 8 }} />
                                            비디오 선택
                                        </Button>
                                    </Tooltip>
                                </label>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Stepper activeStep={0} className="steppert">
                                <Step key={1}>
                                    <StepLabel>카테고리 선택</StepLabel>
                                </Step>
                                <Step key={2}>
                                    <StepLabel>카테고리에 맞는 비디오 선택</StepLabel>
                                </Step>
                                <Step key={3}>
                                    <StepLabel>업로드</StepLabel>
                                </Step>
                            </Stepper>
                        </Grid>
                    </Grid>
                </Container>
            ) : (
                <Container className="cdt">
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" style={{ width: '100%' }}>
                        <Box className="video-boxt">
                            <video controls className="styled-videot">
                                <source src={videoPreview} type="video/mp4" />
                                브라우저가 비디오 태그를 지원하지 않습니다.
                            </video>
                        </Box>
                        <Box className="content-boxt" display="flex" flexDirection="column" alignItems="center" style={{ width: '40%' }}>
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
                            <Button
                                variant="contained"
                                onClick={handleUpload}
                                startIcon={<UploadFileIcon />}
                                style={{ fontSize: 18, marginTop: '20px' }}
                            >
                                업로드
                            </Button>
                        </Box>
                    </Box>
                </Container>
            )}
        </div>
    );
}
