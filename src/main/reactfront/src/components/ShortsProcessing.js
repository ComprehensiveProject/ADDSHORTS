import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import Navigation from "../views/Navigation";

export default function ShortsProcessingScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedTopic, fileData, userId } = location.state;

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
                    const videoUrl = response.data.video_url;

                    const latestVideoResponse = await axios.get('/api/videos/latestOriginal', {
                        params: {
                            userId: userId
                        }
                    });

                    if (latestVideoResponse.data.result) {
                        console.error('Upload:', latestVideoResponse.data.data);
                        const oriNo = latestVideoResponse.data.data.oriNo;

                        // Save shorts video
                        const summaryForm = new FormData();
                        summaryForm.append('summaryVideoUrl', videoUrl);
                        summaryForm.append('oriNo', oriNo);
                        summaryForm.append('userId', userId);

                        const saveSummaryResponse = await axios.post('/api/videos/uploadSummary', summaryForm);

                        if (saveSummaryResponse.data.result) {
                            navigate('/shortsPreview', { state: { videoUrl: videoUrl } });
                        } else {
                            alert('Failed to save summary video.');
                            navigate('/shorts');
                        }
                    } else {
                        alert('Failed to get latest original video.');
                        navigate('/shorts');
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

        processVideo();
    }, [fileData, navigate, selectedTopic]);

    return (
        <div>
            <Navigation/>
            <Container maxWidth="sm">
                <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
                    <CircularProgress />
                    <Typography variant="h6" mt={2}>쇼츠 제작하는 중...</Typography>
                </Box>
            </Container>
        </div>
    );
}
