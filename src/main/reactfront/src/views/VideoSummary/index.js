import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Container, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation";

export default function VideoSummary() {
    const [videoFile, setVideoFile] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [videoDuration, setVideoDuration] = useState(0);
    const [userId, setUserId] = useState('');
    const [summaryTime, setSummaryTime] = useState('');
    const [cookies] = useCookies(['token']);
    const navigate = useNavigate();

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
                    setUserId(userDetails.data.userId);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        fetchUserData();
    }, [cookies.token]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setVideoFile(file);
        setVideoPreview(URL.createObjectURL(file));

        const videoElement = document.createElement('video');
        videoElement.preload = 'metadata';
        videoElement.onloadedmetadata = () => {
            setVideoDuration(videoElement.duration);
        };
        videoElement.src = URL.createObjectURL(file);
    };

    const handleUpload = async () => {
        if (!videoFile || !userId || !summaryTime) {
            alert('Please provide a video and summary time.');
            return;
        }

        const fileData = videoFile;
        const formData = new FormData();
        formData.append('video', videoFile);
        formData.append('userId', userId);
        formData.append('summaryTime', summaryTime);

        navigate('/loading', {
            state: {
                fileData,
                userId,
                summaryTime
            }
        });
    };

    const generateSummaryTimeOptions = () => {
        const options = [];
        for (let i = 10; i <= Math.floor(videoDuration); i += 10) {
            options.push(i);
        }
        return options;
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div>
            <Navigation/>
            <Container maxWidth="sm">
                <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
                    <Typography variant="h5" mb={3}>Upload Video</Typography>
                    {userId && (
                        <TextField
                            label="User ID"
                            variant="outlined"
                            fullWidth
                            value={userId}
                            disabled
                            sx={{ marginBottom: 2 }}
                        />
                    )}
                    {videoDuration > 0 && (
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel id="summary-time-label">Summary Time</InputLabel>
                            <Select
                                labelId="summary-time-label"
                                value={summaryTime}
                                onChange={(e) => setSummaryTime(e.target.value)}
                                label="Summary Time"
                            >
                                {generateSummaryTimeOptions().map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {formatTime(option)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                    <input
                        accept="video/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" component="span">
                            Choose Video
                        </Button>
                    </label>
                    {videoPreview && (
                        <Box mt={2}>
                            <video width="100%" height="auto" controls>
                                <source src={videoPreview} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </Box>
                    )}
                    <Box mt={2}>
                        <Button variant="contained" color="primary" onClick={handleUpload} disabled={!summaryTime}>
                            Upload
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}