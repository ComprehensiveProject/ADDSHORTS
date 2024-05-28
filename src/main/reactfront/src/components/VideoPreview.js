import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Container, Button } from '@mui/material';
import Navigation from "../views/Navigation";

export default function VideoPreview() {
    const location = useLocation();
    const { videoUrl } = location.state;

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = videoUrl;
        link.setAttribute('download', 'summarized_video.mp4'); // 다운로드될 파일명 설정
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <Navigation/>
            <Container maxWidth="sm">
                <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
                    <Typography variant="h5" mb={3}>Summarized Video</Typography>
                    <Box mt={2}>
                        <video width="100%" height="auto" controls>
                            <source src={videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </Box>
                    <Box mt={2}>
                        <Button variant="contained" color="primary" onClick={handleDownload}>
                            Download Video
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}