import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  VideoCameraIcon,
  VideoCameraSlashIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/solid";

// import {
//   VideoCameraIcon,
//   VideoCameraSlashIcon,
//   MicrophoneIcon,
//   MicrophoneSlashIcon,
// } from "@heroicons/react/24/solid";


const Preview = () => {
  const MicrophoneSlashIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6 text-white"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9V5.25a3.75 3.75 0 10-7.5 0V9m11.5 11.5l-15-15m9.5 7.5v1.25a3.75 3.75 0 01-3.3 3.725M19.5 10.5v2a7.5 7.5 0 01-10.02 7.12M3 10.5v2a7.48 7.48 0 002.628 5.67"
      />
    </svg>
  );
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isVideoEnabled, setVideoEnabled] = useState(true);
  const [isAudioEnabled, setAudioEnabled] = useState(true);
  const streamRef = useRef(null); // Use a ref to persist the stream across renders

  useEffect(() => {
    const getMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        streamRef.current = mediaStream; // Store the stream in the ref
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
        alert("Please allow access to your camera and microphone.");
      }
    };

    getMedia();

    // Cleanup function to stop the media tracks
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoEnabled;
        setVideoEnabled(!isVideoEnabled);
      }
    }
  };

  const toggleAudio = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isAudioEnabled;
        setAudioEnabled(!isAudioEnabled);
      }
    }
  };

  const startCall = () => {
    // Redirect to the video call page with additional parameters if needed
    navigate(`/call`);
  };

  return (
    <div className="preview-container flex flex-col items-center justify-center p-4">
      <div className="video-preview border rounded-lg overflow-hidden mb-4">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full h-auto"
          style={{ transform: "scaleX(-1)" }} // Mirror the video preview
        />
      </div>
      <div className="controls flex gap-4">
        <button
          onClick={toggleVideo}
          className={`p-2 rounded-full ${
            isVideoEnabled ? "bg-green-500" : "bg-red-500"
          }`}
          title={isVideoEnabled ? "Turn Off Video" : "Turn On Video"}
        >
          {isVideoEnabled ? (
            <VideoCameraIcon className="h-6 w-6 text-white" />
          ) : (
            <VideoCameraSlashIcon className="h-6 w-6 text-white" />
          )}
        </button>
        <button
          onClick={toggleAudio}
          className={`p-2 rounded-full ${
            isAudioEnabled ? "bg-green-500" : "bg-red-500"
          }`}
          title={isAudioEnabled ? "Turn Off Audio" : "Turn On Audio"}
        >
          {isAudioEnabled ? (
            <MicrophoneIcon className="h-6 w-6 text-white" />
          ) : (
            <MicrophoneSlashIcon className="h-6 w-6 text-white" />
          )}
        </button>
      </div>
      <button
        onClick={startCall}
        className="mt-4 px-6 py-2 bg-blue-500 rounded text-white"
      >
        Start Call
      </button>
    </div>
  );
};

export default Preview;
