import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Drawer, IconButton, useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFnsV3';
import { useFormik } from 'formik';
import { createMeeting, generateMeetingId, getMeeting } from '../../services/services';
import { scheduleValidationSchema } from '../../components/schema/schema';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import color from '../../components/utils/Colors';
import UpCommingMeet from './UpCommingMeet';
import { getUserId } from '../../services/axiosClient';
import Calendly from '../Calendly';

const ScheduleMeeting: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const [meetings, setMeetings] = useState<any>([]);
    const isMobile = useMediaQuery('(max-width:600px)');

    const formik = useFormik({
        initialValues: {
            meetingId: '',
            dateTime: null,
        },
        validationSchema: scheduleValidationSchema,
        onSubmit: (values) => {
            fetch('https://api.ipify.org/?format=json')
                .then(response => response.json())
                .then(data => {
                    createMeeting({
                        "meetingId": values.meetingId,
                        "hostIp": data.ip,
                        "scheduleTime": values.dateTime,
                        'userId': getUserId(),
                        "duration": 0,
                        "status": "CREATED",
                    }).then(() => {
                        navigate(`/host-meeting`);
                    }).catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        },
    });

    const handleCopyLink = async () => {
        navigator.clipboard.writeText(window.location.origin + '/join-meeting?meetingId=' + formik.values.meetingId);
    };

    const handleCreateMeeting = async () => {
        try {
            const response = await generateMeetingId();
            const data = response?.data?.data;
            formik.setFieldValue('meetingId', data.roomId);
        } catch (error) {
            console.error('Error creating meeting:', error);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    useEffect(() => {
        getMeeting({
            fieldName: "scheduleTime",
            "fieldValue": new Date()
        }).then((result) => {
            setMeetings(result.data.data)
        }).catch(error => console.log(error))
    }, [])


    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                backgroundImage: "url('/images/voiceworldbg.svg')",
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="80vh"
                width={isMobile ? '100%' : "70%"}
                padding={2}
                component="form"
                onSubmit={formik.handleSubmit}
            >
                <Typography variant="h4" component="h1" gutterBottom style={{ color: '#002a1e' }}>
                    Schedule Meetings
                </Typography>

                <TextField
                    className="input-root"
                    placeholder="Meeting ID"
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
                    placeholder="Your Name"
                    fullWidth
                    margin="normal"
                    name="userName"  
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    error={formik.touched.userName && Boolean(formik.errors.userName)}
                    helperText={formik.touched.userName && formik.errors.userName}
                /> */}

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Box className="input-root" sx={{ width: '100%' }}>
                        <DateTimePicker
                            name="dateTime"
                            value={formik.values.dateTime}
                            onChange={(newValue) => formik.setFieldValue('dateTime', newValue)}
                            sx={{ borderRadius: '20px', width: '100%' }}
                        //   renderInput={(params) => (
                        //     <TextField 
                        //       {...params}
                        //       fullWidth
                        //       margin="normal"
                        //       error={formik.touched.dateTime && Boolean(formik.errors.dateTime)}
                        //       helperText={formik.touched.dateTime && formik.errors.dateTime}
                        //     />
                        //   )}
                        />
                    </Box>
                </LocalizationProvider>

                <Typography component="h3">Using Calendly you can schedule the time !<Link to='/calendly'>click here</Link></Typography>


                <Button
                    type="submit"
                    variant="contained"
                    style={{
                        background: color.firstColor,
                        fontWeight: 'bold',
                        width: '30%',
                        borderRadius: '8px',
                        marginTop: '16px',
                        marginBottom: '16px',
                    }}
                >
                    Save
                </Button>
                <Button
                    onClick={handleCreateMeeting}
                    variant="contained"
                    style={{
                        background: color.firstColor,
                        fontWeight: 'bold',
                        width: isMobile ? '60%' : '40%',
                        borderRadius: '8px',
                        marginTop: '16px',
                        marginBottom: '16px',
                    }}
                >
                    Generate Meeting Id
                </Button>
            </Box>
            <Button
                variant="contained"
                onClick={toggleSidebar}
                style={{
                    position: 'absolute',
                    right: '16px',
                    top: '16px',
                    background: color.firstColor,
                    marginTop: '2%',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                }}
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
                style={{
                    position: 'absolute',
                    right: '16px',
                    top: '70px',
                    background: color.firstColor,
                    marginTop: '2%',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                }}
                onClick={() => navigate('/join-meeting')}
            >
                Join Meetings
            </Button>
        </div>
    );
};

export default ScheduleMeeting;