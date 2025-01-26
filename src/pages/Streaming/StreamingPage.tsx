// // StreamingPage.jsx
// import React from 'react';
// import { Box, Grid, Typography, Paper, List, ListItem, ListItemText, Divider, TextField, Button, Avatar, IconButton } from '@mui/material';
// import ReactPlayer from 'react-player';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAltOutlined';
// import ShareIcon from '@mui/icons-material/Share';
// import color from '../../components/utils/Colors';


// const inputSx = {

//   '& .MuiOutlinedInput-root': {
//     '& fieldset': {
//       border: 'none',
//     },
//     '&:hover fieldset': {
//       border: 'none',
//     },
//     '&.Mui-focused fieldset': {
//       border: 'none',
//     },

//   },
// };

// const StreamingPage = () => {
//   return (
//     <Box sx={{
//       flexGrow: 1, p: 2,
//       backgroundImage: "url('/images/voiceworldbg.svg')",
//       backgroundSize: '110%',
//       backgroundPosition: 'center',
//       backgroundRepeat: 'repeat',
//       paddingBottom: '5%'
//     }}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={8}>
//           <Paper elevation={3} sx={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000' }}>
//             <ReactPlayer
//               url="https://youtu.be/F0lowv3DyfI?si=DsdNv016PBQQ5zUR"
//               style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
//               controls
//               width="100%"
//               height="100%"
//             />
//           </Paper>
//           <Box mt={2}>
//           <Box display="flex" alignItems="center" mt={1}>
//             <Typography variant="h5" style={{ color: color.firstColor }}>Live Stream Title</Typography>
//             <Box ml="auto">
//               <IconButton sx={{ color: 'black' }}>
//                 <ThumbUpAltIcon />
//               </IconButton>
//               <IconButton sx={{ color: 'black' }}>
//                 <ChatBubbleOutlineIcon />
//               </IconButton>
//               <IconButton sx={{ color: 'black' }}>
//                 <ShareIcon />
//               </IconButton>
//             </Box>
//             </Box>
//             <Box display="flex" alignItems="center" mt={1}>
//               <Avatar alt="Streamer" src="https://via.placeholder.com/40" />
//               <Typography variant="body1" style={{ color: color.secondColor }} ml={2}>
//                 Streamer Name
//               </Typography>

//             </Box>

//             <Typography variant="body2" color="textSecondary" mt={2}>
//               Description of the live stream...
//             </Typography>
//           </Box>
//           <Box sx={{ borderRadius: '18px', background: 'white', color: 'white', border: 'solid 2px #460983', overflow: 'hidden' }} mt={4} pt={2}>
//             <Typography pb={1} variant="h5" style={{ color: color.firstColor, textAlign: 'center' }}>Related Videos</Typography>
//             <Divider />
//             <List style={{ background: 'white', color: 'black' }}>
//               {Array.from({ length: 5 }).map((_, index) => (
//                 <ListItem key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                   <Box sx={{ marginRight: 2 }}>
//                     <img src="https://via.placeholder.com/80" alt="Related Video" width="80" />
//                   </Box>
//                   <ListItemText primary={`Related Video Title ${index + 1}`} secondary="Streamer Name"
//                     sx={{
//                       '& .MuiListItemText-primary': { color: color.firstColor },
//                       '& .MuiListItemText-secondary': { color: color.secondColor },
//                     }} />
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Paper
//             style={{ borderRadius: '18px', }}
//             elevation={3}

//           >
//             <Box sx={{ borderRadius: '18px' }} style={{ background: 'white' }} pt={2}>
//               <Typography pb={1} pl={2} color={color.secondColor} variant="h6">Live Chat</Typography>
//               <Divider />
//               <List style={{ background: 'white', borderRadius: '8px' }}
//                 sx={{
//                   height: '60vh',
//                   overflowY: 'auto',
//                   '&::-webkit-scrollbar': {
//                     width: '6px',
//                   },
//                   '&::-webkit-scrollbar-thumb': {
//                     // border:'solid 1px #0FEAD0',
//                     boxShadow: '0px 0px 15px black',
//                     backgroundColor: color.secondColor,
//                     borderRadius: '8px',
//                   },
//                   '&::-webkit-scrollbar-track': {
//                     backgroundColor: color.scrollbarBg,
//                     borderRadius: '8px',
//                   },
//                 }}>
//                 {Array.from({ length: 10 }).map((_, index) => (
//                   <React.Fragment key={index}>
//                     <ListItem >
//                       <ListItemText primary={`User${index + 1}`} secondary="This is a comment."
//                         sx={{ '& .MuiListItemText-primary': { color: color.firstColor } }} />
//                     </ListItem>
//                     <Divider component="li" />
//                   </React.Fragment>
//                 ))}
//               </List>
//               <Box mt={0} p={2} pt={2} sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
//                 <TextField
//                   style={{ background: 'white', borderRadius: '18px', border: 'solid 1.5px #460983' }}
//                   fullWidth
//                   sx={inputSx}
//                   placeholder="Type a message..."
//                   multiline
//                   rows={3}
//                 />
//                 <Button variant="contained" style={{ color: 'white', background: color.firstColor, borderRadius: '8px' }} sx={{ mt: 1 }}>
//                   Send
//                 </Button>
//               </Box>
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default StreamingPage;

// // StreamingPage.jsx
// import React from 'react';
// import { Box, Grid, Typography, Paper, List, ListItem, ListItemText, Divider, TextField, Button, Avatar, IconButton } from '@mui/material';
// import ReactPlayer from 'react-player';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAltOutlined';
// import ShareIcon from '@mui/icons-material/Share';
// import color from '../../components/utils/Colors';


// const inputSx = {

//   '& .MuiOutlinedInput-root': {
//     '& fieldset': {
//       border: 'none',
//     },
//     '&:hover fieldset': {
//       border: 'none',
//     },
//     '&.Mui-focused fieldset': {
//       border: 'none',
//     },

//   },
// };

