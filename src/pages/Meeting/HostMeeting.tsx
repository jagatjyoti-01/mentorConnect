import React, { useState } from 'react';
import { Box, Button, IconButton, InputAdornment, TextField, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { createMeeting, generateMeetingId } from '../../services/services';
import { useFormik } from 'formik';
import { HostMeetingSchema } from '../../components/schema/schema';
import color from '../../components/utils/Colors';
import { getUserId, getUserName, isLoggedIn } from '../../services/axiosClient';
import InfoIcon from '@mui/icons-material/Info';

const HostMeeting: React.FC = () => {
    const [meetingId, setMeetingId] = useState('');
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');
    const name1 = getUserName();

    const formik = useFormik({
        initialValues: {
            meetingId: '',
            userName: name1 || "",
        },
        validationSchema: HostMeetingSchema,
        onSubmit: (values) => {
            fetch('https://api.ipify.org/?format=json')
                .then(response => response.json())
                .then(data => {
                    createMeeting({
                        "meetingId": values.meetingId,
                        "hostIp": data.ip,
                        "scheduleTime": new Date(),
                        "duration": 0,
                        'userId': getUserId(),
                        "status": "CREATED",
                    }).then(() => {
                        navigate(`/ready-to-join`, { state: { meetingId: values.meetingId, userName: values.userName, mip: data.ip, isHost: true } });
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
                    Host a Meeting
                </Typography>

                <TextField
                    className="input-root"
                    placeholder="Click The Button Below To Generate Meeting ID"
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

                <TextField
                    className="input-root"
                    placeholder="Enter Your Name"
                    fullWidth
                    margin="normal"
                    name="userName"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    error={formik.touched.userName && Boolean(formik.errors.userName)}
                    helperText={formik.touched.userName && formik.errors.userName}
                    InputProps={{
                        endAdornment: (
                            isLoggedIn() ? (
                                <InputAdornment position="end">
                                    <Tooltip
                                        title="You can provide a custom name to be displayed during the meeting"
                                        componentsProps={{
                                            tooltip: {
                                                sx: {
                                                    width: 'fit-content',
                                                    background: color.sidebarButton,
                                                    color: color.sidebarButtonText,
                                                    borderRadius: '8px',
                                                    padding: '6px',
                                                    paddingRight: '4px',
                                                    paddingLeft: '8px',
                                                    fontSize: '13px',
                                                    boxShadow: '5px -5px 15px rgba(0, 0, 0, 0.358) inset',
                                                    '& .MuiTooltip-arrow': { color: 'white' },
                                                },
                                            },
                                        }}
                                    >
                                        <IconButton edge="end" style={{
                                            background: color.firstColor,
                                            marginRight: '-2px', padding: '0'
                                        }}>
                                            <InfoIcon style={{
                                                width: '22px',
                                                height: '22px',
                                                color: 'white',
                                                background: 'transparent',
                                                borderRadius: '200px',
                                                // boxShadow: '5px -5px 15px rgba(0, 0, 0, 0.358) inset'
                                            }} />
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            ) : (<></>)
                        ),
                    }}
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
                    Generate Meeting Id
                </Button>
            </Box>
        </div>
    );
};

export default HostMeeting;