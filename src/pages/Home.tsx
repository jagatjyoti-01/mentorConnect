import { Grid } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VideoCallRoundedIcon from '@mui/icons-material/VideoCallRounded';
import AutoSlider from '../components/shared/AutoSlider';
import Livecard from '../components/cards/Livecard';
import PopularVideocard from '../components/cards/PopularVideocard';
import Upcomingcard from '../components/cards/Upcomingcard';
import WebinarCard from '../components/cards/Webinarcard';
import { useNavigate } from 'react-router-dom';
import color from '../components/utils/Colors';


export const Home = () => {

    const navigate = useNavigate();
    return (
        <>
            <div
                style={{
                    backgroundImage: "url('/images/voiceworldbg.svg')",
                    backgroundSize: '97%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'repeat',
                    paddingBottom: '5%',

                }}>


                <div style={{

                    marginTop: '2%',
                }}>
                    <AutoSlider></AutoSlider>
                </div>


                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid container mt={2} justifyContent="center" style={{
                        background: 'transparent',
                        maxWidth: '94%'
                    }}>


                        <Grid item xs={12} md={4} onClick={() => navigate('/popular-videos')}
                            style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
                            sx={(theme) => ({
                                [theme.breakpoints.down('md')]: {
                                    marginBottom: '30px'
                                },
                            })}>
                            <WebinarCard
                                icon={CheckCircleIcon}
                                title="Finished"
                                count={23}
                                // color="#705cd3"
                                color={color.firstColor}
                            />
                        </Grid>

                        <Grid item xs={12} md={4} onClick={() => navigate('/upcoming')}
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            sx={(theme) => ({
                                [theme.breakpoints.down('md')]: {
                                    marginBottom: '30px'
                                },
                            })}>
                            <WebinarCard
                                icon={EventIcon}
                                title="Upcoming"
                                count={8}
                                // color="#3bc48b"
                                color={color.firstColor}
                            />
                        </Grid>

                        <Grid item xs={12} md={4} onClick={() => navigate('/live')}
                            style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                            sx={(theme) => ({
                                [theme.breakpoints.down('md')]: {
                                    marginBottom: '30px'
                                },
                            })}>
                            <WebinarCard
                                icon={VideoCallRoundedIcon}
                                title="Live"
                                count={12}
                                color={color.firstColor}
                            />
                        </Grid>

                    </Grid>
                </div>

                <Livecard></Livecard>

                <Upcomingcard></Upcomingcard>

                <PopularVideocard></PopularVideocard>

                {/* <VideoPlayer videoId={'ThiCMd5kGbE'}></VideoPlayer>
            <VideoPlayerCard></VideoPlayerCard> */}

            </div>
        </>
    )
}