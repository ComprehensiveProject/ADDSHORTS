import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import Navigation from "../views/Navigation";
import './previewCss.css';

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

    const handleFullscreen = () => {
        const videoElement = document.getElementById('video-element');
        if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen();
        } else if (videoElement.mozRequestFullScreen) { /* Firefox */
            videoElement.mozRequestFullScreen();
        } else if (videoElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            videoElement.webkitRequestFullscreen();
        } else if (videoElement.msRequestFullscreen) { /* IE/Edge */
            videoElement.msRequestFullscreen();
        }
    };

    return (
        <div>
            <Navigation/>
            <div style={{marginTop : '150px'}}/>
            <header className="bg-dark py-5">
                <div className="container px-5">
                    <div className="row gx-5 align-items-center justify-content-start">
                        <div className="col-lg-7 col-xl-6 col-xxl-5">
                            <div className="my-5 text-start">
                                <h3 className="display-5 fw-bolder text-white mb-2">오래 기다리셨습니다!</h3>
                                <h5 className="text-white">요약이 완료되었습니다.</h5>
                                <p className="lead fw-normal text-white-50 mb-4">
                                    전체화면을 클릭하면 전체화면으로 바뀌며,<br/>
                                    다운로드를 클릭할 시 저장할 수 있습니다.<br/>
                                    최신 기술로 요약된 결과물을 확인해 보세요.<br/>
                                    많은 관심과 이용 부탁드립니다.<br/>
                                    감사합니다.
                                </p>
                                <div className="d-grid gap-3 d-sm-flex justify-content-start">
                                    <Button
                                        className="btn btn-primary btn-lg px-4 me-sm-3"
                                        variant="contained"
                                        onClick={handleFullscreen}
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
                                        className="btn btn-outline-light btn-lg px-4"
                                        variant="contained"
                                        onClick={handleDownload}
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
                                        다운로드
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-xl-6 col-xxl-7 text-center">
                            <Box className="vvdd" style={{ maxWidth: '100%', height: 'auto' }}>
                                <video controls id="video-element" style={{ width: '100%', height: 'auto' }}>
                                    <source src={videoUrl} type="video/mp4" />
                                    브라우저가 비디오 태그를 지원하지 않습니다.
                                </video>
                            </Box>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}