import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from './Typography';
import Button from './Button';
import aic from './images/AI대화.png';
import eng from './images/영어학습.png';
import logo from './images/logo.png';
import everyone from './images/남녀노소.jpg';
import freedom from './images/자유.png';
import study from './images/학습.png';
import free from './images/무료.png';
import design from './images/디자인.png';
import '../../../App.css'
import studyImg1 from './images/studyImg1.png'
import './vip.css';
import hugi from './images/후기.png';
import sa1 from './images/1번 사진.png';
import sa2 from './images/2번 사진.gif';
import sa3 from './images/3번 사진.jpg';
import sa4 from './images/4번 사진.jpg';



const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const customItem = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRight: '1px solid #ccc', // 오른쪽 테두리만 추가
  padding: '10px',
  margin: '10px'
};

const customImage = {
  maxWidth: '60%',
  height: 'auto',
};


export default function Mainarea(){


  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setSelectedQuestion(selectedQuestion === index ? null : index);
  };

  const faqData = [
    {
      question: '어떻게 시작하나요?',
      answer: 'ADDSHORTS 웹사이트에서 회원가입을 해보세요.'
    },
    {
      question: 'ADDSHORTS는 무료인가요?',
      answer: 'ADDSHORTS는 기본적으로 무료로 제공되고 있으며, 추후에 프리미엄 기능을 넣어 구독을 추가할 예정입니다.'
    },
    {
      question: '왜 ADDSHORTS인가요?',
      answer: 'ADD는 AD or ADD의 의미로 광고나 추가, SHORTS는 요약영상을 의미합니다. ' +
          '이렇게 만들어진 요약본을 많이 만들거나 홍보한다는 의미입니다.'
    },
    {
      question: '추가적인 질문이 있어요!',
      answer: '추가적인 질문이 있으시면 아래하단에 연락처나 메일로 문의해주시기 바랍니다.'
    }
  ];

    return (
        <>
        <div className='App'>

          <div style={{marginTop : '150px'}}/>

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '40px', marginLeft: '180px', marginBottom : '10px'}}>
            <img src={logo} alt="..." style={{marginRight: '3px', width: '60px', height: '50px'}}/>
            <h5 id="study" style={{ fontWeight: 'bold', fontSize: '26px', color: '#132650', fontFamily: "Noto Sans KR Medium" }}>사용 효과</h5>
          </div>

          <section className="page-section" id="portfolio" style={{ marginTop: '-70px', cursor: 'default', padding: '80px 0'}}>
            <div className="container">
              <div className="row justify-content-center">
                {/* Portfolio Item 1 */}
                <div className="col-md-6 col-lg-5 mb-5 d-flex align-items-stretch">
                  <div className="portfolio-item mx-auto" style={{ background: '#ffffff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s ease-in-out' }}>
                    <img className="img-fluid" src={eng} alt="..." style={{ width: '100%', height: '300px', objectFit: 'cover', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }} />
                    <p style={{ padding: '30px', color: '#132650', fontSize: '20px', fontWeight: 'bold', textAlign: 'center', margin: '0', fontFamily: "Noto Sans KR Medium" }}>
                      사용자가 원할 때마다 언제 어디서든
                    </p>
                  </div>
                </div>
                {/* Portfolio Item 2 */}
                <div className="col-md-6 col-lg-5 mb-5 d-flex align-items-stretch">
                  <div className="portfolio-item mx-auto" style={{ background: '#ffffff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s ease-in-out' }}>
                    <img className="img-fluid" src={studyImg1} alt="..." style={{ width: '100%', height: '300px', objectFit: 'cover', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }} />
                    <p style={{ padding: '30px', color: '#132650', fontSize: '20px', fontWeight: 'bold', textAlign: 'center', margin: '0', fontFamily: "Noto Sans KR Medium" }}>
                      쉽고 빠른 편집과 홍보까지
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <style jsx>{`
        .portfolio-item:hover {
          transform: translateY(-10px);
          box-shadow: 0 16px 30px rgba(0, 0, 0, 0.2);
        }
      `}</style>
          </section>




          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '180px'}}>
            <img src={logo} alt="..." style={{marginRight: '3px', width: '60px', height: '50px'}}/>
            <h5 id="study" style={{ fontWeight: 'bold', fontSize: '26px', color: '#132650', fontFamily: "Noto Sans KR Medium" }}>사용 대상</h5>
          </div>

          <Box
              component="section"
              sx={{ display: 'flex', overflow: 'hidden', py: 5 }}
          >
            <Container sx={{ mt: 5, mb: 20, display: 'flex', position: 'relative', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                <Box sx={{ flexShrink: 0, mr: 12 }}>
                  <Box
                      component="img"
                      src={everyone}
                      alt="combined image"
                      sx={{ width: '500px', height: 'auto', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                  />
                </Box>
                <Box sx={{ borderLeft: '2px solid #ddd', pl: 6 }}>
                  <Typography variant="h6" sx={{ my: 1, fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'left', color: '#132650' }}>
                    남녀노소
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 3, fontWeight: 'bold' , lineHeight: 1.7, color: '#132650' }}>
                    {
                        '모두가 손쉽게 사용할 수 있고, 누구나 간편하게 접근할 수 있습니다. ' +
                        '사용자 친화적인 인터페이스 덕분에 빠르게 익히고 활용할 수 있으며,' +
                        ' 직관적인 디자인과 간단한 기능 덕분에 시간과 노력을 절약할 수 있어 효율성을 극대화할 수 있습니다.'
                    }
                  </Typography>
                </Box>
              </Box>
            </Container>
          </Box>


          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '180px'}}>
            <img src={logo} alt="..." style={{marginRight: '3px', width: '60px', height: '50px'}}/>
            <h5 id="study" style={{ fontWeight: 'bold', fontSize: '26px', color: '#132650', fontFamily: "Noto Sans KR Medium" }}>사용하는 이유</h5>
          </div>
          <div style={{marginTop : '-30px'}}></div>


          <Container
              sx={{
                mt: { xs: 5, md: 10 },
                mx: 'auto',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontFamily: "'NotoSansKR-Medium', sans-serif",
                maxWidth: 'lg',
                px: { xs: 2, md: 4 }
              }}
          >
            <Grid container spacing={{ xs: 4, md: 8 }} alignItems="stretch">
              {[
                { img: freedom, text: '언제 어디서나 마음 껏 자유롭게!', alt: 'icon1', spacing: true },
                { img: study, text: '빠르고 편리한 요약!', alt: 'icon2', size: 'small' },
                { img: free, text: '무료로 인한 부담감 제로!', alt: 'icon3', spacing: true },
                { img: design, text: '모두가 좋아하는 편한 디자인!', alt: 'icon4' }
              ].map((item, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Grid container spacing={0} alignItems="center">
                      <Grid item xs={6} style={{ borderRight: '1px solid #ccc', padding: 0 }}>
                        <img
                            src={item.img}
                            alt={item.alt}
                            style={{
                              width: item.size === 'small' ? '80%' : '100%',
                              height: 'auto',
                              objectFit: 'contain',
                              padding: item.spacing ? '20px' : '20px',
                              marginRight: item.spacing ? '30px' : '0'
                            }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', padding: { xs: 2, md: 3 }, height: '100%', display: 'flex', alignItems: 'center' }}>
                          <Typography variant="h5" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#132650', fontFamily: "'NotoSansKR-Medium', sans-serif", whiteSpace: 'nowrap' }}>
                            {item.text}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
              ))}
            </Grid>
          </Container>









          <div style={{marginTop : '150px'}}/>

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '40px', marginLeft: '180px', marginBottom : '10px'}}>
            <img src={logo} alt="..." style={{marginRight: '3px', width: '60px', height: '50px'}}/>
            <h5 id="study" style={{ fontWeight: 'bold', fontSize: '26px', color: '#132650', fontFamily: "Noto Sans KR Medium" }}> 요즘 트렌드, 알고 계시나요?</h5>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridGap: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <img
                src={sa3}
                alt="sa3"
                style={{
                  width: '100%',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease-in-out',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '40px' }}>
              <img
                  src={sa1}
                  alt="sa1"
                  style={{
                    width: '48%',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <img
                  src={sa2}
                  alt="sa2"
                  style={{
                    width: '48%',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </div>
            <img
                src={sa4}
                alt="sa4"
                style={{
                  width: '100%',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease-in-out',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
          </div>

          <div style={{marginTop : '150px'}}/>
          <img src={hugi} alt="후기" style={{ maxWidth: '100%', height: 'auto' }} />

          <div style={{ marginTop: '150px' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px', fontSize: '22px' }}>
              <h1 style={{ fontWeight: 'bold', textAlign: 'center', color: '#132650', marginBottom: '60px', fontSize: '48px', fontFamily: 'Noto Sans KR Medium' }}>
                자주 묻는 질문들
              </h1>
              <div style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '40px' }}>
                {faqData.map((item, index) => (
                    <div key={index} style={{ marginBottom: '30px' }}>
                      <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '30px',
                            backgroundColor: '#f9f9f9',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '28px',
                            color: '#132650',
                            fontFamily: 'Noto Sans KR Medium'
                          }}
                          onClick={() => toggleQuestion(index)}
                      >
                        <span style={{ fontWeight: 'bold' }}>{item.question}</span>
                        <span>{selectedQuestion === index ? '✕' : '+'}</span>
                      </div>
                      {selectedQuestion === index && (
                          <div style={{ padding: '30px', backgroundColor: '#ffffff', borderRadius: '5px', marginTop: '10px', fontSize: '24px' }}>
                            <p style={{ margin: '0' }}>{item.answer}</p>
                          </div>
                      )}
                    </div>
                ))}
              </div>
            </div>
          </div>

</div>
        </>
    )
}