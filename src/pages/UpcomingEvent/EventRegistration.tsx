import React from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import color from '../../components/utils/Colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0d78be',
    },
  },
});

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  organization: Yup.string().required('Organization is required'),
});

const EventRegistration = () => {
  const handleSubmit = (values: any) => {
    console.log(values);
    // Handle form submission logic here
  };



  return (
    <ThemeProvider theme={theme}>
    
        <Box
          sx={{
            display: 'flex', flexDirection: 'column', padding: '1% 5%', paddingBottom: '5%',
            width: '70vw', margin: 'auto', rowGap: '20px', marginTop: '2%', marginBottom: '2%', borderRadius: '12px',
            boxShadow: '0px 0px 15px rgba(0,0,0,0.1),10px -5px 15px rgba(0, 0, 0, 0.158) inset',

          }}
        >

          <Typography variant="h4" gutterBottom sx={{  marginTop: 5,color: color.firstColor, fontWeight: 'bold', textAlign: 'center', marginBottom: 2 }}>
            Event Registration
          </Typography>

          <Formik
            initialValues={{ name: '', email: '', phone: '', organization: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  className='input-root'
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="name"
                  placeholder="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
                <Field
                  as={TextField}
                  className='input-root'
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  placeholder="Email Address"
                  name="email"
                  autoComplete="email"
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
                <Field
                  as={TextField}
                  className='input-root'
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="phone"
                  placeholder="Phone Number"
                  name="phone"
                  autoComplete="tel"
                  error={touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                />
                <Field
                  as={TextField}
                  className='input-root'
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="organization"
                  placeholder="Organization"
                  name="organization"
                  autoComplete="organization"
                  error={touched.organization && !!errors.organization}
                  helperText={touched.organization && errors.organization}
                />
                <Button className='button'
                  type="submit"
                  fullWidth

                  color="primary"
                  sx={{ mt: 3, mb: 2 ,
                    width: '100%', padding: '10px 20px', borderRadius: '8px'
                  }}
                >
                  Register
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
    
    </ThemeProvider>
  );
};

export default EventRegistration;
