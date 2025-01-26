import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Grid, useTheme, useMediaQuery, Button, Container, styled } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DownloadIcon from '@mui/icons-material/Download';
import PodcastCard from "../components/cards/PodcastCard";
import PodcastEpisodeCard from "../components/cards/PodcastEpisodeCard";

interface Podcast {
    title: string;
    episode: string;
    date: string;
    description: string;
    category: string;
    tags: string[];
    img: string;
    host?: string;
    hostImg?: string;
}

const ScrollableContainer = styled(Box)({
    display: 'flex',
    overflowX: 'auto',
    overflowY: 'hidden',
    padding: '50px',
    height: 'auto',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '@media (max-width: 600px)': {
        paddingLeft: '8px',
    },
});

const CardStyled = styled(Box)({
    minWidth: '250px',
    marginRight: '16px',
    flexShrink: 0,
    backgroundColor: '#f5f5f5',
    borderRadius: '8px'
});

const podcastCards: Podcast[] = [
    {
        title: 'Setup Your Own Podcast 1',
        episode: 'Featured Episode',
        date: '13 July, 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimvel iam, quis nostrud exercitation ullamco laboris.',
        category: 'Business',
        tags: ['management', 'fishery'],
        img: "/images/GIC-1.jpg",
        host: 'John Doe',
        hostImg: '/images/hostImage.jpg'
    },
    {
        title: 'Setup Your Own Podcast 2',
        episode: 'Featured Episode',
        date: '14 July, 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimvel iam, quis nostrud exercitation ullamco laboris.',
        category: 'Tips & Tricks',
        tags: ['art', 'creative'],
        img: "/images/GIC-2.jpg",
        host: 'John Doe',
        hostImg: '/images/hostImage.jpg'
    },
    {
        title: 'Setup Your Own Podcast 3',
        episode: 'Featured Episode',
        date: '15 July, 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimvel iam, quis nostrud exercitation ullamco laboris.',
        category: 'News',
        tags: ['future', 'IT'],
        img: "/images/GIC-3.jpg",
        host: 'John Doe',
        hostImg: '/images/hostImage.jpg'
    }, {
        title: 'Setup Your Own Podcast 4',
        episode: 'Featured Episode',
        date: '16 July, 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimvel iam, quis nostrud exercitation ullamco laboris.',
        category: 'Productivity',
        tags: ['example', 'new'],
        img: "/images/Asset-43.jpg",
        host: 'John Doe',
        hostImg: '/images/hostImage.jpg'
    },
    {
        title: 'Setup Your Own Podcast 5',
        episode: 'Featured Episode',
        date: '17 July, 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimvel iam, quis nostrud exercitation ullamco laboris.',
        category: 'Podcast',
        tags: ['example', 'new'],
        img: "/images/GIC-1.jpg",
        host: 'John Doe',
        hostImg: '/images/hostImage.jpg'
    },
    {
        title: 'Setup Your Own Podcast 6',
        episode: 'Featured Episode',
        date: '18 July, 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimvel iam, quis nostrud exercitation ullamco laboris.',
        category: 'Tips & Tricks',
        tags: ['art', 'creative'],
        img: "/images/GIC-2.jpg",
        host: 'John Doe',
        hostImg: '/images/hostImage.jpg'
    },
    {
        title: 'Setup Your Own Podcast 7',
        episode: 'Featured Episode',
        date: '19 July, 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimvel iam, quis nostrud exercitation ullamco laboris.',
        category: 'News',
        tags: ['future', 'IT'],
        img: "/images/GIC-3.jpg",
        host: 'John Doe',
        hostImg: '/images/hostImage.jpg'
    },
    {
        title: 'Setup Your Own Podcast 8',
        episode: 'Featured Episode',
        date: '20 July, 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimvel iam, quis nostrud exercitation ullamco laboris.',
        category: 'Productivity',
        tags: ['example', 'new'],
        img: "/images/Asset-43.jpg",
        host: 'John Doe',
        hostImg: '/images/hostImage.jpg'
    },
];


const podcastEpisodes = [
    {
        id: 1,
        title: 'Episode 1',
        date: '20 July, 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['tag1', 'tag2'],
        img: '/images/GIC-1.jpg',
        hostImg: '/images/hostImage.jpg'
    },
    {
        id: 2,
        title: 'Episode 2',
        date: '21 July, 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['tag1', 'tag2'],
        img: '/images/GIC-1.jpg',
        hostImg: '/images/hostImage.jpg'
    },
    {
        id: 3,
        title: 'Episode 3',
        date: '21 July, 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['tag1', 'tag2'],
        img: '/images/GIC-1.jpg',
        hostImg: '/images/hostImage.jpg'
    },
    {
        id: 4,
        title: 'Episode 4',
        date: '21 July, 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['tag1', 'tag2'],
        img: '/images/GIC-1.jpg',
        hostImg: '/images/hostImage.jpg'
    },
    {
        id: 4,
        title: 'Episode 5',
        date: '21 July, 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['tag1', 'tag2'],
        img: '/images/GIC-1.jpg',
        hostImg: '/images/hostImage.jpg'
    },
    {
        id: 4,
        title: 'Episode 6',
        date: '21 July, 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['tag1', 'tag2'],
        img: '/images/GIC-1.jpg',
        hostImg: '/images/hostImage.jpg'
    },
];

