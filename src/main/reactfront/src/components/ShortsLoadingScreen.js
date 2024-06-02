import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import Navigation from "../views/Navigation";

export default function ShortsLoadingScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const { fileData, userId } = location.state;

    useEffect(() => {
        const uploadAndExtractTopics = async () => {
            try {
                const formDataSave = new FormData();
                formDataSave.append('video', fileData);
                formDataSave.append('userId', userId);

                const uploadResponse = await axios.post('/api/videos/uploadOriginal', formDataSave, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (uploadResponse.data.result) {
                    const formData = new FormData();
                    formData.append('file', fileData);
                    formData.append('userId', userId);

                    const response = await axios.post('http://localhost:5000/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    if (response.status === 200) {
                        const { topics } = response.data;
                        navigate('/shortsTopicSelection', { state: { topics, fileData, userId } });
                    } else {
                        alert('Failed to extract topics.');
                        navigate('/shorts');
                    }
                }

            } catch (error) {
                console.error('Upload and extract topics error:', error);
                alert('Failed to upload and extract topics.');
                navigate('/shorts');
            }
        };

        uploadAndExtractTopics();
    }, [fileData, navigate, userId]);

    return (
        <div>
            <Navigation/>
            <Container maxWidth="sm">
                <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
                    <CircularProgress />
                    <Typography variant="h6" mt={2}>영상 주제 추출하는 중...</Typography>
                </Box>
            </Container>
        </div>
    );
}
