// import { AppBar, Avatar, Box, Drawer, List, ListItem, Tooltip, Typography } from '@mui/material';
// import { Link, useLocation } from 'react-router-dom';
// import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';
// import LiveTvRoundedIcon from '@mui/icons-material/LiveTvRounded';
// import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// import HeadsetMicRoundedIcon from '@mui/icons-material/HeadsetMicRounded';
// import UpcomingRoundedIcon from '@mui/icons-material/UpcomingRounded';
// import PersonIcon from '@mui/icons-material/Person';
// // import CoPresentIcon from '@mui/icons-material/CoPresent';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
// import { useState } from 'react';
// import color from '../utils/Colors';
// import { getUserName } from '../../services/axiosClient';

// const icons = [
//   { to: "/", icon: <HomeRoundedIcon style={{ width: '30px' }} />, title: "Home" },
//   { to: "/live", icon: <LiveTvRoundedIcon style={{ width: '30px' }} />, title: "Live" },
//   { to: "/upcoming", icon: <UpcomingRoundedIcon style={{ width: '30px' }} />, title: "Upcoming" },
//   { to: "/popular-videos", icon: <WhatshotRoundedIcon style={{ width: '30px' }} />, title: "Popular" },
//   { to: "/podcast", icon: <HeadsetMicRoundedIcon style={{ width: '30px' }} />, title: "Podcasts" },
//   { to: "/our-team", icon: <GroupsRoundedIcon style={{ width: '30px' }} />, title: "Our Team" },
//   // { to: "/webinar", icon: <CoPresentIcon style={{ width: '30px' }} />, title: "Webinar" },
// ];

// const icons2 = [
//   { to: "/", icon: <HomeRoundedIcon style={{ width: '30px' }} />, title: "Home" },
//   { to: "/live", icon: <LiveTvRoundedIcon style={{ width: '30px' }} />, title: "Live" },
//   { to: "/upcoming", icon: <UpcomingRoundedIcon style={{ width: '30px' }} />, title: "Upcoming" },
//   { to: "/popular-videos", icon: <WhatshotRoundedIcon style={{ width: '30px' }} />, title: "Popular" },
//   { to: "/podcast", icon: <HeadsetMicRoundedIcon style={{ width: '30px' }} />, title: "Podcasts" },
//   { to: "/profile", icon: <PersonIcon style={{ width: '30px' }} />, title: "Account" },
// ];

// const Sidebar = () => {
//   const isMobile = useMediaQuery('(max-width:600px)');
//   const location = useLocation();
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <>
//       {!isMobile ? (
//         <Drawer
//           variant="permanent"
//           sx={{
//             zIndex: 2,
//             width: 80,
//             background: 'transparent',
//             flexShrink: 0,
//             overflow: 'visible',
//             transition: 'width 0.3s ease',
//             '& .MuiDrawer-paper': {
//               width: isHovered ? 160 : 75,
//               background: 'transparent',
//               boxSizing: 'border-box',
//               border: 'none',
//               overflow: 'visible',
//               transition: 'width 0.3s ease',
//             },
//           }}
//         >
//           <div style={{ height: '57px' }}></div>
//           <List
//             sx={{
//               boxShadow: isHovered ? '40px 0px 165px rgba(255, 255, 255,0.9), 10px -5px 15px rgba(0, 0, 0, 0.158) inset' :
//                 '0px 0px 15px rgba(0,0,0,0.1),10px -5px 15px rgba(0, 0, 0, 0.158) inset',
//               padding: '5px',
//               paddingRight: 0,
//               paddingTop: 2,
//               paddingBottom: 0,
//               color: 'white',
//               height: 'fit-content',
//               overflow: 'hidden',
//               margin: '20px 6px',
//               borderRadius: '16px',
//               background: color.sidebarButton,
//               position: 'relative',
//             }}
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//           >
//             {icons.map(({ to, icon, title }, index: number) => (
//               // <Tooltip
//               //   key={to}
//               //   title={title}
//               //   placement="right"
//               //   arrow
//               //   componentsProps={{
//               //     tooltip: {
//               //       sx: {
//               //         background: color.sidebarButton,
//               //         color: color.sidebarButtonText,
//               //         fontWeight: 'bold',
//               //         fontSize: '14px',
//               //         boxShadow: '0px 0px 5px rgba(0,0,0,0.1)',
//               //         '& .MuiTooltip-arrow': { color: 'white' },
//               //       },
//               //     },
//               //   }}
//               // >
//               <ListItem
//                 key={index}
//                 component={Link}
//                 to={to}
//                 sx={{
//                   marginBottom: '20px',
//                   fontWeight: 500,
//                   paddingBottom: 1.2,
//                   paddingRight: '10px',
//                   paddingLeft: '10px',
//                   justifyContent: 'flex-start',
//                   color: location.pathname === to ? color.sidebarText : color.sidebarButtonText,
//                   background: location.pathname === to ? color.sidebarBg : 'transparent',
//                   boxShadow: location.pathname === to ? '-5px 0px 10px rgba(0, 0, 0, 0.158) inset, 0px 0px 10px rgba(255, 255, 255, 0.158)' : 'none',
//                   borderRadius: '16px',
//                   borderTopRightRadius: '0px',
//                   borderBottomRightRadius: '0px',
//                   transition: '0.05s ease',

