import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container, List, ListItem, ListItemText, Paper } from '@mui/material';
import Navigation from "../views/Navigation";

export default function ShortsTopicSelection() {
    const location = useLocation();
    const navigate = useNavigate();
    const { topics = {}, fileData, userId } = location.state || {};
    const [selectedTopic, setSelectedTopic] = useState({ title: '', content: '' });

    const handleTopicSelect = (topic, content) => {
        setSelectedTopic({ title: topic, content });
    };

    const handleNext = () => {
        if (!selectedTopic.title) {
            alert('주제를 선택해주세요.');
            return;
        }

        navigate('/shortsProcessing', {
            state: {
                selectedTopic: selectedTopic.content,  // 주제의 내용을 전달
                fileData,
                userId
            }
        });
    };

    return (
        <div>
            <Navigation />
            <Container maxWidth="md" style={{ marginTop: '100px' }}>
                <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                    <Typography variant="h4" mb={3}>주제를 선택하세요</Typography>
                    <List style={{ maxHeight: '300px', overflow: 'auto' }}>
                        {Object.keys(topics).map((topic, index) => (
                            <ListItem
                                button
                                key={index}
                                selected={selectedTopic.title === topic}
                                onClick={() => handleTopicSelect(topic, topics[topic])}
                                style={{
                                    borderRadius: '10px',
                                    marginBottom: '10px',
                                    backgroundColor: selectedTopic.title === topic ? '#f0f0f0' : '#fff',
                                    transition: 'background-color 0.3s',
                                }}
                            >
                                <ListItemText
                                    primary={
                                        <Typography variant="h6" style={{ fontWeight: selectedTopic.title === topic ? 'bold' : 'normal' }}>
                                            {topic}
                                        </Typography>
                                    }
                                    secondary={topics[topic]}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Box mt={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            style={{
                                fontSize: '16px',
                                padding: '10px 20px',
                                textTransform: 'none',
                            }}
                        >
                            다음
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </div>
    );
}