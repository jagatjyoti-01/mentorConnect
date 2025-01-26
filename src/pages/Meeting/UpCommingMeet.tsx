import { Box, Typography, List, ListItem } from "@mui/material";
import color from "../../components/utils/Colors";
import { formatDateTime } from "../../components/utils/commonFunction";
import { useNavigate } from "react-router-dom";

const UpCommingMeet = ({ meetings,formik,toggleSidebar }: any) => {
    const navigate = useNavigate();

    
    const joinMeet = (meetingId: any) => {
        navigate('/join-meeting?meetingId=' + meetingId);
        formik.setFieldValue('meetingId', meetingId)
    }


    return (
        <Box
            sx={{
                boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
                padding: '5px',
                paddingRight: 0,
                paddingTop: 2,
                background: 'white',
                paddingBottom: 0,
                color: 'white',
                height: 'fit-content',
                margin: '70px 6px',
                borderRadius: '16px',
                position: 'relative',
            }}
            role="presentation"
            onClick={toggleSidebar}
            onKeyDown={toggleSidebar}
        >
            <Typography style={{ textAlign: 'center', color: '#002a1e', width: '100%' }}>Upcoming Meetings</Typography>
            <List sx={{
                boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
                padding: '5px',
                paddingRight: 0,
                paddingTop: 2,
                paddingBottom: 1,
                color: 'white',
                height: 'fit-content',
                margin: '25px 6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginBottom: '40px',
                borderRadius: '16px',
                position: 'relative',
            }}>
                {meetings.map((meeting: any, index: number) => (
                    <ListItem
                        key={index}
                        onClick={() => joinMeet(meeting.meetingId)}
                        style={{ display: 'flex', justifyContent: 'center', borderRadius: '16px', flexDirection: 'column', alignItems: 'center', background: color.firstColor, marginBottom: '8px' }}
                    >
                        <Typography >
                            {meeting.meetingId}
                        </Typography>
                        <Typography style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>
                            {formatDateTime(meeting.scheduleTime)}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default UpCommingMeet;
