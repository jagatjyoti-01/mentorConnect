import { useEffect, useState } from 'react';
import { SocketURL } from '../../services/axiosClient';
import { io } from 'socket.io-client';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ChatWindow from './ChatWindow';
import { Box } from '@mui/material';
import Peer from 'peerjs';
import VideoControlls from './VideoControlls';
import './Old.css';


const VideoCalling = () => {

    const navigate = useNavigate();
    const peer = new Peer();
    let peers: any = {};
    //state variable
    const { roomId } = useParams<{ roomId: string }>();
    const location = useLocation();
    const isHost = location.state?.isHost || false;
    const username = location.state?.userName || 'Anonymous';

    //declare socket 
    const socketRef = io(SocketURL, {
        path: '/socket.io',
    });

    //message section
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState('');

    //streamingvariables
    const [myVideoStream, setMyVideoStream] = useState<any>();


    //controlls variables
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);

    const handleSendMessage = () => {
        console.log(`${username}: ${message}`)
        if (message.trim() !== '') {
            socketRef.emit('send-message',roomId, `${username}: ${message}`);
            setMessage('');
        }
    };



    //add video stream in grid
    const addVideoStream = (videoEl: any, stream: any, name: any) => {
        const videoGrids = document.getElementById("video-grids");
        videoEl.srcObject = stream;
        videoEl.addEventListener("loadedmetadata", () => {
            videoEl.play();
        });
        const h1 = document.createElement("h1");
        const h1name = document.createTextNode(name);
        h1.appendChild(h1name);
        const videoGrid = document.createElement("div");
        videoGrid.classList.add("video-grid");
        videoGrid.appendChild(h1);
        videoGrids?.appendChild(videoGrid);
        videoGrid.append(videoEl);
        removeUnusedDivs();
        let totalUsers = document.getElementsByTagName("video")?.length;
        if (totalUsers > 1) {
            for (let index = 0; index < totalUsers; index++) {
                document.getElementsByTagName("video")[index].style.width =
                    100 / totalUsers + "%";
            }
        }
    };


    //remove video stream in grid
    const removeUnusedDivs = () => {
        const videoGrids = document.getElementById("video-grids");
        let alldivs: any = videoGrids?.getElementsByTagName("div");
        for (var i = 0; i < alldivs?.length; i++) {
            let e = alldivs[i].getElementsByTagName("video")?.length;
            if (e === 0) {
                alldivs[i].remove();
            }
        }
    };


    const muteUnmute = () => {
        const enabled = myVideoStream.getAudioTracks()[0].enabled;
        if (enabled) {
            myVideoStream.getAudioTracks()[0].enabled = false;
            setIsAudioMuted(false);
        } else {
            setIsAudioMuted(true);
            myVideoStream.getAudioTracks()[0].enabled = true;
        }
    };

    const videoMuteUnmute = () => {
        const enabled = myVideoStream.getVideoTracks()[0].enabled;
        if (enabled) {
            myVideoStream.getVideoTracks()[0].enabled = false;
            setIsVideoOff(false);
        } else {
            setIsVideoOff(true);
            myVideoStream.getVideoTracks()[0].enabled = true;
        }
    };


    const connectToNewUser = (userId: any, streams: any, myname: any) => {
        const call = peer.call(userId, streams);
        const video = document.createElement("video");
        call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream, myname);
        });
        call.on("close", () => {
            video.remove();
            removeUnusedDivs();
        });
        peers[userId] = call;
    };


    const handleLeaveCall = () => {
        // eslint-disable-next-line no-restricted-globals
        let result = confirm("Are you sure you want to leave meeting");
        if (result) {
            if (socketRef) {
                socketRef.disconnect();
            }

            if (peer) {
                peer.destroy();
            }
            navigate('/join-meeting', { state: { roomId } });
        }
    };



    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true, })
            .then((stream) => {
                const myVideo = document.createElement('video');
                myVideo.muted = true;
                setMyVideoStream(stream);
                addVideoStream(myVideo, stream, username);

                socketRef.on("user-connected", res => {
                    console.log("userid:" + res.userId);
                    connectToNewUser(res.userId, stream, res.userName);
                });

                socketRef.on("user-disconnected", (id) => {
                    console.log(peers);
                    if (peers[id]) peers[id].close();
                });

                socketRef.on('receive-message', (message: string) => {
                    setMessages((prevMessages) => [...prevMessages, message]);
                    console.log(message,messages)
                });

                peer.on("call", (call) => {
                    call.answer(stream); // Answer the call with an A/V stream.
                    const video = document.createElement("video");
                    call.on("stream", function (remoteStream) {
                        addVideoStream(video, remoteStream, 'remoteUsername');
                    });
                    call.on("close", () => {
                        video.remove();
                        removeUnusedDivs();
                    });
                });
            });

        peer.on("open", (id) => {
            socketRef.emit("join-room", roomId, id, username);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <Box className="main">
                <Box className="main__left">
                    <div className="main_videos">
                        <div id="video-grids">
                        </div>
                    </div>

                    <VideoControlls
                        username={username} isChatVisible={isChatVisible} setIsChatVisible={setIsChatVisible}
                        handleMuteUnmute={muteUnmute}
                        handleVideoOnOff={videoMuteUnmute}
                        isAudioMuted={isAudioMuted}
                        isVideoOff={isVideoOff}
                        isHost={isHost}
                        handleLeaveCall={handleLeaveCall}
                    />
                </Box>
                {isChatVisible && (
                    <ChatWindow messages={messages} message={message} setMessage={setMessage} handleSendMessage={handleSendMessage} />
                )}
            </Box>
        </>
    );
}


export default VideoCalling;