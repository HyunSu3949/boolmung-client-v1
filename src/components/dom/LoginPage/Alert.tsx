import React, { useEffect } from "react";

import "./alert.css";
import { Svgs } from "src/components/dom/common/Svgs";

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
        <Svgs id="wasd" size="15rem" className="blink" title="키보드 아이콘" />
        <Svgs id="drag" size="13rem" className="blink" title="마우스 아이콘" />
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
