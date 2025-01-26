import React from 'react';
import { Modal, Box, Typography, TextField, Button, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import color from '../utils/Colors';
import { postLiveStream } from '../../services/services';


interface UploadModalProps {
    open: boolean;
    handleClose: () => void;
    header: string;
    label: string;
    inputlabel: string;
    format: string;
    inputrow: number;
    inputTitle: string;
    onSubmit: any;
}

const UrlModal: React.FC<UploadModalProps> = ({ open, handleClose, header, inputlabel, inputrow, inputTitle, onSubmit }) => {
    const isSmallScreen = useMediaQuery('(max-width:900px)');

    const formik = useFormik({
        initialValues: {
            url: '',
        },
        validationSchema: Yup.object({
            url: Yup.string().url('Invalid URL format').required('URL is required'),
        }),
        onSubmit: async (values) => {

        },
    });

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isSmallScreen ? '90%' : '600px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        border: 'solid 1px #d2d4d6',
        borderRadius: '4px'
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="upload-modal-title"
            aria-describedby="upload-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={formik.handleSubmit}>
                    <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        background: '#f8f8f8', padding: '4%', paddingBottom: '2%', paddingTop: '2%'
                    }}>
                        <Typography id="upload-modal-title" variant="h6" component="h4">
                            Please Input Your url
                        </Typography>
                        <Button onClick={handleClose} style={{
                            color: '#939597',
                            translate: '20px',
                            textTransform: 'none'
                        }} >
                            <CloseIcon style={{ height: '16px' }} />
                        </Button>
                    </div>
                    <div style={{ padding: '4%', paddingTop: '3%' }}>
                        <TextField
                            className='custom-input'
                            id="outlined-multiline-static"
                            placeholder={inputlabel}
                            multiline
                            rows={inputrow}
                            fullWidth
                            margin="normal"
                            style={{ marginTop: '10px' }}
                            {...formik.getFieldProps('url')}
                            error={formik.touched.url && Boolean(formik.errors.url)}
                            helperText={formik.touched.url && formik.errors.url}
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="contained"
                        style={{ background: color.firstColor, fontWeight: 'bold', width: '30%', borderRadius: '8px', marginTop: '16px', marginBottom: '16px', marginLeft: '200px' }}
                        onClick={() => {
                            if (formik.isValid) {
                                onSubmit(formik.values.url); // Pass the URL to the parent
                                handleClose();
                            }
                        }}
                    >
                        Post
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default UrlModal;
