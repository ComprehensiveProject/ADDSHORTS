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
            <header className="bg-dark py-5">
                <div className="container px-5">
                    <div className="row gx-5 align-items-center justify-content-center">
                        <div className="col-lg-7 col-xl-6 col-xxl-5">
                            <div className="my-5 text-center">
                                <h3 className="display-5 fw-bolder text-white mb-2 " style={{marginTop: '150px'}}>오래 기다리셨습니다!</h3>
                                <h5 className="text-white">3가지의 쇼츠제작이 완료되었습니다.</h5>
                                <p className="lead fw-normal text-white-50 mb-4">
                                    쇼츠형식으로 제작되어 모바일화면에 맞게 제작되었으며,<br/>
                                    전체화면을 클릭하면 전체화면으로 바뀝니다.<br />
                                    다운로드를 클릭할 시 저장할 수 있습니다.<br />
                                    많은 관심과 이용 부탁드립니다.<br />
                                    감사합니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4}>
                    {videoUrls.map((url, index) => (
                        <Paper key={index} elevation={2} style={{  backgroundColor : '#a9a9a9' , padding: '20px', width: '30%' }}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <video width="100%" height="auto" controls>
                                    <source src={url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <Box display="flex" gap={2} mt={2}>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => setSelectedVideoUrl(url)}
                                        style={{
                                            fontSize: 18,
                                            marginTop: '20px',
                                            backgroundColor: '#007bff', // Blue
                                            color: 'white',
                                            padding: '14px 28px',
                                            borderRadius: '5px', // Slightly rounded corners
                                            border: 'none',
                                            transition: 'background-color 0.3s ease, transform 0.3s ease',
                                            textTransform: 'none', // Normal text
                                            letterSpacing: 'normal', // Normal letter spacing
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.backgroundColor = '#0056b3'; // Slightly darker blue
                                            e.currentTarget.style.transform = 'translateY(-3px)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.backgroundColor = '#007bff';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        전체화면
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleDownload(url, index)}
                                        style={{
                                            fontSize: 18,
                                            marginTop: '20px',
                                            backgroundColor: 'transparent', // Transparent
                                            color: '#ffffff', // White text
                                            padding: '14px 28px',
                                            borderRadius: '5px', // Slightly rounded corners
                                            border: '2px solid #ffffff', // White border
                                            transition: 'background-color 0.3s ease, transform 0.3s ease, color 0.3s ease',
                                            textTransform: 'none', // Normal text
                                            letterSpacing: 'normal', // Normal letter spacing
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.backgroundColor = '#e0e0e0'; // Light grey background
                                            e.currentTarget.style.color = 'black'; // Black text
                                            e.currentTarget.style.transform = 'translateY(-3px)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent'; // Transparent background
                                            e.currentTarget.style.color = '#ffffff'; // White text
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        다운로드 영상 {index + 1}
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>
                    ))}
                </Box>
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
            </header>
        </div>
    );
}