/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Drawer, useMediaQuery, IconButton, InputAdornment, Tooltip } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { joinMeetingSchema } from '../../components/schema/schema';
import color from '../../components/utils/Colors';
import { getMeeting } from '../../services/services';
import UpCommingMeet from './UpCommingMeet';
import { getUserId, getUserName, isLoggedIn } from '../../services/axiosClient';
import InfoIcon from '@mui/icons-material/Info';

const JoinMeeting: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [meetings, setMeetings] = useState<any>([]);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const name1 = getUserName();

  const formik = useFormik({
    initialValues: {
      meetingId: searchParams.get('meetingId') || "",
      userName: name1 || "",
    },
    validationSchema: joinMeetingSchema,
    onSubmit: (values) => {
      fetch('https://api.ipify.org/?format=json')
        .then(response => response.json())
        .then(data => {
          getMeeting({
            "meetingId": values.meetingId
          }).then((result) => {
            if (result.data.data.length > 0)
              navigate(`/ready-to-join`, { state: { meetingId: values.meetingId, userName: values.userName, mip: data.ip, isHost: getUserId() === result.data.data[0].userId ? true : false } });
            else
              alert("There is no Meetings with this id")
          }).catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    },
  });

  const [name, setName] = useState(formik.values.userName);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    formik.handleChange(event);
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

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleTooltipToggle = () => {
    setTooltipOpen((prev) => !prev);
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
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
        <Typography variant="h4" component="h1" gutterBottom style={{ color: '#002a1e', textAlign: 'center' }}>
          Join a Meeting
        </Typography>

        <TextField
          className='input-root'
          placeholder="Enter Meeting ID"
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
          placeholder="Enter Password"
          fullWidth
        // margin="normal"
        // name="meetingId"
        // value={formik.values.meetingId}
        // onChange={formik.handleChange}
        // error={formik.touched.meetingId && Boolean(formik.errors.meetingId)}
        // helperText={formik.touched.meetingId && formik.errors.meetingId}
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
                    open={tooltipOpen}
                    onClose={handleTooltipClose}
                    onOpen={handleTooltipOpen}
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
                    <IconButton
                      edge="end"
                      onClick={handleTooltipToggle}
                      style={{
                        background: color.firstColor,
                        marginRight: '-2px',
                        padding: '0',
                      }}
                    >
                      <InfoIcon
                        style={{
                          width: '22px',
                          height: '22px',
                          color: 'white',
                          background: 'transparent',
                          borderRadius: '200px',
                        }}
                      />
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
          style={{ background: color.firstColor, fontWeight: 'bold', padding: '10px 0px', width: '30%', borderRadius: '8px', marginTop: '16px', marginBottom: '16px' }}
        >
          Join
        </Button>
      </Box>

      <Button
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
      </Button>
    </div>
  );
};

export default JoinMeeting;
