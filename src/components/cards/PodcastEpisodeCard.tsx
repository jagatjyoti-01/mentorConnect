import React from "react";
import { Box, Typography, Card, CardContent, CardMedia, Grid, styled, Avatar } from "@mui/material";

interface PodcastEpisodeCardProps {
    title: string;
    date: string;
    description: string;
    tags: string[];
    img: string;
    hostImages?: string[];
    id: number;
}

const CardContainer = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '100%',
    marginBottom: theme.spacing(2),
    border: '1px solid #1e8bf1',
    borderRadius: '5px',
    padding: theme.spacing(1),
    boxShadow: 'none',
    transition: '0.3s',
    '&:hover': {
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
        transform: 'scale(1.02)',
    },
}));

const ImgBox = styled(CardMedia)(({ theme }) => ({
    height: 150,
    width: 150,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '5px',
}));

const PodcastEpisodeCard: React.FC<PodcastEpisodeCardProps> = ({ title, description, tags, img, hostImages = [] }) => {
    return (
        <Grid item xs={12} sm={6}>
            <CardContainer>
                <ImgBox image={img} title={title} />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e8bf1' }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ flex: 1, marginTop: 1 }}>
                        {description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                            {tags.map((tag, index) => (
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
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    {tag}
                                </Typography>
                            ))}
                        </Box>
                        <Box sx={{ display: 'flex', gap: '10px' }}>
                            {hostImages.map((hostImage, index) => (
                                <Avatar key={index} src={hostImage} sx={{ width: 24, height: 24 }} />
                            ))}
                        </Box>
                    </Box>
                </CardContent>
            </CardContainer>
        </Grid>
    );
};

export default PodcastEpisodeCard;
