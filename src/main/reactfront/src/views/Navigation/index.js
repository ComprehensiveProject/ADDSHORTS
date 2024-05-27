import {useEffect, useRef, useState} from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from './images/logo.png'
import Dropdown from 'react-bootstrap/Dropdown';
import './Navigation.css'
import {Link, useNavigate} from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {useUserStore} from "../../stores";
import {useCookies} from "react-cookie";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import axios from "axios";


const Navigation = () => {
    const [show, setShow] = useState(true);
    const [cookies, setCookies] = useCookies(['token']);
    const { user, setUser, removeUser } = useUserStore();
    const [userProfile, setUserProfile] = useState(user ? user.userProfile : "path-to-default-image.jpg");
    const [userName, setUserName] = useState(user ? user.userName : "");
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const profileBtnRef = useRef(null);

    let lastScrollY = window.scrollY;


    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                setShow(false);
            } else {
                setShow(true);
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, false);
        return () => {
            window.removeEventListener('scroll', handleScroll, false);
        };
    }, []);


    const logOutHandler = () => {
        setCookies('token', '', {expires: new Date()});
        removeUser();
        navigate('/');
    }

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        if (cookies.token) {
            axios.get('/api/auth/currentUser', {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            })
                .then(response => {
                    const fetchedUser = response.data;
                    // 사용자 정보를 상태에 저장
                    setUser(fetchedUser);

                    setUserProfile(fetchedUser.userProfile || "path-to-default-image.jpg");
                    setUserName(fetchedUser.userName || "");
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, []);

    useEffect(() => {
        if (user) {
            setUserName(user.userName || "");
            setUserProfile(user.userProfile || "path-to-default-image.jpg");
        }
    }, [user]);


    return (
        <div className='App'>
            <Navbar expand="lg" sticky="top" className={`custom-navbar mr-auto ${show ? 'visible' : 'hidden'}`}>
                <Navbar.Brand href="/">
                    <img src={logo} alt="Logo" className="abc"/>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-center abcd">
                    <Nav>
                        <Nav.Link href="/main" className="custom-nav-link" >Home</Nav.Link>
                        <Nav.Link href="/remove" className="custom-nav-link">영상 요약</Nav.Link>
                        <Nav.Link href="/shorts" className="custom-nav-link">쇼츠 제작</Nav.Link>
                        <Nav.Link href="/community" className="custom-nav-link">커뮤니티</Nav.Link>
                        <Nav.Link href="/developer" className="custom-nav-link">개발팀</Nav.Link>
                    </Nav>

                    <Nav>
                        {userName ? (
                            <Dropdown>
                                <Dropdown.Toggle as={Nav.Link} id="dropdown-profile" className="kkk">
                                    <div className="userName"> {userName + '님'}</div>
                                    <Avatar
                                        ref={profileBtnRef}
                                        src={userProfile}
                                        onClick={handleProfileClick}
                                        style={{ cursor: 'pointer', marginRight: '10px' }}
                                    />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="/mypage">정보수정</Dropdown.Item>
                                    <Dropdown.Item onClick={logOutHandler}>로그아웃</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Nav.Link href="/signin" className="custom-login-link abcd">로그인</Nav.Link>
                        )}
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default Navigation;