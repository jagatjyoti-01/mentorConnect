import { Box, styled, Typography } from "@mui/material";
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import color from "../utils/Colors";

interface WebinarCardProps {
    icon: React.ElementType;
    title: string;
    count: number;
    color: string;
}

const GradientBorder = styled('div')(({ theme }) => ({
    position: 'relative',
    padding: '2px',
    width: '70%',
    maxWidth: '350px',
    borderRadius: '8px',
    height: '100%',
    background: color.webinarCardBorder,
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 'inherit',
        padding: '2px', // Adjust based on desired border thickness
        background: 'inherit',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
    },
}));

const WebinarCard: React.FC<WebinarCardProps> = ({ icon: Icon, title, count, color }) => (

    <GradientBorder>
        <Box
            sx={(theme) => ({
                cursor: 'pointer',
                backgroundColor: '#fdfdfd',
                color: '#fff',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',

                maxWidth: '350px',
                borderRadius: '6px',

                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.15)',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              
         

                '&:hover': {
                    boxShadow: '4px 4px 12px rgba(0, 0, 0, 0.15)',
                    // border:`solid 1px ${color}`,
                    transform: 'scale(1.03)',
                },
            })}
        >
            <Box
                sx={(theme) => ({
                    display: 'flex', alignItems: 'center', paddingLeft: '0px', color: color,
                    // [theme.breakpoints.down('sm')]: {
                    //     fontSize: '12px'
                    // },
                    // [theme.breakpoints.up('md')]: {
                    //     borderRadius: '16px',
                    //     height: '50%',
                    // },
                })}>
                <Icon sx={{ fontSize: 40, marginRight: '8px' }} />
                <Box>
                    <Typography variant="h6"
                        sx={(theme) => ({
                            fontWeight: 'bold',

                            [theme.breakpoints.down('sm')]: {
                                fontSize: '12px'
                            },
                        })}>
                        {title}
                    </Typography>
                    <Typography variant="body2">{count} Webinars</Typography>
                </Box>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', color: color }}>
                <ChevronRightRoundedIcon ></ChevronRightRoundedIcon>
            </Typography>
        </Box ></GradientBorder>
);


export default WebinarCard;