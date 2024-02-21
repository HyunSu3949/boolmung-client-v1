import React, { useState, useEffect, useRef } from "react";

export function SoundButton() {
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
    <>
      <audio ref={audioRef} src={audioFile} loop />
      <button className="flex w-fit whitespace-nowrap " onClick={togglePlaying}>
        {playing ? (
          <>
            <img src="/img/volume-on.svg" alt="소리 켜진 아이콘" />
            <span>소리 끄기</span>
          </>
        ) : (
          <>
            <img src="/img/volume-off.svg" alt="소리 꺼진 아이콘" />
            <span>소리 켜기</span>
          </>
        )}
      </button>
    </>
  );
}
