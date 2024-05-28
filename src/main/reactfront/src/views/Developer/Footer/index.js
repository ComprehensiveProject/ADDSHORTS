import React, {useEffect, useState} from 'react';
import './style.css';
import '../../../App.css';

export default function Footer() {

    return (
        <div className='App'>
            <div style={{marginTop: '100px'}}>

                <footer className="footer" style={{backgroundColor: '#F6F6F6', color: 'black' , height: '300px'}}>
                    <div className="footer-container">
                        <div className="row">

                            <div className="col-lg-6 col-md-12 mb-2 d-flex">
                                <div>
                                    <h5 className="uu" style={{color:'#050099'}}>About</h5>
                                    <b>양지우와 아이들 | 박성호 박대준 서정훈 양지우</b>
                                    <p style={{color: '#4C4C4C', margin: '0px'}}>충남 아산시 탕정면 선문로221번길 70</p>
                                    <p style={{color:'#4C4C4C'}}> Are You T.Since 2024</p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 mb-2">
                                <h5 className="uu" style={{color:'#050099'}}>Contact</h5>
                                <div>
                                    <a href="mailto:junghun_1999@naver.com" className="email-link" style={{color:'#4C4C4C'}}>junghun_1999@naver.com</a>
                                    <p style={{color:'#4C4C4C'}}>010-4652-5320</p>
                                </div>
                            </div>


                            <div className="col-lg-3 col-md-6 mb-2">
                                <h5 className="uu" style={{color:'#050099'}}>Follow Us</h5>
                                <p style={{marginTop: '-15px', fontSize: '11px', color:'#4C4C4C'}}>ADDSHORTS 공식채널</p>
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
                                    <a className="social-icon github-icona" href="https://propose1.netlify.app/">
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