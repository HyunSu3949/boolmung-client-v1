import React, { useState, useEffect, useRef } from "react";

import { Svgs } from "src/components/dom/common/Svgs";

export function SoundButton() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioFile = "/sound/fireSound.mp3";
  useEffect(() => {
    const audio = audioRef.current;

    if (playing) {
      audio?.play();
    } else {
      audio?.pause();
    }
    const handleEnded = () => setPlaying(false);
    audio?.addEventListener("ended", handleEnded);

    return () => {
      audio?.removeEventListener("ended", handleEnded);
    };
  }, [playing]);

  const togglePlaying = () => {
    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} src={audioFile} loop />
      <button
        className="flex w-fit items-center space-x-2 whitespace-nowrap "
        onClick={togglePlaying}
        type="button"
      >
        {playing ? (
          <>
            <Svgs id="volume-on" size="1.5rem" title="소리 켜진 아이콘" />
            <span className="text-slate-200">소리 끄기</span>
          </>
        ) : (
          <>
            <Svgs id="volume-off" size="1.5rem" title="소리 꺼진 아이콘" />
            <span className="text-slate-200">소리 켜기</span>
          </>
        )}
      </button>
    </>
  );
}
