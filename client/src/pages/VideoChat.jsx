import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const VideoChat = () => {
  const { roomId } = useParams();
  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const peerConnection = useRef(null);

  useEffect(() => {

    const startVideo = async () => {
      try {
        console.log(roomId);

        // Attempt to get the user media
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        myVideo.current.srcObject = stream;

        // Emit event to the server to join room
        socket.emit("join-room", roomId, socket.id);

        // Listen for new user connections
        socket.on("user-connected", (userId) => {
          connectToNewUser(userId, stream);
        });
      } catch (error) {
        // Handle errors from getUserMedia
        console.error("Error accessing camera/microphone:", error);
        if (error.name === "NotAllowedError") {
          alert(
            "Camera or microphone access is blocked. Please enable permissions in your browser."
          );
        } else if (error.name === "NotFoundError") {
          alert(
            "No camera or microphone found. Please connect a device and try again."
          );
        } else {
          alert(
            "An unknown error occurred while accessing your camera/microphone. Please check your device settings."
          );
        }
      }
    };


    startVideo();

    socket.on("user-disconnected", () => {
      if (peerConnection.current) {
        peerConnection.current.close();
      }
    });
  }, [roomId]);

  const connectToNewUser = (userId, stream) => {
    const peer = new RTCPeerConnection();

    peer.ontrack = (event) => {
      userVideo.current.srcObject = event.streams[0];
    };

    stream.getTracks().forEach((track) => peer.addTrack(track, stream));
    peer.createOffer().then((offer) => {
      peer.setLocalDescription(offer);
      socket.emit("offer", offer, userId);
    });

    socket.on("answer", (answer) => {
      peer.setRemoteDescription(new RTCSessionDescription(answer));
    });

    peerConnection.current = peer;
  };

  return (
    <div className="video-chat-container p-4 m-4 ">
      <video
        ref={myVideo}
        autoPlay
        muted
        className="my-video border border-gray-300 rounded-md scale-x--100 inline"
      />
      <video
        ref={userVideo}
        autoPlay
        className="user-video border border-gray-300 rounded-md scale-x-100 inline"
      />
    </div>
  );
};

export default VideoChat;
