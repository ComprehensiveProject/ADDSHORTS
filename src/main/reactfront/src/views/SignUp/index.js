import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import axios from 'axios';
import '../../App.css';

// 필요한 import 추가
import { signUpApi } from '../../apis';

const defaultTheme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();

    const Purple4th = '#999aae';
    const [userId, setUserId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordCheck, setUserPasswordCheck] = useState('');
    const [userName, setUserName] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userProfile, setUserProfile] = useState('');
    const defaultProfilePic = './assets/images/default_profile.png';

    // 유효성 검사 상태 추가
    const [validationErrors, setValidationErrors] = useState({});
    const [isIdValid, setIsIdValid] = useState(null);
    const [isIdChecked, setIsIdChecked] = useState(false);

    const validateForm = () => {
        let errors = {};

        // 이메일 유효성 검사
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(userEmail)) {
            errors.userEmail = '올바른 이메일 주소를 입력해주세요.';
        }

        // 비밀번호 유효성 검사
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,12}$/;
        if (!passwordPattern.test(userPassword)) {
            errors.userPassword = '비밀번호는 4~12자의 영문 대소문자, 숫자로만 입력해야 합니다.';
        }

        // 비밀번호 확인 검사
        if (userPassword !== userPasswordCheck) {
            errors.userPasswordCheck = '비밀번호가 일치하지 않습니다.';
        }

        // 이름 유효성 검사
        const namePattern = /^[가-힣]{2,4}$/;
        if (!namePattern.test(userName)) {
            errors.userName = '이름이 올바르지 않습니다.';
        }

        // 휴대폰 번호 유효성 검사
        const phonePattern = /^[0-9]{10,11}$/;
        if (!phonePattern.test(userPhone)) {
            errors.userPhoneNumber = '올바른 휴대폰 번호를 입력해주세요.';
        }

        // 닉네임 유효성 검사
        if (!userId) {
            errors.userId = '아이디를 입력해주세요.';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const checkIdDuplicate = async () => {
        const response = await axios.post('/api/auth/checkId', { userId });
        setIsIdChecked(true);
        if (response.data.isDuplicate) {
            alert('아이디가 이미 사용 중입니다.');
            setIsIdValid(false);
        } else {
            alert('사용 가능한 아이디입니다.');
            setIsIdValid(true);
        }
    };

    const signUpHandler = async () => {
        if (!validateForm()) return;
        if (!isIdValid) {
            return;
        }

        const data = {
            userId,
            userEmail,
            userPassword,
            userPasswordCheck,
            userGender,
            userName,
            userPhone,
            userProfile: ''
        };

        try {
            const signUpResponse = await signUpApi(data);
            console.log('signUpResponse:', signUpResponse); // 응답을 콘솔에 출력

            if (!signUpResponse) {
                alert('회원가입 실패1');
                return;
            }

            if (!signUpResponse.result) {
                alert(`회원가입 실패2: ${signUpResponse.message || '알 수 없는 오류'}`);
                return;
            }
            alert('회원가입 성공');
            navigate('/signin');
        } catch (error) {
            console.error('회원가입 요청 중 에러 발생:', error);
            alert(`회원가입 중 에러가 발생했습니다: ${error.message}`);
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        signUpHandler();
    };

    const sendNum = () => {
        // 이메일 인증 로직 추가
    };

    return (
        <div className='App'>
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 2,
                                mx: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                회원가입
                            </Typography>

                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: '100%' }}>
                                <TextField
                                    margin="dense"
                                    required
                                    fullWidth
                                    id="mail"
                                    type="email"
                                    label="이메일 주소"
                                    name="mail"
                                    autoComplete="mail"
                                    autoFocus
                                    placeholder="이메일 입력"
                                    error={!!validationErrors.userEmail}
                                    helperText={validationErrors.userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                />

                                <TextField
                                    margin="dense"
                                    required
                                    fullWidth
                                    name="password"
                                    label="비밀번호"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    placeholder="비밀번호"
                                    error={!!validationErrors.userPassword}
                                    helperText={validationErrors.userPassword}
                                    onChange={(e) => setUserPassword(e.target.value)}
                                />

                                <TextField
                                    margin="dense"
                                    required
                                    fullWidth
                                    name="passwordCheck"
                                    label="비밀번호 확인"
                                    type="password"
                                    id="passwordCheck"
                                    placeholder="비밀번호 확인"
                                    error={!!validationErrors.userPasswordCheck}
                                    helperText={validationErrors.userPasswordCheck}
                                    onChange={(e) => setUserPasswordCheck(e.target.value)}
                                />

                                <TextField
                                    margin="dense"
                                    required
                                    fullWidth
                                    id="name"
                                    label="이름"
                                    name="name"
                                    autoComplete="name"
                                    placeholder="이름 입력"
                                    error={!!validationErrors.userName}
                                    helperText={validationErrors.userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />

                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                                    <TextField
                                        margin="dense"
                                        required
                                        fullWidth={false}
                                        style={{ flex: 9 }}
                                        id="userId"
                                        label="아이디"
                                        name="userId"
                                        placeholder="아이디 입력"
                                        error={!!validationErrors.userId}
                                        helperText={validationErrors.userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                    />

                                    <Button
                                        variant="contained"
                                        sx={{
                                            mt: 2,
                                            backgroundColor: '#1D2B64',
                                            padding: '12px 24px', // 패딩을 sx prop 안에 포함
                                            fontSize: '16px' // 폰트 크기를 sx prop 안에 포함
                                        }}
                                        onClick={checkIdDuplicate}
                                        name="checkIdBtn"
                                    >
                                        아이디 중복 검사
                                    </Button>

                                </div>

                                <TextField
                                    margin="dense"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="휴대폰 번호"
                                    name="phone"
                                    placeholder="휴대폰 번호"
                                    error={!!validationErrors.userPhoneNumber}
                                    helperText={validationErrors.userPhoneNumber}
                                    onChange={(e) => setUserPhone(e.target.value)}
                                />

                                <FormControl component="fieldset" sx={{ mt: 2, mb: 1 }}>
                                    <FormLabel component="legend">성별</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-label="gender"
                                        name="gender"
                                        value={userGender}
                                        onChange={(e) => setUserGender(e.target.value)}
                                    >
                                        <FormControlLabel value="male" control={<Radio />} label="남성" />
                                        <FormControlLabel value="female" control={<Radio />} label="여성" />
                                        <FormControlLabel value="other" control={<Radio />} label="기타" />
                                    </RadioGroup>
                                </FormControl>

                                <Button
                                    variant="contained"
                                    sx={{
                                        mt: 2,
                                        mb: 1,
                                        padding: '4px 8px',
                                        backgroundColor: '#1D2B64',
                                        '&:hover': {
                                            backgroundColor: 'black'
                                        },
                                        width: '100%'
                                    }}
                                    onClick={signUpHandler}
                                >
                                    회원가입
                                </Button>

                                <Grid container>
                                    <Grid item xs />
                                    <Grid item>
                                        <Link to="/signin" variant="body2" style={{ textDecoration: 'none' }}>
                                            {"이미 계정이 있나요? 로그인하러 가기"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    );
}
