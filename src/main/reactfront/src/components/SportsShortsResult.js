import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Container, Button, Dialog, Paper } from '@mui/material';
import Navigation from "../views/Navigation";
import {DialogContent} from "@mui/joy";

export default function SportsShortsResult() {
    const location = useLocation();
    const { videoUrls } = location.state;
    const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

    const handleDownload = (url, index) => {
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `summarized_video_${index + 1}.mp4`); // 다운로드될 파일명 설정
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleCloseDialog = () => {
        setSelectedVideoUrl(null);
    };

    return (
        <div>
            <Navigation />
            <Container maxWidth="md" style={{ marginTop: '100px' }}>
                <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                    <Typography variant="h4" mb={3}>요약된 스포츠 영상</Typography>
                    <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
                        {videoUrls.map((url, index) => (
                            <Paper key={index} elevation={2} style={{ padding: '20px', width: '100%' }}>
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <video width="100%" height="auto" controls>
                                        <source src={url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <Box display="flex" gap={2} mt={2}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleDownload(url, index)}
                                            style={{
                                                fontSize: 16,
                                                padding: '10px 20px',
                                                textTransform: 'none',
                                            }}
                                        >
                                            다운로드 영상 {index + 1}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => setSelectedVideoUrl(url)}
                                            style={{
                                                fontSize: 16,
                                                padding: '10px 20px',
                                                textTransform: 'none',
                                            }}
                                        >
                                            큰 화면으로 보기
                                        </Button>
                                    </Box>
                                </Box>
                            </Paper>
                        ))}
                    </Box>
                </Paper>
            </Container>
            <Dialog open={Boolean(selectedVideoUrl)} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogContent>
                    {selectedVideoUrl && (
                        <video width="100%" height="auto" controls>
                            <source src={selectedVideoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}