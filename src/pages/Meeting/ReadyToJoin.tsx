import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton, Button, Typography, Avatar } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import Webcam from 'react-webcam';
import color from '../../components/utils/Colors';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMeetingParticipants } from '../../services/services';

const VideoCallInterface = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { meetingId, userName, mip, isHost } = location.state;
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const webcamRef = useRef(null);
  const [allParticipants, setAllParticipants] = useState<any[]>([]);


  const handleMicToggle = () => {
    setIsMicOn((prev) => !prev);
  };

  const handleVideoToggle = () => {
    setIsVideoOn((prev) => !prev);
  };

  useEffect(() => {
    getMeetingParticipants({ meetingId }).then((allParticipants) => {
      setAllParticipants(allParticipants?.data?.data.filter((o: any) => o.status === 'JOINED'));
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleJoin = () => {
    navigate(`/room/${meetingId}`, { state: { userName, mip, isHost, isMicOn, isVideoOn } });
  }

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  };

  return (
    <Box display="flex"
      sx={{
        alignItems: 'center',
        backgroundImage: "url('/images/voiceworldbg.svg')",
        backgroundSize: '110%',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        gap: '2%',
        flexDirection: { xs: 'column', lg: 'row' },
        height: { xs: '80vh', sm: '140vh' },
        padding: '2%'
      }}>

      <Box display="flex" alignItems="center" flexDirection='column' >

        <Box sx={{
          background: 'black', width: { xs: '80vw', lg: '60vw' },
          height: { xs: '25vh', sm: '80vh' },
          position: 'relative', borderRadius: '12px', overflow: 'hidden'
        }}>
          <div className='username' style={{ fontSize: '16px' }}>
            {userName}
          </div>
          {isVideoOn ? (
            <Webcam
              audio={isMicOn}
              ref={webcamRef}
              mirrored={true}
              videoConstraints={videoConstraints}
              style={{ width: '100%', height: '100%', objectFit: 'fill', marginBottom: 2 }}
            />
          ) : (
            <Box
              sx={{
                width: '100%', backgroundColor: 'black', position: 'relative',
                marginBottom: 4, height: { xs: '25vh', sm: '80vh' }
              }}
            >
              <div className='overlay'>
                <div className='avatar-container'>
                  {userName[0]}
                </div>

              </div>
            </Box>
          )}
        </Box>

        <Box display="flex" justifyContent="center" gap={2} sx={{
          background: color.sidebarButton, padding: '0px 10px',
          boxShadow: '0px 0px 15px rgba(0,0,0,0.1),10px -5px 15px rgba(0, 0, 0, 0.358) inset',
          mt: '35px', borderRadius: '26px'
        }}>
          <IconButton onClick={handleMicToggle} style={{ color: 'white' }}>
            {isMicOn ? <MicIcon /> : <MicOffIcon />}
          </IconButton>
          <IconButton onClick={handleVideoToggle} style={{ color: 'white' }}>
            {isVideoOn ? <VideocamIcon /> : <VideocamOffIcon />}
          </IconButton>
        </Box>
        {/* <Typography variant="h5" gutterBottom mt={2} mb={4} style={{ color: color.thirdColor }}>
          Test your audio and video
        </Typography> */}
      </Box>

      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        flexDirection: 'column', width: '100%'
      }}>

        <Typography variant="h5" gutterBottom mt={2} mb={4} style={{ color: color.thirdColor }}>
          Ready to join?
        </Typography>

        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '2%', }}>
          {
            allParticipants.length > 0 && <Avatar style={{
              background: color.sidebarButton,
              boxShadow: '0px 0px 15px rgba(0,0,0,0.1),10px -5px 15px rgba(0, 0, 0, 0.358) inset',
            }}>{allParticipants[0].userName[0]}</Avatar>
          }
          {
            allParticipants.length > 1 && <Avatar style={{
              background: color.sidebarButton,
              boxShadow: '0px 0px 15px rgba(0,0,0,0.1),10px -5px 15px rgba(0, 0, 0, 0.358) inset', translate: '-5px', border: 'solid 1px white'
            }}>{allParticipants[1].userName[0]}</Avatar>
          }
          {
            allParticipants.length > 2 && <Avatar style={{
              background: color.sidebarButton,
              boxShadow: '0px 0px 15px rgba(0,0,0,0.1),10px -5px 15px rgba(0, 0, 0, 0.358) inset', translate: '-10px', border: 'solid 1px white'
            }}>{allParticipants[2].userName[0]}</Avatar>
          }
          {
            allParticipants.length > 3 && <Avatar style={{
              background: color.sidebarButton,
              boxShadow: '0px 0px 15px rgba(0,0,0,0.1),10px -5px 15px rgba(0, 0, 0, 0.358) inset', translate: '-15px', border: 'solid 1px white'
            }}>{allParticipants[3].userName[0]}</Avatar>
          }
        </div>

        {allParticipants.length === 1 && <Typography gutterBottom mt={0} mb={4} style={{ color: color.thirdColor, fontSize: '14px' }}>
          {allParticipants[0].userName} is in the call
        </Typography>}

        {allParticipants.length > 1 && <Typography gutterBottom mt={0} mb={4} style={{ color: color.thirdColor, fontSize: '14px' }}>
          {allParticipants[0].userName}, {allParticipants.length - 1} and more are in the call
        </Typography>}


        <Box display="flex" gap={2} mb={3}>
          <Button variant="contained" onClick={() => handleJoin()} style={{
            background: color.sidebarButton,
            boxShadow: '0px 0px 15px rgba(0,0,0,0.1),10px -5px 15px rgba(0, 0, 0, 0.358) inset', borderRadius: '26px',
          }}>
            Join now
          </Button>
        </Box>

      </div>



      {/*<Box flex={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center" bgcolor="#f5f5f5" p={3}>
        <Typography variant="h5" gutterBottom>
          Ready to join?
        </Typography>
        {/* <Typography color="error" gutterBottom>
          No one else is here
        </Typography>
        <Typography color="error" gutterBottom>
          This call is open to anyone
        </Typography> */}
      {/* <Box display="flex" gap={2} mb={3}>
          <Button variant="contained" color="primary">
            Join now
          </Button>
          <Button variant="outlined" color="primary">
            Present
          </Button>
        </Box> */}
      {/* <Typography variant="body2">Other joining options</Typography>
        <Button variant="text" color="primary">
          Use Companion mode
        </Button> 
      </Box>*/}


    </Box>
  );
};

export default VideoCallInterface;
