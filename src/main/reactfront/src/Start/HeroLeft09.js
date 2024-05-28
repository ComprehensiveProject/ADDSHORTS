/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Button from '@mui/joy/Button';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import TwoSidedLayout from './TwoSidedLayout';
import {useNavigate} from "react-router-dom";
import MuiLink from '@mui/material/Link';
import aip from "./images/헤더사진.jpg";
import './Start.css';

export default function HeroLeft09() {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/main');
    };


    return (
        <div className='App'>
            <div className="d-flex justify-content-center align-items-center make" style={{  color: '#132650' }}>
                <div style={{ marginRight: '100px' }}>
                    <Typography
                        level="h1"
                        fontWeight="xl"
                        fontSize="clamp(1.575rem, 1.3636rem + 1.4818vw, 3rem)"
                        textColor="#132650"
                        sx={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}
                    >
                        영상요약에 <br /> 오신 것을 환영합니다!
                    </Typography>

                    <Typography level="h4" marginTop="20px" sx={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                        쉽고 간편하게 쇼츠를
                    </Typography>
                    <Typography level="h4" sx={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                        제작해보세요!
                    </Typography>

                    <Button
                        size="lg"
                        endDecorator={<ArrowForward fontSize="xl" />}
                        sx={{ mt: 2, mb: 1 , fontFamily: "'NotoSansKR-Medium', sans-serif"}}
                        onClick={handleButtonClick}
                    >
                        시작하기
                    </Button>
                    <Typography sx={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                        회원인가요?{' '}
                        <MuiLink component={RouterLink} to="/signin" fontWeight="lg" sx={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                            로그인 하러가기
                        </MuiLink>
                    </Typography>
                </div>

                <img src={aip} alt="Description" style={{ width: '600px', height: 'auto' }} />
            </div>








        </div>
    );
}