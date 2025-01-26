// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import io from 'socket.io-client';
// import { Socket } from 'socket.io-client';
// import Video from './components/video';
// import { WebRTCUser } from './types';
// import { socketURL } from '../../services/Secret';

// const pc_config = {
//     iceServers: [
//         // {
//         //   urls: 'stun:[STUN_IP]:[PORT]',
//         //   'credentials': '[YOR CREDENTIALS]',
//         //   'username': '[USERNAME]'
//         // },
//         {
//             urls: 'stun:stun.l.google.com:19302',
//         },
//     ],
// };
// const SOCKET_SERVER_URL =socketURL;

// const VideoCalling1 = () => {
//     const socketRef = useRef<Socket|null>(null);
//     const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
//     const localVideoRef = useRef<HTMLVideoElement>(null);
//     const localStreamRef = useRef<MediaStream>();
//     const [users, setUsers] = useState<WebRTCUser[]>([]);

//     const getLocalStream = useCallback(async () => {
//         try {
//             const localStream = await navigator.mediaDevices.getUserMedia({
//                 audio: true,
//                 video: {
//                     width: 240,
//                     height: 240,
//                 },
//             });
//             localStreamRef.current = localStream;
//             if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
//             if (!socketRef.current) return;
//             socketRef.current.emit('join_room', {
//                 room: '1234',
//                 email: 'sample@naver.com',
//             });
//         } catch (e) {
//             console.log(`getUserMedia error: ${e}`);
//         }
//     }, []);

//     const createPeerConnection = useCallback((socketID: string, email: string) => {
//         try {
//             const pc = new RTCPeerConnection(pc_config);

//             pc.onicecandidate = (e) => {
//                 if (!(socketRef.current && e.candidate)) return;
//                 console.log('onicecandidate');
//                 socketRef.current.emit('candidate', {
//                     candidate: e.candidate,
//                     candidateSendID: socketRef.current.id,
//                     candidateReceiveID: socketID,
//                 });
//             };

//             pc.oniceconnectionstatechange = (e) => {
//                 console.log(e);
//             };

//             pc.ontrack = (e) => {
//                 console.log('ontrack success');
//                 setUsers((oldUsers) =>
//                     oldUsers
//                         .filter((user) => user.id !== socketID)
//                         .concat({
//                             id: socketID,
//                             email,
//                             stream: e.streams[0],
//                         }),
//                 );
//             };

//             if (localStreamRef.current) {
//                 console.log('localstream add');
//                 localStreamRef.current.getTracks().forEach((track) => {
//                     if (!localStreamRef.current) return;
//                     pc.addTrack(track, localStreamRef.current);
//                 });
//             } else {
//                 console.log('no local stream');
//             }

//             return pc;
//         } catch (e) {
//             console.error(e);
//             return undefined;
//         }
//     }, []);

//     useEffect(() => {
//         socketRef.current = io.connect(SOCKET_SERVER_URL);
//         getLocalStream();

//         socketRef.current.on('all_users', (allUsers: Array<{ id: string; email: string }>) => {
//             allUsers.forEach(async (user) => {
//                 if (!localStreamRef.current) return;
//                 const pc = createPeerConnection(user.id, user.email);
//                 if (!(pc && socketRef.current)) return;
//                 pcsRef.current = { ...pcsRef.current, [user.id]: pc };
//                 try {
//                     const localSdp = await pc.createOffer({
//                         offerToReceiveAudio: true,
//                         offerToReceiveVideo: true,
//                     });
//                     console.log('create offer success');
//                     await pc.setLocalDescription(new RTCSessionDescription(localSdp));
//                     socketRef.current.emit('offer', {
//                         sdp: localSdp,
//                         offerSendID: socketRef.current.id,
//                         offerSendEmail: 'offerSendSample@sample.com',
//                         offerReceiveID: user.id,
//                     });
//                 } catch (e) {
//                     console.error(e);
//                 }
//             });
//         });

