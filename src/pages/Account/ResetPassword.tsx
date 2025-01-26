import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, IconButton, InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ResetPassword = () => {

    const validationSchema = Yup.object({
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
            .required('Confirm Password is Required'),
    });

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission
            console.log(values);
        },
    });

    const inputSx = {
        padding: '0px',
        marginTop: '0px',
        width: '100%',
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

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };


    return (
        <Container maxWidth="sm" style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            alignItems: 'center'
        }}>

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
                margin: '20px 0px'

            }}></Box>
            <Box display="flex" flexDirection="column"
                sx={{
                    padding: 4, pb: 6, boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
                    borderRadius: '8px', mb: 6,
                    border: 'solid 2px #3d7dba',
                }} alignItems="center" mt={0}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: '5%', color: '#3d7dba' }} gutterBottom>
                    Reset Password
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        sx={inputSx}
                        style={{ marginTop: '20px' }}
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
                                    <IconButton sx={{ color: '#3d7dba', marginRight: '5px' }}
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
                        style={{ marginTop: '20px' }}
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
                                    <IconButton sx={{ color: '#3d7dba', marginRight: '5px' }}
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

                    <Button
                        type="submit"
                        variant="contained"
                        id='subscribe_btn'
                        style={{
                            margin: 'auto', marginTop: '20px', marginBottom: 2, height: '40px', width: '100%',
                            fontWeight: 'bold', textTransform: 'none', borderRadius: '8px'
                        }}
                    >
                        Submit
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default ResetPassword;
