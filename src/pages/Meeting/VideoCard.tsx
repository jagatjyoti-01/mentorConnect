import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
const VideoCard = (props: any) => {
  const ref = useRef<any>();
  const peer = props.peer;

  useEffect(() => {
    peer.on('stream', (stream: any) => {
      ref.current!.srcObject = stream;
    });
    peer.on('track', (track: any, stream: any) => {
    });
  }, [peer]);

  return (
    <Video
      playsInline
      autoPlay
      ref={ref}
    />
  );
};

const Video = styled.video``;

export default VideoCard;
