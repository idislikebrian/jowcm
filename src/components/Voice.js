import React, { useRef, useEffect, useState } from "react";
import styles from "./Voice.module.css";

const Voice = () => {
  const streamUrl = process.env.NEXT_PUBLIC_STREAM_URL;
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = true; 
    }
  }, []);

  const togglePlayMute = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            audioRef.current.muted = false;
            setIsMuted(false);
          })
          .catch((err) => {
            console.error("Playback failed:", err);
            alert("Failed to play audio. Please check your stream URL.");
          });
      } else {
        audioRef.current.muted = !audioRef.current.muted;
        setIsMuted(audioRef.current.muted);
      }
    }
  };

  return (
    <div className={styles.voiceWrapper}>
      <audio ref={audioRef} loop>
        <source src={streamUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <button className={styles.muteButton} onClick={togglePlayMute}>
        {isMuted ? (
          <svg
            fill="white"
            width="24px"
            height="24px"
            viewBox="-1.5 0 19 19"
            xmlns="http://www.w3.org/2000/svg"
            className="cf-icon-svg"
          >
            <path d="M7.676 4.938v9.63c0 .61-.353.756-.784.325l-2.896-2.896H2.02A1.111 1.111 0 0 1 .911 10.89V8.618a1.112 1.112 0 0 1 1.108-1.109h1.977l2.896-2.896c.43-.43.784-.284.784.325zm7.251 6.888a.554.554 0 1 1-.784.784l-2.072-2.073-2.073 2.073a.554.554 0 1 1-.784-.784l2.073-2.073L9.214 7.68a.554.554 0 0 1 .784-.783L12.07 8.97l2.072-2.073a.554.554 0 0 1 .784.783l-2.072 2.073z" />
          </svg>
        ) : (
          <svg
            fill="white"
            width="24px"
            height="24px"
            viewBox="-1.5 0 19 19"
            xmlns="http://www.w3.org/2000/svg"
            class="cf-icon-svg"
          >
            <path d="M7.098 4.769v9.63c0 .61-.353.756-.784.325L3.42 11.828H1.442A1.112 1.112 0 0 1 .333 10.72V8.448A1.112 1.112 0 0 1 1.442 7.34h1.977l2.895-2.896c.431-.43.784-.285.784.325zm2.076 7.474a.553.553 0 0 0 .392-.163 3.53 3.53 0 0 0 0-4.992.554.554 0 1 0-.784.784 2.422 2.422 0 0 1 0 3.425.554.554 0 0 0 .392.946zm2.184 1.629a6.059 6.059 0 0 0 0-8.575.554.554 0 0 0-.784.783 4.955 4.955 0 0 1 0 7.008.554.554 0 0 0 .784.784zm1.79 1.79a8.59 8.59 0 0 0 0-12.157.554.554 0 0 0-.783.784 7.481 7.481 0 0 1 0 10.59.554.554 0 1 0 .784.784z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Voice;
