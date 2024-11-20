import React from "react";
import styles from "./BackgroundVideo.module.css";

const BackgroundVideo = () => {
  const playlistId = "PLyxGUOzqcGbRgMg13LGMBzn1AaaCcE9ar&si=3Ns9Q_4zAHNHZG0C";

  return (
    <div className={styles.backgroundVideo}>
      <iframe
        src={`https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1&mute=1&loop=1`}
        frameBorder="0"
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
        title="YouTube Background Video"
      ></iframe>
    </div>
  );
};

export default BackgroundVideo;
