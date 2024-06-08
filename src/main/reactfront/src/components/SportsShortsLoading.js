import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import Navigation from "../views/Navigation";
import {LinearProgress} from "@mui/joy";
import loading2 from './loading/loading2.gif';

export default function SportsShortsLoading() {
    const location = useLocation();
    const navigate = useNavigate();
    const { fileData, userId } = location.state;
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const uploadAndSummarizeVideo = async () => {
            try {
                const formData = new FormData();
                formData.append('video', fileData);
                formData.append('userId', userId);

                // Upload original video
                const uploadResponse = await axios.post('/api/videos/uploadOriginal', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (uploadResponse.data.result) {
                    // Get the latest original video
                    const latestVideoResponse = await axios.get('/api/videos/latestOriginal', {
                        params: {
                            userId: userId
                        }
                    });

                    if (latestVideoResponse.data.result) {
                        console.error('Upload:', latestVideoResponse.data.data);
                        const originalVideoUrl = latestVideoResponse.data.data.oriVideo;
                        const oriNo = latestVideoResponse.data.data.oriNo;

                        // Summarize video using Flask server
                        const flaskFormData = new FormData();
                        flaskFormData.append('file', fileData);
                        flaskFormData.append('topN', 3); // Top 3 클립을 요청

                        const summaryResponse = await axios.post('http://localhost:5000/extract_top_clips', flaskFormData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        });

                        if (summaryResponse.status === 200) {
                            const resultPaths = summaryResponse.data.result_paths;

                            navigate('/sportsShortsPreview', { state: { videoUrls: resultPaths } });
                        } else {
                            alert('Failed to summarize video.');
                            navigate('/shorts');
                        }
                    } else {
                        alert('Failed to get latest original video.');
                        navigate('/shorts');
                    }
                } else {
                    alert('Failed to upload original video.');
                    navigate('/shorts');
                }
            } catch (error) {
                console.error('Upload and summarize error:', error);
                alert('Failed to upload and summarize video.');
                navigate('/shorts');
            }
        };

        // const checkProgress = async () => {
        //     try {
        //         const progressResponse = await axios.get('http://localhost:5000/progress');
        //         setProgress(progressResponse.data.progress);
        //     } catch (error) {
        //         console.error('Error fetching progress:', error);
        //     }
        // };

        uploadAndSummarizeVideo();

        // const interval = setInterval(() => {
        //     checkProgress();
        // }, 1000);
        //
        // return () => clearInterval(interval);
    }, [fileData, navigate, userId]);

    return (
        <div>
            <Navigation/>
            <Container maxWidth="sm">
                <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
                    <CircularProgress />
                    <div style={{marginTop: '150px'}}/>
                    <img src={loading2} alt="Loading..." />
                    <Typography variant="h6" style={{ marginTop: '40px', fontWeight :'bold' ,  }}>
                        영상 맛있게 제작해드릴게요! 담배 하나 피고 오시죠.
                    </Typography>
                </Box>
            </Container>
        </div>
    );
}