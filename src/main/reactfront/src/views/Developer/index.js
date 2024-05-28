import React from 'react';
import Navigation from "../../views/Navigation";
import '../../App.css';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import jhImage from "./images/jh.jpg";
import who from './images/user.png';
import Footer from './Footer/index';

const ProjectIntro = () => (
    <div className='App'>
        <Navigation/>
        <div style={{textAlign: 'center'}} className='App'>
            <div style={{textAlign: 'center'}} className='App'>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh'}}>
                    <div style={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                        <h1 style={{fontSize: '36px', color: '#132650', fontWeight: 'bold',fontFamily: "'NotoSansKR-Medium', sans-serif"}}>ADDSHORTS에 오신 것을 환영합니다</h1>
                        <p style={{fontSize: '18px', color: '#333', marginTop: '25px',fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                            저희 팀의 메인 로고인 카메라는 "영상 요악"을 상징하며,
                            '편집'을 의미합니다. <br/>이는 최고 수준의 쇼츠를 제공하겠다는 저희의 약속과 마음을 나타냅니다.
                        </p>
                    </div>
                </div>
            </div>

            {/*ADDSHORTS에 오신 것을 환영합니다*/}
            {/*ADDSHORTS는 영상 요약 및 최고 수준의 쇼츠 제작을 전문으로 하는 웹사이트입니다. 저희의 사명은 긴 영상을 매력적이고 흥미로운 짧은 영상으로 변환하여, 시청자들의 관심을 사로잡고 콘텐츠의 영향을 극대화하는 것입니다.*/}

            {/*저희 팀의 메인 로고인 카메라는 단순한 상징 그 이상입니다. 이 카메라는 저희의 핵심 가치와 탁월함에 대한 약속을 담고 있습니다. 카메라는 "영상 요약"을 상징하며, 긴 콘텐츠를 간결하고 흥미로운 요약으로 압축하는 저희의 전문성을 나타냅니다. */}
            {/*또한, '편집'을 의미하여, 창의적 스토리텔링과 세심한 편집을 통해 최고 품질의 쇼츠를 제공하겠다는 저희의 다짐을 반영합니다.*/}

            {/*저희의 약속*/}
            {/*전문적인 영상 요약: 디지털 시대에는 주의 집중 시간이 짧아지고 있습니다. 그래서 저희는 긴 영상을 간결하고 흥미로운 쇼츠로 압축하는 데 탁월한 능력을 발휘합니다. 원본 콘텐츠의 핵심 메시지와 본질을 유지하면서도 짧고 매력적인 요약을 제공합니다.*/}

            {/*최고 수준의 편집: 저희 팀은 최신 기술과 창의적 기법을 활용하여 모든 쇼츠가 최고 품질을 자랑하도록 합니다. 각 쇼츠는 세심하게 편집되고, 시청자들에게 강한 인상을 남길 수 있도록 제작됩니다.*/}

            <div style={{marginTop: '-100px'}}></div>
            <div style={{display: 'flex', alignItems: 'center', marginLeft: '150px', marginBottom: '10px'}}>
            </div>

            <Container maxWidth="lg" id="team">
                <Box className="team-container" sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column', md: 'row'},
                    gap: 2,
                    justifyContent: 'space-around',
                    margin: 'auto',
                }}>

                    <Card sx={{
                        maxWidth: 345,
                        boxShadow: 'none',
                        backgroundColor: 'white',
                        '&:hover': {
                            backgroundColor: 'white',
                            boxShadow: 'none',
                            transform: 'none'
                        }
                    }}>

                        <CardMedia
                            component="img"
                            sx={{
                                height: 200,
                                width: 200,
                                borderRadius: '50%',
                                margin: 'auto'
                            }}
                            image={who}
                            alt="jh"
                        />

                        <CardContent sx={{textAlign: 'center'}}>
                            <Typography gutterBottom variant="h5" component="div" sx={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                                박성호
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                               ㅋㅋㅋ
                            </Typography>
                        </CardContent>

                    </Card>

                    <Card sx={{
                        maxWidth: 345,
                        boxShadow: 'none',
                        backgroundColor: 'white',
                        '&:hover': {
                            backgroundColor: 'white',
                            boxShadow: 'none',
                            transform: 'none'
                        }
                    }}>

                        <CardMedia
                            component="img"
                            sx={{
                                height: 200,
                                width: 200,
                                borderRadius: '50%',
                                margin: 'auto'
                            }}
                            image={who}
                            alt="jh"
                        />

                        <CardContent sx={{textAlign: 'center'}}>
                            <Typography gutterBottom variant="h5" component="div" sx={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                                박대준
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                                ㅋㅋㅋ
                            </Typography>
                        </CardContent>
                    </Card>


                    <Card sx={{
                        maxWidth: 345,
                        boxShadow: 'none',
                        backgroundColor: 'white',
                        '&:hover': {
                            backgroundColor: 'white',
                            boxShadow: 'none',
                            transform: 'none'
                        }
                    }}>

                        <CardMedia
                            component="img"
                            sx={{
                                height: 200,
                                width: 200,
                                borderRadius: '50%',
                                margin: 'auto'
                            }}
                            image={jhImage}
                            alt="jh"
                        />

                        <CardContent sx={{textAlign: 'center'}}>
                            <Typography gutterBottom variant="h5" component="div" sx={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                                서정훈
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                                비트코인 5억갑니다.
                            </Typography>
                        </CardContent>
                    </Card>


                    <Card sx={{
                        maxWidth: 345,
                        boxShadow: 'none',
                        backgroundColor: 'white',
                        '&:hover': {
                            backgroundColor: 'white',
                            boxShadow: 'none',
                            transform: 'none'
                        }
                    }}>
                        <CardMedia
                            component="img"
                            sx={{
                                height: 200,
                                width: 200,
                                borderRadius: '50%',
                                margin: 'auto'
                            }}
                            image={who}
                            alt="jh"
                        />

                        <CardContent sx={{textAlign: 'center'}}>
                            <Typography gutterBottom variant="h5" component="div" sx={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                                양지우
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                                ㅋㅋㅋㅋ
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Container>


        </div>
        <Footer/>
    </div>
);

export default ProjectIntro;