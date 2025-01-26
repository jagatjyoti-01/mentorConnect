import { Avatar, Box, Grid, IconButton, Typography, useMediaQuery } from "@mui/material";
import color from "../../components/utils/Colors";
import CallEndIcon from '@mui/icons-material/CallEnd';
// import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import ChatIcon from '@mui/icons-material/Chat';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';



const VideoControlls = ({username,isChatVisible,setIsChatVisible,
    handleMuteUnmute,
    handleVideoOnOff,
    isAudioMuted,
    isVideoOff,
    isHost,
    handleLeaveCall
}: any) => {
    const isMobile = useMediaQuery('(max-width:600px)');
    
    return (
        <>
        <Box sx={{ display: isMobile ? 'flex' : 'none', marginBottom: '5px', justifyContent: 'space-between' }}>
                    <Box className="user-info">
                        <Avatar className="avatar">{username[0]}</Avatar>
                        <Typography>{username}</Typography>
                    </Box>

                    <IconButton style={{ fontSize: '40px', marginRight: '10px', background: isChatVisible ? color.firstColor : '#1e232d' }} onClick={()=>setIsChatVisible(!isChatVisible)} id="options__button">
                        <ChatIcon />
                    </IconButton>
                </Box>

                <Box className="options" >
                    <Box sx={{ width: '100%' }}>

                        <Grid container style={{
                            position: 'relative', padding: '1rem',
                            boxShadow: '0px 0px 15px rgba(0,0,0,0.1),10px -5px 15px rgba(0, 0, 0, 0.258) inset',
                        }}>
                            <Grid item xs={12} sm={4} style={{
                                alignItems: 'center', marginBottom: isMobile ? '10px' : '0px',
                                display: isMobile ? 'none' : 'flex'
                            }}>
                                <Box className="user-info">
                                    <Avatar className="avatar">{username[0]}</Avatar>
                                    <Typography>{username}</Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={4} style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'end' }}>
                                <IconButton sx={{ fontSize: '40px', }} onClick={handleMuteUnmute} id="options__button">
                                    {isAudioMuted ? <MicOffIcon /> : <MicIcon />}
                                </IconButton>
                                <IconButton sx={{ fontSize: '40px' }} onClick={handleVideoOnOff} id="options__button">
                                    {isVideoOff ? <VideocamOffIcon /> : <VideocamIcon />}
                                </IconButton>



                                <IconButton onClick={handleLeaveCall} style={{ color: 'white', background: 'red', height: '45px', width: '45px' }} id="options__button">
                                    <CallEndIcon />
                                </IconButton>
                                {/* <IconButton style={{ fontSize: '40px', background: isScreenSharing ? color.firstColor : '#1e232d' }} onClick={toggleScreenShare} id="options__button">
                                    <ScreenShareIcon />
                                </IconButton> */}

                            </Grid>

                            <Grid item xs={4} style={{ display: isMobile ? 'none' : 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <IconButton style={{ fontSize: '40px', marginRight: '10px', background: isChatVisible ? color.firstColor : '#1e232d' }} onClick={()=>setIsChatVisible(!isChatVisible)} id="options__button">
                                    <ChatIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
        </>
    )
}


export default VideoControlls;