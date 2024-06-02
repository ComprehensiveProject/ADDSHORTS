import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Container,
    Box,
    Avatar,
    Grid,
    Modal,
    Backdrop,
    Fade
} from '@mui/material';
import Navigation from "../../views/Navigation";
import addB from './images/addB.png';

const BoardList = () => {
    const [boards, setBoards] = useState([]);
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [cookies] = useCookies(['token']);
    const [open, setOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);

    useEffect(() => {
        const fetchBoardsAndComments = async () => {
            try {
                const boardResponse = await axios.get('/board');
                console.log('서버 응답:', boardResponse.data); // 서버 응답 데이터 확인
                const boardsWithComments = await Promise.all(boardResponse.data.map(async board => {
                    const commentResponse = await axios.get(`/board/${board.boardNumber}/comments`);
                    return {
                        ...board,
                        commentCount: commentResponse.data.length
                    };
                }));
                console.log('코멘트 포함된 게시글:', boardsWithComments); // 서버 응답 데이터 확인
                setBoards(boardsWithComments.reverse()); // 최신 글이 위로 오도록 배열 역순 정렬
            } catch (error) {
                console.error("Error fetching boards and comment counts:", error);
            }
        };

        fetchBoardsAndComments();

        const fetchUserData = async () => {
            const token = cookies.token;

            if (token) {
                try {
                    const userDetails = await axios.get('/api/auth/currentUser', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    console.log('사용자 데이터:', userDetails.data); // 사용자 데이터 확인
                    setUser(userDetails.data);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();
    }, [cookies.token]);

    const handleTitleClick = async (board) => {
        try {
            if (user.userId !== board.boardWriterId) { // 작성자와 현재 사용자가 다른 경우에만
                await axios.post(`/board/${board.boardNumber}/incrementView`);
            }
            navigate(`/boardDetail/${board.boardNumber}`);
        } catch (error) {
            console.error("Error incrementing view count:", error);
        }
    };

    const handleMediaClick = (media) => {
        setSelectedMedia(media);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedMedia(null);
    };

    return (
        <div>
            <Navigation />
            <Container maxWidth="sm">
                <Box display="flex" justifyContent="center" alignItems="center" marginTop="150px">
                    <Typography variant="h4" gutterBottom style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'Permanent Marker, cursive' }}>
                        shortsgram
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end" marginBottom="40px">
                    <Button onClick={() => navigate('/boardAdd')}>
                        <img src={addB} alt="글작성" style={{ width: '40px', height: '40px' }} />
                    </Button>
                </Box>
                <Grid container spacing={4}>
                    {boards.map(board => (
                        <Grid item key={board.boardNumber} xs={12}>
                            <Card>
                                <CardContent>
                                    <Box display="flex" alignItems="center" marginBottom="10px">
                                        <Avatar>{board.boardWriterId.charAt(0)}</Avatar>
                                        <Box marginLeft="10px">
                                            <Typography variant="body2" color="textSecondary">
                                                {board.boardWriterId}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {new Date(board.boardWriteDate).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box onClick={() => handleTitleClick(board)}>
                                        {board.boardImage ? (
                                            <CardMedia
                                                component="img"
                                                alt="게시글 이미지"
                                                height="400"
                                                image={board.boardImage}
                                                title={board.boardTitle}
                                                onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400"; }} // 이미지 로드 실패 시 대체 이미지 표시
                                                style={{ marginBottom: '10px', cursor: 'pointer', borderRadius: '8px' }}
                                            />
                                        ) : board.boardVideo ? (
                                            <CardMedia
                                                component="video"
                                                controls
                                                height="400"
                                                src={board.boardVideo}
                                                title={board.boardTitle}
                                                style={{ marginBottom: '10px', cursor: 'pointer', borderRadius: '8px' }}
                                            />
                                        ) : (
                                            <Typography variant="body2" color="textSecondary" style={{ marginBottom: '10px' }}>
                                                {board.boardContent}
                                            </Typography>
                                        )}
                                    </Box>
                                    <Typography variant="h6" component="h2" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                        {board.boardTitle}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" component="p" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                        조회수: {board.boardClickCount}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Modal
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: 'white',
                                boxShadow: 24,
                                padding: '20px',
                                outline: 'none',
                            }}
                        >
                            {selectedMedia && (
                                selectedMedia.endsWith('.mp4') || selectedMedia.endsWith('.webm') ? (
                                    <video src={selectedMedia} controls style={{ width: '100%', maxHeight: '80vh' }} />
                                ) : (
                                    <img src={selectedMedia} alt="Media" style={{ width: '100%', maxHeight: '80vh' }} />
                                )
                            )}
                        </Box>
                    </Fade>
                </Modal>
            </Container>
        </div>
    );
}

export default BoardList;