// const StreamingPage = () => {
//   return (
//     <Box sx={{
//       flexGrow: 1, p: 2,
//       backgroundImage: "url('/images/voiceworldbg.svg')",
//       backgroundSize: '110%',
//       backgroundPosition: 'center',
//       backgroundRepeat: 'repeat',
//       paddingBottom: '5%'
//     }}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={8}>
//           <Paper elevation={3} sx={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000' }}>
//             <ReactPlayer
//               url="https://youtu.be/F0lowv3DyfI?si=DsdNv016PBQQ5zUR"
//               style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
//               controls
//               width="100%"
//               height="100%"
//             />
//           </Paper>
//           <Box mt={2}>
//           <Box display="flex" alignItems="center" mt={1}>
//             <Typography variant="h5" style={{ color: color.firstColor }}>Live Stream Title</Typography>
//             <Box ml="auto">
//               <IconButton sx={{ color: 'black' }}>
//                 <ThumbUpAltIcon />
//               </IconButton>
//               <IconButton sx={{ color: 'black' }}>
//                 <ChatBubbleOutlineIcon />
//               </IconButton>
//               <IconButton sx={{ color: 'black' }}>
//                 <ShareIcon />
//               </IconButton>
//             </Box>
//             </Box>
//             <Box display="flex" alignItems="center" mt={1}>
//               <Avatar alt="Streamer" src="https://via.placeholder.com/40" />
//               <Typography variant="body1" style={{ color: color.secondColor }} ml={2}>
//                 Streamer Name
//               </Typography>

//             </Box>

//             <Typography variant="body2" color="textSecondary" mt={2}>
//               Description of the live stream...
//             </Typography>
//           </Box>
//           <Box sx={{ borderRadius: '18px', background: 'white', color: 'white', border: 'solid 2px #460983', overflow: 'hidden' }} mt={4} pt={2}>
//             <Typography pb={1} variant="h5" style={{ color: color.firstColor, textAlign: 'center' }}>Related Videos</Typography>
//             <Divider />
//             <List style={{ background: 'white', color: 'black' }}>
//               {Array.from({ length: 5 }).map((_, index) => (
//                 <ListItem key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                   <Box sx={{ marginRight: 2 }}>
//                     <img src="https://via.placeholder.com/80" alt="Related Video" width="80" />
//                   </Box>
//                   <ListItemText primary={`Related Video Title ${index + 1}`} secondary="Streamer Name"
//                     sx={{
//                       '& .MuiListItemText-primary': { color: color.firstColor },
//                       '& .MuiListItemText-secondary': { color: color.secondColor },
//                     }} />
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Paper
//             style={{ borderRadius: '18px', }}
//             elevation={3}

//           >
//             <Box sx={{ borderRadius: '18px' }} style={{ background: 'white' }} pt={2}>
//               <Typography pb={1} pl={2} color={color.secondColor} variant="h6">Live Chat</Typography>
//               <Divider />
//               <List style={{ background: 'white', borderRadius: '8px' }}
//                 sx={{
//                   height: '60vh',
//                   overflowY: 'auto',
//                   '&::-webkit-scrollbar': {
//                     width: '6px',
//                   },
//                   '&::-webkit-scrollbar-thumb': {
//                     // border:'solid 1px #0FEAD0',
//                     boxShadow: '0px 0px 15px black',
//                     backgroundColor: color.secondColor,
//                     borderRadius: '8px',
//                   },
//                   '&::-webkit-scrollbar-track': {
//                     backgroundColor: color.scrollbarBg,
//                     borderRadius: '8px',
//                   },
//                 }}>
//                 {Array.from({ length: 10 }).map((_, index) => (
//                   <React.Fragment key={index}>
//                     <ListItem >
//                       <ListItemText primary={`User${index + 1}`} secondary="This is a comment."
//                         sx={{ '& .MuiListItemText-primary': { color: color.firstColor } }} />
//                     </ListItem>
//                     <Divider component="li" />
//                   </React.Fragment>
//                 ))}
//               </List>
//               <Box mt={0} p={2} pt={2} sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
//                 <TextField
//                   style={{ background: 'white', borderRadius: '18px', border: 'solid 1.5px #460983' }}
//                   fullWidth
//                   sx={inputSx}
//                   placeholder="Type a message..."
//                   multiline
//                   rows={3}
//                 />
//                 <Button variant="contained" style={{ color: 'white', background: color.firstColor, borderRadius: '8px' }} sx={{ mt: 1 }}>
//                   Send
//                 </Button>
//               </Box>
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default StreamingPage;

// // StreamingPage.jsx
// import React from 'react';
// import { Box, Grid, Typography, Paper, List, ListItem, ListItemText, Divider, TextField, Button, Avatar, IconButton } from '@mui/material';
// import ReactPlayer from 'react-player';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAltOutlined';
// import ShareIcon from '@mui/icons-material/Share';
// import color from '../../components/utils/Colors';


// const inputSx = {

//   '& .MuiOutlinedInput-root': {
//     '& fieldset': {
//       border: 'none',
//     },
//     '&:hover fieldset': {
//       border: 'none',
//     },
//     '&.Mui-focused fieldset': {
//       border: 'none',
//     },

//   },
// };

// const StreamingPage = () => {
//   return (
//     <Box sx={{
//       flexGrow: 1, p: 2,
//       backgroundImage: "url('/images/voiceworldbg.svg')",
//       backgroundSize: '110%',
//       backgroundPosition: 'center',
//       backgroundRepeat: 'repeat',
//       paddingBottom: '5%'
//     }}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={8}>
//           <Paper elevation={3} sx={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000' }}>
//             <ReactPlayer
//               url="https://youtu.be/F0lowv3DyfI?si=DsdNv016PBQQ5zUR"
//               style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
//               controls
//               width="100%"
//               height="100%"
//             />
//           </Paper>
//           <Box mt={2}>
//           <Box display="flex" alignItems="center" mt={1}>
//             <Typography variant="h5" style={{ color: color.firstColor }}>Live Stream Title</Typography>
//             <Box ml="auto">
//               <IconButton sx={{ color: 'black' }}>
//                 <ThumbUpAltIcon />
//               </IconButton>
//               <IconButton sx={{ color: 'black' }}>
//                 <ChatBubbleOutlineIcon />
//               </IconButton>
//               <IconButton sx={{ color: 'black' }}>
//                 <ShareIcon />
//               </IconButton>
//             </Box>
//             </Box>
//             <Box display="flex" alignItems="center" mt={1}>
//               <Avatar alt="Streamer" src="https://via.placeholder.com/40" />
//               <Typography variant="body1" style={{ color: color.secondColor }} ml={2}>
//                 Streamer Name
//               </Typography>