const PodcastDetail: React.FC = () => {
    const { title } = useParams<{ title: string }>();
    const decodedTitle = decodeURIComponent(title || "");
    const podcast = podcastCards.find(p => p.title === decodedTitle);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    if (!podcast) {
        return (
            <Box sx={{ padding: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Podcast not found
                </Typography>
            </Box>
        );
    }

    const handlePrevClick = () => {
        const container = document.getElementById('podcast-slider');
        if (container) {
            container.scrollBy({ left: -container.clientWidth / 2, behavior: 'smooth' });
        }
    };

    const handleNextClick = () => {
        const container = document.getElementById('podcast-slider');
        if (container) {
            container.scrollBy({ left: container.clientWidth / 2, behavior: 'smooth' });
        }
    };

    return (
        <Box sx={{ padding: 3, maxWidth: '1200px', margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', margin: 5, color: '#1e8bf1' }}>
                {podcast.title}
            </Typography>
            <Grid
                sx={{
                    backgroundColor: 'rgba(245, 245, 245, 0.449)',
                    display: 'flex',
                    gap: '20px',
                    padding: 4,
                    borderRadius: '8px',
                    boxShadow: '0 30px 30px rgba(0, 0, 0, 0.15)'
                }}>
                <Grid item xs={12} md={4}>
                    <img src={podcast.img} alt={podcast.title}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            width: '500px',
                            height: '400px',
                            borderRadius: '8px'
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            padding: '10px',
                            borderRadius: '30px',
                            backgroundColor: 'rgba(30, 139, 241, 0.2)',
                            color: '#1e8bf1',
                        }}>
                        {podcast.episode}
                    </Typography>
                    <hr />
                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                        {podcast.description}
                    </Typography>
                    <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {podcast.hostImg && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img src={podcast.hostImg} alt={podcast.host} style={{ width: 40, height: 40, borderRadius: '50%' }} />
                                <Typography variant="subtitle2" color="textSecondary">
                                    Hosted By: <b>{podcast.host}</b>
                                </Typography>
                            </Box>
                        )}
                        <Typography variant="subtitle1" color="textSecondary" sx={{ color: '#1e8bf1', fontWeight: 'bold' }}>
                            {podcast.date}
                        </Typography>
                    </Box>
                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="subtitle2" color="textSecondary" sx={{ display: 'flex', gap: '5px' }}>
                            {podcast.tags.map((tag, index) => (
                                <Typography
                                    key={index}
                                    variant="body2"
                                    color="textPrimary"
                                    sx={{
                                        padding: '2px 10px',
                                        borderRadius: '10px',
                                        border: '1px solid #1e8bf1',
                                        fontSize: '13px',
                                        fontWeight: '500',
                                        transition: '0.3s',
                                        '&:hover': {
                                            backgroundColor: '#eee',
                                            cursor: 'pointer'
                                        },
                                    }}>
                                    {tag}
                                </Typography>
                            ))}
                        </Typography>
                    </Box>
                    <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                        <div>
                            <Button variant="contained"
                                sx={{
                                    backgroundColor: '#1e8bf1',
                                    marginRight: 2,
                                    borderRadius: '20px',
                                    fontWeight: '600',
                                    padding: '8px 20px',
                                    textTransform: 'capitalize',
                                    '&:hover': {
                                        backgroundColor: '#1e8bf1',
                                    },
                                }}>
                                Subscribe
                            </Button>
                            <Button variant="outlined"
                                sx={{
                                    color: '#1e8bf1',
                                    border: '1px solid #1e8bf1',
                                    borderRadius: '20px',
                                    fontWeight: '600',
                                    padding: '8px 20px',
                                    textTransform: 'capitalize',
                                    '&:hover': {
                                        borderColor: '#1e8bf1',
                                    },
                                }}>
                                <PlayArrowIcon /> Listen now
                            </Button>
                        </div>
                        <Button variant="text"
                            sx={{
                                color: '#1e8bf1',
                                backgroundColor: 'rgba(30, 139, 241, 0.2)',
                                fontWeight: '600',
                                textTransform: 'capitalize',
                                borderRadius: '20px',
                                padding: '8px 20px',
                                display: 'flex',
                                gap: '5px',
                                '&:hover': {
                                    backgroundColor: 'rgba(30, 139, 241, 0.3)',
                                }
                            }}>
                            Download <DownloadIcon sx={{ fontSize: '18px' }} />
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            {/* All Podcast */}
            <Container sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" gutterBottom sx={{ margin: 5, color: '#1e8bf1', fontWeight: 'bold', textAlign: 'center' }}>
                    All Podcast
                </Typography>
                <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {podcastEpisodes.map((episode) => (
                        <PodcastEpisodeCard key={episode.id} {...episode} hostImages={[]} />
                    ))}
                </Grid>
            </Container>

            {/* Related Podcast Slider */}
            <Container sx={{ marginTop: '50px' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 4, color: '#1e8bf1', textAlign: 'center' }}>
                    Related Podcasts
                </Typography>
                <ScrollableContainer>
                    {podcastCards.map((card, index) => (
                        <CardStyled key={index}>
                            <PodcastCard
                                title={card.title}
                                date={card.date}
                                description={card.description}
                                tags={card.tags}
                                category={card.category}
                                img={card.img}
                                view="grid"
                            />
                        </CardStyled>
                    ))}
                </ScrollableContainer>
            </Container>
        </Box>
    );
};

export default PodcastDetail;
