import React, { useState, useEffect, useRef } from "react";
import "./SoundButton.css";

export const SoundButton = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioFile = "/sound/fireSound.mp3";
  useEffect(() => {
    if (playing) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [playing]);

  useEffect(() => {
    const handleEnded = () => setPlaying(false);
    audioRef.current?.addEventListener("ended", handleEnded);

    return () => {
      audioRef.current?.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlaying = () => {
    setPlaying(!playing);
  };

  return (
    <div className="soundButtonBox">
      <audio ref={audioRef} src={audioFile} loop />
      <button className="soundButton" onClick={togglePlaying}>
        {playing ? (
          <>
            <img
              className="volumeIcon"
              src="/img/volume-on.svg"
              alt="소리 켜진 아이콘"
            />
            <span>소리 끄기</span>
          </>
        ) : (
          <>
            <img
              className="volumeIcon"
              src="/img/volume-off.svg"
              alt="소리 꺼진 아이콘"
            />
            <span>소리 켜기</span>
          </>
        )}
      </button>
    </div>
  );
};
