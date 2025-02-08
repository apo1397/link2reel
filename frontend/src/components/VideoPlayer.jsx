import React from "react";

const VideoPlayer = ({ videoUrl }) => {
  if (!videoUrl) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <video controls width="100%" height="auto">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;