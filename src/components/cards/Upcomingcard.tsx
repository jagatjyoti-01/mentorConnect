import { Box, Typography, CardContent, Card, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import color from "../utils/Colors";
// import Translate from "../utils/Translate";

const Container = styled(Box)({
    display: 'flex',
    overflowX: 'auto',
    overflowY: 'hidden',
    padding: '16px',
    height: '280px',
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
    { title: 'Raj shamani', date: '18 sep', description: 'Task management System', img: "/images/rajsamani.jpg", speaker: 'Raj Shamani', bgColor: '#8fc0e3' },
    { title: 'Ranveer Allabadia', date: '20 sep', description: 'Photoshop . Workshop', speaker: 'Ranveer Allahbadia', img: "/images/ranveeralabadia.jpg", bgColor: '#f5a9b8' },
    { title: 'Jay Shetty', date: '22 sep', description: 'IT Service', speaker: 'Jay Shetty', img: "/images/jaysetthy.jpg", bgColor: '#f7be89' },
    { title: 'Mr John', date: '24 sep', description: 'New Card Description', speaker: 'Mr John', img: "/images/mrjohn.jpg", bgColor: '#b5e1a5' },
    { title: 'The Talk Show', date: '26 sep', description: 'New Card Description', speaker: 'The Talk Show', img: "/images/talk.jpg", bgColor: '#b5e1a5' },
];

const Upcomingcard: React.FC = () => {
    const navigate = useNavigate();


    return (
        <div style={{ maxWidth: '100%' }}>
            <Box sx={{ marginTop: 3, paddingLeft: '0px' }}>
                <Box display="flex" sx={{ paddingLeft: '5px' }} justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" gutterBottom style={{ color: color.firstColor, fontWeight: 'bold' }}>
                        {/* <Translate tkey={'Upcoming_Webinars'} /> */}Podcast
                    </Typography>
                    <Box onClick={() => navigate('/upcoming')} display="flex" alignItems="center" sx={{ marginRight: '2%' }}>
                        <Typography variant="h5" gutterBottom style={{ color: color.firstColor, cursor: 'pointer', fontSize: '14px', marginBottom: '2px', marginRight: '4px' }}>
                            See more
                        </Typography>
                        <ChevronRightRoundedIcon style={{ color: color.firstColor, fontSize: '14px' }} />
                    </Box>
                </Box>
                <Container sx={{ paddingLeft: '5px' }}>
                    {cards.map((card, index) => (
                        <CardStyled key={index} sx={{ cursor: 'pointer', backgroundColor: 'white', borderRadius: '18px' }}>
                            <CardContent
                                onClick={() => navigate('/event-detail')}
                                style={{
                                    padding: 0,

                                }}>

                                <div
                                    style={{
                                        height: '150px',
                                        backgroundImage: `url(${card.img})`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center', borderRadius: '18px'
                                    }}>

                                </div>

                                <div style={{ padding: 10 }}>
                                    <Typography
                                        style={{
                                            width: '100%', overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }} fontWeight={'bold'} variant="h6">{card.title}</Typography>
                                    <Typography variant="subtitle1">{card.date}</Typography>
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
                </Container>
            </Box>

        </div>
    );
};

export default Upcomingcard;