//                   '&:hover': {
//                     background: color.sidebarBg,
//                     color: color.sidebarText,
//                     boxShadow: '-5px 0px 10px rgba(0, 0, 0, 0.158) inset, 0px 0px 10px rgba(255, 255, 255, 0.458)'
//                   },
//                 }}

//               >
//                 {icon}
//                 {isHovered && (
//                   <span style={{
//                     marginLeft: '10px',
//                     whiteSpace: 'nowrap',
//                     overflow: 'hidden',
//                     textOverflow: 'ellipsis', transition: 'opacity 0.3s ease'
//                   }}>
//                     &nbsp;{title}
//                   </span>
//                 )}
//               </ListItem>
//               // </Tooltip>
//             ))}
//           </List>

//           <a href='/profile'>
//             <div style={{
//               height: '67px', position: 'absolute', bottom: 0, display: 'flex',
//               justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
//               padding: '17px',
//             }}>
//               <Avatar
//                 sx={{
//                   background: color.sidebarButton,
//                   boxShadow: '5px -5px 15px rgba(0, 0, 0, 0.358) inset'
//                 }}>{getUserName()[0]}</Avatar>
//               <Typography style={{ fontWeight: 'bold', fontSize: '12px' }}>
//                 {getUserName()}
//               </Typography>
//             </div>
//           </a>
//         </Drawer>
//       ) : (
//         <AppBar
//           position="fixed"
//           sx={{
//             zIndex: 1300,
//             top: 'auto',
//             bottom: 0,
//             background: 'white',

//             '& .MuiAppBar-root': {
//               background: '#0d78be',
//             },
//           }}
//         >
//           <Box
//             sx={{
//               overflowX: 'auto',
//               display: 'flex',
//               justifyContent: 'flex-start',
//               padding: '5px 0px 5px 0',
//               '&::-webkit-scrollbar': {
//                 height: '2px',
//               },
//               '&::-webkit-scrollbar-thumb': {
//                 backgroundColor: '#0d78be',
//                 borderRadius: '4px',
//               },
//               '&::-webkit-scrollbar-track': {
//                 backgroundColor: '#f1f1f1',
//                 borderRadius: '4px',
//               },
//             }}
//           >
//             {icons2.map(({ to, icon, title }) => (
//               <Tooltip
//                 key={to}
//                 title={title}
//                 placement="top"
//                 arrow
//                 componentsProps={{
//                   tooltip: {
//                     sx: {
//                       background: color.sidebarButton,
//                       color: color.sidebarButtonText,
//                       fontWeight: 'bold',
//                       fontSize: '14px',
//                       boxShadow: '0px 0px 5px rgba(0,0,0,0.1)',
//                       '& .MuiTooltip-arrow': { color: 'white' },
//                     },
//                   },
//                 }}
//               >
//                 <ListItem
//                   button
//                   component={Link}
//                   to={to}
//                   sx={{
//                     display:'flex',
//                     flexDirection:'column',
//                     fontSize:'8px',
//                     justifyContent: 'center',
//                     margin: '10px',
//                     marginTop: '0px',
//                     marginBottom: '0px',
//                     borderRadius: '8px',
//                     minWidth: '56px',
//                     color: location.pathname === to ? color.sidebarButtonText : color.sidebarText,
//                     background: location.pathname === to ? color.sidebarButton : color.sidebarBg,
//                   }}
//                 >
//                   {icon} {title}
//                 </ListItem>
//               </Tooltip>
//             ))}
//           </Box>
//         </AppBar>

//       )}
//     </>
//   );
// };

// export default Sidebar;

import React from 'react'

const Sidebar = () => {
  return (
    <div>

    </div>
  )
}

export default Sidebar