//             </Box>

//             <Typography variant="body2" color="textSecondary" mt={2}>
//               Description of the live stream...
//             </Typography>
//           </Box>
//           <Box sx={{ borderRadius: '18px', background: 'white', color: 'white', border: 'solid 2px #460983', overflow: 'hidden' }} mt={4} pt={2}>
//             <Typography pb={1} variant="h5" style={{ color: color.firstColor, textAlign: 'center' }}>Related Videos</Typography>
//             <Divider />
//             <List style={{ background: 'white', color: 'black' }}>
//               {Array.from({ length: 5 }).map((_, index) => (
//                 <ListItem key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                   <Box sx={{ marginRight: 2 }}>
//                     <img src="https://via.placeholder.com/80" alt="Related Video" width="80" />
//                   </Box>
//                   <ListItemText primary={`Related Video Title ${index + 1}`} secondary="Streamer Name"
//                     sx={{
//                       '& .MuiListItemText-primary': { color: color.firstColor },
//                       '& .MuiListItemText-secondary': { color: color.secondColor },
//                     }} />
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Paper
//             style={{ borderRadius: '18px', }}
//             elevation={3}

//           >
//             <Box sx={{ borderRadius: '18px' }} style={{ background: 'white' }} pt={2}>
//               <Typography pb={1} pl={2} color={color.secondColor} variant="h6">Live Chat</Typography>
//               <Divider />
//               <List style={{ background: 'white', borderRadius: '8px' }}
//                 sx={{
//                   height: '60vh',
//                   overflowY: 'auto',
//                   '&::-webkit-scrollbar': {
//                     width: '6px',
//                   },
//                   '&::-webkit-scrollbar-thumb': {
//                     // border:'solid 1px #0FEAD0',
//                     boxShadow: '0px 0px 15px black',
//                     backgroundColor: color.secondColor,
//                     borderRadius: '8px',
//                   },
//                   '&::-webkit-scrollbar-track': {
//                     backgroundColor: color.scrollbarBg,
//                     borderRadius: '8px',
//                   },
//                 }}>
//                 {Array.from({ length: 10 }).map((_, index) => (
//                   <React.Fragment key={index}>
//                     <ListItem >
//                       <ListItemText primary={`User${index + 1}`} secondary="This is a comment."
//                         sx={{ '& .MuiListItemText-primary': { color: color.firstColor } }} />
//                     </ListItem>
//                     <Divider component="li" />
//                   </React.Fragment>
//                 ))}
//               </List>
//               <Box mt={0} p={2} pt={2} sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
//                 <TextField
//                   style={{ background: 'white', borderRadius: '18px', border: 'solid 1.5px #460983' }}
//                   fullWidth
//                   sx={inputSx}
//                   placeholder="Type a message..."
//                   multiline
//                   rows={3}
//                 />
//                 <Button variant="contained" style={{ color: 'white', background: color.firstColor, borderRadius: '8px' }} sx={{ mt: 1 }}>
//                   Send
//                 </Button>
//               </Box>
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default StreamingPage;

// // StreamingPage.jsx
// import React from 'react';
// import { Box, Grid, Typography, Paper, List, ListItem, ListItemText, Divider, TextField, Button, Avatar, IconButton } from '@mui/material';
// import ReactPlayer from 'react-player';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAltOutlined';
// import ShareIcon from '@mui/icons-material/Share';
// import color from '../../components/utils/Colors';


// const inputSx = {

//   '& .MuiOutlinedInput-root': {
//     '& fieldset': {
//       border: 'none',
//     },
//     '&:hover fieldset': {
//       border: 'none',
//     },
//     '&.Mui-focused fieldset': {
//       border: 'none',
//     },

//   },
// };

// const StreamingPage = () => {
//   return (
//     <Box sx={{
//       flexGrow: 1, p: 2,
//       backgroundImage: "url('/images/voiceworldbg.svg')",
//       backgroundSize: '110%',
//       backgroundPosition: 'center',
//       backgroundRepeat: 'repeat',
//       paddingBottom: '5%'
//     }}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={8}>
//           <Paper elevation={3} sx={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000' }}>
//             <ReactPlayer
//               url="https://youtu.be/F0lowv3DyfI?si=DsdNv016PBQQ5zUR"
//               style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
//               controls
//               width="100%"
//               height="100%"
//             />
//           </Paper>
//           <Box mt={2}>
//           <Box display="flex" alignItems="center" mt={1}>
//             <Typography variant="h5" style={{ color: color.firstColor }}>Live Stream Title</Typography>
//             <Box ml="auto">
//               <IconButton sx={{ color: 'black' }}>
//                 <ThumbUpAltIcon />
//               </IconButton>
//               <IconButton sx={{ color: 'black' }}>
//                 <ChatBubbleOutlineIcon />
//               </IconButton>
//               <IconButton sx={{ color: 'black' }}>
//                 <ShareIcon />
//               </IconButton>
//             </Box>
//             </Box>
//             <Box display="flex" alignItems="center" mt={1}>
//               <Avatar alt="Streamer" src="https://via.placeholder.com/40" />
//               <Typography variant="body1" style={{ color: color.secondColor }} ml={2}>
//                 Streamer Name
//               </Typography>

//             </Box>

