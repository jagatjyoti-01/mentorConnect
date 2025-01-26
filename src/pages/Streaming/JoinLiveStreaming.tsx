/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Box, Button, TextField, Typography, useMediaQuery } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { joinMeetingSchema } from '../../components/schema/schema';
import color from '../../components/utils/Colors';
import { getStreaming } from '../../services/services';
import { getUserId } from '../../services/axiosClient';

const JoinLiveStreaming: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');

    const formik = useFormik({
        initialValues: {
            meetingId: searchParams.get('meetingId') || "",
            userName: '',
        },
        validationSchema: joinMeetingSchema,
        onSubmit: (values) => {
            fetch('https://api.ipify.org/?format=json')
                .then(response => response.json())
                .then(data => {
                    getStreaming({
                        "streamingId": values.meetingId
                    }).then((result) => {
                        if (result.data.data.length > 0)
                            navigate(`/stream/${values.meetingId}`, { state: { userName: values.userName, mip: data.ip, isHost: getUserId() === result.data.data[0].userId ? true : false } });
                        else
                            alert("There is no Meetings with this id")
                    }).catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        },
    });



    return (
        <div style={{
            display: 'flex', justifyContent: 'center',
            backgroundImage: "url('/images/voiceworldbg.svg')",
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>
            <Box
                component="form"
                onSubmit={formik.handleSubmit}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="90vh"
                width={isMobile ? '100%' : "70%"}
                padding={2}
            >
                <Typography variant="h4" component="h1" gutterBottom style={{ color: '#002a1e', textAlign: 'center' }}>
                    Join a LiveStream
                </Typography>

                <TextField
                    className='input-root'
                    placeholder="Meeting ID"
                    fullWidth
                    margin="normal"
                    name="meetingId"
                    value={formik.values.meetingId}
                    onChange={formik.handleChange}
                    error={formik.touched.meetingId && Boolean(formik.errors.meetingId)}
                    helperText={formik.touched.meetingId && formik.errors.meetingId}
                />

                <TextField
                    className='input-root'
                    placeholder="Your Name"
                    fullWidth
                    margin="normal"
                    name="userName"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    error={formik.touched.userName && Boolean(formik.errors.userName)}
                    helperText={formik.touched.userName && formik.errors.userName}
                />

                <Button
                    type="submit"
                    variant="contained"
                    style={{ background: color.firstColor, fontWeight: 'bold', padding: '10px 0px', width: '30%', borderRadius: '8px', marginTop: '16px', marginBottom: '16px' }}
                >
                    Join
                </Button>
            </Box>

            {/* <Button
                variant="contained"
                onClick={toggleSidebar}
                style={{ position: 'absolute', right: '16px', top: '16px', background: color.firstColor, marginTop: '2%', fontWeight: 'bold', borderRadius: '8px' }}
            >
                Upcoming Meetings
            </Button>

            <Drawer
                anchor="right"
                open={isSidebarOpen}
                onClose={toggleSidebar}
                sx={{
                    background: 'transparent',
                    zIndex: 1,
                    width: 250,
                    flexShrink: 0,
                    overflow: 'visible',
                    '& .MuiDrawer-paper': {
                        width: 245,
                        boxSizing: 'border-box',
                        border: 'none',
                        background: 'transparent',
                        boxShadow: 'none',
                        overflow: 'visible',
                    },
                    '& .MuiModal-backdrop': {

                        background: 'transparent',

                    },
                }}
            >
                {<UpCommingMeet meetings={meetings} formik={formik} toggleSidebar={toggleSidebar} />}
            </Drawer>
            <Button
                variant="contained"
                style={{ position: 'absolute', right: '16px', top: '70px', background: color.firstColor, marginTop: '2%', fontWeight: 'bold', borderRadius: '8px' }}
                onClick={() => navigate('/schedule-meeting')}
            >
                Schedule Meetings
            </Button> */}
        </div>
    );
};

export default JoinLiveStreaming;
