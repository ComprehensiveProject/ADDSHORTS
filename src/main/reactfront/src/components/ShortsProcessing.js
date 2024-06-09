import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import Navigation from "../views/Navigation";
import loading2 from "./loading/loading2.gif";
import {LinearProgress} from "@mui/joy";

export default function ShortsProcessingScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedTopic, fileData, userId } = location.state;
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const processVideo = async () => {
            try {
                const formData = new FormData();
                formData.append('file', fileData);
                formData.append('selectedTopic', selectedTopic);

                const response = await axios.post('http://localhost:5000/cut', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.status === 200) {

                    const latestVideoResponse = await axios.get('/api/videos/latestOriginal', {
                        params: {
                            userId: userId
                        }
                    });

                    if (latestVideoResponse.data.result) {
                        console.error('Upload:', latestVideoResponse.data.data);
                        const originalVideoUrl = latestVideoResponse.data.data.oriVideo;
                        const oriNo = latestVideoResponse.data.data.oriNo;

                        const videoUrl = response.data.video_url;

                        // Save summary video
                        const summaryForm = new FormData();
                        summaryForm.append('summaryVideoUrl', videoUrl);
                        summaryForm.append('oriNo', oriNo);
                        summaryForm.append('userId', userId);

                        const saveSummaryResponse = await axios.post('/api/videos/uploadSummary', summaryForm);

                        if (saveSummaryResponse.data.result) {
                            navigate('/shortsPreview', { state: { videoUrl } });
                        } else {
                            alert('Failed to save summary video.');
                            navigate('/shorts');
                        }
                    }
                } else {
                    alert('Failed to process video.');
                    navigate('/shorts');
                }
            } catch (error) {
                console.error('Video processing error:', error);
                alert('Failed to process video.');
                navigate('/shorts');
            }
        };

        const checkProgress = async () => {
            try {
                const progressResponse = await axios.get('http://localhost:5000/progress');
                setProgress(progressResponse.data.progress);
            } catch (error) {
                console.error('Error fetching progress:', error);
            }
        };

        processVideo();

        const interval = setInterval(() => {
            checkProgress();
        }, 1000);

        return () => clearInterval(interval);
    }, [fileData, navigate, selectedTopic]);

    return (
        <div>
            <Navigation/>
            <Container maxWidth="sm">
                <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
                    <CircularProgress />
                    <div style={{marginTop: '150px'}}/>
                    <img src={loading2} alt="Loading..." />
                    <Typography variant="h6" style={{ marginTop: '40px', fontWeight :'bold' ,  }}>
                        주제에 맞는 쇼츠 영상을 제작하고 있습니다.
                    </Typography>
                    <Typography variant="h6" style={{ marginTop: '20px', fontWeight :'bold' ,  }}>
                        인터넷 상황에 따라 영상 제작 시간이 지연될 수 있습니다.
                    </Typography>
                    <LinearProgress variant="determinate" value={progress} style={{ width: '100%', marginTop: '20px' }} />
                    <Typography variant="h6" style={{ marginTop: '20px', fontWeight: 'bold' }}>
                        진행률: {progress}%
                    </Typography>
                </Box>
            </Container>
        </div>
    );
}
