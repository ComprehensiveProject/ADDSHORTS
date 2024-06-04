import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Avatar, Container, Paper, IconButton } from '@mui/material';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { PhotoCamera, VideoCameraBack } from '@mui/icons-material';
import Navigation from "../../views/Navigation";

const BoardAdd = () => {
    const [cookies] = useCookies(['token']);
    const [user, setUser] = useState({});
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postImage, setPostImage] = useState(null);
    const [postVideo, setPostVideo] = useState(null);
    const [postImagePreview, setPostImagePreview] = useState(null);
    const [postVideoPreview, setPostVideoPreview] = useState(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const token = cookies.token;

            if (token) {
                try {
                    const userDetails = await axios.get('/api/auth/currentUser', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(userDetails.data);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();
    }, [cookies.token]);

    const handlePostImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let selectedFile = e.target.files[0];
            setPostImage(selectedFile);

            let reader = new FileReader();
            reader.onload = (event) => {
                setPostImagePreview(event.target.result);
            }
            reader.readAsDataURL(selectedFile);
        }
    };

    const handlePostVideoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let selectedFile = e.target.files[0];
            setPostVideo(selectedFile);

            let reader = new FileReader();
            reader.onload = (event) => {
                setPostVideoPreview(event.target.result);
            }
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleCreatePost = async () => {
        if (!postTitle || !postContent) {
            alert('제목과 내용을 모두 작성해주세요.');
            return;
        }

        setIsLoading(true);
        setErrorMessage('');

        const formData = new FormData();
        formData.append('boardTitle', postTitle);
        formData.append('boardWriterId', user.userId);
        formData.append('boardContent', postContent);
        if (postImage) {
            formData.append('postImage', postImage);
        }
        if (postVideo) {
            formData.append('postVideo', postVideo);
        }

        try {
            const response = await axios.post('/board/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                alert('게시글 작성이 완료되었습니다.');
                navigate('/board');
            } else {
                setErrorMessage('게시글 작성 중 오류가 발생했습니다.');
            }
        } catch (error) {
            setErrorMessage('게시글 작성 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
            <Navigation/>
            <div style={{ paddingTop: '150px', paddingBottom: '50px' }}>
                <Container maxWidth="sm">
                    <Paper elevation={3} style={{ padding: '30px', borderRadius: '15px' }}>
                        <Typography variant="h5" gutterBottom align="center" style={{ marginBottom: '30px', fontWeight: 'bold' }}>
                            게시글 작성
                        </Typography>

                        <Box display="flex" flexDirection="column" alignItems="center" marginBottom="30px">
                            <Avatar src={user.userProfile} style={{ width: 80, height: 80, marginBottom: '10px' }} />
                            <Typography variant="h6" gutterBottom>
                                {user.userNickname}
                            </Typography>
                        </Box>

                        <TextField
                            fullWidth
                            label="Title"
                            variant="outlined"
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                            style={{ marginBottom: '20px' }}
                        />

                        <TextField
                            fullWidth
                            label="Content"
                            variant="outlined"
                            multiline
                            rows={6}
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                            style={{ marginBottom: '20px' }}
                        />

                        <Box display="flex" justifyContent="space-between" marginBottom="20px">
                            {postImagePreview && (
                                <img src={postImagePreview} alt="Post Preview" style={{ width: '80%', maxHeight: '300px', objectFit: 'cover', borderRadius: '10px' }} />
                            )}
                            {postVideoPreview && (
                                <video src={postVideoPreview} controls style={{ width: '80%', maxHeight: '300px', borderRadius: '10px' }} />
                            )}
                        </Box>


                        <Box display="flex" justifyContent="center" marginBottom="30px">
                            <input accept="image/*" style={{ display: 'none' }} id="post-icon-button-file" type="file" onChange={handlePostImageChange} />
                            <label htmlFor="post-icon-button-file">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                            <input accept="video/*" style={{ display: 'none' }} id="post-video-button-file" type="file" onChange={handlePostVideoChange} />
                            <label htmlFor="post-video-button-file">
                                <IconButton color="primary" aria-label="upload video" component="span">
                                    <VideoCameraBack />
                                </IconButton>
                            </label>
                        </Box>

                        {errorMessage && (
                            <Box marginBottom="20px">
                                <Typography color="error" align="center">{errorMessage}</Typography>
                            </Box>
                        )}

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleCreatePost}
                            disabled={isLoading}
                            style={{ borderRadius: '10px', padding: '10px 0' }}
                        >
                            {isLoading ? '업로드 중...' : '업로드'}
                        </Button>
                    </Paper>
                </Container>
            </div>
        </div>
    );
}

export default BoardAdd;