import { Grid, Box, CardContent, Typography, styled, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import color from "../components/utils/Colors";
import { useEffect, useState } from "react";
import { getUserStreaming } from "../services/services";
import { formatDateTime } from "../components/utils/commonFunction";
import { getUserId, getUserName } from "../services/axiosClient";

const Live = () => {
    const navigate = useNavigate();

    const Container2 = styled(Box)({
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        padding: '16px',

        '&::-webkit-scrollbar': {
            display: 'none',
        },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
    });

    const [meetings, setMeetings] = useState<any>([]);


    useEffect(() => {
        const payload = {
            secondTable: 'user'
        };
        getUserStreaming(payload).then((result) => {
            setMeetings(result.data.data || []);
        }).catch(error => console.log(error))
    }, [])

    return (
        <>

            <div style={{ maxWidth: '100%', minHeight:'80vh', paddingBottom: '100px' }}>
                <Box sx={{ marginTop: 3, paddingLeft: '0px', paddingRight: '5px' }}>
                    <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        marginBottom: '10px'
                    }}>

                        <Typography variant="h5" gutterBottom style={{ paddingLeft: '5px', color: color.firstColor, fontWeight: 'bold' }}>
                            Live
                        </Typography>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Button className="button" onClick={() => navigate('/host-streaming')} style={{ borderRadius: '8px', fontSize: '16px', padding: '6px 10px' }}>
                                Host a stream
                            </Button>
                        </div>
                    </div>
                    <Container2 sx={{ paddingLeft: 0, paddingRight: '0px' }}>
                        <Grid spacing={2} container>
                            {meetings.map((card: any, index: number) => (
                                <Grid key={index} item xs={12} sm={6} md={3}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center', width: '100%'
                                    }}>
                                    <CardContent
                                        onClick={() => navigate(`/stream/${card.streamingId}`, {
                                            state: {
                                                userName: getUserName(),
                                                mip: card.hostIp, data: card,
                                                isHost: getUserId() === card.userId ? true : false
                                            }
                                        })}
                                        style={{
                                            position: 'relative',
                                            height: '200px',
                                            padding: 0,
                                            borderRadius: '12px',
                                            background: 'white',
                                            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))`,
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center',
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            width: '100%'
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

                                        <div style={{ padding: 10, color: 'white' }} >
                                            <Typography fontWeight={'bold'} variant="h6">{card.title}</Typography>
                                            <Typography variant="subtitle1">{formatDateTime(card.scheduleTime)}</Typography>
                                            <Typography variant="body2">{card.description}</Typography>
                                            {/* <Typography variant="body2">Speaker {card.speaker}</Typography> */}
                                        </div>

                                    </CardContent>
                                </Grid>

                            ))}
                        </Grid>
                        <Box display="flex" alignItems="center" justifyContent="center">

                        </Box>
                    </Container2>
                </Box>

            </div>

        </>
    );
};
export default Live;