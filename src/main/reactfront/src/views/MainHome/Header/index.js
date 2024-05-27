import React, {useEffect, useRef, useState} from 'react';
import logoW from './images/logoW.png'
import logo from './images/logo.png'
import {Link} from 'react-router-dom';
import './Style.css';
import '../../../App.css'
import smile from './images/smile.png';
import Typography from "@mui/joy/Typography";
import down from './images/down.png'
import s1 from './images/s1.png';
import s2 from './images/s2.jpg';
import s3 from './images/s3.png';
import vit from './images/vitimage.png';



let isScrolling = false;

function Header() {
    const [isModalOpen, setModalOpen] = useState(false);
    let scrollInterval; // 스크롤 인터벌을 저장할 변수

    const stopScrolling = () => {
        isScrolling = false; //Scorll 멈추기
        clearInterval(scrollInterval); // 인터벌 중단
    };

    const scrollToBottom = () => {
        clearInterval(scrollInterval); // 기존 인터벌 정리

        isScrolling = true;      //Scorll 자동으로 내리게 하기
        let scrollStep = 200; // 고정된 스크롤 단계 값
        scrollInterval = setInterval(() => {
            if (window.scrollY < document.body.scrollHeight - window.innerHeight && isScrolling) {
                window.scrollBy(0, scrollStep);
                // setIsScrolling(true); // 스크롤 시작
            } else {
                stopScrolling();
            }
        }, 500);
    };

    useEffect(() => {
        document.addEventListener('wheel', stopScrolling);
    });

    return (
        <div className='App'>
            <div>
                <header className="masthead">
                    <img src={down} alt='down' onClick={scrollToBottom} className="scrd"/>
                    <div className="container d-flex align-items-center flex-column">
                        <img className="masthead-avatar mb-3" src={logoW} alt="..." style={{maxWidth: '120px'}}/>
                        <h1 className="masthead-heading mb-2">ADDSHORTS</h1>
                        <p className="masthead-subheading mb-2" style={{fontWeight: 'bold'}}>
                            영상 요약 제작
                        </p>
                        <p className="masthead-subheading mb-3">
                            쇼츠를 제작해보세요!
                        </p>
                    </div>
                </header>
            </div>

            <div style={{marginTop: '100px'}}/>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '40px',
                marginLeft: '180px',
                marginBottom: '10px',
                fontFamily: "Noto Sans KR Medium"
            }}>
                <img src={logo} alt="..." style={{marginRight: '3px', width: '60px', height: '50px'}}/>
                <h5 style={{fontWeight: 'bold', fontSize: '26px', color: '#132650', fontFamily: "Noto Sans KR Medium" }}>종류</h5>
            </div>





            <div className="grid-container" style={{ maxWidth: '1200px', margin: 'auto', padding: '0 40px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', justifyItems: 'center' }}>
                    <Link to='/영상요약' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{
                            border: '2px solid #132650',
                            borderRadius: '10px',
                            boxShadow: '0 6px 10px rgba(0,0,0,0.1)',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            width: '250px',
                            backgroundColor: 'white'
                        }}>
                            <div style={{ padding: '20px', textAlign: 'center' }}>
                                <h5 style={{ marginBottom: '15px', fontWeight: 'bold', fontSize: '20px' }}>영상 요약</h5>
                                <img src={s1} alt="s1" style={{ width: '80px', height: '80px', objectFit: 'cover', margin: '0 auto' }} />
                                <p style={{ marginTop: '15px', color: '#132650', fontSize: '14px' }}>원하는 길이만큼 줄일 수 있습니다!</p>
                            </div>
                        </div>
                    </Link>

                    <Link to='/쇼츠제작' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div onClick={() => setModalOpen(true)} style={{
                            border: '2px solid #132650',
                            borderRadius: '10px',
                            boxShadow: '0 6px 10px rgba(0,0,0,0.1)',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            width: '250px',
                            backgroundColor: 'white'
                        }}>
                            <div style={{ padding: '20px', textAlign: 'center' }}>
                                <h5 style={{ marginBottom: '15px', fontWeight: 'bold', fontSize: '20px' }}>쇼츠 제작</h5>
                                <img src={s2} alt="s2" style={{ width: '80px', height: '80px', objectFit: 'cover', margin: '0 auto' }} />
                                <p style={{ marginTop: '15px', color: '#132650', fontSize: '14px' }}>주제를 선정하여 제작합니다!</p>
                            </div>
                        </div>
                    </Link>

                    <Link to='/커뮤니티' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{
                            border: '2px solid #132650',
                            borderRadius: '10px',
                            boxShadow: '0 6px 10px rgba(0,0,0,0.1)',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            width: '250px',
                            backgroundColor: 'white'
                        }}>
                            <div style={{ padding: '20px', textAlign: 'center' }}>
                                <h5 style={{ marginBottom: '15px', fontWeight: 'bold', fontSize: '20px' }}>커뮤니티</h5>
                                <img src={s3} alt="s3" style={{ width: '80px', height: '80px', objectFit: 'cover', margin: '0 auto' }} />
                                <p style={{ marginTop: '15px', color: '#132650', fontSize: '14px' }}>소통 및 홍보할 수 있습니다!</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>




            {/*밑에*/}
            <div style={{marginTop: '150px'}}/>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '40px',
                marginLeft: '180px',
                marginBottom: '50px'
            }}>
                <img src={logo} alt="..." style={{marginRight: '3px', width: '60px', height: '50px'}}/>
                <h5 id="study" style={{fontWeight: 'bold', fontSize: '26px', color: '#132650', fontFamily: "Noto Sans KR Medium"}}>ViT 기술 사용</h5>
            </div>

            <div style={{maxWidth: '1200px', margin: 'auto', padding: '0 40px'}}>
                <div className="process-grid-container"
                     style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px'}}>

                    <div style={{
                        alignContent: 'center',
                        width: '600px',
                        height: '150px',
                        border: '2px solid #132650',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '15px',
                        backgroundColor: 'white',
                        fontFamily: "Noto Sans KR Medium"
                    }}>
                        <div>
                            <h1 style={{fontWeight: 'bold', color: '#4A90E2', marginBottom: '5px',fontFamily: "Noto Sans KR Medium"}}>01</h1>
                            <h5 style={{margin: '0', color: '#132650', fontFamily: "Noto Sans KR Medium"}}>사용자가 원하는<br/><b>비디오</b>와 <b>요약시간</b> 선택</h5>
                        </div>
                    </div>

                    <div style={{alignSelf: 'stretch', display: 'flex', alignItems: 'center'}}>
                        <i className="fas fa-arrow-right" style={{fontSize: '24px', color: '#4A90E2'}}></i>
                    </div>

                    <div style={{
                        alignContent: 'center',
                        width: '600px',
                        height: '150px',
                        border: '2px solid #132650',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '15px',
                        backgroundColor: 'white',
                        fontFamily: "Noto Sans KR Medium"
                    }}>
                        <div>
                            <h1 style={{fontWeight: 'bold', color: '#4A90E2', marginBottom: '5px', fontFamily: "Noto Sans KR Medium"}}>02</h1>
                            <h5 style={{margin: '0', color: '#132650', fontFamily: "Noto Sans KR Medium"}}>비디오 <b>프레임 샘플링</b> 및<br/><b>전처리</b></h5>
                        </div>
                    </div>

                    <div style={{alignSelf: 'stretch', display: 'flex', alignItems: 'center'}}>
                        <i className="fas fa-arrow-right" style={{fontSize: '24px', color: '#4A90E2'}}></i>
                    </div>

                    <div style={{
                        alignContent: 'center',
                        width: '600px',
                        height: '150px',
                        border: '2px solid #132650',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '15px',
                        backgroundColor: 'white',
                        fontFamily: "Noto Sans KR Medium"
                    }}>
                        <div>
                            <h1 style={{fontWeight: 'bold', color: '#4A90E2', marginBottom: '5px', fontFamily: "Noto Sans KR Medium"}}>03</h1>
                            <h5 style={{margin: '0', color: '#132650' , fontFamily: "Noto Sans KR Medium"}}><b>중요도 예측</b> 및 <b>클립</b> 생성</h5>
                        </div>
                    </div>

                    <div style={{alignSelf: 'stretch', display: 'flex', alignItems: 'center'}}>
                        <i className="fas fa-arrow-right" style={{fontSize: '24px', color: '#4A90E2'}}></i>
                    </div>

                    <div style={{
                        alignContent: 'center',
                        width: '600px',
                        height: '150px',
                        border: '2px solid #132650',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '15px',
                        backgroundColor: 'white'
                        , fontFamily: "Noto Sans KR Medium"
                    }}>
                        <div>
                            <h1 style={{fontWeight: 'bold', color: '#4A90E2', marginBottom: '5px', fontFamily: "Noto Sans KR Medium"}}>04</h1>
                            <h5 style={{margin: '0', color: '#132650', fontFamily: "Noto Sans KR Medium"}}>최종 <b>하이라이트 영상</b> 생성</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                        src={vit}
                        alt="Logo"
                        style={{ width: '50%', height: 'auto' }}
                    />
                </div>


                <div style={{color: '#1D2B64', fontWeight: 'bold'}}>
                    <h4 style={{lineHeight: 2.0, fontFamily: "Noto Sans KR Medium"}}>Vision Transformer 모델 외에도 좋은 알고리즘과 다양한 기술들을 활용하고 결합하여
                        <br/>최상의 품질을 제공할 수 있도록 소프트웨어를 제공</h4>
                </div>
            </div>
        </div>
    )
}

export default Header