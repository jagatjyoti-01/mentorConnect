import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Button,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import color from '../../components/utils/Colors';
import { editProfile, getProfile } from '../../services/services';

interface ProfileData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profileImage: string;
}

const ProfileDetails: React.FC = () => {
    const [profileData, setProfileData] = useState<ProfileData>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        profileImage: ''
    });


    useEffect(() => {
        getProfile().then((res) => {
            let {
                firstName,
                lastName,
                email,
                phoneNumber,
                profileImage
            } = res.data.data;
            setProfileData({
                firstName,
                lastName,
                email,
                phoneNumber,
                profileImage
            });
        })
    }, []);

    const isMobile1 = useMediaQuery('(max-width:700px)');

    const [isEditable, setIsEditable] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        });
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                if (event.target && typeof event.target.result === 'string') {
                    setProfileData({ ...profileData, profileImage: event.target.result });
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const toggleEdit = () => {
        setIsEditable(!isEditable);
    };

    const handleSubmit = (values: any) => {
        delete values.profileImage;
        values.roll = 'USER';
        editProfile(values).then((result: any) => {
            alert(result?.data?.msg);
            localStorage.clear();
            window.location.href = '/login';
        }).catch(error => {
            alert(error?.response?.data?.message || error?.response?.data?.msg);
        })
    };


    const inputSx = {
        padding: '0px',
        marginTop: '10px',
        width: '100%',
        paddingRight: '0px',
        boxSizing: "border-box",
        height: "45px",
        '& .MuiOutlinedInput-root': {
            height: '50px',
            padding: '0px',
            '& fieldset': {
                border: 'none',
            },
            '&:hover fieldset': {
                border: 'none',
            },
            '&.Mui-focused fieldset': {
                border: 'solid 2px #2583e5',
            },

        },


    };

    return (
        <Container style={{
            width: isMobile1 ? '85vw' : '65vw',
            // border: 'solid 2px #3d7dba',
            marginBottom: '50px',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
            borderRadius: '8px', marginTop: '40px', padding: '0px', overflow: 'hidden'
        }}>
            {/* <Typography variant="h4" gutterBottom>
                Profile Details
            </Typography> */}
            <Grid container spacing={0}>

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

                <Grid item xs={12} sm={12} md={4.5} style={{
                    position: 'relative',
                    display: 'flex', background: color.sidebarButton,
                    animation: 'moveBackground 5s ease infinite',
                    boxShadow: '10px -5px 15px rgba(0, 0, 0, 0.158) inset',
                    padding: '30px 0px',
                    alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
                }}>

                    <Typography style={{
                        position: 'absolute', top: 45,
                        textAlign: 'center', textShadow: '0px 0px 20px rgba(255,255,255,0.5)', color: 'white',
                        fontWeight: 'bold', lineHeight: 1, fontSize: '20px'
                    }}><span >Hello!</span><br /></Typography>

                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="avatar-upload"
                        type="file"
                        onChange={handleAvatarChange}
                        disabled={!isEditable}
                    />
                    <label htmlFor="avatar-upload" >
                        <IconButton component="span" disabled={!isEditable} style={{
                            display: 'flex',
                            borderRadius: '50%', overflow: 'hidden', padding: 0,
                            flexDirection: 'column'
                        }}>
                            <Avatar
                                src={profileData.profileImage}
                                alt="Profile Avatar"
                                sx={{ width: isMobile1 ? 100 : 150, height: isMobile1 ? 100 : 150, background: 'white', color: 'grey' }}
                            ></Avatar>
                            <PhotoCamera style={{
                                position: 'absolute', boxShadow: '0px -4px 20px rgba(0,0,0,0.2)',
                                bottom: 0, background: 'rgba(255,255,255,0.5)', width: '100%'
                            }} />
                        </IconButton>
                    </label>
                    <Typography sx={{
                        background: 'white', color: color.firstColor, mt: 1, borderRadius: '6px',
                        padding: '0px 10px', fontSize: '14px', fontWeight: 'bold',
                    }}>
                        {profileData.firstName} {profileData.lastName}
                    </Typography>

                </Grid>



                <Grid item xs={12} sm={12} md={7.5} style={{ boxShadow: '-10px -5px 15px rgba(0, 0, 0, 0.138) inset', }}>

                    <div style={{
                        padding: isMobile1 ? '5%' : '7%', paddingTop: '7%',
                        display: 'flex',
                        alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
                    }}>
                        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: '5%' }}>
                            Profile
                        </Typography>

                        <div style={{
                            display: 'flex', width: '100%',
                            alignItems: 'center', justifyContent: 'center',
                        }}>

                            <Typography style={{
                                width: isMobile1 ? '40%' : '30%',
                                display: 'flex', justifyContent: 'flex-start', fontWeight: 'bold',
                            }}>
                                First Name:
                            </Typography>

                            <TextField
                                name="firstName"
                                sx={inputSx}
                                className='input-root'
                                value={profileData.firstName}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    readOnly: !isEditable,
                                }}
                            />
                        </div>


                        <div style={{
                            display: 'flex', width: '100%',
                            alignItems: 'center', justifyContent: 'center',
                        }}>

                            <Typography style={{
                                width: isMobile1 ? '40%' : '30%',
                                display: 'flex', justifyContent: 'flex-start', fontWeight: 'bold',
                            }}>
                                Last Name:
                            </Typography>


                            <TextField
                                name="lastName"
                                sx={inputSx}
                                className='input-root'
                                value={profileData.lastName}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    readOnly: !isEditable,
                                }}
                            />
                        </div>


                        <div style={{
                            display: 'flex', width: '100%',
                            alignItems: 'center', justifyContent: 'center',
                        }}>

                            <Typography style={{
                                width: isMobile1 ? '40%' : '30%',
                                display: 'flex', justifyContent: 'flex-start', fontWeight: 'bold',
                            }}>
                                Email:
                            </Typography>
                            <TextField
                                name="email"
                                sx={inputSx}
                                className='input-root'
                                value={profileData.email}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                            /> </div>

                        <div style={{
                            display: 'flex', width: '100%',
                            alignItems: 'center', justifyContent: 'center',
                        }}>

                            <Typography style={{
                                width: isMobile1 ? '40%' : '30%',
                                display: 'flex', justifyContent: 'flex-start', fontWeight: 'bold',
                            }}>
                                Phone No:
                            </Typography>
                            <TextField
                                name="phoneNumber"
                                sx={inputSx}
                                className='input-root'
                                value={profileData.phoneNumber}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    readOnly: !isEditable,
                                }}
                            /> </div>

                        <div style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center', justifyContent: 'flex-end', flexDirection: isMobile1 ? 'column' : 'row'
                        }}>
                            {isEditable ? (
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() => handleSubmit(profileData)}
                                    id='subscribe_btn'
                                    style={{
                                        marginTop: '20px', marginBottom: 2, marginLeft: '10px', height: '40px', padding: '8px 10%',
                                        fontWeight: 'bold', textTransform: 'none', borderRadius: '6px', width: 'fit-content'
                                    }}
                                >
                                    Save
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={toggleEdit}
                                    id='subscribe_btn'
                                    style={{
                                        marginTop: '20px', marginBottom: 2, height: '40px', padding: '8px 10%',
                                        fontWeight: 'bold', textTransform: 'none', borderRadius: '6px', width: 'fit-content'
                                    }}
                                >
                                    {'Edit Profile'}
                                </Button>
                            )}
                        </div>
                    </div>
                </Grid>
            </Grid>

        </Container>
    );
};

export default ProfileDetails;
