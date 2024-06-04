import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Divider, Box, Button, TextField, Grid } from '@mui/material';
import { useCookies } from "react-cookie";
import Avatar from "@mui/material/Avatar";
import Navigation from "../../views/Navigation";

const BoardDetail = () => {
    const [boardDetail, setBoardDetail] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const { boardId } = useParams();
    const navigate = useNavigate();
    const [cookies] = useCookies(['token']);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchBoardDetail = async () => {
            try {
                const response = await axios.get(`/board/${boardId}`);
                setBoardDetail(response.data);
            } catch (error) {
                console.error("Error fetching board details:", error);
            }
        };

        const fetchCurrentUser = async () => {
            const token = cookies.token;

            if (token) {
                try {
                    const response = await axios.get('/api/auth/currentUser', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setCurrentUser(response.data);
                } catch (error) {
                    console.error("Error fetching current user:", error);
                }
            }
        };

        const fetchComments = async () => {
            try {
                const response = await axios.get(`/board/${boardId}/comments`);
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchBoardDetail();
        fetchCurrentUser();
        fetchComments();
    }, [boardId, cookies.token]);

    const handleEdit = () => {
        navigate(`/board/edit/${boardId}`);
    }

    const handleDelete = async () => {
        try {
            const token = cookies.token;
            await axios.delete(`/board/${boardId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('게시글이 삭제되었습니다.');
            navigate('/board');
        } catch (error) {
            console.error("Error deleting post:", error);
            alert('게시글 삭제에 실패했습니다.');
        }
    }

    const handleGoToBoardList = () => {
        navigate('/board');
    }

    const handlePostComment = async () => {
        try {
            const commentData = {
                boardNumber: boardId,
                commentWriterId: currentUser.userId,
                commentContent: comment
            };

            const response = await axios.post(`/board/${boardId}/comments`, commentData);
            setComments([...comments, response.data]);
            setComment('');
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    return (
        <div>
            <Navigation />
            <div style={{ paddingTop: '150px', backgroundColor: '#fafafa' }}>
                <Container
                    maxWidth="sm"
                    style={{
                        border: '1px solid #dbdbdb',
                        borderRadius: '3px',
                        padding: '0px',
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                        backgroundColor: 'white',
                        paddingBottom: '40px'
                    }}
                >
                    <Box mb={4}>
                        <Box display="flex" alignItems="center" p={2}>
                            <Avatar src="/broken-image.jpg" />
                            <Typography variant="subtitle1" style={{ marginLeft: '10px', fontWeight: 'bold' }}>
                                {boardDetail.boardWriterId}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box my={2} p={2}>
                            <Typography variant="h5" gutterBottom>
                                {boardDetail.boardTitle}
                            </Typography>
                            <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
                                {boardDetail.boardContent}
                            </Typography>
                        </Box>
                        {boardDetail.boardImage && (
                            <Box>
                                <img
                                    src={boardDetail.boardImage}
                                    alt="Board Image"
                                    style={{ width: '100%', objectFit: 'cover' }}
                                />
                            </Box>
                        )}
                        {boardDetail.boardVideo && (
                            <Box>
                                <video
                                    src={boardDetail.boardVideo}
                                    alt="Board Video"
                                    style={{ width: '100%', objectFit: 'cover' }}
                                    controls
                                />
                            </Box>
                        )}
                        <Box p={2}>
                            <Typography variant="caption" color="textSecondary">
                                {boardDetail.boardWriteDate}
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="flex-end" p={2}>
                            {currentUser.userId === boardDetail.boardWriterId && (
                                <>
                                    <Button variant="text" color="primary" style={{ marginRight: '10px' }} onClick={handleEdit}>
                                        수정
                                    </Button>
                                    <Button variant="text" color="secondary" style={{ marginRight: '10px' }} onClick={handleDelete}>
                                        삭제
                                    </Button>
                                </>
                            )}
                            <Button variant="text" onClick={handleGoToBoardList}>
                                목록
                            </Button>
                        </Box>
                    </Box>

                    <Divider />

                    <Box mt={2} p={2}>
                        <Typography variant="h6" style={{ marginBottom: '15px' }}>
                            댓글 ({comments.length})
                        </Typography>
                        <Box>
                            {comments.map((comment, index) => (
                                <Box key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                    <Avatar src="/broken-image.jpg" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                                    <Box>
                                        <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                                            {comment.commentWriterId}
                                        </Typography>
                                        <Typography variant="body2">
                                            {comment.commentContent}
                                        </Typography>
                                        <Typography variant="caption" color="textSecondary">
                                            {new Date(comment.commentWriteDate).toLocaleString()}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                        <Grid container spacing={2} mt={3} alignItems="center">
                            <Grid item xs={10}>
                                <TextField
                                    fullWidth
                                    label="댓글 작성"
                                    variant="outlined"
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant="contained" onClick={handlePostComment}>
                                    등록
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </div>
        </div>
    );
}

export default BoardDetail;