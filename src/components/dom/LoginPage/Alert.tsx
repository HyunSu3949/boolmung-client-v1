import React, { useEffect } from "react";
import "./alert.css";

export default function Alert() {
  useEffect(() => {
    const handleAction = () => {
      const blinkingElements = document.querySelectorAll(".blink");
      blinkingElements.forEach((element) => {
        element.classList.remove("blink");
        element.classList.add("hidden");
      });
    };

    document.addEventListener("keydown", handleAction);
    document.addEventListener("click", handleAction);

    return () => {
      document.removeEventListener("keydown", handleAction);
      document.removeEventListener("click", handleAction);
    };
  }, []);

  return (
    <div className="absolute left-5 top-0 flex w-[100vw-480px] flex-col items-center">
      <div className="flex items-center">
        <img
          src="/img/wasd.svg"
          alt="키보드 동작 알림"
          className="blink h-60 w-60"
        />
        <img
          src="/img/drag.svg"
          alt="마우스 동작 알림"
          className="w-40 h-40 blink"
        />
      </div>
      <p className="blink text-slate-200">
        키보드를 눌러 캐릭터를 움직여보세요!{" "}
      </p>
      <p className="blink text-slate-200">
        마우스 클릭 & 드래그로 시야변경도 가능합니다!{" "}
      </p>
    </div>
  );
}
