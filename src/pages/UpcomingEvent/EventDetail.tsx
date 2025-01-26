import { useState } from 'react';
import { Container, Typography, Button, CardContent, Grid, useMediaQuery } from '@mui/material';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import QRCode from 'react-qr-code';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsappIcon from '@mui/icons-material/WhatsApp';
import XIcon from '@mui/icons-material/X';
import color from '../../components/utils/Colors';
import { useNavigate } from 'react-router-dom';

const EventDetail = () => {

  const isBelow900px = useMediaQuery('(max-width:900px)');
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (

    <Container style={{
      padding: 0,
      backgroundImage: "url('/images/voiceworldbg.svg')",
      backgroundSize: '110%',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat',
      paddingBottom: '5%'
    }}>

      <CardContent

        style={{
          position: 'relative',
          height: '300px',
          padding: 0,
          background: 'white',
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url("/images/GIC-3.webp")`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'flex-end',
          borderRadius: '16px',
          marginTop:'25px'
        }}
      >

        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '10px',
            color: 'white',
            padding: '0px 5px',
          }}
        >
          <Typography fontSize={'1.2rem'} fontWeight={'bold'}>| Upcoming Event</Typography>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '42px',
            left: '10px',
            color: 'white',
            padding: '0px 5px',
          }}
        >
          <Typography fontSize={'3rem'} fontWeight={'bold'}>The Future of Us</Typography>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '22px',
            left: '10px',
            color: 'white',
            padding: '0px 10px',
          }}
        >
          <Typography fontSize={'1rem'} fontWeight={'bold'}>By Frodo Ammin</Typography>
        </div>

      </CardContent>



      <div style={{ padding: '2px 10px' }}>
        <Grid container>


          <Grid item xs={12} md={7.5} >

            <div className="accordion">
              <div className="accordion-header" onClick={toggleAccordion}>
                <Typography
                  style={{
                    marginTop: '15px',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                    display: 'flex',
                   color: color.firstColor,
                    alignItems: 'center',
                  }}
                >
                  Events Details
                </Typography>

                <Typography variant="body1" paragraph style={{ color: 'black', }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula
                  dapibus velit. Phasellus iaculis mi at quam volutpat, non fermentum nulla consequat. Ut
                  consequat bibendum augue in sodales. Sed pretium ullamcorper magna.

                  {/* {isExpanded ? <FaChevronUp style={{ translate: '0 4px', color: '#0FEAD0' }} /> : <FaChevronDown style={{ translate: '0 4px', color: '#0FEAD0' }} />}
                 */}
                </Typography>

              </div>
              {/* {isExpanded && (
                <div className="accordion-content">

                  <Typography variant="body1" paragraph style={{ color: 'black' }}>
                    <span style={{ fontWeight: 'bold' }}> Speakers:</span> <br /> John Doe, Jane Smith, Bob Johnson
                  </Typography>
                  <Typography variant="body1" paragraph style={{ color: 'black' }}>
                    Agenda:
                    <ul>
                      <li>10:00 AM - Welcome and Introduction</li>
                      <li>10:30 AM - Keynote Speech</li>
                      <li>11:30 AM - Networking Break</li>
                      <li>12:00 PM - Panel Discussion</li>
                      <li>1:00 PM - Lunch Break</li>
                      <li>2:00 PM - Workshops</li>
                      <li>3:30 PM - Closing Remarks</li>
                    </ul>
                  </Typography>
                </div>
              )} */}

              <Typography
                style={{
                  marginTop: '15px',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                 color: color.firstColor,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Speakers:
              </Typography>

              <Typography variant="body1" paragraph style={{ color: 'black' }}>
                John Doe, Jane Smith, Bob Johnson
              </Typography>


              <Typography
                style={{
                  marginTop: '15px',
                  marginBottom: '-5px',
                  fontWeight: 'bold',
                 color: color.firstColor,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Agenda:
              </Typography>

              <Typography variant="body1" paragraph style={{ color: 'black', padding:'15px' }}>
                <ul>
                  <li>10:00 AM - Welcome and Introduction</li>
                  <li>10:30 AM - Keynote Speech</li>
                  <li>11:30 AM - Networking Break</li>
                  <li>12:00 PM - Panel Discussion</li>
                  <li>1:00 PM - Lunch Break</li>
                  <li>2:00 PM - Workshops</li>
                  <li>3:30 PM - Closing Remarks</li>
                </ul>
              </Typography>



              <Grid
                item
                xs={12}
                md={4.5}
                style={{
                  display: isBelow900px ? 'flex' : 'none',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: 'fit-content',
                }}
              >

                <div
                  style={{
                    height: 'fit-content',
                    width: '100%',
                    borderRadius: '16px',
                    marginTop: '15px',
                    color: 'black',
                    boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    background: 'white',
                  }}
                >
                  <Typography
                    style={{
                      marginTop: '15px',
                      marginLeft: '10px',
                      gap: '10px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <EventRoundedIcon style={{
                      background: '#ececec', color: 'black', borderRadius: '50%', padding: '5px'
                    }} />June 30, 2024
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      marginTop: '5px',
                      marginLeft: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <AccessTimeRoundedIcon style={{
                      background: '#ececec', color: 'black', borderRadius: '50%', padding: '5px'
                    }} />10:00 AM - 4:00 PM
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    style={{
                      marginTop: '5px',
                      marginLeft: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <LocationOnRoundedIcon style={{
                      background: '#ececec', color: 'black', borderRadius: '50%', padding: '5px'
                    }} />123 Event Street, City, State
                  </Typography>
                </div>

                <div
                  style={{
                    height: 'fit-content',
                    width: '100%',
                    display: 'flex', justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: '16px',
                    marginTop: '15px',
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
                    background: 'white',
                  }}
                >
                  <div style={{
                    height: '100px', borderTopRightRadius: '16px', borderTopLeftRadius: '16px',
                    display: 'flex', justifyContent: 'center', width: '100%', boxShadow: '0px 2px 20px rgba(0,0,0,0.2)',
                    alignItems: 'center', marginBottom: '25px', background: color.firstColor,
                  }}>
                    <Button   onClick={() => navigate('/event-registration')} style={{
                      background: 'white',color: color.firstColor, borderRadius: '8px',
                      paddingLeft: '25px', paddingRight: '25px',
                      textTransform: 'none', fontWeight: 'bold', fontSize: '16px',
                    }}>Register Now</Button></div>

                  ----------OR----------

                  <div style={{
                    height: "120px", margin: "0 auto", display: 'flex',
                    justifyContent: 'center', alignItems: 'center', width: "70%"
                  }}>
                    Scan QR with your phone to register automatically
                    <QRCode
                      size={256}
                      style={{ height: "auto", marginLeft: '10px', maxWidth: "74px", width: "100%" }}
                      value={''}
                      viewBox={`0 0 256 256`}
                    />
                  </div>


                </div>


                <div
                  style={{
                    height: 'fit-content',
                    width: '100%',
                    display: 'flex', justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: '16px',
                    marginTop: '15px',
                    color: 'black',
                    fontWeight: 'bold',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    fontSize: '12px',
                    boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
                    background: 'white',
                  }}
                >

                  <Typography
                    style={{
                      marginTop: '10px',
                      marginBottom: '15px',
                      fontWeight: 'bold',
                     color: color.firstColor,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    Share with friends
                  </Typography>


                  <div>


                    <WhatsappIcon style={{
                      background: '#ececec', color: 'black', borderRadius: '50%', padding: '5px'
                    }}>
                    </WhatsappIcon>
                    <InstagramIcon style={{
                      background: '#ececec', color: 'black', borderRadius: '50%', padding: '5px'
                    }}></InstagramIcon>
                    <FacebookIcon style={{
                      background: '#ececec', color: 'black', borderRadius: '50%', padding: '5px'
                    }} />
                    <XIcon style={{
                      background: '#ececec', color: 'black', borderRadius: '50%', padding: '5px'
                    }} />
                    <LinkedInIcon style={{
                      background: '#ececec', color: 'black', borderRadius: '50%', padding: '5px'
                    }}></LinkedInIcon>

                  </div>
                </div>


              </Grid>


              <div>

                <Typography
                  style={{
                    marginTop: isBelow900px ? '25px' : '15px',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                   color: color.firstColor,
                  }}
                >
                  Event Photos and Videos
                </Typography>

                <Grid container>
                  <Grid item xs={12}
                    style={{ padding: 10 }}>

                    <div
                      style={{
                        position: 'relative',
                        height: '300px',
                        padding: 0,
                        background: 'white',
                        backgroundImage: ` url("/images/GIC-1.webp")`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        display: 'flex',
                        alignItems: 'flex-end',
                        borderRadius: '16px'
                      }}>
                    </div>
                  </Grid>

                  <Grid item xs={4}
                    style={{ padding: 10 }}>

                    <div
                      style={{
                        position: 'relative',
                        height: '150px',
                        padding: 0,
                        background: 'white',
                        backgroundImage: ` url("/images/GIC-3.webp")`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        display: 'flex',
                        alignItems: 'flex-end',
                        borderRadius: '16px'
                      }}>
                    </div>
                  </Grid>

                  <Grid item xs={4}
                    style={{ padding: 10 }}>

                    <div
                      style={{
                        position: 'relative',
                        height: '150px',
                        padding: 0,
                        background: 'white',
                        backgroundImage: ` url("/images/GIC-2.webp")`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        display: 'flex',
                        alignItems: 'flex-end',
                        borderRadius: '16px'
                      }}>
                    </div>
                  </Grid>

                  <Grid item xs={4}
                    style={{ padding: 10 }}>

                    <div
                      style={{
                        position: 'relative',
                        height: '150px',
                        padding: 0,
                        background: 'white',
                        backgroundImage: ` url("/images/Optional-Image-7.jpg")`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        display: 'flex',
                        alignItems: 'flex-end',
                        borderRadius: '16px'
                      }}>
                    </div>
                  </Grid>

                </Grid>

              </div>


            </div>

          </Grid>



          <Grid
            item
            xs={12}
            md={4.5}
            style={{
              display: isBelow900px ? 'none' : 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              height: 'fit-content',
            }}
          >

            <div
              style={{
                height: 'fit-content',
                width: '80%',
                borderRadius: '16px',
                marginTop: '15px',
                color: 'black',
                boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
                paddingTop: '10px',
                paddingBottom: '10px',
                background: 'white',
              }}
            >
              <Typography
                style={{
                  marginTop: '15px',
                  marginLeft: '10px',
                  gap: '10px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <EventRoundedIcon style={{
                  background: '#ececec', color: 'black', borderRadius: '50%', padding: '5px'
                }} />June 30, 2024
              </Typography>
              <Typography
                variant="body1"
                style={{
                  marginTop: '5px',
                  marginLeft: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <AccessTimeRoundedIcon style={{
                  background: '#ececec', color: 'black', borderRadius: '50%', padding: '5px'
                }} />10:00 AM - 4:00 PM
              </Typography>
              <Typography
                variant="body1"
                paragraph
                style={{
                  marginTop: '5px',
                  marginLeft: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <LocationOnRoundedIcon style={{
                  background: '#ececec', color: 'black', borderRadius: '50%', padding: '5px'
                }} />123 Event Street, City, State
              </Typography>
            </div>

            <div
              style={{
                height: 'fit-content',
                width: '80%',
                display: 'flex', justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: '16px',
                marginTop: '15px',
                color: 'black',
                fontWeight: 'bold',
                fontSize: '12px',
                boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
                background: 'white',
              }}
            >
              <div style={{
                height: '100px', borderTopRightRadius: '16px', borderTopLeftRadius: '16px',
                display: 'flex', justifyContent: 'center', width: '100%', boxShadow: '0px 2px 20px rgba(0,0,0,0.2)',
                alignItems: 'center', marginBottom: '25px', background: color.firstColor,
              }}>
                <Button   onClick={() => navigate('/event-registration')} style={{
                  background: 'white',color: color.firstColor, borderRadius: '8px',
                  paddingLeft: '25px', paddingRight: '25px',
                  textTransform: 'none', fontWeight: 'bold', fontSize: '16px',
                }}>Register Now</Button></div>

              ----------OR----------

              <div style={{
                height: "120px", margin: "0 auto", display: 'flex',
                justifyContent: 'center', alignItems: 'center', width: "70%"
              }}>
                Scan QR with your phone to register automatically
                <QRCode
                  size={256}
                  style={{ height: "auto", marginLeft: '10px', maxWidth: "74px", width: "100%" }}
                  value={''}
                  viewBox={`0 0 256 256`}
                />
              </div>


            </div>


            <div
              style={{
                height: 'fit-content',
                width: '80%',
                display: 'flex', justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: '16px',
                marginTop: '15px',
                color: 'black',
                fontWeight: 'bold',
                paddingTop: '10px',
                paddingBottom: '10px',
                fontSize: '12px',
                boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
                background: 'white',
              }}
            >

              <Typography
                style={{
                  marginTop: '10px',
                  marginBottom: '15px',
                  fontWeight: 'bold',
                  display: 'flex',
                 color: color.firstColor,
                  alignItems: 'center',
                }}
              >
                Share with friends
              </Typography>


              <div>


                <WhatsappIcon style={{
                  background: '#ececec', color: 'black', borderRadius: '50%', padding: '5px'
                }}>
                </WhatsappIcon>
                <InstagramIcon style={{
                  background: '#ececec', color: 'black', borderRadius: '50%', padding: '5px'
                }}></InstagramIcon>
                <FacebookIcon style={{
                  background: '#ececec', color: 'black', borderRadius: '50%', padding: '5px'
                }} />
                <XIcon style={{
                  background: '#ececec', color: 'black', borderRadius: '50%', padding: '5px'
                }} />
                <LinkedInIcon style={{
                  background: '#ececec', color: 'black', borderRadius: '50%', padding: '5px'
                }}></LinkedInIcon>

              </div>
            </div>


          </Grid>


        </Grid>
      </div>

      {/* 
      <Box sx={{ position: 'sticky', bottom: 0, width: '100%', bgcolor: 'background.paper', py: 2 }}>
        <Container maxWidth="md">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/event-registration')}
            fullWidth
          >
            Register
          </Button>
        </Container>
      </Box> */}
    </Container>

  );
};

export default EventDetail;
