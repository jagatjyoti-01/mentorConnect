import { Box, Typography, CardContent, Card, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
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

const CardStyled = styled(Card)({
    width: '250px',
    marginRight: '16px',
    flexShrink: 0,
    backgroundColor: '#f5f5f5',
    boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        transform: 'scale(1.03)',
    },
});

const cards = [
    { title: 'Sundar Pichai', date: '13 Jan', description: 'Task management System', img: "/images/sundarpichai.jpg", speaker: 'Sundar Pichai', bgColor: '#8fc0e3' },
    { title: 'Vinita Singh', date: '13 Jan', description: 'Photoshop . Workshop', speaker: 'Vinita Singh', img: "/images/vinitasingh.jpg", bgColor: '#f5a9b8' },
    { title: 'Elon Musk', date: '13 Jan', description: 'IT Service', speaker: 'Elon Musk', img: "/images/elonmusk.jpg", bgColor: '#f7be89' },
    { title: 'Roshni Nadar', date: '14 Jan', description: 'New Card Description', speaker: 'Roshni Nadar', img: "/images/ghosthheboss.jpg", bgColor: '#b5e1a5' },
    { title: 'Piyush Bansal', date: '14 Jan', description: 'New Card Description', speaker: 'Piyush Bansal', img: "/images/piyushbansal.jpg", bgColor: '#b5e1a5' },
];

const Livecard: React.FC = () => {
    const navigate = useNavigate();


    return (
        <div style={{ maxWidth: '100%', background: 'transparent', }}>
            <Box sx={{ marginTop: 3, paddingLeft: '0px', maxWidth: '100%' }}>
                <Box display="flex" sx={{ paddingLeft: '5px' }} justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" gutterBottom style={{ color: color.firstColor, fontWeight: 'bold' }}>
                        Mentors
                    </Typography>
                    <Box onClick={() => navigate('/live')} display="flex" alignItems="center" sx={{ marginRight: '2%' }}>
                        <Typography variant="h5" gutterBottom style={{ color: color.firstColor, cursor: 'pointer', fontSize: '14px', marginBottom: '2px', marginRight: '4px' }}>
                            See more
                        </Typography>
                        <ChevronRightRoundedIcon style={{ color: color.firstColor, fontSize: '14px' }} />
                    </Box>
                </Box>
                <Container2 sx={{ paddingLeft: '5px' }}>
                    {cards.map((card, index) => (
                        <CardStyled key={index} sx={{ cursor: 'pointer', borderRadius: '18px' }}>
                            <CardContent
                                onClick={() => navigate('/stream')}
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
                                }}>

                                <div

                                    style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        background: 'red',
                                        padding: '0px 5px',
                                        fontSize: '12px',
                                        borderRadius: '4px'
                                    }}
                                >
                                    Live
                                </div>

                                <div

                                    style={{ padding: 10, color: 'white' }} >
                                    <Typography
                                        style={{
                                            width: '100%', overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }} fontWeight={'bold'} variant="h6">{card.title}</Typography>

                                    {/* <Typography variant="subtitle1">{card.date}</Typography> */}
                                    {/* <Typography variant="body2">{card.description}</Typography> */}
                                    <Typography style={{
                                        width: '100%', overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }} variant="body2">Speaker {card.speaker}</Typography>
                                </div>

                            </CardContent>
                        </CardStyled>
                    ))}
                    <Box display="flex" alignItems="center" justifyContent="center">

                    </Box>
                </Container2>
            </Box>

        </div>
    );
};

export default Livecard;