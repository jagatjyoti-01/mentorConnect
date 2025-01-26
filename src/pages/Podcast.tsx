import React, { useState } from "react";
import { Grid, Box, Typography, styled, TextField, Tabs, Tab, Select, MenuItem, IconButton, SelectChangeEvent, useMediaQuery, useTheme, FormControl } from "@mui/material";
import { ViewList, ViewModule } from "@mui/icons-material";
import { Link } from "react-router-dom";
import PodcastCard from "../components/cards/PodcastCard";
import color from "../components/utils/Colors";

interface Podcast {
    title: string;
    date: string;
    description: string;
    category: string;
    tags: string[];
    img: string;
}

const podcastCards: Podcast[] = [
    {
        title: 'Setup Your Own Podcast 1',
        date: '13 July, 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimvel iam, quis nostrud exercitation ullamco laboris.',
        category: 'Business',
        tags: ['management', 'fishery'],
        img: "/images/GIC-1.jpg"
    },
    {
        title: 'Setup Your Own Podcast 2',
        date: '14 July, 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimvel iam, quis nostrud exercitation ullamco laboris.',
        category: 'Tips & Tricks',
        tags: ['art', 'creative'],
        img: "/images/GIC-2.jpg"
    },
    {
        title: 'Setup Your Own Podcast 3',
        date: '15 July, 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimvel iam, quis nostrud exercitation ullamco laboris.',
        category: 'News',
        tags: ['future', 'IT'],
        img: "/images/GIC-3.jpg"
    }, {
        title: 'Setup Your Own Podcast 4',
        date: '16 July, 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimvel iam, quis nostrud exercitation ullamco laboris.',
        category: 'Productivity',
        tags: ['example', 'new'],
        img: "/images/Asset-43.jpg"
    },
    {
        title: 'Setup Your Own Podcast 5',
        date: '17 July, 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimvel iam, quis nostrud exercitation ullamco laboris.',
        category: 'Podcast',
        tags: ['example', 'new'],
        img: "/images/GIC-1.jpg"
    },
    {
        title: 'Setup Your Own Podcast 6',
        date: '18 July, 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimvel iam, quis nostrud exercitation ullamco laboris.',
        category: 'Tips & Tricks',
        tags: ['art', 'creative'],
        img: "/images/GIC-2.jpg"
    },
    {
        title: 'Setup Your Own Podcast 7',
        date: '19 July, 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimvel iam, quis nostrud exercitation ullamco laboris.',
        category: 'News',
        tags: ['future', 'IT'],
        img: "/images/GIC-3.jpg"
    },
    {
        title: 'Setup Your Own Podcast 8',
        date: '20 July, 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimvel iam, quis nostrud exercitation ullamco laboris.',
        category: 'Productivity',
        tags: ['example', 'new'],
        img: "/images/Asset-43.jpg"
    },
    {
        title: 'Setup Your Own Podcast 9',
        date: '20 July, 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimvel iam, quis nostrud exercitation ullamco laboris.',
        category: 'Productivity',
        tags: ['example', 'new'],
        img: "/images/GIC-1.jpg"
    },
];

const categories: string[] = ["All", "Business", "News", "Tips & Tricks", "Podcast", "Productivity"];

const Podcast: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [filter, setFilter] = useState<string>("recent");
    const [view, setView] = useState<string>("grid");
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const Container2 = styled(Box)({
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        padding: '16px',
    });

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    const handleFilterChange = (event: SelectChangeEvent<string>) => {
        setFilter(event.target.value as string);
    };

    const filteredPodcasts = podcastCards.filter(podcast =>
        (selectedTab === 0 || podcast.category === categories[selectedTab]) &&
        podcast.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Box sx={{
                marginTop: 5, paddingLeft: '0px',
                backgroundImage: "url('/images/voiceworldbg.svg')",
                backgroundSize: '90%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
                <Typography variant="h4" gutterBottom sx={{ color: color.firstColor, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 }}>
                    Podcast
                </Typography>
                <Box sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    flexDirection: isSmallScreen ? 'column' : 'row',
                    gap: '20px', marginBottom: 3
                }}>
                    <TextField
                        className="input-root"
                        variant="outlined"
                        placeholder="Search podcast..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{ width: '100%' }}
                    />

                    <div style={{
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'flex-end', width: isSmallScreen ? '100%' : 'auto'
                    }}>

                        <FormControl
                            sx={{
                                height: '50px',
                                width: '150px',
                                '& .MuiOutlinedInput-root': {
                                    border: 'none',
                                    height: '50px',
                                    overflow: 'hidden',
                                    outline: 'none'
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                    outline: 'none'
                                },
                            }}
                        >
                            <Select
                                value={filter}
                                onChange={handleFilterChange}
                                variant="outlined"
                                inputProps={{
                                    sx: {
                                        backgroundColor: 'rgba(30, 139, 241, 0.2)',
                                    }
                                }}
                            >
                                <MenuItem value="recent">Recently Added</MenuItem>
                                <MenuItem value="popular">Most Popular</MenuItem>
                            </Select>
                        </FormControl>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton onClick={() => setView("grid")}>
                                <ViewModule />
                            </IconButton>
                            <IconButton onClick={() => setView("list")}>
                                <ViewList />
                            </IconButton>
                        </Box>
                    </div>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        marginBottom: 3,
                    }}
                >
                    <Tabs
                        value={selectedTab}
                        textColor="primary"
                        TabIndicatorProps={{
                            style: {
                                height: '0px',
                                color: color.firstColor
                            }
                        }}
                        onChange={handleTabChange}
                        centered
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.66)',
                            width: '100%',
                            '& .MuiTabs-flexContainer': {
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                            },
                        }}
                    >
                        {categories.map((category, index) => (
                            <Tab key={index} label={category} />
                        ))}
                    </Tabs>
                </Box>
                <Container2 sx={{ padding: '30px 30px 100px 30px' }}>
                    <Grid container spacing={2}>
                        {filteredPodcasts.map((card, index) => (
                            <Grid item xs={12} sm={view === 'grid' ? 6 : 12} md={view === 'grid' ? 4 : 12} key={index} style={{
                                display: 'flex', justifyContent: 'center'
                            }}>
                                <PodcastCard
                                    // id={index}
                                    title={card.title}
                                    date={card.date}
                                    description={card.description}
                                    tags={card.tags}
                                    category={card.category}
                                    img={card.img}
                                    view={view as 'list' | 'grid'}
                                />
                            </Grid>

                        ))}
                    </Grid>
                </Container2>
            </Box>
        </div>
    );
};

export default Podcast;