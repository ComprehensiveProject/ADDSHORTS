import React from 'react';
import Box from '@mui/joy/Box';
import Container from '@mui/joy/Container';
import { typographyClasses } from '@mui/joy/Typography';
import study from './images/study.png';

export default function TwoSidedLayout({ children, reversed }) {
    return (
        <Container
            sx={(theme) => ({ // 여기서 theme을 인자로 사용
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: reversed ? 'column-reverse' : 'column',
                alignItems: 'center',
                py: 10,
                gap: 4,
                [theme.breakpoints.up(834)]: {
                    flexDirection: 'row',
                    gap: 6,
                },
                [theme.breakpoints.up(1199)]: {
                    gap: 12,
                },
            })}
        >
            <Box
                sx={(theme) => ({ // 여기서도 theme을 인자로 사용
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    maxWidth: '50ch',
                    textAlign: 'center',
                    flexShrink: 999,
                    [theme.breakpoints.up(834)]: {
                        minWidth: 420,
                        alignItems: 'flex-start',
                        textAlign: 'initial',
                    },
                    [`& .${typographyClasses.root}`]: {
                        textWrap: 'balance',
                    },
                })}
            >
                {children}
            </Box>
            <Box
                sx={(theme) => ({ // 그리고 여기서도 theme을 인자로 사용
                    width: '100%', // 너비는 부모 요소에 맞춤
                    [theme.breakpoints.up(834)]: {
                        width: '50%', // 데스크톱에서는 부모 요소의 50% 크기
                    },
                })}
            >
                <img
                    src={study}
                    alt="English learning"
                    style={{
                        width: '100%', // 너비를 부모 요소에 맞추고
                        height: 'auto', // 높이를 자동으로 설정하여 비율을 유지
                    }}
                />
            </Box>
        </Container>
    );
}
