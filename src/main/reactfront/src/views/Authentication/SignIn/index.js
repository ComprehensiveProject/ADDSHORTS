import React, {useState} from "react";
import {Box, Button, Card, TextField} from "@mui/material";
import axios from "axios";
import {useCookies} from "react-cookie";
import {useUserStore} from "../../../stores";
import Typography from "@mui/material/Typography";
import {signInApi} from "../../../apis";

export default function SignIn({setAuthView}){
    const Purple4th = '#999aae';
    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const [cookies, setCookies] = useCookies();
    const {user, setUser} = useUserStore();
    const signInHandler = async () =>{
        if(userId.length === 0 || userPassword.length === 0){
            alert('아이디 또는 비밀번호를 입력하세요. ');
            return;
        }

        const data = {
            userId,
            userPassword
        }

        const signInResponse = await signInApi(data);
        if(!signInResponse){
            alert('아이디 또는 비밀번호가 일치하지 않습니다');
            return;
        }

        if(!signInResponse.result){
            alert('아이디 또는 비밀번호가 일치하지 않습니다');
            return;
        }
        const {token, exprTime, user} = signInResponse.data;
        const expires = new Date();
        expires.setMilliseconds(expires.getMilliseconds() + exprTime);
        setCookies('token', token, {expires});
        setUser(user);
    }
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: "100%", height: "100%", backgroundColor: Purple4th }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <img alt="loginBackground" src="/images/mainLogo.png" style={{ width: '100%', height: 'auto' }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', gap: 2 }}>
                    <TextField
                        label="아이디"
                        type="id"
                        variant="standard"
                        onChange={(e) => setUserId(e.target.value)}
                        sx={{ fontSize: '1.9vw' }}
                    />
                    <TextField
                        label="비밀번호"
                        type="password"
                        variant="standard"
                        onChange={(e) => setUserPassword(e.target.value)}
                        sx={{ fontSize: '1.9vw' }}
                    />
                    <Button onClick={signInHandler}>로그인</Button>
                    <Button onClick={() => setAuthView(true)}>회원가입</Button>
                </Box>
            </div>
        </div>
    );
}