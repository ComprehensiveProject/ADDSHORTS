import React, {useEffect, useState} from 'react';
import './style.css'
import '../../../App.css'
import up from './images/up.png'

export default function Footer() {

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className='App'>
            <div style={{marginTop: '100px'}}>
                <img src={up} alt='up' onClick={scrollToTop} className="scru"/>

                <footer className="footer" style={{backgroundColor: 'black', color: 'white'}}>
                    <div className="footer-container">
                        <div className="row">

                            <div className="col-lg-6 col-md-12 mb-2 d-flex">
                                <div>
                                    <h5 className="uu">About</h5>
                                    <b>양지우와 아이들 | 박성호 박대준 서정훈 양지우</b>
                                    <p style={{color: '#CECECE', margin: '0px'}}>충남 아산시 탕정면 선문로221번길 70</p>
                                    <p> ADDSHORTS.Since 2024</p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 mb-2">
                                <h5 className="uu">Contact</h5>
                                <div>
                                    <a href="mailto:junghun_1999@naver.com" className="email-link">junghun_1999@naver.com</a>
                                    <p>010-4652-5320</p>
                                </div>
                            </div>


                            <div className="col-lg-3 col-md-6 mb-2">
                                <h5 className="uu">Follow Us</h5>
                                <p style={{marginTop: '-15px', fontSize: '11px'}}>ADDSHORTS 공식채널</p>
                                <div className="social-links" style={{marginTop: '-10px'}}>
                                    <a className="social-icon facebook-icon"
                                       href="https://www.facebook.com/sunmoonuniversity/?locale=ko_KR"><i
                                        className="fab fa-facebook-f"/></a>
                                    <a className="social-icon instagram-icon"
                                       href="https://www.instagram.com/jh_chelling/"><i
                                        className="fab fa-instagram"/></a>
                                    <a className="social-icon youtube-icon"
                                       href="https://www.youtube.com/channel/UCwK3hT2ah8OA9Hzjmiq4TmQ/videos"><i
                                        className="fab fa-youtube"/></a>
                                    <a className="social-icon github-icon" href="https://propose1.netlify.app/">
                                        <i className="fab fa-github"></i>
                                    </a>

                                    <a className="social-icon notion-icon" href="https://www.notion.so/70a01581074f44e09e4fe7fd902650e1">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg" alt="Notion Logo" style={{ width: '24px', height: '24px' }} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}