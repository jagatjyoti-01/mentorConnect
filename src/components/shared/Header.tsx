import { AppBar, Box, Button, Grid, InputAdornment, TextField, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { useNavigate, Link, useLocation } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import color from "../utils/Colors";
import { isLoggedIn } from "../../services/axiosClient";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:600px)');



  return (
    <>

      <AppBar style={{ boxShadow: 'none', background: color.headerBg, }} position="sticky">

        <Toolbar style={{
          overflow: 'hidden',
          height: '55px', boxShadow: '0px 0px 15px rgba(0,0,0,0.15)',
          borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px', minHeight: '0px'
        }}>
          <Grid container style={{ height: '55px' }}>

            <Grid item md={4} xs={6} sm={4} textAlign={'center'} sx={{
              fontSize: { md: '16px', sm: '13px', xs: '13px' }, display: 'flex',
              justifyContent: 'flex-start', alignItems: 'center',
            }}>
              <div style={{
                height: '55px',
                display: 'flex', translate: isMobile ? '0px 0px' : '-30px 0px',
                gap: '10px', justifyContent: 'flex-start', alignItems: 'center',
                borderRadius: '0px 22px 22px 0px',
                // border:'solid 1px red'
              }}>
                <img style={{
                  height: '50px',
                  width: isMobile ? '100%' : '40%',
                }} src='/images/voiceworldlogo.svg' alt="Logo" onClick={() => navigate('/')} />

                <img style={{
                  display: isMobile ? 'none' : 'block',
                  height: '25px',
                  width: isMobile ? '65%' : '50%',
                  translate: '-15px 0px'
                }} src='/images/VOICEWORLD.svg' alt="Logo" onClick={() => navigate('/')} />
                <Box>

                </Box>
              </div>
            </Grid>

            <Grid item md={4} xs={0} sm={4} textAlign={'center'} sx={{ fontSize: { md: '16px', sm: '13px', xs: '13px' }, display: isMobile ? 'none' : 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>

              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon style={{ color: color.headerText }}></SearchIcon>
                    </InputAdornment>
                  )
                }}
                variant="outlined"
                placeholder="Search... "
                sx={{
                  height: '40px',
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    boxShadow: '10px -5px 15px rgba(0, 0, 0, 0.118) inset',
                    background: color.sidebarButton,
                    // border: 'solid 1.5px #2583e5',
                    color: color.headerText,
                    height: '40px',
                    overflow: 'hidden',
                    outline: 'none',
                    borderRadius: '12px',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                    outline: 'none'
                  },
                  '& input::placeholder': {
                    color: color.headerText,
                    opacity: 1,
                  },
                }}
              />

            </Grid>

            <Grid item md={4} xs={6} sm={4} textAlign={'center'} sx={{ fontSize: { md: '13px', sm: '10px', xs: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' } }}>
              <Button
                onClick={() => navigate('/join-meeting')}
                className="button"
                style={{
                  marginLeft: '15px',
                  opacity: location.pathname === '/host-meeting' ? 0.8 : 1,
                  padding: location.pathname === '/join-meeting' ? '6px 15px' : '4px 15px',
                  fontWeight: 500,
                  borderRadius: 0,
                  fontSize: '14px',
                  borderTopLeftRadius: '8px',
                  borderBottomLeftRadius: '8px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                Join
              </Button>
              <Button
                onClick={() => navigate('/host-meeting')}
                className="button"
                style={{
                  opacity: location.pathname === '/join-meeting' ? 0.8 : 1,
                  padding: location.pathname === '/host-meeting' ? '6px 15px' : '4px 15px',
                  fontWeight: 500,
                  borderRadius: 0,
                  fontSize: '14px',
                  borderTopRightRadius: '8px',
                  borderBottomRightRadius: '8px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                Host
              </Button>


              <Button
                onClick={() => {
                  if (isLoggedIn()) {
                    localStorage.clear();
                    window.location.href = '/login';
                  }
                  else {
                    navigate('/login');
                  }
                }}
                className="button"
                style={{
                  borderRadius: '8px', fontSize: '16px', marginLeft: '30px',
                  padding: '4px 16px',
                  fontWeight: 500,
                }}
              >
                {isLoggedIn() ? 'Logout' : 'Login'}
              </Button>



            </Grid>





          </Grid>
        </Toolbar>


      </AppBar>

    </>
  );
};
export default Header;
