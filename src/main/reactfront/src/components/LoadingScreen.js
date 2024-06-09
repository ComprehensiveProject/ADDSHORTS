import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import Navigation from "../views/Navigation";
import {LinearProgress} from "@mui/joy";
import loading2 from './loading/loading2.gif';

export default function LoadingScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const { fileData, userId, summaryTime } = location.state;
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
                        flaskFormData.append('summaryTime', summaryTime);

                        console.log('Sending request to Flask server...');

                        const summaryResponse = await axios.post('http://localhost:5000/summarize', flaskFormData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        });

                        if (summaryResponse.status === 200) {
                            const summaryVideoUrl = summaryResponse.data.result_path;

                            // Save summary video
                            const summaryForm = new FormData();
                            summaryForm.append('summaryVideoUrl', summaryVideoUrl);
                            summaryForm.append('oriNo', oriNo);
                            summaryForm.append('userId', userId);

                            const saveSummaryResponse = await axios.post('/api/videos/uploadSummary', summaryForm);

                            if (saveSummaryResponse.data.result) {
                                navigate('/preview', { state: { videoUrl: summaryVideoUrl } });
                            } else {
                                alert('Failed to save summary video.');
                                navigate('/summary');
                            }
                        } else {
                            alert('Failed to summarize video.');
                            navigate('/summary');
                        }
                    } else {
                        alert('Failed to get latest original video.');
                        navigate('/summary');
                    }
                } else {
                    alert('Failed to upload original video.');
                    navigate('/summary');
                }
            } catch (error) {
                console.error('Upload and summarize error:', error);
                alert('Failed to upload and summarize video.');
                navigate('/summary');
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
    }, [fileData, navigate, summaryTime, userId]);

    return (
        <div>
            <Navigation/>
            <Container maxWidth="sm">
                <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
                    <CircularProgress />
                    <div style={{marginTop: '150px'}}/>
                    <img src={loading2} alt="Loading..." />
                    <Typography variant="h6" style={{ marginTop: '40px', fontWeight :'bold' ,  }}>
                        요약 영상을 제작하고 있습니다.
                    </Typography>
                    <Typography variant="h6" style={{ marginTop: '20px', fontWeight :'bold' ,  }}>
                        인터넷 상황에 따라 영상 제작 시간이 지연될 수 있습니다.
                    </Typography>
                    {/*<LinearProgress variant="determinate" value={progress} style={{ width: '100%' }} />*/}
                </Box>
            </Container>
        </div>
    );
}