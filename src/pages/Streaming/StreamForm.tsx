import React, { useRef, useState } from 'react';
import { TextField, Button, IconButton, Box, Typography, useMediaQuery } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import color from '../../components/utils/Colors';
import { createStreaming, generateMeetingId } from '../../services/services';
import { getUserId } from '../../services/axiosClient';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    url: Yup.string().required('Required'),
    // streamType: Yup.string().required('Required'),
    // thumbnail: Yup.mixed().required('Required'),
    // liveChat: Yup.boolean(),
    // visibility: Yup.string().required('Required'),
    // scheduleNow: Yup.boolean(),
    scheduleTime: Yup.date().when('scheduleNow', {
        is: false,
        then: (schema) => schema.required('Required'),
        otherwise: (schema) => schema.notRequired()
    })
});

const initialValues = {
    title: '',
    description: '',
    url: '',
    // streamType: '',
    // thumbnail: "",
    // liveChat: false,
    // visibility: 'public',
    scheduleTime: new Date()
};

const StreamForm = () => {
    const navigate = useNavigate();
    const formRef = useRef<any>();
    const [scheduleNow, setScheduleNow] = useState(true);
    const [roomId, setRoomId] = useState('');
    const [linkGenerated, setLinkGenerated] = useState(false);
    // const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const handleCreateMeeting = async () => {
        try {
            const response = await generateMeetingId();
            const data = response?.data?.data;
            setRoomId(data.roomId);
            formRef.current.setFieldValue('url', window.location.origin + '/stream/' + data.roomId);
            setLinkGenerated(true);
        } catch (error) {
            console.error('Error creating meeting:', error);
        }
    };

    const handleCopyLink = async () => {
        navigator.clipboard.writeText(window.location.origin + '/stream/' + roomId);
    };

    const isMobile800 = useMediaQuery('(max-width:800px)');

    return (
        <Formik
            innerRef={(f) => (formRef.current = f)}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values);
                fetch('https://api.ipify.org/?format=json')
                    .then(response => response.json())
                    .then(async (data) => {
                        createStreaming({
                            "streamingId": roomId,
                            "hostIp": data.ip,
                            "scheduleTime": values.scheduleTime,
                            "duration": 0,
                            "title": values.title,
                            "description": values.description,
                            'url': values.url,
                            'userId': getUserId(),
                            "status": "CREATED",
                        }).then(() => {
                            navigate(`/live`);
                        }).catch(error => console.log(error))
                    })
            }}
        >


            {({ values, setFieldValue, handleSubmit, isSubmitting, errors, touched }) => (

                <Form onSubmit={handleSubmit} style={{
                    display: 'flex', flexDirection: 'column', padding: '1% 5%', paddingBottom: isMobile800? '10%':'6%',
                    width: '80vw', margin: 'auto', rowGap: '20px', marginTop: '2%', marginBottom: '4%', borderRadius: '12px',
                    boxShadow: '0px 0px 15px rgba(0,0,0,0.1),10px -5px 15px rgba(0, 0, 0, 0.158) inset',

                }}>

                    <Typography variant="h4" gutterBottom
                        sx={{
                            marginTop: 5,
                            color: color.firstColor, fontWeight: 'bold', textAlign: 'center', marginBottom: 5,
                        }}>
                        Live Streaming Form
                    </Typography>

                    <Field className='input-root'
                        name="title"
                        as={TextField}
                        placeholder="Title of Stream"
                        fullWidth
                        margin="normal"
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title} />

                    <Field
                        name="description"
                        as={TextField}
                        placeholder="Description of Stream"
                        fullWidth
                        multiline rows={4}
                        margin="normal"
                        error={touched.description && Boolean(errors.description)}
                        helperText={touched.description && errors.description}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'solid 2px #2582e5c7',
                                    borderRadius: '8px',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#2583e5',
                                },
                                '&.Mui-focused fieldset': {
                                    // border: 'none', 
                                },
                            },
                        }} />


                    {/* <Field
                        className='input-root'
                        name="streamType"
                        as={TextField}
                        select
                        label="How do you want to go live?"
                        fullWidth
                        margin="normal"
                        error={touched.streamType && Boolean(errors.streamType)}
                        helperText={touched.streamType && errors.streamType}>
                        <MenuItem value="" disabled>
                            How do you want to go live?
                        </MenuItem>
                        <MenuItem value="webcam">
                            <Box display="flex" alignItems="center">
                                <CameraAlt />
                                &nbsp;Webcam
                            </Box>
                        </MenuItem>
                        <MenuItem value="url">
                            <Box display="flex" alignItems="center">
                                <LinkRoundedIcon />
                                &nbsp;With an URL
                            </Box>
                        </MenuItem>
                    </Field>


                    {values.streamType === 'url' && (
                        <Field
                            className='input-root'
                            name="url" as={TextField}
                            placeholder="Stream URL"
                            fullWidth margin="normal"
                            error={touched.url && Boolean(errors.url)}
                            helperText={touched.url && errors.url} />
                    )} */}



                    <Field
                        className='input-root'
                        name="url"
                        as={TextField}
                        placeholder="Stream URL"
                        fullWidth
                        margin="normal"
                        error={touched.url && Boolean(errors.url)}
                        helperText={touched.url && errors.url}
                        InputProps={{
                            readOnly: true,
                            endAdornment: linkGenerated ? (
                                <IconButton edge="end" color="primary" onClick={handleCopyLink}>
                                    <ContentCopyIcon />
                                </IconButton>
                            ) : (
                                <Button
                                    className='button'
                                    style={{
                                        fontSize:isMobile800?'10px':'14px',
                                        padding: '5px 15px',
                                        borderRadius: '8px'
                                    }}
                                    color="primary"
                                    onClick={() => handleCreateMeeting()}
                                >
                                    Generate&nbsp;Link
                                </Button>
                            ),
                        }}
                    />

                    {/* 
                    <div>
                        <input
                            accept="image/*"
                            id="thumbnail-upload"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={(event) => {
                                const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
                                setFieldValue('thumbnail', file);
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setThumbnailPreview(reader.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />

                        <label htmlFor="thumbnail-upload">
                            <Button className='button' variant="contained" color="primary" style={{ padding: '7px 10px', borderRadius: '8px', width: '20%' }}
                                component="span">
                                Upload Thumbnail
                            </Button>
                        </label>

                        {thumbnailPreview && (
                            <div style={{
                                marginTop: '20px', border: 'solid 2px #2583e5', height: '204px', background: 'rgb(198, 194, 194, 0.201)',
                                borderRadius: '8px',
                            }}>
                                <img src={thumbnailPreview} alt="Thumbnail Preview" style={{ width: '200px', height: '200px', borderRadius: '8px', border: '1px solid #ccc' }} />
                            </div>
                        )}
                    </div>

                    <Field className='input-root'
                        name="liveChat" as={FormControlLabel} control={<Checkbox />} label="Enable Live Chat" />

                    <FormControl component="fieldset" >
                        <FormLabel component="legend">Visibility</FormLabel>
                        <Field name="visibility" as={RadioGroup}>
                            <FormControlLabel value="public" control={<Radio />} label="Public" />
                            <FormControlLabel value="unlisted" control={<Radio />} label="Unlisted" />
                        </Field>
                    </FormControl> */}



                    <div style={{
                        display: 'flex', flexDirection: 'column', width: '100%',
                        justifyContent: 'center', alignItems: 'center',
                        rowGap: '30px', marginTop:'10px',
                    }}>

                        <div style={{
                            display: 'flex', justifyContent: 'space-between',
                            width: '100%'
                        }}>
                            <Button
                                style={{ width: 'fit-content', textTransform: 'none', borderRadius: '8px' }}
                                variant="outlined"
                                color="primary"
                                onClick={() => setScheduleNow(true)}
                                className={scheduleNow ? 'button' : ''}
                            >
                                Go Live Now
                            </Button>
                            <Button
                                type="button"
                                style={{ width: 'fit-content', padding: '7px 10px', textTransform: 'none', borderRadius: '8px' }}
                                variant="outlined"
                                color="primary"
                                onClick={() => setScheduleNow(prevState => !prevState)}
                                className={!scheduleNow ? 'button' : ''}
                            >
                                Go Live Later
                            </Button>
                        </div>


                        {!scheduleNow && (
                            <>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Box className="input-root" sx={{ width: '100%' }}>
                                        <DateTimePicker
                                            name="dateTime"
                                            // value={formik.values.date}
                                            onChange={(date: any) => setFieldValue('schedule', date)}
                                            sx={{ borderRadius: '20px', width: '100%' }}

                                        />
                                    </Box>
                                </LocalizationProvider>

                            </>
                        )}
                        <Button className='button' style={{ width: '100%', padding: '10px 20px', marginTop:'10px', borderRadius: '8px' }} type="submit" color="primary">Done</Button>


                    </div>

                </Form>
            )}
        </Formik>
    );
};

export default StreamForm;