//             <Typography variant="body2" color="textSecondary" mt={2}>
//               Description of the live stream...
//             </Typography>
//           </Box>
//           <Box sx={{ borderRadius: '18px', background: 'white', color: 'white', border: 'solid 2px #460983', overflow: 'hidden' }} mt={4} pt={2}>
//             <Typography pb={1} variant="h5" style={{ color: color.firstColor, textAlign: 'center' }}>Related Videos</Typography>
//             <Divider />
//             <List style={{ background: 'white', color: 'black' }}>
//               {Array.from({ length: 5 }).map((_, index) => (
//                 <ListItem key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                   <Box sx={{ marginRight: 2 }}>
//                     <img src="https://via.placeholder.com/80" alt="Related Video" width="80" />
//                   </Box>
//                   <ListItemText primary={`Related Video Title ${index + 1}`} secondary="Streamer Name"
//                     sx={{
//                       '& .MuiListItemText-primary': { color: color.firstColor },
//                       '& .MuiListItemText-secondary': { color: color.secondColor },
//                     }} />
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Paper
//             style={{ borderRadius: '18px', }}
//             elevation={3}

//           >
//             <Box sx={{ borderRadius: '18px' }} style={{ background: 'white' }} pt={2}>
//               <Typography pb={1} pl={2} color={color.secondColor} variant="h6">Live Chat</Typography>
//               <Divider />
//               <List style={{ background: 'white', borderRadius: '8px' }}
//                 sx={{
//                   height: '60vh',
//                   overflowY: 'auto',
//                   '&::-webkit-scrollbar': {
//                     width: '6px',
//                   },
//                   '&::-webkit-scrollbar-thumb': {
//                     // border:'solid 1px #0FEAD0',
//                     boxShadow: '0px 0px 15px black',
//                     backgroundColor: color.secondColor,
//                     borderRadius: '8px',
//                   },
//                   '&::-webkit-scrollbar-track': {
//                     backgroundColor: color.scrollbarBg,
//                     borderRadius: '8px',
//                   },
//                 }}>
//                 {Array.from({ length: 10 }).map((_, index) => (
//                   <React.Fragment key={index}>
//                     <ListItem >
//                       <ListItemText primary={`User${index + 1}`} secondary="This is a comment."
//                         sx={{ '& .MuiListItemText-primary': { color: color.firstColor } }} />
//                     </ListItem>
//                     <Divider component="li" />
//                   </React.Fragment>
//                 ))}
//               </List>
//               <Box mt={0} p={2} pt={2} sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
//                 <TextField
//                   style={{ background: 'white', borderRadius: '18px', border: 'solid 1.5px #460983' }}
//                   fullWidth
//                   sx={inputSx}
//                   placeholder="Type a message..."
//                   multiline
//                   rows={3}
//                 />
//                 <Button variant="contained" style={{ color: 'white', background: color.firstColor, borderRadius: '8px' }} sx={{ mt: 1 }}>
//                   Send
//                 </Button>
//               </Box>
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default StreamingPage;

import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, Typography, Paper, List, ListItem, ListItemText, Divider, TextField, Button, Avatar, IconButton, useMediaQuery, Drawer } from '@mui/material';
import ReactPlayer from 'react-player';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ShareIcon from '@mui/icons-material/Share';
import { io, Socket } from 'socket.io-client';
import color from '../../components/utils/Colors';
import { getUserId, SocketURL } from '../../services/axiosClient';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Peer from 'peerjs';
import UrlModal from '../../components/modal/UrlModal';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GroupIcon from '@mui/icons-material/Group';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { createStreamingParticipants, getStreamingParticipants, updateStreamingParticipants } from '../../services/services';



const inputSx = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
  },
};

