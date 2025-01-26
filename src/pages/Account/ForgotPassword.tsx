import React from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ForgotPassword = () => {

    const validationSchema = Yup.object({
        email: Yup.string().email('Enter a valid email').required('Email is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {

            console.log(values);
        },
    });

    const inputSx = {
        padding: '0px',
        marginTop: '0px',
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
                    padding: 4, pt: 3, boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
                    borderRadius: '8px', mb: 6,
                    border: 'solid 2px #2583e5',
                }} alignItems="center" mt={0}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: '12%', color: '#1578be' }} gutterBottom>
                    Forgot Password
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        sx={inputSx}

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


                    <Button
                        type="submit"
                        variant="contained"
                        id='subscribe_btn'
                        style={{
                            margin: 'auto', marginTop: '10px', marginBottom: 2, height: '40px', width: '100%',
                            fontWeight: 'bold', textTransform: 'none', borderRadius: '8px'
                        }}
                    >
                        <a style={{ textDecoration: 'none', color: 'inherit' }} href='/reset-password'> Submit </a>
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default ForgotPassword;