//         socketRef.current.on(
//             'getOffer',
//             async (data: {
//                 sdp: RTCSessionDescription;
//                 offerSendID: string;
//                 offerSendEmail: string;
//             }) => {
//                 const { sdp, offerSendID, offerSendEmail } = data;
//                 console.log('get offer');
//                 if (!localStreamRef.current) return;
//                 const pc = createPeerConnection(offerSendID, offerSendEmail);
//                 if (!(pc && socketRef.current)) return;
//                 pcsRef.current = { ...pcsRef.current, [offerSendID]: pc };
//                 try {
//                     await pc.setRemoteDescription(new RTCSessionDescription(sdp));
//                     console.log('answer set remote description success');
//                     const localSdp = await pc.createAnswer({
//                         offerToReceiveVideo: true,
//                         offerToReceiveAudio: true,
//                     });
//                     await pc.setLocalDescription(new RTCSessionDescription(localSdp));
//                     socketRef.current.emit('answer', {
//                         sdp: localSdp,
//                         answerSendID: socketRef.current.id,
//                         answerReceiveID: offerSendID,
//                     });
//                 } catch (e) {
//                     console.error(e);
//                 }
//             },
//         );

//         socketRef.current.on(
//             'getAnswer',
//             (data: { sdp: RTCSessionDescription; answerSendID: string }) => {
//                 const { sdp, answerSendID } = data;
//                 console.log('get answer');
//                 const pc: RTCPeerConnection = pcsRef.current[answerSendID];
//                 if (!pc) return;
//                 pc.setRemoteDescription(new RTCSessionDescription(sdp));
//             },
//         );

//         socketRef.current.on(
//             'getCandidate',
//             async (data: { candidate: RTCIceCandidateInit; candidateSendID: string }) => {
//                 console.log('get candidate');
//                 const pc: RTCPeerConnection = pcsRef.current[data.candidateSendID];
//                 if (!pc) return;
//                 await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
//                 console.log('candidate add success');
//             },
//         );

//         socketRef.current.on('user_exit', (data: { id: string }) => {
//             if (!pcsRef.current[data.id]) return;
//             pcsRef.current[data.id].close();
//             delete pcsRef.current[data.id];
//             setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
//         });

//         return () => {
//             if (socketRef.current) {
//                 socketRef.current.disconnect();
//             }
//             users.forEach((user) => {
//                 if (!pcsRef.current[user.id]) return;
//                 pcsRef.current[user.id].close();
//                 delete pcsRef.current[user.id];
//             });
//         };
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [createPeerConnection, getLocalStream]);

//     return (
//         <div>
//             <video
//                 style={{
//                     width: 240,
//                     height: 240,
//                     margin: 5,
//                     backgroundColor: 'black',
//                 }}
//                 muted
//                 ref={localVideoRef}
//                 autoPlay
//             />
//             {users.map((user, index) => (
//                 <Video key={index} email={user.email} stream={user.stream} />
//             ))}
//         </div>
//     );
// };

// export default VideoCalling1;

import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import {
    Typography,
    Box,
    IconButton,
    Avatar,
    TextField,
    Grid,
    useMediaQuery,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
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
import {
    createMeetingParticipants,
    getMeetingParticipants,
    updateMeetingParticipants,
} from '../../services/services';

declare global {
    interface Window {
        YT: any;
    }
}

const configuration = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        // ...add more TURN/STUN servers here for better connectivity
        // (required for most real-world scenarios) 
    ],
};

