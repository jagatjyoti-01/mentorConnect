import { Box, Typography, TextField, IconButton, useMediaQuery } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


const ChatWindow = ({messages,message, setMessage,handleSendMessage}: any) => {
    const isMobile = useMediaQuery('(max-width:1200px)');
    
    return (
        <Box className={isMobile ? 'main__right2' : 'main__right'}>
            <Box className="main__chat_window">
                <Typography variant="h6" className="chat__title">Chat</Typography>
                <Box className="messages">
                    {messages.map((msg: any, index: any) => {
                        const [user, ...messageParts] = msg.split(':');
                        const messageText = messageParts.join(':').trim();
                        return (
                            <Box key={index} className="message">
                                <Typography><b>{user}</b></Typography>
                                <Typography>{messageText}</Typography>
                            </Box>
                        );
                    })}
                </Box>
            </Box>
            <Box className="main__message_container">
                <TextField
                    variant="outlined"
                    size="small"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSendMessage();
                        }
                    }}
                    className="chat__input"
                />
                <IconButton onClick={()=>handleSendMessage()} sx={{ fontSize: '40px', color: '#eeeeee' }} className="chat__send_button">
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    )
}


export default ChatWindow;