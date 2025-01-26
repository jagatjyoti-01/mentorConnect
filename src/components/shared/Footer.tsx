import { Box, Grid, Link, Typography } from "@mui/material";
import CopyrightIcon from '@mui/icons-material/Copyright';
import { useNavigate } from "react-router-dom";
import color from "../utils/Colors";
import { Button } from "antd";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <>


      <style>{`
                @keyframes moveBackground {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
               
            `}</style>

      <Box
        sx={{
          width: "100%",
          height: "fit-content",
          borderRadius: '8px 8px 0px 0px',
          background: color.sidebarButton,
          animation: 'moveBackground 5s ease infinite',
          backgroundSize: '200% 200%',
          zIndex: 1200,
          position: 'relative',
          paddingTop: '4rem',
          paddingBottom: '1rem',
          top: 'auto',
          bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
        }}
      >

        <div style={{ width: '100%' }}>
          <Grid container style={{ width: '100%' }}>


            <Grid style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
            }} item md={6} xs={12} sm={12} textAlign={'center'} sx={{ fontWeight: 'bold', fontSize: { md: '16px', sm: '13px', xs: '13px' } }}>

              <div style={{
                background: color.footerText, padding: '20px',
                borderRadius: '8px',
                boxShadow: '5px -5px 15px rgba(0, 0, 0, 0.358) inset, 1px 1px 15px rgba(0, 0, 0, 0.128)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                width: 'fit-content'
              }}>
                <Typography style={{ color: color.firstColor }}
                  sx={{ fontSize: { md: '18px', sm: '14px', xs: '13px' } }}>
                  Elevate your meetings, transcend the distance.
                </Typography>


                <Typography style={{ color: color.firstColor, fontWeight: 'bold', }}
                  sx={{ fontSize: { md: '24px', sm: '18px', xs: '13px' } }}>
                  Start using WebWeavers today.
                </Typography>

                <Button
                  onClick={() => navigate('/signup')}
                  className="button"
                  style={{
                    borderRadius: '8px', fontSize: '18px',
                    padding: '20px',
                    paddingTop: '18px',
                    fontWeight: 500,
                  }}>
                  Register
                </Button>
              </div>

            </Grid>

            <Grid item md={6} xs={12} textAlign={'center'} sx={{
              overflow: 'hidden',
              display: 'flex', justifyContent: { md: 'center', xs: 'center' }, paddingLeft: '2%',
              mb: { md: '0px', xs: '0px' }, mt: { md: '0px', xs: '20px' }, fontSize: { md: '16px', sm: '13px', xs: '13px' },
            }}>

              <img style={{ height: '120px' }} src='/images/voiceworldlogo.svg' alt="Logo" onClick={() => navigate('/')} />

              {/* <div id="background-wrap">
                <div className="x1">
                  <div className="cloud"></div>
                </div>

                <div className="x2">
                  <div className="cloud"></div>
                </div>

                <div className="x3">
                  <div className="cloud"></div>
                </div>

                <div className="x4">
                  <div className="cloud"></div>
                </div>

                <div className="x5">
                  <div className="cloud"></div>
                </div>
              </div> */}

            </Grid>

          </Grid>
        </div>


        <Box sx={{
          width: '100%',
          padding: '1rem',
          paddingTop: { md: '3.5rem', xs: '1.5rem' }
        }}>
          <Grid container style={{ width: '100%' }}>

            <Grid item md={4.5} xs={12} textAlign={'center'} sx={{
              display: 'flex', alignItems: { md: 'start', xs: 'center' }, paddingTop: '16px', justifyContent: { md: 'flex-start', xs: 'center' }, paddingLeft: '2%', flexDirection: 'column',
              mb: { md: '0px', xs: '20px' }, fontSize: { md: '16px', sm: '13px', xs: '13px' },
            }}>
              {/* <img style={{ height: '20px' }} src='/images/VOICEWORLD 2.svg' alt="Logo" onClick={() => navigate('/')} /> */}
              <Typography style={{ color: color.footerText }}>
                Where connectionscome alive.
              </Typography>

              <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                paddingLeft: '10px', paddingRight: '10px', borderRadius: '16px',
                boxShadow: '5px -5px 10px rgba(0, 0, 0, 0.358) inset, 1px 1px 15px rgba(0, 0, 0, 0.128)',
                marginTop: '24px', background: color.footerText
              }}>
                <CopyrightIcon style={{ fill: color.firstColor }}></CopyrightIcon>
                <Typography color={color.firstColor} variant="body1" sx={{ fontSize: { md: '13px', sm: '13px', xs: '13px', } }} width={'auto'}>
                  {`${new Date().getFullYear()} WebWeavers. All rights reserved`}
                </Typography>
              </div>
            </Grid>

            <Grid style={{
              display: 'flex', height: '100%', justifyContent: 'center', flexDirection: 'column', gap: '5px',
            }} item md={2.5} xs={6} sm={4} textAlign={'center'} sx={{
              alignItems: { xs: 'center', md: 'start' }, fontSize: { md: '16px', sm: '13px', xs: '13px' }
            }}>
              <Link color={color.footerText} underline="none" style={{ marginTop: '8px', fontWeight: 'bold' }}>Quick Links</Link>
              <Link href="/home" color={color.footerText} underline="hover">Home</Link>
              <Link href="/our-team" color={color.footerText} underline="hover">Our Team</Link>
              <Link href="/login" color={color.footerText} underline="hover">Login</Link>
            </Grid>

            <Grid style={{
              display: 'flex', justifyContent: 'center'
            }} item md={2.5} xs={6} sm={4} textAlign={'center'} sx={{
              alignItems: { xs: 'center', md: 'start' }, flexDirection: 'column', gap: '5px', fontSize: { md: '16px', sm: '13px', xs: '13px' }
            }}>
              <Link color={color.footerText} underline="none" style={{ marginTop: '8px', fontWeight: 'bold' }}>Our Policies</Link>
              <Link href="/privacy-policy" color={color.footerText} underline="hover">Privacy Policy</Link>
              <Link href="/code-of-conduct" color={color.footerText} underline="hover">Code Of Conduct</Link>
              <Link href="/terms-conditions" color={color.footerText} underline="hover">Moderation Policy</Link>
            </Grid>

            <Grid style={{
              display: 'flex', height: '100%', justifyContent: 'center', flexDirection: 'column', gap: '5px',
            }} item md={2.5} xs={12} sm={4} textAlign={'center'} sx={{
              fontWeight: 'bold',
              alignItems: { xs: 'center', md: 'start' }, mt: { md: '0px', xs: '20px', sm: '0px' }, fontSize: { md: '16px', sm: '13px', xs: '13px' }
            }}>
              <Link color={color.footerText} underline="none" style={{ marginTop: '8px' }}>Contact Us</Link>
              <Link color={color.footerText} underline="hover" fontWeight={'normal'}>
                contact@WebWeavers.com
              </Link>

              <div style={{ display: 'flex', marginTop: '10px', justifyContent: 'space-between', width: '70%', color: color.footerText }}>
                <a target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  <FacebookIcon />
                </a>
                <a target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  <XIcon />
                </a>

                <a target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  <LinkedInIcon />
                </a>
                <a target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  <InstagramIcon />
                </a>
              </div>
            </Grid>


          </Grid>
        </Box>



      </Box>
    </>
  );
};


export default Footer;