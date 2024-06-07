import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import {Box, Typography, Container, Button, Dialog} from '@mui/material';
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
            <Navigation/>
            <Container maxWidth="sm">
                <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
                    <Typography variant="h5" mb={3}>Summarized Videos</Typography>
                    {videoUrls.map((url, index) => (
                        <Box key={index} mt={2} display="flex" flexDirection="column" alignItems="center">
                            <video width="100%" height="auto" controls>
                                <source src={url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleDownload(url, index)}
                                style={{ marginTop: '10px' }}
                            >
                                Download Video {index + 1}
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => setSelectedVideoUrl(url)}
                                style={{ marginTop: '10px' }}
                            >
                                View Larger
                            </Button>
                        </Box>
                    ))}
                </Box>
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