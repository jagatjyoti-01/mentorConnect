import React, { useState } from 'react';
import { Box, Button, IconButton, TextField, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { createStreaming, generateMeetingId } from '../../services/services';
import { useFormik } from 'formik';
import { HostMeetingSchema } from '../../components/schema/schema';
import color from '../../components/utils/Colors';
import { getUserId } from '../../services/axiosClient';

const HostLiveStreaming: React.FC = () => {
    const [meetingId, setMeetingId] = useState('');
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');


    const formik = useFormik({
        initialValues: {
            meetingId: '',
            userName: '',
            streamUrl: '',
        },
        validationSchema: HostMeetingSchema,
        onSubmit: (values) => {
            fetch('https://api.ipify.org/?format=json')
                .then(response => response.json())
                .then(data => {
                    createStreaming({
                        "streamingId": values.meetingId,
                        "hostIp": data.ip,
                        "scheduleTime": new Date(),
                        'userId': getUserId(),
                        "duration": 0,
                        "status": "CREATED",
                    }).then(() => {
                        navigate(`/stream/${values.meetingId}`, { state: { userName: values.userName, mip: data.ip, isHost: true } });
                    }).catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        },
    });

    const handleCreateMeeting = async () => {
        try {
            const response = await generateMeetingId();
            const data = response?.data?.data;
            setMeetingId(data.roomId);
            formik.setFieldValue('meetingId', data.roomId);
        } catch (error) {
            console.error('Error creating meeting:', error);
        }
    };

    const handleCopyLink = async () => {
        navigator.clipboard.writeText(window.location.origin + '/join-meeting?meetingId=' + meetingId);
    };

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
                <Typography variant="h4" component="h1" gutterBottom>
                    Host a Live-Stream
                </Typography>

                <TextField
                    className="input-root"
                    placeholder="Streaming ID"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="meetingId"
                    value={formik.values.meetingId}
                    onChange={formik.handleChange}
                    error={formik.touched.meetingId && Boolean(formik.errors.meetingId)}
                    helperText={formik.touched.meetingId && formik.errors.meetingId}
                    InputProps={{
                        endAdornment: (
                            <IconButton edge="end" color="primary" onClick={handleCopyLink}>
                                <ContentCopyIcon />
                            </IconButton>
                        ),
                    }}
                />

                {/* <TextField
                    className="input-root"
                    placeholder="Your Url For Stream "
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="streamUrl"
                    value={formik.values.streamUrl}
                    onChange={formik.handleChange}
                    error={formik.touched.streamUrl && Boolean(formik.errors.streamUrl)}
                    helperText={formik.touched.streamUrl && formik.errors.streamUrl}
                /> */}

                <TextField
                    className="input-root"
                    placeholder="Your Name"
                    variant="outlined"
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
                    style={{ background: color.firstColor, fontWeight: 'bold', padding: '8px 0px', width: '30%', borderRadius: '8px', marginTop: '16px', marginBottom: '16px' }}
                >
                    Host
                </Button>
                <Button
                    onClick={handleCreateMeeting}
                    variant="contained"
                    style={{ background: color.firstColor, fontWeight: 'bold', padding: '10px 0px', width: isMobile ? '60%' : '40%', borderRadius: '8px', marginTop: '16px', marginBottom: '16px' }}
                >
                    Generate Stream Id
                </Button>
            </Box>
        </div>
    );
};

export default HostLiveStreaming;