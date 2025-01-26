import { useState } from "react";
import { Box, Typography, CardContent, Card, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import YouTube, { YouTubeEvent } from 'react-youtube';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import color from "../utils/Colors";

const Container2 = styled(Box)({
    display: 'flex',
    overflowX: 'auto',
    overflowY: 'hidden',
    padding: '16px',
    height: '200px',
    maxWidth: 'calc(100vw - 125px)',
    '&::-webkit-scrollbar': {
        display: 'flex',
    },
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '@media (max-width: 600px)': {
        maxWidth: 'calc(100vw)',
    },
});

const CardStyled = styled(Card)<{ isPlaying: boolean }>(({ isPlaying }) => ({
    width: '300px',
    marginRight: '16px',
    flexShrink: 0,
    backgroundColor: '#f5f5f5',
    boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
    transition: isPlaying ? 'none' : 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    transform: isPlaying ? 'none' : 'scale(1)',
    '&:hover': {
        boxShadow: isPlaying ? 'none' : '0 4px 8px rgba(0, 0, 0, 0.2)',
        transform: isPlaying ? 'none' : 'scale(1.03)',
    },
}));

const cards = [
    { title: 'chatbot Ai', duration: '10m 20s', img: "/images/chatbotAi.jpg", speaker: 'Alian Pinto', bgColor: '#8fc0e3', videoId: 'wk1ESnUughU' },
    { title: 'Forest Fundamentals', duration: '10m 20s', speaker: 'Ajex methew', img: "/images/chatbotAi.jpg", bgColor: '#f5a9b8', videoId: '4qPfzdKvoH4' },
    { title: 'The Future of Us', duration: '10m 20s', speaker: 'Frodo Ammin', img: "/images/chatbotAi.jpg", bgColor: '#f7be89', videoId: 'xWLxhF3b5P8' },
    { title: 'New Card Example', duration: '10m 20s', speaker: 'New Speaker', img: "/images/chatbotAi.jpg", bgColor: '#b5e1a5', videoId: 'xRMVrc16XCw' },
    { title: 'New Card Example', duration: '10m 20s', speaker: 'New Speaker', img: "/images/chatbotAi.jpg", bgColor: '#b5e1a5', videoId: 'A4G0hOI6XyQ' },
];

const PopularVideocard: React.FC = () => {
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);
    const [players, setPlayers] = useState<{ [key: number]: any }>({});
    const navigate = useNavigate();

    const handlePlayButtonClick = (index: number) => {
        setPlayingIndex(index);
        if (players[index]) {
            players[index].playVideo();
        }
    };

    const onPlayerReady = (index: number) => {
        return (event: YouTubeEvent<any>) => {
            setPlayers((prevPlayers) => ({
                ...prevPlayers,
                [index]: event.target,
            }));
            if (playingIndex === index) {
                event.target.playVideo();
            }
        };
    };

    return (
        <div style={{ maxWidth: '100%' }}>
            <Box sx={{ marginTop: 3, paddingLeft: '0px', maxWidth: '100%' }}>
                <Box display="flex" sx={{ paddingLeft: '5px' }} justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" gutterBottom style={{ color: color.firstColor, fontWeight: 'bold' }}>
                        Our Videos
                    </Typography>
                    <Box onClick={() => navigate('/popular-videos')} display="flex" alignItems="center" sx={{ marginRight: '2%' }}>
                        <Typography variant="h5" gutterBottom style={{ color: color.firstColor, cursor: 'pointer', fontSize: '14px', marginBottom: '2px', marginRight: '4px' }}>
                            See more
                        </Typography>
                        <ChevronRightRoundedIcon style={{ color: color.firstColor, fontSize: '14px' }} />
                    </Box>
                </Box>
                <Container2 sx={{ paddingLeft: '5px' }}>
                    {cards.map((card, index) => (
                        <CardStyled key={index} isPlaying={playingIndex === index} sx={{ cursor: 'pointer', objectFit: 'fill', backgroundColor: 'white', borderRadius: '18px' }}>
                            {playingIndex === index ? (
                                <YouTube
                                    videoId={card.videoId}
                                    opts={{ width: '100%', height: '170px' }}
                                    onReady={onPlayerReady(index)}
                                />
                            ) : (
                                <CardContent
                                    onClick={() => handlePlayButtonClick(index)}
                                    style={{
                                        position: 'relative',
                                        height: '100%',
                                        padding: 0,
                                        background: 'white',
                                        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${card.img})`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        display: 'flex',
                                        alignItems: 'flex-end'
                                    }}
                                >
                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: '12px',
                                            right: '10px',
                                            color: 'white',
                                            padding: '0px 5px',
                                        }}
                                    >
                                        <Typography fontSize={'12px'} fontWeight={'bold'}>{card.duration}</Typography>
                                    </div>

                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '35%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '100%',
                                            color: 'white',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        <PlayCircleOutlineRoundedIcon style={{ width: '40px', height: '40px' }} />
                                    </div>

                                    <div style={{ padding: 10, color: 'white', width: '100%' }} >
                                        <Typography
                                            style={{
                                                width: '97%', overflow: 'hidden',
                                                textOverflow: 'ellipsis', lineHeight: 1.2, marginBottom: '5px'
                                            }} fontWeight={'bold'} variant="h6">{card.title}</Typography>

                                        <Typography style={{
                                            width: '97%', overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }} variant="body2">Speaker {card.speaker}</Typography>
                                    </div>
                                </CardContent>
                            )}
                        </CardStyled>
                    ))}
                </Container2>
            </Box>
        </div>
    );
};

export default PopularVideocard;
