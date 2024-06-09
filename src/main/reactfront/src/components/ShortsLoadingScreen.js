import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import Navigation from "../views/Navigation";
import loading2 from "./loading/loading2.gif";

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
                    <div style={{marginTop: '150px'}}/>
                    <img src={loading2} alt="Loading..." />
                    <Typography variant="h6" style={{ marginTop: '40px', fontWeight :'bold' ,  }}>
                        쇼츠 주제를 추출하는 중입니다.
                    </Typography>
                    <Typography variant="h6" style={{ marginTop: '20px', fontWeight :'bold' ,  }}>
                        인터넷 상황에 따라 영상 제작 시간이 지연될 수 있습니다.
                    </Typography>
                </Box>
            </Container>
        </div>
    );
}
