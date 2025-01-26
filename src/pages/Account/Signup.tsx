
import React, { useEffect, useState } from 'react';
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import color from '../../components/utils/Colors';
import { registerProfile } from '../../services/services';
import { Link, useNavigate } from 'react-router-dom';
import { Row } from 'antd';

const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is Required'),
    lastName: Yup.string().required('Last Name is Required'),
    email: Yup.string().email('Invalid email address').required('Email is Required'),
    phoneNumber: Yup.string()
        .matches(/^[+91][0-9]+$/, 'Phone Number must be digits only and start with +91')
        .min(13, 'Must be 10 numbers after +91')
        .required('Phone Number is Required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password cannot be more than 20 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
        .required('Password is required'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is Required'),
});


const inputSx = {
    padding: '0px',
    marginTop: '0px',
    width: '100%',
    paddingRight: '10px',
    boxSizing: "border-box",

    '& .MuiOutlinedInput-root': {

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

const SignupPage = () => {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState<'mentor' | 'mentee'>('mentee');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const role = event.target.value as 'mentor' | 'mentee';
        setSelectedRole(role);
    };
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '+91',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values)
            if (values.password === values.confirmPassword) {
                let payload: any = { ...values }
                delete payload.confirmPassword;
                payload.roll = 'USER';
                registerProfile(payload).then((result: any) => {
                    alert(result?.data?.msg);
                    navigate('/login');
                }).catch(error => {
                    alert(error?.response?.data?.message || error?.response?.data?.msg);
                })
            }
        },
    });

    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 992);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 992);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };

    const isMobile1 = useMediaQuery('(max-width:700px)');
    const isMobile2 = useMediaQuery('(max-width:400px)');
    const isMobile3 = useMediaQuery('(max-width:450px)');

    return (
        <div style={{
            display: 'flex', justifyContent: isMobile1 ? 'start' : 'center', alignItems: 'center', flexDirection: isMobile1 ? 'column' : 'row',
            margin: 'auto', marginTop: '5%', marginBottom: '5%', width: isMobile1 ? '80vw' : isMobile ? '90vw' : '70vw',
            //  height: 'auto',
            height: isMobile3 ? '140vh' : isMobile ? '105vh' : '700px',

        }}>

            <Box sx={{
                borderRadius: '8px',
                color: color.firstColor,
                width: '100%',
                marginBottom: '2%',
                display: isMobile1 ? 'flex' : 'none',
                flexDirection: 'column',
                alignItems: 'center',



            }}>
                <Typography style={{
                    textAlign: 'center', textShadow: '0px 0px 20px rgba(255,255,255,0.5)',
                    fontWeight: 'bold', marginTop: '0%', marginBottom: '0%', lineHeight: 1, fontSize: '20px'
                }}><span style={{ fontWeight: 'normal' }}>Hello!</span><br />Welcome To</Typography>


                <Box sx={{
                    borderRadius: '0px',
                    backgroundImage: `url('/images/voiceworldlogo.svg')`,
                    backgroundSize: '80%',
                    boxShadow: '0px 0px 20px rgba(255,255,255,0.5)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundColor: 'white',
                    height: '70px',
                    width: '120px',
                    marginTop: '10px',


                }}></Box>

            </Box>


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

            <Box sx={{
                borderRadius: '8px 0px 0px 8px',
                background: color.sidebarButton,
                animation: 'moveBackground 5s ease infinite',
                backgroundSize: '200% 200%',

                width: '48%',
                display: isMobile1 ? 'none' : 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '10px -5px 15px rgba(0, 0, 0, 0.158) inset',
                // flex: 1,
                height: '100%',
                // border: 'solid 2px #2583e5',

            }}>

                <Typography style={{
                    textAlign: 'center', color: 'white', textShadow: '0px 0px 20px rgba(255,255,255,0.5)',
                    fontWeight: 'bold', marginTop: '2%', marginBottom: '10%', lineHeight: 1, fontSize: '20px'
                }}><span style={{ fontWeight: 'normal' }}>Hello!</span><br />Welcome To</Typography>

                <Box sx={{
                    borderRadius: '8px',
                    backgroundImage: `url('/images/voiceworldlogo.svg')`,
                    backgroundSize: '70%',
                    boxShadow: '0px 0px 20px rgba(255,255,255,0.5)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundColor: 'white',
                    height: '80px',
                    width: '120px',
                    mixBlendMode: 'overlay',
                }}></Box>


                <Typography style={{
                    textAlign: 'justify', hyphens: 'auto', color: 'white', lineHeight: 1, padding: '0px 10%',
                    marginTop: '15%', marginBottom: '15%', fontSize: '12px', textShadow: '0px 0px 20px rgba(255,255,255,0.5)',
                }}>

                    WebWeavers is your go-to platform for seamless meetings, live streaming, podcast listening, and video watching—all for free. Dive into endless possibilities without any cost!
                </Typography>

                <Typography style={{
                    textAlign: 'center', color: 'white',
                    lineHeight: 1, padding: '0%', fontWeight: 'bold',
                    fontSize: '12px', marginBottom: '10px'
                }}>
                    <Typography style={{
                        textAlign: 'center', color: 'white',
                        fontWeight: 'bold', marginBottom: '20px',
                        fontSize: '12px', lineHeight: 1.2,
                    }}>Dont want to create an account?<br></br> you can join or host a meeting anyways!</Typography>
                    <a href='/join-meeting'
                        style={{
                            color: color.firstColor, borderRadius: '0px', background: 'white',
                            padding: '2px 10px', textDecoration: 'none', boxShadow: '0px 0px 20px rgba(255,255,255,0.5)',
                        }}
                    >Join</a> &nbsp;|&nbsp;&nbsp;
                    <a href='/host-meeting' style={{
                        color: color.firstColor,
                        boxShadow: '0px 0px 20px rgba(255,255,255,0.5)', borderRadius: '0px',
                        background: 'white', padding: '2px 12px', textDecoration: 'none'
                    }}>host</a></Typography>

            </Box>

            <Box
                sx={{
                    flex: isMobile1 ? 0 : 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    width: '100%',
                    borderRadius: isMobile1 ? '14px' : ' 0px 8px 8px 0px',
                    height: '100%',
                    paddingBottom: '10%',
                    boxShadow: '-10px -5px 15px rgba(0, 0, 0, 0.158) inset',
                    // border: 'solid 2px #2583e5',
                    // borderLeft: isMobile1 ? 'solid 2px #2583e5' : '0px',
                    // boxShadow:isMobile1 ? '0px 0px 10px rgba(0,0,0,0.2)':'-6px 0px 10px rgba(0,0,0,0.2)',
                }}
            >
                <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: '35px', mt: '35px' }}>
                    Sign Up
                </Typography>

                <Box component="form" onSubmit={formik.handleSubmit} sx={{
                    mt: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '80%',
                    height: 'fit-content',
                }}>


                    <div style={{
                        display: 'flex', flexDirection: isMobile3 ? 'column' : 'row', width: '100%'
                    }}>
                        <TextField
                            sx={inputSx}
                            fullWidth
                            style={{ width: isMobile3 ? '100%' : '47%', marginBottom: isMobile3 ? '20px' : '0px', marginRight: '5%', }}
                            id="firstName"
                            className='input-root'
                            name="firstName"
                            placeholder="First Name"
                            margin="normal"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                        <TextField
                            sx={inputSx}
                            style={{ width: isMobile3 ? '100%' : '47%', }}
                            fullWidth
                            id="lastName"
                            className='input-root'
                            name="lastName"
                            placeholder="Last Name"
                            margin="normal"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />

                    </div>

                    <TextField
                        sx={inputSx}
                        style={{ marginTop: '10px' }}
                        fullWidth
                        id="email"
                        className='input-root'
                        name="email"
                        placeholder="Email Address"
                        margin="normal"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />

                    <TextField
                        sx={inputSx}
                        style={{ marginTop: '10px' }}
                        fullWidth
                        id="phoneNumber"
                        className='input-root'
                        name="phoneNumber"
                        placeholder="Phone Number"
                        margin="normal"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                        inputProps={{ maxLength: 13 }}
                    />
                    <TextField
                        sx={inputSx}
                        style={{ marginTop: '10px' }}
                        fullWidth
                        id="password"
                        className='input-root'
                        name="password"
                        placeholder="Create Password"
                        type={showPassword ? 'text' : 'password'}
                        margin="normal"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton sx={{ color: color.firstColor, marginRight: '5px' }}
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        sx={inputSx}
                        style={{ marginTop: '10px' }}
                        fullWidth
                        id="confirmPassword"
                        className='input-root'
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        type={showPassword ? 'text' : 'password'}
                        margin="normal"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton sx={{ color: color.firstColor, marginRight: '5px' }}
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControl sx={{ width: '100%', marginBottom: '10px', marginTop: '10px' }}>
                        <FormLabel id="user-role-label">Select Your Role</FormLabel>
                        <RadioGroup
                            aria-labelledby="user-role-label"
                            name="user-role"
                            value={selectedRole}
                            onChange={handleChange}
                            sx={{ display: 'flex', flexDirection: 'Row' }}
                        >
                            <FormControlLabel value="mentor" control={<Radio />} label="Mentor" />
                            <FormControlLabel value="mentee" control={<Radio />} label="Mentee" />
                        </RadioGroup>
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        id='subscribe_btn'
                        style={{
                            margin: 'auto', marginTop: '20px', marginBottom: 2, height: '40px', padding: '8px 30%',
                            fontWeight: 'bold', textTransform: 'none', borderRadius: '8px', width: 'fit-content'
                        }}
                    >
                        Sign Up
                    </Button>

                    <Typography style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: isMobile2 ? '50px' : '10px', textAlign: 'center', marginTop: '5%' }}>
                        Already have an account?<Link to='/login' style={{
                            color: color.firstColor,
                            boxShadow: '0px 0px 20px rgba(255,255,255,0.5)', borderRadius: '0px',
                            background: 'white', padding: '2px 10px', textDecoration: 'none'
                        }}>Log in</Link>
                    </Typography>
                </Box>
            </Box>
        </div>
    );
};

export default SignupPage;
