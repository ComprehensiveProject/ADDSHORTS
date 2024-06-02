import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Avatar, Container, Paper, IconButton } from '@mui/material';
import { PhotoCamera, VideoCameraBack, Save } from '@mui/icons-material';
import Navigation from "../../views/Navigation";

const BoardEdit = () => {
    const [board, setBoard] = useState({ boardTitle: '', boardContent: '' });
    const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 파일
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const { boardId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBoardDetail = async () => {
            try {
                const response = await axios.get(`/board/${boardId}`);
                setBoard(response.data);
                setImagePreview(response.data.boardImage);
                setVideoPreview(response.data.boardVideo);
            } catch (error) {
                console.error("Error fetching board details:", error);
            }
        };

        fetchBoardDetail();
    }, [boardId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBoard(prevState => ({ ...prevState, [name]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);

            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target.result);
            }
            reader.readAsDataURL(file);
        }
    };

    const handleVideoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedVideo(file);

            const reader = new FileReader();
            reader.onload = (event) => {
                setVideoPreview(event.target.result);
            }
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('boardTitle', board.boardTitle);
            formData.append('boardContent', board.boardContent);
            if (selectedImage) {
                formData.append('boardImage', selectedImage);
            }
            if (selectedVideo) {
                formData.append('boardVideo', selectedVideo);
            }

            await axios.put(`/board/${boardId}`, formData);
            navigate(`/boardDetail/${boardId}`);
            alert("수정이 완료되었습니다.");
        } catch (error) {
            console.error("Error updating board:", error);
        }
    };

    return (
        <div style={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
            <Navigation />
            <div style={{ paddingTop: '150px', paddingBottom: '50px' }}>
                <Container maxWidth="sm">
                    <Paper elevation={3} style={{ padding: '30px', borderRadius: '15px' }}>
                        <Typography variant="h5" gutterBottom align="center" style={{ marginBottom: '30px', fontWeight: 'bold' }}>
                            게시물 수정하기
                        </Typography>

                        <TextField
                            fullWidth
                            label="제목"
                            name="boardTitle"
                            variant="outlined"
                            value={board.boardTitle}
                            onChange={handleInputChange}
                            style={{ marginBottom: '20px' }}
                        />

                        <TextField
                            fullWidth
                            label="내용"
                            name="boardContent"
                            variant="outlined"
                            multiline
                            rows={6}
                            value={board.boardContent}
                            onChange={handleInputChange}
                            style={{ marginBottom: '20px' }}
                        />

                        <Box display="flex" justifyContent="space-between" marginBottom="20px">
                            {imagePreview && (
                                <img src={imagePreview} alt="Post Preview" style={{ width: '80%', maxHeight: '300px', objectFit: 'cover', borderRadius: '10px' }} />
                            )}
                            {videoPreview && (
                                <video src={videoPreview} controls style={{ width: '80%', maxHeight: '300px', borderRadius: '10px' }} />
                            )}
                        </Box>

                        <Box display="flex" justifyContent="center" marginBottom="30px">
                            <input accept="image/*" style={{ display: 'none' }} id="board-image-input" type="file" onChange={handleImageChange} />
                            <label htmlFor="board-image-input">
                                <IconButton color="primary" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                            <input accept="video/*" style={{ display: 'none' }} id="board-video-input" type="file" onChange={handleVideoChange} />
                            <label htmlFor="board-video-input">
                                <IconButton color="primary" component="span">
                                    <VideoCameraBack />
                                </IconButton>
                            </label>
                        </Box>

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleUpdate}
                            startIcon={<Save />}
                            style={{ borderRadius: '10px', padding: '10px 0' }}
                        >
                            수정하기
                        </Button>
                    </Paper>
                </Container>
            </div>
        </div>
    );
}

export default BoardEdit;