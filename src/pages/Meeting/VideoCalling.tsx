import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import Peer from 'peerjs';
import { Typography, Box, IconButton, Avatar, TextField, Grid, useMediaQuery, Drawer, List, ListItem, ListItemText, MenuItem, Menu } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import SendIcon from '@mui/icons-material/Send';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import ChatIcon from '@mui/icons-material/Chat';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import './videocalling.css';
import { getUserId, SocketURL } from '../../services/axiosClient';
import UrlModal from '../../components/modal/UrlModal';

import GroupIcon from '@mui/icons-material/Group';
import ReactPlayer from 'react-player';
import color from '../../components/utils/Colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { createMeetingParticipants, getMeetingParticipants, updateMeetingParticipants, updateMeetingParticipantsStatus } from '../../services/services';
import { AnyAaaaRecord } from 'dns';


declare global {
    interface Window {
        YT: any;
    }
}

const VideoCalling: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const username = location.state?.userName || null;
    const isHost = location.state?.isHost || false;
    const isMobile = useMediaQuery('(max-width:1200px)');
    const isMobile2 = useMediaQuery('(max-width:600px)');
    let participants: any[] = [];
    const socketRef = useRef<Socket | null>(null);
    const peerRef = useRef<Peer | null>(null);
    const videoGridRef = useRef<HTMLDivElement>(null);
    const videoElements = useRef(new Map<string, HTMLVideoElement>());
    const localStreamRef = useRef<MediaStream | null>(null);
    const screenShareRef = useRef<HTMLVideoElement | null>(null);
    const playerRef = useRef<any | null>(null);

    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState('');
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [isRemoteScreenSharing, setIsRemoteScreenSharing] = useState(false);
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [liveStreamUrl, setLiveStreamUrl] = useState<string | null>(null);
    const [isLiveStreaming, setIsLiveStreaming] = useState(false);
    const originalVideoTracks = useRef(new Map<string, MediaStreamTrack>());
    const [isParticipantsDrawerOpen, setIsParticipantsDrawerOpen] = useState(false);
    const [currentParticipants, setCurrentParticipants] = useState<any[]>([]);
    const [isEveryoneMuted, setIsEveryoneMuted] = useState(false);
    // const [areAllCamerasDisabled, setAreAllCamerasDisabled] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open1 = Boolean(anchorEl);
    const [cohosts, setCohosts] = useState<string[]>([]); // Use string[] for user IDs
    const [selectedParticipant, setSelectedParticipant] = useState<any | null>(null);
    const [isLocalUserCohost, setIsLocalUserCohost] = useState(false);


    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose1 = () => {
        setAnchorEl(null);
    };



    const currentUserId = getUserId();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const generatePeerId = () => 'anonymous-user-' + Math.random().toString(36).substring(2);

    useEffect(() => {
        getParticipantsList();
        if (username === null) {
            navigate('/join-meeting', { state: { roomId } });
        }
        // setPeerId(generatePeerId());
        socketRef.current = io(SocketURL, {
            path: '/socket.io',
        });
        initializePeer(username + '_' + (currentUserId > 0 ? currentUserId : username));

        socketRef.current.on('stream-ready', (newUserId: string, remoteUsername: string) => {
            connectToNewUser(newUserId, localStreamRef.current!, remoteUsername);
        });

        socketRef.current.on('user-connected', (res) => {
            if (res.roomId === roomId) {
                getParticipantsList();
                connectToNewUser(res.userId, localStreamRef.current!, res.userName);
            }
        });

        socketRef.current.on('user-disconnected', (userId: string) => {
            console.log('user-disconnected', userId)
            updateMeetingParticipantsStatus(userId, { status: 'LEFT' }).then(() => {
                getParticipantsList();
                if (videoElements.current.has(userId)) {
                    const video = videoElements.current.get(userId);
                    const videoContainer = video?.parentElement;
                    video?.remove();
                    videoContainer?.remove();
                    videoElements.current.delete(userId);
                }
            })
        });

        socketRef.current.on('receive-message', (message: string) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });


        socketRef.current.on('start-screen-share', (userId: string) => {
            if (userId !== peerRef.current!.id) {
                // Create the screen share grid container (if it doesn't exist)
                let screenShareGrid = document.querySelector('.screen-share-grid');
                if (!screenShareGrid) {
                    screenShareGrid = document.createElement('div');
                    screenShareGrid.className = 'screen-share-grid';
                    videoGridRef.current?.parentElement?.appendChild(screenShareGrid);
                }

                // Create a new video element
                const screenShareVideo = document.createElement('video');
                screenShareVideo.className = 'screen-share-video';

                // You will receive a call here from the screen-sharing user 
                // (see updated handleScreenShare below)
                peerRef.current!.on('call', (call) => {
                    call.answer(); // Answer the call without sending a stream

                    call.on('stream', (screenShareStream) => {
                        screenShareVideo.srcObject = screenShareStream;
                        screenShareVideo.addEventListener('loadedmetadata', () => {
                            screenShareVideo.play();
                        });
                        if (screenShareGrid) {
                            screenShareGrid.appendChild(screenShareVideo);
                        }
                        setIsRemoteScreenSharing(true)
                    });

                    call.on('close', () => {
                        screenShareVideo.remove();
                    });
                });
            }
        });

        socketRef.current.on('stop-screen-share', (userId: string) => {
            const peerConnection = findPeerConnection(userId);
            const originalTrack = originalVideoTracks.current.get(userId);

            if (peerConnection && originalTrack) {
                const videoSender = peerConnection.getSenders().find((sender: { track: { kind: string; }; }) => sender.track?.kind === 'video');
                if (videoSender) {
                    videoSender.replaceTrack(originalTrack)
                        .then(() => {
                            console.log('Successfully switched back to original track for', userId);
                        })
                        .catch((error: any) => {
                            console.error('Error switching back to original track:', error);
                        });
                } else {
                    console.error('Could not find video sender for', userId);
                }
            } else {
                console.error('Peer connection or original track not found for', userId);
            }
            setIsRemoteScreenSharing(false)
            removeElementsByClass('screen-share-video');
            removeElementsByClass('screen-share-grid');
        });

        if (socketRef.current) {
            socketRef.current.on("cohost-status-changed", (data) => {
                console.log("Co-host status changed:", data); // Add this for debugging
                setCohosts(
                    data.updatedParticipants
                        .filter((p: any) => p.isCohost)
                        .map((p: any) => p.id)
                );

                // Update local user's cohost status
                setIsLocalUserCohost(
                    data.updatedParticipants.find((p: any) => p.id === peerRef.current?.id)
                        ?.isCohost || false
                );
            });
        }

        socketRef.current.on('mute-all', (shouldMute: boolean) => {
            if (localStreamRef.current) {
                localStreamRef.current.getAudioTracks()[0].enabled = !shouldMute;
                setIsAudioMuted(shouldMute); // Update your local mute state if needed
            }
        });



        socketRef.current.on('video-status-changed', (userId: string, isVideoOff: boolean) => {
            // console.log(userId, isVideoOff)
            updateVideoOverlay(userId, isVideoOff);
        });


        socketRef.current.on("live-stream-started", (streamUrl) => {
            console.log("Live stream started with URL:", streamUrl);
            setLiveStreamUrl(streamUrl);
        });

        socketRef.current.on("live-stream-stopped", () => {
            console.log("Live stream stopped.");
            setLiveStreamUrl(null);
            if (playerRef.current) {
                playerRef.current.stopVideo();
            }
        });

        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);



        // Call createPlayer when liveStreamUrl changes
        if (liveStreamUrl) createPlayer();

        return () => {
            if (playerRef.current) {
                playerRef.current.disconnect();
            }
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
            videoElements.current.forEach((video) => {
                video.remove();
            });
            videoElements.current.clear();
        };

    }, [roomId, username, liveStreamUrl]); // Include liveStreamUrl in the dependencies


    function removeElementsByClass(className: string) {
        const elements = document.getElementsByClassName(className);
        while (elements.length > 0) {
            elements[0].parentNode!.removeChild(elements[0]);
        }
    }


    const getParticipantsList = () => {
        getMeetingParticipants({ meetingId: roomId }).then((allParticipants) => {
            if (allParticipants?.data?.data) {
                if (allParticipants?.data?.data.filter((o: any) => o.userId === peerRef.current!.id).length === 0) {
                    let payload: any = {
                        meetingId: roomId,
                        userId: peerRef.current!.id,
                        userName: username,
                        status: 'JOINED',
                    }
                    participants = [...allParticipants?.data?.data, payload];
                    setCurrentParticipants(participants.filter(o => o.status === 'JOINED'));
                    fetch('https://api.ipify.org/?format=json')
                        .then(response => response.json())
                        .then(data => {
                            payload['userIp'] = data.ip;
                            createMeetingParticipants(payload).then(() => { })
                        })
                } else {
                    participants = allParticipants?.data?.data;
                    let userJoined = participants.find(o => o.userId === peerRef.current!.id);
                    if (userJoined && userJoined.status === 'JOINED') {
                        setCurrentParticipants(participants.filter(o => o.status === 'JOINED'));
                    }
                    else {
                        updateMeetingParticipants(userJoined.id, { status: 'JOINED' }).then(() => { });
                        userJoined.status = 'JOINED';
                        setCurrentParticipants([...participants.filter(o => o.status === 'JOINED')]);
                    }
                }

            }
        })
    }


    // Function to create the YouTube player
    const createPlayer = () => {
        if (liveStreamUrl && !playerRef.current) {
            const videoId = getYouTubeVideoId(liveStreamUrl);
            if (videoId) {
                playerRef.current = new YT.Player('youtube-player', {
                    height: '390',
                    width: '640',
                    videoId: videoId,
                    events: {
                        'onReady': (event: { target: { playVideo: () => void; }; }) => {
                            event.target.playVideo();
                        },
                        // ... other events if needed
                    }
                });
            }
        }
    };


    const findPeerConnection = (userId: string): any | undefined => {
        if (!peerRef.current) return undefined; // Handle cases where peerRef is not initialized

        // Assuming you are using a structure like this for your connections 
        // (because you use it in your handleScreenShare function):
        const connections = Object.values(peerRef.current.connections) as any[][];

        // Iterate through the connections to find the one matching the userId
        for (const peerConnectionArray of connections) {
            for (const conn of peerConnectionArray) {
                if (conn.peer === userId) {
                    return conn.peerConnection;
                }
            }
        }

        console.warn("Peer connection not found for userId:", userId);
        return undefined;
    };

    const initializePeer = (peerId: string) => {

        peerRef.current = new Peer(peerId
            //     , {
            //     config: {
            //         iceServers: [
            //             { urls: 'stun:stun.l.google.com:19302' },
            //             { urls: 'stun:global.stun.twilio.com:3478?transport=udp' },
            //             //     {
            //             //         urls: 'turn:172.31.47.128:3478',
            //             //         username: 'ubuntu',
            //             //         credential: 'VW@2024$#@!'

            //             //     },
            //         ]
            //     }
            // }
        );
        peerRef.current.on('open', (id) => {
            console.log('My PeerJS ID:', id, roomId);
            navigator.mediaDevices
                .getUserMedia({ audio: true, video: true })
                .then((stream) => {
                    changesOnStream(stream, id);
                    socketRef.current!.emit('stream-ready', id);
                    socketRef.current!.emit('join-room', roomId, id, username);
                })
                .catch((err) => console.error('Error accessing media devices.', err));
            peerRef.current!.on("connection", (conn) => {  // listen for data connection here
                conn.on("data", (data) => {
                    if (data === "end") {
                        conn.close();
                        if (peerRef.current != null) {
                            peerRef.current.destroy();
                        }
                        console.log("the caller ended the call", data);
                    }
                });
            });
        })
    };


    const changesOnStream = (stream: any, id: any) => {
        localStreamRef.current = stream;
        const myVideo = document.createElement('video');
        myVideo.muted = true;
        addVideoStream(id, myVideo, stream, username);
        peerRef.current!.on('call', (call) => {
            call.answer(stream);
            const video = document.createElement('video');
            call.on('stream', (userVideoStream) => {
                let screenShareGrid = document.querySelector('.screen-share-grid');
                if (!screenShareGrid && !isRemoteScreenSharing)
                    addVideoStream(call.peer, video, userVideoStream, call.peer.split('_')[0]);
            });
        });
    }

    const toggleParticipantsDrawer = () => {
        setIsParticipantsDrawerOpen(!isParticipantsDrawerOpen);
    };


    const connectToNewUser = (userId: string, stream: MediaStream, username: string) => {
        const call = peerRef.current!.call(userId, stream);
        const video = document.createElement('video');
        call.on('stream', (userVideoStream) => {
            addVideoStream(userId, video, userVideoStream, username);
        });
        call.on('close', () => {
            if (videoElements.current.has(userId)) {
                const video = videoElements.current.get(userId);
                const videoContainer = video?.parentElement;
                video?.remove();
                videoContainer?.remove();
                videoElements.current.delete(userId);
            }
        });
    };

    const addVideoStream = (userId: string, video: HTMLVideoElement, stream: MediaStream, videoname: string) => {
        // if(us)
        const existingVideo = videoElements.current.get(userId);
        if (existingVideo) {
            existingVideo.srcObject = stream;
        } else {
            video.srcObject = stream;
            video.addEventListener('loadedmetadata', () => {
                video.play();
            });
            // if (videoGridRef.current) {
            const videoContainer = document.createElement('div');
            videoContainer.id = userId;
            videoContainer.className = 'video-container';

            const videoWrapper = document.createElement('div');
            videoWrapper.className = 'video-wrapper';
            videoWrapper.id = userId;

            // videoWrapper.appendChild(video);
            videoContainer.appendChild(video);
            const usernameElement = document.createElement('div');
            usernameElement.className = 'username';
            usernameElement.textContent = videoname;
            // videoWrapper.appendChild(usernameElement);
            videoContainer.appendChild(usernameElement);

            // Add overlay for initials (hidden by default)
            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            overlay.style.display = 'none';

            // Add Avatar to the overlay
            const avatar = document.createElement('div');
            avatar.className = 'avatar-container';
            avatar.textContent = videoname[0];
            overlay.appendChild(avatar);

            // videoContainer.appendChild(videoWrapper);
            // videoWrapper.appendChild(overlay);

            videoContainer.appendChild(overlay);

            videoGridRef?.current?.querySelector('.other-videos')?.appendChild(videoContainer);
            // }
            videoElements.current.set(userId, video);
        }
    };


    const getYouTubeVideoId = (url: string): string | null => {
        const regExp = /^.((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : null;
    };

    const handleMuteUnmute = () => {
        if (localStreamRef.current) {
            const audioTrack = localStreamRef.current.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsAudioMuted(!audioTrack.enabled);
            }
        }
    };


    //livestream 

    const startLiveStream = async (url: string) => {
        setOpen(false); // Close modal or dialog if applicable

        try {
            // Emit event to server to start the live stream
            socketRef.current?.emit("start-live-stream", roomId, url);

            // Set the live stream URL and update state to show the stream
            setLiveStreamUrl(url);
            setIsLiveStreaming(true);
        } catch (error) {
            console.error("Error starting live stream:", error);
        }
    };


    const stopLiveStream = () => {
        try {
            // Emit event to server to stop the live stream
            socketRef.current?.emit("stop-live-stream", roomId);

            // Reset state and stop playback
            setLiveStreamUrl(null);
            setIsLiveStreaming(false);
        } catch (error) {
            console.error("Error stopping live stream:", error);
        }
    };



    const toggleStream = () => {
        if (isLiveStreaming) {
            stopLiveStream();
        } else {
            handleOpen();
        }
    };

    const handleVideoOnOff = () => {
        if (localStreamRef.current) {
            const videoTrack = localStreamRef.current.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setIsVideoOff(!videoTrack.enabled);
                // Update the local video overlay
                // console.log(!videoTrack.enabled)
                updateVideoOverlay(peerRef.current!.id, !videoTrack.enabled);
                socketRef.current?.emit('video-status-changed', roomId, peerRef.current!.id, !videoTrack.enabled);
            }
        }
    };


    const updateVideoOverlay = (userId: string, isVideoOff: boolean) => {
        // console.log('isVideoOff', isVideoOff)
        const videoContainer = videoElements.current.get(userId)?.parentElement as
            HTMLElement;
        if (videoContainer) {
            const overlay = videoContainer.querySelector(
                '.overlay'
            ) as HTMLDivElement;
            if (overlay) {
                overlay.style.display = isVideoOff ? 'flex' : 'none';
            }
        }
    };



    const handleLeaveCall = () => {
        // eslint-disable-next-line no-restricted-globals
        let result = confirm("Are you sure you want to leave meeting");
        if (result) {
            let userToDisconnect = currentParticipants.find(o => o.userId === peerRef.current!.id)
            if (userToDisconnect) {
                updateMeetingParticipants(userToDisconnect.id, { status: 'LEFT' }).then(() => {
                    setCurrentParticipants(prevValue =>
                        prevValue.filter(o => o.userId !== peerRef.current!.id)
                    );
                    if (localStreamRef.current) {
                        // Stop all media tracks
                        localStreamRef.current.getTracks().forEach(track => track.stop());
                        localStreamRef.current = null;
                    }
                    if (socketRef.current) {
                        socketRef.current.emit('leave-room', roomId, peerRef.current!.id);
                        socketRef.current.disconnect();
                    }

                    if (peerRef.current) {
                        peerRef.current.disconnect();
                    }

                    videoElements.current.clear();

                    navigate('/join-meeting', { state: { roomId } });
                });
            }
        }
    };

    const handleScreenShare = async () => {
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            const screenTrack = screenStream.getVideoTracks()[0];

            if (localStreamRef.current) {

                if (videoGridRef.current) {
                    const screenShareVideo = document.createElement('video');
                    screenShareVideo.className = 'screen-share-container';
                    screenShareVideo.srcObject = screenStream;
                    screenShareVideo.addEventListener('loadedmetadata', () => {
                        screenShareVideo.play();
                    });
                    screenShareRef.current = screenShareVideo;

                    // Create a new grid for the screen share video
                    const screenShareGrid = document.createElement('div');
                    screenShareGrid.className = 'screen-share-grid';
                    screenShareGrid.appendChild(screenShareVideo);

                    // const username = document.createElement('div');
                    // username.className = 'username1';
                    // const usernameOverlay = document.createElement('div');
                    // usernameOverlay.className = 'username1-overlay';
                    // usernameOverlay.textContent = Screen Sharing: ${username};
                    // screenShareGrid.appendChild(usernameOverlay);

                    // Append the new grid to the main container
                    videoGridRef.current?.parentElement?.appendChild(screenShareGrid);
                    setIsScreenSharing(true);

                    const connections = Object.values(peerRef.current!.connections) as any[][];
                    connections.forEach((peerConnectionArray) => {
                        peerConnectionArray.forEach((conn) => {
                            if (conn.peer !== peerRef.current!.id) { // Don't call yourself
                                const call = peerRef.current!.call(conn.peer, screenStream);

                            }
                        });
                    });
                    // Notify other participants about screen share
                    socketRef.current?.emit('start-screen-share', roomId, peerRef.current!.id);
                }

                screenTrack.onended = () => {
                    handleStopScreenShare();
                };
            }
        } catch (error) {
            console.error('Error sharing screen:', error);
        }
    };

    const handleStopScreenShare = () => {
        try {
            if (screenShareRef.current) {
                const screenShareGrid = document.querySelector('.screen-share-grid');
                screenShareGrid?.remove();
                screenShareRef.current = null;

                setIsScreenSharing(false);
            }

            if (localStreamRef.current) {
                const videoTrack = localStreamRef.current.getVideoTracks()[0];
                const connections = Object.values(peerRef.current!.connections) as any[][];
                connections.forEach((peerConnectionArray) => {
                    peerConnectionArray.forEach((conn) => {
                        const videoSender = conn.peerConnection.getSenders().find(
                            (sender: any) => sender.track?.kind === 'video'
                        );
                        if (videoSender) {
                            videoSender.replaceTrack(videoTrack).catch((error: any) => {
                                console.error("Error replacing track:", error);
                            });
                        }
                    });
                });
            }

            removeElementsByClass('screen-share-container');
            socketRef.current?.emit('stop-screen-share', roomId, peerRef.current!.id);
        } catch (error) {
            console.error('Error stopping screen share:', error);
        }
    };

    // Toggle screen share button handler
    const toggleScreenShare = () => {
        if (isScreenSharing) {
            handleStopScreenShare();
        } else {
            handleScreenShare();
        }
    };



    const handleSendMessage = () => {
        if (message.trim() !== '') {
            socketRef.current?.emit('send-message', roomId, `${username}: ${message}`);
            setMessage('');
        }
    };

    const handleChatToggle = () => {
        setIsChatVisible(!isChatVisible);
    };


    const getLengthOfCurrentParticipants = () => {
        return currentParticipants.length;
    };

    const handleMuteAll = () => {
        setIsEveryoneMuted(!isEveryoneMuted);
        socketRef.current?.emit('mute-all', roomId, !isEveryoneMuted);
    };
    const handleMakeCohost = (participantId: any) => {
        socketRef.current?.emit("make-cohost", roomId, participantId);
    };

    const handleRemoveCohost = (participantId: any) => {
        socketRef.current?.emit("remove-cohost", roomId, participantId);
    };

    const handleCohostToggle = (participant: any) => {

        setSelectedParticipant(participant);
        setAnchorEl(null);
        if (cohosts.includes(participant?.userId)) {
            handleRemoveCohost(participant?.userId);
        } else {
            handleMakeCohost(participant?.userId);
        }


        setIsParticipantsDrawerOpen(false);
    };


    const handleMenuClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        participant: any
    ) => {
        setAnchorEl(event.currentTarget as HTMLElement);
        setSelectedParticipant(participant);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedParticipant(null);
    };

    const handleOptionSelect = (option: string) => {
        if (option === 'make-cohost') {
            handleCohostToggle(selectedParticipant);
        }

        handleMenuClose();
    };

    return (
        <Box className="main">
            <Box className="main__left">


                {liveStreamUrl && (
                    <Box
                        sx={{
                            gridTemplateColumns: isMobile ? isLiveStreaming ? 'none' : '99% 0%' : isLiveStreaming ? '60% 38%' : '99% 0%',
                        }}
                        className="videos__group video-grid"
                        ref={videoGridRef}
                    > {liveStreamUrl && (
                        <div className="live-stream-container">
                            <ReactPlayer
                                url={liveStreamUrl}
                                controls={true}
                                width={isMobile ? "92vw" : '100%'}
                                height={isMobile ? "50vh" : '80vh'}
                            />
                        </div>
                    )}
                        <div
                            style={{
                                paddingRight: isLiveStreaming ? '10px' : '0px',
                                height: isMobile && isLiveStreaming ? '30vh' : '80vh',
                            }}
                            className="other-videos"></div>
                    </Box>
                )}


                {!liveStreamUrl && (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: (isScreenSharing || isRemoteScreenSharing)
                                ? isMobile
                                    ? '60% 38%'
                                    : '60% 38%'
                                : '100%',
                            gap: '10px',
                            width: '100%',
                            height: '100%',
                            // overflow:'hidden',
                            padding: '10px'
                        }}
                        ref={videoGridRef}
                    >



                        <Box
                            sx={{
                                gridColumn: !isMobile && (isScreenSharing || isRemoteScreenSharing) ? '2' : '1 / span 2',
                                paddingRight: (isScreenSharing || isRemoteScreenSharing) ? '10px' : '10px',
                                paddingLeft: (isScreenSharing || isRemoteScreenSharing) ? '10px' : '0px',
                                height: isMobile && (isScreenSharing || isRemoteScreenSharing) ? '40vh' : '85vh',
                                translate: isMobile && (isScreenSharing || isRemoteScreenSharing) ? '0 45vh' : '0 0',
                            }}
                            className="other-videos"
                        >
                            {/* Other videos content goes here */}
                        </Box>
                    </Box>
                )}

                <Box sx={{ display: isMobile2 ? 'flex' : 'none', marginBottom: '5px', justifyContent: 'space-between' }}>
                    <Box className="user-info">
                        <Avatar className="avatar">{username[0]}</Avatar>
                        <Typography>{username}</Typography>
                    </Box>

                    <IconButton style={{ fontSize: '40px', marginRight: '10px', background: isChatVisible ? color.firstColor : '#1e232d' }} onClick={handleChatToggle} id="options__button">
                        <ChatIcon />
                    </IconButton>
                </Box>

                <Box className="options" >
                    <Box sx={{ width: '100%' }}>

                        <Grid container style={{
                            position: 'relative', padding: '1rem',
                            boxShadow: '0px 0px 15px rgba(0,0,0,0.1),10px -5px 15px rgba(0, 0, 0, 0.258) inset',
                        }}>
                            {/* <div
                            style={{position:'absolute',filter:'blur(14px)', background:'rgba(255, 255, 255, 0.258)', width:'100%', height:'100%'}}></div> */}
                            <Grid item xs={12} sm={4} style={{
                                alignItems: 'center', marginBottom: isMobile2 ? '10px' : '0px',
                                display: isMobile2 ? 'none' : 'flex'
                            }}>
                                <Box className="user-info">
                                    <Avatar className="avatar">{username[0]}</Avatar>
                                    <Typography>{username}</Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={4} style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'end' }}>
                                <IconButton sx={{ fontSize: '40px', }} onClick={handleMuteUnmute} id="options__button">
                                    {isAudioMuted ? <MicOffIcon /> : <MicIcon />}
                                </IconButton>
                                <IconButton sx={{ fontSize: '40px' }} onClick={handleVideoOnOff} id="options__button">
                                    {isVideoOff ? <VideocamOffIcon /> : <VideocamIcon />}
                                </IconButton>



                                <IconButton onClick={handleLeaveCall} style={{ color: 'white', background: 'red', height: '45px', width: '45px' }} id="options__button">
                                    <CallEndIcon />
                                </IconButton>
                                {isHost ? (
                                    <>
                                        <IconButton onClick={toggleStream} style={{ fontSize: '40px', background: isLiveStreaming ? color.firstColor : '#1e232d' }} id="options__button">
                                            <RadioButtonCheckedIcon />
                                        </IconButton>
                                        <UrlModal
                                            header={'Upload'}
                                            format={"image/*"}
                                            open={open}
                                            handleClose={handleClose}
                                            label={'Add Your URL here '}
                                            inputrow={2}
                                            inputTitle={''}
                                            inputlabel={'Add Your URL here '}
                                            onSubmit={(url: string) => startLiveStream(url)}
                                        />
                                    </>
                                ) : <></>}


                                <IconButton style={{ fontSize: '40px', background: isScreenSharing ? color.firstColor : '#1e232d' }} onClick={toggleScreenShare} id="options__button">
                                    <ScreenShareIcon />
                                </IconButton>
                                <Box sx={{ display: 'flex', position: 'relative' }}>
                                    <Box sx={{
                                        position: 'absolute', color: 'white', zIndex: 10, fontWeight: 'bold',
                                        fontSize: '10px', right: 2, top: 1
                                    }}>{getLengthOfCurrentParticipants()}</Box>
                                    <IconButton
                                        style={{ fontSize: '40px', background: isParticipantsDrawerOpen ? color.firstColor : '#1e232d' }}
                                        onClick={toggleParticipantsDrawer}
                                        id="options__button"
                                    >
                                        <GroupIcon />
                                    </IconButton>
                                </Box>
                                <Box>
                                    {(isHost || isLocalUserCohost) && (
                                        <>
                                            <IconButton
                                                aria-label="more"
                                                aria-controls="long-menu"
                                                aria-haspopup="true"
                                                onClick={handleClick}
                                                style={{ fontSize: '40px', background: '#1e232d' }}
                                                id="options__button"
                                            >
                                                <MoreVertIcon />
                                            </IconButton>

                                            <Menu
                                                id="long-menu"
                                                anchorEl={anchorEl}
                                                keepMounted
                                                open={Boolean(anchorEl)}
                                                onClose={handleClose1}
                                            >
                                                <MenuItem onClick={() => { handleMuteAll(); handleClose(); }}>
                                                    {isEveryoneMuted ? 'Unmute All' : 'Mute All'}
                                                </MenuItem>
                                                {/* <MenuItem onClick={() => { handleDisableAllCameras(); handleClose(); }}>
                                                    {areAllCamerasDisabled ? 'Enable All Cameras' : 'Disable All Cameras'}
                                                </MenuItem> */}
                                            </Menu>

                                            {/* Original IconButton Controls (Optional) */}
                                            {/* <IconButton
                                        onClick={handleMuteAll}
                                        style={{ fontSize: '40px', background: isEveryoneMuted ? color.firstColor : '#1e232d' }}
                                        id="options__button"
                                    >
                                        {isEveryoneMuted ? <MicOffIcon /> : <MicIcon />}
                                    </IconButton>

                                    <IconButton
                                        onClick={handleDisableAllCameras}
                                        style={{ fontSize: '40px', background: areAllCamerasDisabled ? color.firstColor : '#1e232d' }}
                                        id="options__button"
                                    >
                                        {areAllCamerasDisabled ? <VideocamOffIcon /> : <VideocamIcon />}
                                    </IconButton> */}
                                        </>
                                    )}
                                </Box>

                                <Drawer
                                    anchor="right"
                                    open={isParticipantsDrawerOpen}
                                    onClose={toggleParticipantsDrawer}
                                >
                                    <List>
                                        <ListItem key={0}>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="h6">
                                                        Participants ({getLengthOfCurrentParticipants()})
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                        {currentParticipants.map((participant) => (
                                            <ListItem key={participant.id}>
                                                <ListItemText
                                                    primary={
                                                        <Typography variant="body1">
                                                            {participant.userName}
                                                            {cohosts.includes(participant.userId) && (
                                                                <span style={{ color: 'green', marginLeft: '5px' }}>
                                                                    {' '}
                                                                    (Co-host)
                                                                </span>
                                                            )}
                                                        </Typography>
                                                    }
                                                />
                                                {/* Show the 3-dot menu for host OR for co-hosts  */}
                                                {(isHost || (isLocalUserCohost && participant.userId === peerRef.current!.id)) && (
                                                    <IconButton
                                                        aria-label="more"
                                                        aria-controls="participant-menu"
                                                        aria-haspopup="true"
                                                        onClick={(e) => handleMenuClick(e, participant)}
                                                        style={{ fontSize: '20px', background: '#1e232d' }}
                                                        id="options__button"
                                                    >
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                )}

                                            </ListItem>
                                        ))}
                                    </List>

                                    <Menu
                                        id="participant-menu"
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleMenuClose}
                                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    >
                                        {isHost && (
                                            <MenuItem onClick={() => handleOptionSelect('make-cohost')}>
                                                {cohosts.includes(selectedParticipant?.userId)
                                                    ? 'Remove Co-host'
                                                    : 'Make Co-host'}
                                            </MenuItem>
                                        )}
                                        {/* Conditionally render Mute All option for co-hosts */}
                                        {(isHost || isLocalUserCohost) && ( // Show Mute All for host and co-hosts
                                            <MenuItem onClick={() => { handleMuteAll(); handleMenuClose(); }}>
                                                {isEveryoneMuted ? 'Unmute All' : 'Mute All'}
                                            </MenuItem>
                                        )}
                                        {/* <MenuItem onClick={() => handleOptionSelect('remove-participant')}>Remove Participant</MenuItem> */}
                                    </Menu>
                                </Drawer>


                            </Grid>

                            <Grid item xs={4} style={{ display: isMobile2 ? 'none' : 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <IconButton style={{ fontSize: '40px', marginRight: '10px', background: isChatVisible ? color.firstColor : '#1e232d' }} onClick={handleChatToggle} id="options__button">
                                    <ChatIcon />
                                </IconButton>
                                {/* <Typography style={{color:'white', marginLeft:'10px'}}>Chat</Typography>  */}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>

            {isChatVisible && (
                <Box className={isMobile ? 'main_right2' : 'main_right'}>
                    <Box className="main__chat_window">
                        <Typography variant="h6" className="chat__title">Chat</Typography>
                        <Box className="messages">
                            {messages.map((msg, index) => {
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
                        <IconButton onClick={handleSendMessage} sx={{ fontSize: '40px', color: '#eeeeee' }} className="chat__send_button">
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Box>
            )}


        </Box>
    );
};

export default VideoCalling;