const VideoCalling1: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const username = location.state?.userName || null;
    const isHost = location.state?.isHost || false;
    const isMicOn = location.state?.isMicOn || true;
    const isVideoOn = location.state?.isHost || true;

    const isMobile = useMediaQuery('(max-width:1200px)');
    const isMobile2 = useMediaQuery('(max-width:600px)');
    let participants: any[] = [];
    const socketRef = useRef<Socket | null>(null);
    const videoGridRef = useRef<HTMLDivElement>(null);
    const videoElements = useRef(new Map<string, HTMLVideoElement>());
    const localStreamRef = useRef<MediaStream | null>(null);
    const screenShareRef = useRef<HTMLVideoElement | null>(null);
    const playerRef = useRef<any | null>(null);

    const peerConnections = useRef(new Map<string, RTCPeerConnection>());
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideosRef = useRef<any>();

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
    const liveStreamRef = useRef<HTMLVideoElement | null>(null);
    const originalVideoTracks = useRef(new Map<string, MediaStreamTrack>());
    const [isParticipantsDrawerOpen, setIsParticipantsDrawerOpen] = useState(false);
    const [allParticipants, setAllParticipants] = useState<any[]>([]);
    const [currentParticipants, setCurrentParticipants] = useState<any[]>([]);
    const [originalVideoTrack, setOriginalVideoTrack] = useState<MediaStreamTrack | null>(null);
    const [originalVideoState, setOriginalVideoState] = useState<boolean>(false);

    const currentUserId = getUserId();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getParticipantsList();
        if (username === null) {
            navigate('/join-meeting', { state: { roomId } });
        }

        socketRef.current = io(SocketURL);
        initializeMedia();

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
            peerConnections.current.forEach((connection) => connection.close());
            peerConnections.current.clear();

            videoElements.current.forEach((video) => {
                video.remove();
            });
            videoElements.current.clear();

            // Stop all local tracks
            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, [roomId, username, liveStreamUrl]); // Include liveStreamUrl

    const initializeMedia = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });

            localStreamRef.current = stream;
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }

            socketRef.current?.on('connect', () => {
                console.log('Connected to signaling server');
                socketRef.current?.emit(
                    'join-room',
                    roomId,
                    socketRef.current.id,
                    username
                );
            });

            socketRef.current?.on(
                'user-connected',
                (data: { userId: string; userName: string; roomId: string }) => {
                    console.log('New user connected:', data.userId, data.userName);
                    if (data.roomId === roomId && localStreamRef.current) {
                        connectToNewUser(
                            data.userId,
                            localStreamRef.current,
                            data.userName
                        );
                    }
                }
            );

            socketRef.current?.on('user-disconnected', (userId: string) => {
                console.log('User disconnected:', userId);
                if (peerConnections.current.has(userId)) {
                    const connection = peerConnections.current.get(userId)!;
                    connection.close();
                    peerConnections.current.delete(userId);

                    // Remove the remote video
                    const videoElement = remoteVideosRef.current.get(userId);
                    if (videoElement) {
                        videoElement.remove();
                        remoteVideosRef.current.delete(userId);
                    }
                }
            });

            socketRef.current?.on(
                'offer',
                (offer: RTCSessionDescriptionInit, userId: string) => {
                    handleOffer(offer, userId);
                }
            );

            socketRef.current?.on(
                'answer',
                (answer: RTCSessionDescriptionInit, userId: string) => {
                    handleAnswer(answer, userId);
                }
            );

            socketRef.current?.on(
                'ice-candidate',
                (candidate: RTCIceCandidateInit, userId: string) => {
                    handleNewICECandidateMsg(candidate, userId);
                }
            );

            socketRef.current?.on('receive-message', (message: string) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });

            socketRef.current?.on('start-screen-share', (userId: string) => {
                if (userId !== socketRef.current!.id) {
                    let screenShareGrid = document.querySelector('.screen-share-grid');
                    if (!screenShareGrid) {
                        screenShareGrid = document.createElement('div');
                        screenShareGrid.className = 'screen-share-grid';
                        videoGridRef.current?.parentElement?.appendChild(screenShareGrid);
                    }

                    const screenShareVideo = document.createElement('video');
                    screenShareVideo.className = 'screen-share-video';

                    // You will receive a call here from the screen-sharing user
                    // (see updated handleScreenShare below)
                    const peerConnection = peerConnections.current.get(userId);

                    if (peerConnection) {
                        peerConnection.ontrack = (event: any) => {
                            console.log('Screen share track received from:', userId);
                            screenShareVideo.srcObject = event.streams[0];
                            screenShareVideo.addEventListener('loadedmetadata', () => {
                                screenShareVideo.play();
                            });
                            if (screenShareGrid) {
                                screenShareGrid.appendChild(screenShareVideo);
                            }
                            setIsRemoteScreenSharing(true);
                        };
                    }


                }
            });

            socketRef.current?.on('stop-screen-share', (userId: string) => {
                if (userId !== socketRef.current!.id) {
                    setIsRemoteScreenSharing(false);
                    removeElementsByClass('screen-share-video');
                    removeElementsByClass('screen-share-grid');
                }
            });

            socketRef.current?.on(
                'video-status-changed',
                (userId: string, isVideoOff: boolean) => {
                    updateVideoOverlay(userId, isVideoOff);
                }
            );

            socketRef.current?.on('live-stream-started', (streamUrl) => {
                console.log('Live stream started with URL:', streamUrl);
                setLiveStreamUrl(streamUrl);
            });

            socketRef.current?.on('live-stream-stopped', () => {
                console.log('Live stream stopped.');
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
        } catch (err) {
            console.error('Error accessing media devices.', err);
        }
    };

    const connectToNewUser = async (
        userId: string,
        stream: MediaStream,
        username: string
    ) => {
        const peerConnection = new RTCPeerConnection(configuration);
        peerConnections.current.set(userId, peerConnection);

        stream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, stream);
        });

        peerConnection.ontrack = (event) => {
            console.log('New track received from:', userId, username);
            const remoteVideo = document.createElement('video');
            remoteVideo.srcObject = event.streams[0];
            remoteVideo.autoplay = true;
            remoteVideosRef.current.set(userId, remoteVideo);
            addVideoStream(userId, remoteVideo, event.streams[0], username);
        };

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socketRef.current?.emit('ice-candidate', event.candidate, userId);
            }
        };

        try {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            socketRef.current?.emit('offer', offer, userId);
        } catch (err) {
            console.error(`Error creating offer for ${userId}:`, err);
        }
    };

    // const addVideoStream = (userId: string, video: HTMLVideoElement, stream: MediaStream, videoname: string) => {
    //     // if(us)
    //     const existingVideo = videoElements.current.get(userId);
    //     if (existingVideo) {
    //         existingVideo.srcObject = stream;
    //     } else {
    //         video.srcObject = stream;
    //         video.addEventListener('loadedmetadata', () => {
    //             video.play();
    //         });
    //         // if (videoGridRef.current) {
    //         const videoContainer = document.createElement('div');
    //         videoContainer.id = userId;
    //         videoContainer.className = 'video-container';

    //         const videoWrapper = document.createElement('div');
    //         videoWrapper.className = 'video-wrapper';
    //         videoWrapper.id = userId;

    //         // videoWrapper.appendChild(video);
    //         videoContainer.appendChild(video);
    //         const usernameElement = document.createElement('div');
    //         usernameElement.className = 'username';
    //         usernameElement.textContent = videoname;
    //         // videoWrapper.appendChild(usernameElement);
    //         videoContainer.appendChild(usernameElement);

    //         // Add overlay for initials (hidden by default)
    //         const overlay = document.createElement('div');
    //         overlay.className = 'overlay';
    //         // overlay.style.display = 'none';

    //         // Add Avatar to the overlay
    //         const avatar = document.createElement('div');
    //         avatar.className = 'avatar-container';
    //         avatar.textContent = videoname[0];
    //         overlay.appendChild(avatar);

    //         // videoContainer.appendChild(videoWrapper);
    //         // videoWrapper.appendChild(overlay);

    //         videoContainer.appendChild(overlay);

    //         videoGridRef?.current?.querySelector('.other-videos')?.appendChild(videoContainer);
    //         // }
    //         videoElements.current.set(userId, video);
    //         handleMuteUnmuteOnLoad();
    //         handleVideoOnOffOnLoad();
    //     }
    // };

    const addVideoStream = (
        userId: string,
        video: HTMLVideoElement,
        stream: MediaStream,
        videoname: string
    ) => {
        const existingVideo = videoElements.current.get(userId);
        if (existingVideo) {
            existingVideo.srcObject = stream;
        } else {
            video.srcObject = stream;
            video.addEventListener('loadedmetadata', () => {
                video.play();
            });

            const videoContainer = document.createElement('div');
            videoContainer.id = userId;
            videoContainer.className = 'video-container';

            // *** Append the video element to the container: ***
            videoContainer.appendChild(video);

            const usernameElement = document.createElement('div');
            usernameElement.className = 'username';
            usernameElement.textContent = videoname;
            videoContainer.appendChild(usernameElement);

            // ... (Your other code for adding overlay and avatar) ...

            // Append the video container to the DOM:
            const otherVideosContainer = videoGridRef?.current?.querySelector('.other-videos');
            if (otherVideosContainer) {
                otherVideosContainer.appendChild(videoContainer);
            } else {
                console.error('Element with class "other-videos" not found!');
            }

            videoElements.current.set(userId, video);
            handleMuteUnmuteOnLoad();
            handleVideoOnOffOnLoad();
        }
    };


    const handleOffer = async (
        offer: RTCSessionDescriptionInit,
        userId: string
    ) => {
        const peerConnection = new RTCPeerConnection(configuration);
        peerConnections.current.set(userId, peerConnection);

        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach((track) => {
                peerConnection.addTrack(track, localStreamRef.current!);
            });
        }

        try {
            await peerConnection.setRemoteDescription(offer);
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            socketRef.current?.emit('answer', answer, userId);

            peerConnection.ontrack = (event) => {
                console.log('New track received from:', userId);
                const remoteVideo = document.createElement('video');
                remoteVideo.srcObject = event.streams[0];
                remoteVideo.autoplay = true;
                remoteVideosRef.current.set(userId, remoteVideo);
                addVideoStream(userId, remoteVideo, event.streams[0], userId); // Assuming userId is the username
            };

            peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    socketRef.current?.emit('ice-candidate', event.candidate, userId);
                }
            };
        } catch (err) {
            console.error(`Error handling offer from ${userId}:`, err);
        }
    };

    const handleAnswer = async (
        answer: RTCSessionDescriptionInit,
        userId: string
    ) => {
        const peerConnection = peerConnections.current.get(userId);
        if (peerConnection) {
            try {
                await peerConnection.setRemoteDescription(answer);
            } catch (err) {
                console.error(`Error setting remote description for ${userId}:`, err);
            }
        }
    };

    const handleNewICECandidateMsg = (
        candidate: RTCIceCandidateInit,
        userId: string
    ) => {
        const peerConnection = peerConnections.current.get(userId);
        if (peerConnection) {
            peerConnection
                .addIceCandidate(new RTCIceCandidate(candidate))
                .catch((e) =>
                    console.log(`Error adding received ice candidate for ${userId}: ${e}`)
                );
        }
    };

    function removeElementsByClass(className: string) {
        const elements = document.getElementsByClassName(className);
        while (elements.length > 0) {
            elements[0].parentNode!.removeChild(elements[0]);
        }
    }

    const getParticipantsList = () => {
        getMeetingParticipants({ meetingId: roomId }).then((allParticipants) => {
            if (allParticipants?.data?.data) {
                if (
                    allParticipants?.data?.data.filter(
                        (o: any) => o.userId === socketRef.current!.id
                    ).length === 0
                ) {
                    let payload: any = {
                        meetingId: roomId,
                        userId: socketRef.current!.id,
                        userName: username,
                        status: 'JOINED',
                    };
                    participants = [...allParticipants?.data?.data, payload];
                    setAllParticipants(participants);
                    setCurrentParticipants(
                        participants.filter((o) => o.status === 'JOINED')
                    );
                    fetch('https://api.ipify.org/?format=json')
                        .then((response) => response.json())
                        .then((data) => {
                            payload['userIp'] = data.ip;
                            createMeetingParticipants(payload).then(() => { });
                        });
                } else {
                    participants = allParticipants?.data?.data;
                    let userJoined = participants.find(
                        (o) => o.userId === socketRef.current!.id
                    );
                    setAllParticipants(participants);
                    if (userJoined && userJoined.status === 'JOINED') {
                        setCurrentParticipants(
                            participants.filter((o) => o.status === 'JOINED')
                        );
                    } else {
                        updateMeetingParticipants(userJoined.id, {
                            status: 'JOINED',
                        }).then(() => { });
                        userJoined.status = 'JOINED';
                        setCurrentParticipants([
                            ...participants.filter((o) => o.status === 'JOINED'),
                        ]);
                    }
                }
            }
        });
    };

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
                        onReady: (event: { target: { playVideo: () => void } }) => {
                            event.target.playVideo();
                        },
                        // ... other events if needed
                    },
                });
            }
        }
    };

    const getYouTubeVideoId = (url: string): string | null => {
        const regExp =
            /^.((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]).*/;
        const match = url.match(regExp);
        return match && match[7].length === 11 ? match[7] : null;
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

    const handleMuteUnmuteOnLoad = () => {
        if (localStreamRef.current) {
            const audioTrack = localStreamRef.current.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !isMicOn;
                setIsAudioMuted(isMicOn);
            }
        }
    };

    //livestream

    const startLiveStream = async (url: string) => {
        setOpen(false); // Close modal or dialog if applicable

        try {
            // Emit event to server to start the live stream
            socketRef.current?.emit('start-live-stream', roomId, url);

            // Set the live stream URL and update state to show the stream
            setLiveStreamUrl(url);
            setIsLiveStreaming(true);
        } catch (error) {
            console.error('Error starting live stream:', error);
        }
    };

    const stopLiveStream = () => {
        try {
            // Emit event to server to stop the live stream
            socketRef.current?.emit('stop-live-stream', roomId);

            // Reset state and stop playback
            setLiveStreamUrl(null);
            setIsLiveStreaming(false);
        } catch (error) {
            console.error('Error stopping live stream:', error);
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
                console.log(!videoTrack.enabled);
                if (socketRef.current) {
                    updateVideoOverlay(socketRef.current!.id || '', !videoTrack.enabled);
                    socketRef.current?.emit(
                        'video-status-changed',
                        roomId,
                        socketRef.current!.id,
                        !videoTrack.enabled
                    );
                }
            }
        }
    };

    const handleVideoOnOffOnLoad = () => {
        if (localStreamRef.current) {
            const videoTrack = localStreamRef.current.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !isVideoOn;
                setIsVideoOff(isVideoOn);
                // Update the local video overlay
                if (socketRef?.current) {
                    updateVideoOverlay(socketRef.current!.id || '', isVideoOn);
                    socketRef.current?.emit(
                        'video-status-changed',
                        roomId,
                        socketRef.current!.id,
                        isVideoOn
                    );
                }
            }
        }
    };

    const updateVideoOverlay = (userId: string, isVideoOff: boolean) => {
        const videoContainer = videoElements.current.get(userId)
            ?.parentElement as HTMLElement;
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
        let result = confirm('Are you sure you want to leave the meeting?');
        if (result) {
            let userToDisconnect = currentParticipants.find(
                (o) => o.userId === socketRef.current!.id
            );
            if (userToDisconnect) {
                updateMeetingParticipants(userToDisconnect.id, {
                    status: 'LEFT',
                }).then(() => {
                    setCurrentParticipants((prevValue) =>
                        prevValue.filter((o) => o.userId !== socketRef.current!.id)
                    );
                });
            }
            if (localStreamRef.current) {
                // Stop all media tracks
                localStreamRef.current.getTracks().forEach((track) => track.stop());
                localStreamRef.current = null;
            }
            if (socketRef.current) {
                socketRef.current.emit('leave-room', roomId, socketRef.current!.id);
                socketRef.current.disconnect();
            }

            peerConnections.current.forEach((connection) => connection.close());
            peerConnections.current.clear();

            videoElements.current.forEach((video) => {
                const videoContainer = video.parentElement;
                // const videoContainer = video.closest('.video-container');
                video.remove();
                videoContainer?.remove();
            });

            videoElements.current.clear();

            navigate('/join-meeting', { state: { roomId } });
        }
    };

    const handleScreenShare = async () => {
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
            });
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

                    // Append the new grid to the main container
                    videoGridRef.current?.parentElement?.appendChild(screenShareGrid);
                    setIsScreenSharing(true);

                    // Replace video track for each peer connection
                    peerConnections.current.forEach((connection, userId) => {
                        const sender = connection
                            .getSenders()
                            .find((s) => s.track?.kind === 'video');
                        if (sender) {
                            sender
                                .replaceTrack(screenTrack)
                                .then(() => {
                                    console.log(
                                        'Replaced track with screen share for user:',
                                        userId
                                    );
                                })
                                .catch((error) => {
                                    console.error('Error replacing track:', error);
                                });
                        }
                    });

                    socketRef.current?.emit(
                        'start-screen-share',
                        roomId,
                        socketRef.current!.id
                    );
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

                // Replace screen share track back to the original video track
                peerConnections.current.forEach((connection) => {
                    const sender = connection
                        .getSenders()
                        .find((s) => s.track?.kind === 'video');
                    if (sender) {
                        sender.replaceTrack(videoTrack).catch((error) => {
                            console.error('Error replacing track:', error);
                        });
                    }
                });
            }

            removeElementsByClass('screen-share-container');
            socketRef.current?.emit(
                'stop-screen-share',
                roomId,
                socketRef.current!.id
            );
        } catch (error) {
            console.error('Error stopping screen share:', error);
        }
    };

    const toggleScreenShare = () => {
        if (isScreenSharing) {
            handleStopScreenShare();
        } else {
            handleScreenShare();
        }
    };

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            socketRef.current?.emit(
                'send-message',
                roomId,
                `${username}: ${message}`
            );
            setMessage('');
        }
    };

    const handleChatToggle = () => {
        setIsChatVisible(!isChatVisible);
    };

    const toggleParticipantsDrawer = () => {
        setIsParticipantsDrawerOpen(!isParticipantsDrawerOpen);
    };

    return (
        <Box className='main'>
            <Box className='main__left'>
                {liveStreamUrl && (
                    <Box
                        sx={{
                            gridTemplateColumns: isMobile
                                ? isLiveStreaming
                                    ? 'none'
                                    : '99% 0%'
                                : isLiveStreaming
                                    ? '60% 38%'
                                    : '99% 0%',
                        }}
                        className='videos__group video-grid'
                        ref={videoGridRef}
                    >
                        {liveStreamUrl && (
                            <div className='live-stream-container'>
                                <ReactPlayer
                                    url={liveStreamUrl}
                                    controls={true}
                                    width={isMobile ? '92vw' : '100%'}
                                    height={isMobile ? '50vh' : '80vh'}
                                />
                            </div>
                        )}
                        <div
                            style={{
                                paddingRight: isLiveStreaming ? '10px' : '0px',
                                height: isMobile && isLiveStreaming ? '30vh' : '80vh',
                            }}
                            className='other-videos'
                        ></div>
                    </Box>
                )}

                {!liveStreamUrl && (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns:
                                isScreenSharing || isRemoteScreenSharing
                                    ? isMobile
                                        ? '60% 38%'
                                        : '60% 38%'
                                    : '100%',
                            gap: '10px',
                            width: '100%',
                            height: '100%',
                            // overflow:'hidden',
                            padding: '10px',
                        }}
                        ref={videoGridRef}
                    >
                        <div id="remote-videos">
                            {[...remoteVideosRef?.current?.values()].map((video, index) => (
                                <video key={index} ref={video} autoPlay />
                            ))}
                        </div>
                        <Box
                            sx={{
                                gridColumn:
                                    !isMobile && (isScreenSharing || isRemoteScreenSharing)
                                        ? '2'
                                        : '1 / span 2',
                                paddingRight:
                                    isScreenSharing || isRemoteScreenSharing ? '10px' : '10px',
                                paddingLeft:
                                    isScreenSharing || isRemoteScreenSharing ? '10px' : '0px',
                                height:
                                    isMobile && (isScreenSharing || isRemoteScreenSharing)
                                        ? '40vh'
                                        : '85vh',
                                translate:
                                    isMobile && (isScreenSharing || isRemoteScreenSharing)
                                        ? '0 45vh'
                                        : '0 0',
                            }}
                            className='other-videos'
                        >
                            {/* Other videos content goes here */}
                        </Box>
                    </Box>
                )}

                <Box
                    sx={{
                        display: isMobile2 ? 'flex' : 'none',
                        marginBottom: '5px',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box className='user-info'>
                        <Avatar className='avatar'>{username[0]}</Avatar>
                        <Typography>{username}</Typography>
                    </Box>

                    <IconButton
                        style={{
                            fontSize: '40px',
                            marginRight: '10px',
                            background: isChatVisible ? color.firstColor : '#1e232d',
                        }}
                        onClick={handleChatToggle}
                        id='options__button'
                    >
                        <ChatIcon />
                    </IconButton>
                </Box>

                <Box className='options'>
                    <Box sx={{ width: '100%' }}>
                        <Grid
                            container
                            style={{
                                position: 'relative',
                                padding: '1rem',
                                boxShadow:
                                    '0px 0px 15px rgba(0,0,0,0.1),10px -5px 15px rgba(0, 0, 0, 0.258) inset',
                            }}
                        >
                            <Grid
                                item
                                xs={12}
                                sm={4}
                                style={{
                                    alignItems: 'center',
                                    marginBottom: isMobile2 ? '10px' : '0px',
                                    display: isMobile2 ? 'none' : 'flex',
                                }}
                            >
                                <Box className='user-info'>
                                    <Avatar className='avatar'>{username[0]}</Avatar>
                                    <Typography>{username}</Typography>
                                </Box>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sm={4}
                                style={{
                                    display: 'flex',
                                    gap: '20px',
                                    justifyContent: 'center',
                                    alignItems: 'end',
                                }}
                            >
                                <IconButton
                                    sx={{ fontSize: '40px' }}
                                    onClick={handleMuteUnmute}
                                    id='options__button'
                                >
                                    {isAudioMuted ? <MicOffIcon /> : <MicIcon />}
                                </IconButton>
                                <IconButton
                                    sx={{ fontSize: '40px' }}
                                    onClick={handleVideoOnOff}
                                    id='options__button'
                                >
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
                                    }}>{currentParticipants.length}</Box>
                                    <IconButton
                                        style={{ fontSize: '40px', background: isParticipantsDrawerOpen ? color.firstColor : '#1e232d' }}
                                        onClick={toggleParticipantsDrawer}
                                        id="options__button"
                                    >
                                        <GroupIcon />
                                    </IconButton>
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
                                                        Participants ({currentParticipants.length})
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
                                                        </Typography>
                                                    } />
                                            </ListItem>
                                        ))}
                                    </List>
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

export default VideoCalling1;