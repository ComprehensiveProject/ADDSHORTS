import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container, List, ListItem, ListItemText } from '@mui/material';
import Navigation from "../views/Navigation";

export default function ShortsTopicSelection() {
    const location = useLocation();
    const navigate = useNavigate();
    const { topics = {}, fileData, userId } = location.state || {};  // 초기값 설정 및 값 할당
    const [selectedTopic, setSelectedTopic] = useState('');

    const handleTopicSelect = (topic) => {
        setSelectedTopic(topic);
    };

    const handleNext = () => {
        if (!selectedTopic) {
            alert('주제를 선택해주세요.');
            return;
        }

        navigate('/shortsProcessing', {
            state: {
                selectedTopic,
                fileData,
                userId
            }
        });
    };

    return (
        <div>
            <Navigation/>
            <Container maxWidth="sm">
                <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
                    <Typography variant="h5" mb={3}>Select a Topic</Typography>
                    <List>
                        {Object.keys(topics).map((topic, index) => (
                            <ListItem
                                button
                                key={index}
                                selected={selectedTopic === topic}
                                onClick={() => handleTopicSelect(topic)}
                            >
                                <ListItemText primary={`${topic}: ${topics[topic]}`} />
                            </ListItem>
                        ))}
                    </List>
                    <Box mt={2}>
                        <Button variant="contained" color="primary" onClick={handleNext}>
                            다음
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}
