import React from 'react';
import { Card, CardContent, Typography, Box, styled, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

interface PodcastCardProps {
    title: string;
    date: string;
    description: string;
    tags: string[];
    category: string;
    img: string;
    view: 'list' | 'grid';
    // id: number;
}



const PodcastCard: React.FC<PodcastCardProps> = ({ title, date, description, tags, category, img, view }) => {

    const isMobile = useMediaQuery('(max-width:850px)');
    
    const CardContainer = styled(Card)(({ theme }) => ({
        maxWidth: view === 'list' ? '100%' : 400,
        marginBottom: 2,
        border: '1px solid #1e8bf1',
        borderRadius: '5px',
        padding: '7px',
        boxShadow: 'none',
        transition: '0.3s',
        display: 'flex',
        flexDirection: view === 'list' ? 'row' : 'column',
        '&:hover': {
            boxShadow: '0 20px 20px rgba(0, 0, 0, 0.1)',
            transform: 'scale(1.01)'
        },
    }));

    const ImgBox = styled(Box)(({ theme }) => ({
        height: view === 'list' ? 150 : 250,
        width: view === 'list' ? 150 : '100%',
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '5px'
    }));

    return (
        <CardContainer>
            <Link to={`/podcast/${encodeURIComponent(title)}`} style={{display:isMobile && view === 'list'?'none':'block', textDecoration: 'none', color: 'inherit' }}>
                <ImgBox />
            </Link>
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    flex: 1,
                    boxShadow: 'none',
                    padding:isMobile? 1:2
                }}>
                <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    
                    sx={{
                        fontWeight: 'bold'
                    }}
                >
                    {category}
                </Typography>
                <Link to={`/podcast/${encodeURIComponent(title)}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography
                        variant="h5" component="div"

                        style={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 1, 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            lineHeight: '1.5',
                            maxHeight: '4.5em', 
                        }}
                        sx={{
                            color: '#1e8bf1',
                            fontWeight: 'bold',
                            transition: '0.3s',
                            // whiteSpace:'nowrap',
                            '&:hover': {
                                color: 'rgba(30, 139, 241, 0.7)',
                            },
                        }}>
                        {title}
                    </Typography>
                </Link>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3, 
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: '1.5',
                        maxHeight: '4.5em', 
                    }}
                >
                    {description}
                </Typography>
            </CardContent>
            <hr />
            <CardContent
                sx={{
                    display: view === 'list' ? 'flex' : 'block',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: view === 'list' ? 'column' : 'row',
                        alignItems: 'center',
                        gap: '20px'
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '5px'
                        }}>
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
                                        cursor: 'pointer'
                                    },
                                }}>
                                {tag}
                            </Typography>
                        ))}
                    </Box>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '13px'
                        }}>
                        {date}
                    </Typography>
                </Box>
            </CardContent>
        </CardContainer >
    );
};

export default PodcastCard;