const StreamingPage = () => {

  const { roomId } = useParams<{ roomId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.userName || 'Anonymous';
  const isHost = location.state?.isHost || false;
  const isMicOn = location.state?.isMicOn || true;
  const isVideoOn = location.state?.isHost || true;

  const isMobile = useMediaQuery('(max-width:1200px)');
  const isMobile600 = useMediaQuery('(max-width:600px)');
  const isMobile500 = useMediaQuery('(max-width:500px)');
  const isMobile900 = useMediaQuery('(max-width:900px)');
  let participants: any[] = [];
  const socketRef = useRef<Socket | null>(null);
  const peerRef = useRef<Peer | null>(null);
  const videoGridRef = useRef<HTMLDivElement>(null);
  const videoElements = useRef(new Map<string, HTMLVideoElement>());
  const localStreamRef = useRef<MediaStream | null>(null);
  const screenShareRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any | null>(null);

  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRemoteScreenSharing, setIsRemoteScreenSharing] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [liveStreamUrl, setLiveStreamUrl] = useState<string | null>(null);
  const [isLiveStreaming, setIsLiveStreaming] = useState(false);
  const liveStreamRef = useRef<HTMLVideoElement | null>(null);
  const originalVideoTracks = useRef(new Map<string, MediaStreamTrack>());
  const [isParticipantsDrawerOpen, setIsParticipantsDrawerOpen] = useState(false);
  const [allParticipants, setAllParticipants] = useState<any[]>([]);
  const [currentParticipants, setCurrentParticipants] = useState<any[]>([]);
  const [originalVideoTrack, setOriginalVideoTrack] = useState<MediaStreamTrack | null>(null);
  const [originalVideoState, setOriginalVideoState] = useState<boolean>(false);
  const data = location.state?.data || {};

  const currentUserId = getUserId();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const generatePeerId = () => 'anonymous-user-' + Math.random().toString(36).substring(2);

  useEffect(() => {

    getParticipantsList();
    if (username === null) {
      navigate('/live');
    }
    // setPeerId(generatePeerId());
    socketRef.current = io(SocketURL, {
      path: '/socket.io',
    });
    initializePeer(username + '_' + (currentUserId > 0 ? currentUserId : username) + '_' + isHost);

    socketRef.current.on('stream-ready', (newUserId: string, remoteUsername: string) => {
      connectToNewUser(newUserId, localStreamRef.current!, remoteUsername);
    });

    socketRef.current.on('user-connected', (res) => {
      if (res.roomId === roomId) {
        getParticipantsList();
        connectToNewUser(res.userId, localStreamRef.current!, res.userName);
      }
    });

    socketRef.current.on('user-disconnected', (userId: string) => {
      if (videoElements.current.has(userId)) {
        const video = videoElements.current.get(userId);
        const videoContainer = video?.parentElement;
        video?.remove();
        videoContainer?.remove();
        videoElements.current.delete(userId);
      }
    });

    socketRef.current.on('receive-message', (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // socketRef.current.on('start-screen-share', (userId: string) => {
    //     if (videoElements.current.has(userId)) {
    //         const screenVideo = videoElements.current.get(userId);
    //         if (screenVideo) {
    //             screenVideo.classList.add('screen-share-container');
    //             videoGridRef.current?.prepend(screenVideo.parentElement!);
    //         }
    //     }
    // });

    socketRef.current.on('start-screen-share', (userId: string) => {
      if (userId !== peerRef.current!.id) {
        // Create the screen share grid container (if it doesn't exist)
        let screenShareGrid = document.querySelector('.streaming-screen-share-grid');
        if (!screenShareGrid) {
          screenShareGrid = document.createElement('div');
          screenShareGrid.className = 'streaming-screen-share-grid';
          videoGridRef.current?.parentElement?.appendChild(screenShareGrid);
        }

        // Create a new video element
        const screenShareVideo = document.createElement('video');
        screenShareVideo.className = 'streaming-screen-share-video';

        // You will receive a call here from the screen-sharing user 
        // (see updated handleScreenShare below)
        peerRef.current!.on('call', (call) => {
          call.answer(); // Answer the call without sending a stream

          call.on('stream', (screenShareStream) => {
            screenShareVideo.srcObject = screenShareStream;
            screenShareVideo.addEventListener('loadedmetadata', () => {
              screenShareVideo.play();
            });
            if (screenShareGrid) {
              screenShareGrid.appendChild(screenShareVideo);
            }
            setIsRemoteScreenSharing(true)
            setIsScreenSharing(true);
          });

          call.on('close', () => {
            screenShareVideo.remove();
          });
        });
      }
    });

    socketRef.current.on('stop-screen-share', (userId: string) => {
      const peerConnection = findPeerConnection(userId);
      const originalTrack = originalVideoTracks.current.get(userId);

      if (peerConnection && originalTrack) {
        const videoSender = peerConnection.getSenders().find((sender: { track: { kind: string; }; }) => sender.track?.kind === 'video');
        if (videoSender) {
          videoSender.replaceTrack(originalTrack)
            .then(() => {
              console.log('Successfully switched back to original track for', userId);
            })
            .catch((error: any) => {
              console.error('Error switching back to original track:', error);
            });
        } else {
          console.error('Could not find video sender for', userId);
        }
      } else {
        console.error('Peer connection or original track not found for', userId);
      }
      setIsRemoteScreenSharing(false)
      setIsScreenSharing(false);
      removeElementsByClass('streaming-screen-share-video');
      removeElementsByClass('streaming-screen-share-grid');
    });



    socketRef.current.on('video-status-changed', (userId: string, isVideoOff: boolean) => {
      updateVideoOverlay(userId, isVideoOff);
    });


    socketRef.current.on("live-stream-started", (streamUrl) => {
      console.log("Live stream started with URL:", streamUrl);
      setLiveStreamUrl(streamUrl);
    });

    socketRef.current.on("live-stream-stopped", () => {
      console.log("Live stream stopped.");
      setLiveStreamUrl(null);
      if (playerRef.current) {
        playerRef.current.stopVideo();
      }
    });

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);



    // Call createPlayer when liveStreamUrl changes
    if (liveStreamUrl) createPlayer();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (peerRef.current) {
        peerRef.current.destroy();
      }
      videoElements.current.forEach((video) => {
        video.remove();
      });
      videoElements.current.clear();
    };
  }, [roomId, username, liveStreamUrl]); // Include liveStreamUrl in the dependencies


  function removeElementsByClass(className: string) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
      elements[0].parentNode!.removeChild(elements[0]);
    }
  }



  const getParticipantsList = () => {
    getStreamingParticipants({ streamingId: roomId }).then((allParticipants) => {
      console.log(allParticipants?.data?.data)
      if (allParticipants?.data?.data) {
        if (allParticipants?.data?.data.filter((o: any) => o.userId === peerRef.current!.id).length === 0) {
          let payload: any = {
            streamingId: roomId,
            userId: peerRef.current!.id,
            userName: username,
            status: 'JOINED',
          }
          participants = [...allParticipants?.data?.data, payload];
          setAllParticipants(participants);
          setCurrentParticipants(participants.filter(o => o.status === 'JOINED'));
          fetch('https://api.ipify.org/?format=json')
            .then(response => response.json())
            .then(data => {
              payload['userIp'] = data.ip;
              createStreamingParticipants(payload).then(() => { })
            })
        } else {
          participants = allParticipants?.data?.data;
          let userJoined = participants.find(o => o.userId === peerRef.current!.id);
          setAllParticipants(participants);
          if (userJoined && userJoined.status === 'JOINED') {
            setCurrentParticipants(participants.filter(o => o.status === 'JOINED'));
          }
          else {
            updateStreamingParticipants(userJoined.id, { status: 'JOINED' }).then(() => { });
            userJoined.status = 'JOINED';
            setCurrentParticipants([...participants.filter(o => o.status === 'JOINED')]);
          }
        }

      }
    })
  }


  // Function to create the YouTube player
  const createPlayer = () => {
    if (liveStreamUrl && !playerRef.current) {
      const videoId = getYouTubeVideoId(liveStreamUrl);
      if (videoId) {
        playerRef.current = new YT.Player('youtube-player', {
          height: '390',
          width: '640',
          videoId: videoId,
          events: {
            'onReady': (event: { target: { playVideo: () => void; }; }) => {
              event.target.playVideo();
            },
            // ... other events if needed
          }
        });
      }
    }
  };


  const findPeerConnection = (userId: string): any | undefined => {
    if (!peerRef.current) return undefined; // Handle cases where peerRef is not initialized

    // Assuming you are using a structure like this for your connections 
    // (because you use it in your handleScreenShare function):
    const connections = Object.values(peerRef.current.connections) as any[][];

    // Iterate through the connections to find the one matching the userId
    for (const peerConnectionArray of connections) {
      for (const conn of peerConnectionArray) {
        if (conn.peer === userId) {
          return conn.peerConnection;
        }
      }
    }

    console.warn("Peer connection not found for userId:", userId);
    return undefined;
  };

  const initializePeer = (peerId: string) => {
    peerRef.current = new Peer(peerId);
    peerRef.current.on('open', (id) => {
      console.log('My PeerJS ID:', id, roomId);
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((stream) => {
          changesOnStream(stream, id);
          socketRef.current!.emit('stream-ready', id);
          socketRef.current!.emit('join-room', roomId, id, username);
        })
        .catch((err) => console.error('Error accessing media devices.', err));
    });
  };


  const changesOnStream = (stream: any, id: any) => {
    localStreamRef.current = stream;
    const myVideo = document.createElement('video');
    myVideo.muted = true;
    if (isHost)
      addVideoStream(id, myVideo, stream, username);
    peerRef.current!.on('call', (call) => {
      call.answer(stream);
      const video = document.createElement('video');
      call.on('stream', (userVideoStream) => {
        let screenShareGrid = document.querySelector('.streaming-screen-share-grid');
        if (!screenShareGrid && !isRemoteScreenSharing) {
          if (call.peer.split('_')[2] && call.peer.split('_')[2] === 'true')
            addVideoStream(call.peer, video, userVideoStream, call.peer.split('_')[0]);
        }
      });
    });
  }

  const toggleParticipantsDrawer = () => {
    setIsParticipantsDrawerOpen(!isParticipantsDrawerOpen);
  };


  const connectToNewUser = (userId: string, stream: MediaStream, username: string) => {
    const call = peerRef.current!.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', (userVideoStream) => {
      if (userId.split('_')[2] && userId.split('_')[2] === 'true')
        addVideoStream(userId, video, userVideoStream, username);
    });
    call.on('close', () => {
      if (videoElements.current.has(userId)) {
        const video = videoElements.current.get(userId);
        const videoContainer = video?.parentElement;
        video?.remove();
        videoContainer?.remove();
        videoElements.current.delete(userId);
        setCurrentParticipants(prevValue =>
          prevValue.filter(o => o.userId !== userId.split('_')[1])
        );
      }
    });
  };

  const addVideoStream = (userId: string, video: HTMLVideoElement, stream: MediaStream, videoname: string) => {
    // if(us)
    const existingVideo = videoElements.current.get(userId);
    if (existingVideo) {
      existingVideo.srcObject = stream;
    } else {
      video.srcObject = stream;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
      // if (videoGridRef.current) {
      // const videoContainer = document.createElement('div');
      // videoContainer.id = userId;
      // videoContainer.className = 'video-container';

      const videoWrapper = document.createElement('div');
      videoWrapper.className = 'streaming-video-wrapper';
      videoWrapper.id = userId;
      videoWrapper.appendChild(video);
      // const usernameElement = document.createElement('div');
      // usernameElement.className = 'username';
      // usernameElement.textContent = videoname;
      // videoWrapper.appendChild(usernameElement);

      // Add overlay for initials (hidden by default)
      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      overlay.style.display = 'none';

      // Add Avatar to the overlay
      const avatar = document.createElement('div');
      avatar.className = 'avatar-container';
      avatar.textContent = videoname[0];
      overlay.appendChild(avatar);

      // videoContainer.appendChild(videoWrapper);
      videoWrapper.appendChild(overlay);
      videoGridRef?.current?.querySelector('.streaming-other-videos')?.appendChild(videoWrapper);
      // }
      videoElements.current.set(userId, video);
      handleMuteUnmuteOnLoad();
      handleVideoOnOffOnLoad();
    }
  };


  const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const handleMuteUnmute = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioMuted(!audioTrack.enabled);
      }
    }
  };


  const handleMuteUnmuteOnLoad = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isMicOn;
        setIsAudioMuted(isMicOn);
      }
    }
  };

  //livestream 

  const startLiveStream = async (url: string) => {
    setOpen(false); // Close modal or dialog if applicable

    try {
      // Emit event to server to start the live stream
      socketRef.current?.emit("start-live-stream", roomId, url);

      // Set the live stream URL and update state to show the stream
      setLiveStreamUrl(url);
      setIsLiveStreaming(true);
    } catch (error) {
      console.error("Error starting live stream:", error);
    }
  };


  const stopLiveStream = () => {
    try {
      // Emit event to server to stop the live stream
      socketRef.current?.emit("stop-live-stream", roomId);

      // Reset state and stop playback
      setLiveStreamUrl(null);
      setIsLiveStreaming(false);
    } catch (error) {
      console.error("Error stopping live stream:", error);
    }
  };



  const toggleStream = () => {
    if (isLiveStreaming) {
      stopLiveStream();
    } else {
      handleOpen();
    }
  };

  const handleVideoOnOff = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
        // Update the local video overlay
        console.log(!videoTrack.enabled)
        updateVideoOverlay(peerRef.current!.id, !videoTrack.enabled);
        socketRef.current?.emit('video-status-changed', roomId, peerRef.current!.id, !videoTrack.enabled);
      }
    }
  };


  const handleVideoOnOffOnLoad = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoOn;
        setIsVideoOff(isVideoOn);
        // Update the local video overlay
        updateVideoOverlay(peerRef.current!.id, isVideoOn);
        socketRef.current?.emit('video-status-changed', roomId, peerRef.current!.id, isVideoOn);
      }
    }
  };

  const updateVideoOverlay = (userId: string, isVideoOff: boolean) => {
    const videoContainer = videoElements.current.get(userId)?.parentElement as
      HTMLElement;
    if (videoContainer) {
      const overlay = videoContainer.querySelector(
        '.overlay'
      ) as HTMLDivElement;
      if (overlay) {
        overlay.style.display = isVideoOff ? 'flex' : 'none';
      }
    }
  };



  const handleLeaveCall = () => {
    // eslint-disable-next-line no-restricted-globals
    let result = confirm("Are you sure you want to leave streaming");
    if (result) {
      if (localStreamRef.current) {
        // Stop all media tracks
        localStreamRef.current.getTracks().forEach(track => track.stop());
        localStreamRef.current = null;
      }
      if (socketRef.current) {
        socketRef.current.emit('leave-room', roomId, peerRef.current!.id);
        socketRef.current.disconnect();
        let userToDisconnect = currentParticipants.find(o => o.userId === peerRef.current!.id)
        if (userToDisconnect) {
          updateStreamingParticipants(userToDisconnect.id, { status: 'LEFT' }).then(() => { });
        }
      }

      if (peerRef.current) {
        peerRef.current.destroy();
      }

      videoElements.current.forEach((video) => {
        const videoContainer = video.parentElement;
        video.remove();
        videoContainer?.remove();
      });
      videoElements.current.clear();

      navigate('/live');
    }
  };

  const handleScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const screenTrack = screenStream.getVideoTracks()[0];

      if (localStreamRef.current) {

        if (videoGridRef.current) {
          const screenShareVideo = document.createElement('video');
          screenShareVideo.className = 'streaming-screen-share-container';
          screenShareVideo.srcObject = screenStream;
          screenShareVideo.addEventListener('loadedmetadata', () => {
            screenShareVideo.play();
          });
          screenShareRef.current = screenShareVideo;

          // Create a new grid for the screen share video
          const screenShareGrid = document.createElement('div');
          screenShareGrid.className = 'streaming-screen-share-grid';
          screenShareGrid.appendChild(screenShareVideo);

          // const username = document.createElement('div');
          // username.className = 'username1';
          // const usernameOverlay = document.createElement('div');
          // usernameOverlay.className = 'username1-overlay';
          // usernameOverlay.textContent = Screen Sharing: ${username};
          // screenShareGrid.appendChild(usernameOverlay);

          // Append the new grid to the main container
          videoGridRef.current?.parentElement?.appendChild(screenShareGrid);
          setIsScreenSharing(true);

          const connections = Object.values(peerRef.current!.connections) as any[][];
          connections.forEach((peerConnectionArray) => {
            peerConnectionArray.forEach((conn) => {
              if (conn.peer !== peerRef.current!.id) { // Don't call yourself
                const call = peerRef.current!.call(conn.peer, screenStream);

              }
            });
          });
          socketRef.current?.emit('start-screen-share', roomId, peerRef.current!.id);
        }

        screenTrack.onended = () => {
          handleStopScreenShare();
        };
      }
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  };


  const handleStopScreenShare = () => {
    try {
      if (screenShareRef.current) {
        const screenShareGrid = document.querySelector('.streaming-screen-share-grid');
        screenShareGrid?.remove();
        screenShareRef.current = null;

        setIsScreenSharing(false);
      }

      if (localStreamRef.current) {
        const videoTrack = localStreamRef.current.getVideoTracks()[0];
        const connections = Object.values(peerRef.current!.connections) as any[][];
        connections.forEach((peerConnectionArray) => {
          peerConnectionArray.forEach((conn) => {
            const videoSender = conn.peerConnection.getSenders().find(
              (sender: any) => sender.track?.kind === 'video'
            );
            if (videoSender) {
              videoSender.replaceTrack(videoTrack).catch((error: any) => {
                console.error("Error replacing track:", error);
              });
            }
          });
        });
      }

      removeElementsByClass('screen-share-container');
      socketRef.current?.emit('stop-screen-share', roomId, peerRef.current!.id);
    } catch (error) {
      console.error('Error stopping screen share:', error);
    }
  };

  // Toggle screen share button handler
  const toggleScreenShare = () => {
    if (isScreenSharing) {
      handleStopScreenShare();
    } else {
      handleScreenShare();
    }
  };



  const handleSendMessage = () => {
    if (message.trim() !== '') {
      socketRef.current?.emit('send-message', roomId, `${username}: ${message}`);
      setMessage('');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Join Stream!',
      url: window.location.href,
    };

    try {
      await navigator.share(shareData);
      console.log('Content shared successfully');
    } catch (error) {
      console.error('Error sharing content', error);
    }
  };


  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    setLiked((prev) => !prev);
  };

  return (
    <Box sx={{
      flexGrow: 1, p: 2,
      backgroundImage: "url('/images/voiceworldbg.svg')",
      backgroundSize: '110%',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat',
      paddingBottom: '5%'
    }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>

          {liveStreamUrl ? (
            <Paper elevation={3} sx={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000' }}>
              <ReactPlayer
                url={liveStreamUrl}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                controls
                width="100%"
                height="100%"
              />
            </Paper>
          ) : (
            <Box
              sx={{
                minHeight:isMobile600?'auto': isScreenSharing?'auto':'480px',
                background:isScreenSharing?'none':'#3c3c3c',
                position: 'relative'
              }}>
              <Box
                sx={{
                  display: 'grid',
                  // gridTemplateColumns: (isScreenSharing || isRemoteScreenSharing)
                  //   ? isMobile
                  //     ? '60% 38%'
                  //     : '60% 38%'
                  //   : '100%',
                  // gap: '10px',
                  width: '100%',
                  position: isScreenSharing ? 'absolute' : 'relative',
                  height: '100%',
                  padding: isMobile ? '0px' : '0px'
                }}
                ref={videoGridRef}
              >


                <Box
                  sx={{
                    position: isScreenSharing ? 'absolute' : 'relative',
                    bottom: isScreenSharing ? '4px' : '0',
                    right: isMobile500 ? '0px' : '0',
                    gridColumn: !isMobile && (isScreenSharing || isRemoteScreenSharing) ? '2' : '1 / span 2',
                    paddingRight: '0px',
                    background: '#1d222c',
                    height: isScreenSharing ? isMobile500 ? '100px' : '150px' : isMobile600 ? '25vh' : 'auto',
                    width: isScreenSharing ? isMobile500 ? '100px' : '150px' : isMobile600 ? 'width: calc(100vw - 48px)' : isMobile900 ? 'width: calc(100vw - 125px)' : 'calc(100vw - 34vw - 85px)',
                  }}
                  className="streaming-other-videos"
                >
                </Box>


              </Box>
            </Box>

          )}
          <Box mt={2}>
            <Box display="flex" mt={1} mb={2} sx={{ justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
              <Typography variant="h5" pl={1} style={{ color: color.firstColor }}>{data.title}</Typography>
              <Box display="flex" pl={1} sx={{ justifyContent: 'flex-end', gap: '5px' }}>
                {isHost ? (
                  <>
                    <IconButton sx={{ fontSize: '40px', }} onClick={handleMuteUnmute} id="options__button">
                      {isAudioMuted ? <MicOffIcon /> : <MicIcon />}
                    </IconButton>
                    <IconButton sx={{ fontSize: '40px' }} onClick={handleVideoOnOff} id="options__button">
                      {isVideoOff ? <VideocamOffIcon /> : <VideocamIcon />}
                    </IconButton>
                    <IconButton onClick={toggleStream} style={{ fontSize: '40px', background: isLiveStreaming ? color.firstColor : '#1e232d' }} id="options__button">
                      <YouTubeIcon />
                    </IconButton>
                    <IconButton style={{ fontSize: '40px', background: isScreenSharing ? color.firstColor : '#1e232d' }} onClick={toggleScreenShare} id="options__button">
                      <ScreenShareIcon />
                    </IconButton>
                    <Box sx={{ display: 'flex', position: 'relative' }}>
                      <Box sx={{
                        position: 'absolute', color: 'white', zIndex: 10, fontWeight: 'bold',
                        fontSize: '10px', right: 2, top: 1
                      }}>{currentParticipants.length}</Box>
                      <IconButton
                        style={{ fontSize: '40px', background: isParticipantsDrawerOpen ? color.firstColor : '#1e232d' }}
                        onClick={toggleParticipantsDrawer}
                        id="options__button"
                      >
                        <GroupIcon />
                      </IconButton>
                    </Box>
                    <Drawer
                      anchor="right"
                      open={isParticipantsDrawerOpen}
                      onClose={toggleParticipantsDrawer}
                    >
                      <List>
                        <ListItem key={0}>
                          <ListItemText
                            primary={
                              <Typography variant="h6">
                                Participants ({currentParticipants.length})
                              </Typography>
                            }
                          />
                        </ListItem>
                        {currentParticipants.map((participant) => (
                          <ListItem key={participant.id}>
                            <ListItemText
                              primary={
                                <Typography variant="body1">
                                  {participant.userName}
                                </Typography>
                              } />
                          </ListItem>
                        ))}
                      </List>
                    </Drawer>
                    <UrlModal
                      header={'Upload'}
                      format={"image/*"}
                      open={open}
                      handleClose={handleClose}
                      label={'Add Your URL here '}
                      inputrow={2}
                      inputTitle={''}
                      inputlabel={'Add Your URL here '}
                      onSubmit={(url: string) => startLiveStream(url)}
                    />
                  </>
                ) : <></>}
                <IconButton
                  style={{ fontSize: '40px', background: liked ? color.firstColor : '#1e232d' }}
                  id="options__button"
                  onClick={handleClick}
                >
                  {liked ? <ThumbUpAltRoundedIcon /> : <ThumbUpAltIcon />}
                </IconButton>
                <IconButton style={{ fontSize: '40px', background: '#1e232d' }}
                  onClick={handleShare}
                  id="options__button">
                  <ShareIcon />
                </IconButton>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mt={1}>
              <Avatar>{username[0]}</Avatar>
              <Typography variant="body1" style={{ color: color.secondColor }} ml={2}>
                {username}
              </Typography>
            </Box>
            <Typography variant="body2" color="textSecondary" mt={2}>
              {data.description}
            </Typography>
          </Box>
          <Box sx={{ borderRadius: '18px', background: 'white', color: 'white', border: 'solid 2px #460983', overflow: 'hidden' }} mt={4} pt={2}>
            <Typography pb={1} variant="h5" style={{ color: color.firstColor, textAlign: 'center' }}>Related Videos</Typography>
            <Divider />
            <List style={{ background: 'white', color: 'black' }}>
              {Array.from({ length: 5 }).map((_, index) => (
                <ListItem key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ marginRight: 2 }}>
                    <img src="https://via.placeholder.com/80" alt="Related Video" width="80" />
                  </Box>
                  <ListItemText primary={`Related Video Title ${index + 1}`} secondary="Streamer Name"
                    sx={{
                      '& .MuiListItemText-primary': { color: color.firstColor },
                      '& .MuiListItemText-secondary': { color: color.secondColor },
                    }} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper style={{ borderRadius: '18px' }} elevation={3}>
            <Box sx={{ borderRadius: '18px' }} style={{ background: 'white' }} pt={2}>
              <Typography pb={1} pl={2} color={color.secondColor} variant="h6">Live Chat</Typography>
              <Divider />
              <List
                style={{ background: 'white', borderRadius: '8px' }}
                sx={{
                  height: '40vh',
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    boxShadow: '0px 0px 15px black',
                    backgroundColor: color.secondColor,
                    borderRadius: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: color.scrollbarBg,
                    borderRadius: '8px',
                  },
                }}
              >
                {messages.map((message, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText primary={message} sx={{ '& .MuiListItemText-primary': { color: color.firstColor } }} />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
              <Box mt={0} p={2} pt={2} sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                <TextField
                  style={{ background: 'white', borderRadius: '18px', border: 'solid 1.5px #460983' }}
                  fullWidth
                  sx={inputSx}
                  placeholder="Type a message..."
                  multiline
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button variant="contained" style={{ color: 'white', background: color.firstColor, borderRadius: '8px' }} sx={{ mt: 1 }} onClick={handleSendMessage}>
                  Send
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StreamingPage;