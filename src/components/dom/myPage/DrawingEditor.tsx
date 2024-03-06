import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Vector2d } from "konva/lib/types";
import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Line, Circle } from "react-konva";
import { useDispatch, useSelector } from "react-redux";

import { getPreSignedUrl } from "src/apis/getApis";
import { patchUserInfo } from "src/apis/patchApis";
import { Modal } from "src/components/dom/common/Modal";
import { updateImage } from "src/redux/features/authSlice";
import { RootState } from "src/redux/store";
import { Svgs } from "src/components/dom/common/Svgs";

import { SpinnerWithText } from "../common/SpinnerWithText";

export default function DrawingEditor() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [tool, setTool] = useState("pen");
  const [lines, setLines] = useState<any>([]);
  const isDrawing = useRef(false);
  const imageRef = useRef<Konva.Image>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);
  useEffect(() => {
    const image = new window.Image();
    image.src = user.image;
    image.onload = () => {
      if (imageRef.current) {
        imageRef.current.image(image);
        stageRef.current?.draw();
      }
    };
  }, [user.image]);
  const closeModal = () => {
    setIsOpen(false);
  };
  const saveDrawingWithBackground = async () => {
    if (!stageRef.current) return;
    setIsLoading(true);
    const konvaImage = new Image();
    konvaImage.src = stageRef.current.toDataURL();

    konvaImage.onload = async () => {
      if (!stageRef.current) return;
      const tempCanvas = document.createElement("canvas");

      const scaleFactor = 0.5; // 이미지를 50%로 축소
      tempCanvas.width = stageRef.current.width() * scaleFactor;
      tempCanvas.height = stageRef.current.height() * scaleFactor;
      const ctx = tempCanvas.getContext("2d") as CanvasRenderingContext2D;

      // 하얀색 배경 추가
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

      ctx.drawImage(konvaImage, 0, 0, tempCanvas.width, tempCanvas.height);

      tempCanvas.toBlob(
        async (blob) => {
          if (blob) {
            const {
              data: { url, objectKey },
            } = await getPreSignedUrl({});

            const res = await fetch(url, {
              method: "PUT",
              headers: {
                "Content-Type": "image/png",
              },
              body: blob,
            });

            if (res.status === 200) {
              dispatch(updateImage({ image: objectKey }));
              patchUserInfo({ body: { image: objectKey } });
              setIsOpen(true);
            }
            setIsLoading(false);
          }
        },
        "image/png",
        scaleFactor,
      );
    };
  };
  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;
    const pos = e.target.getStage()?.getPointerPosition() as Vector2d;
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage?.getPointerPosition() as Vector2d;
    const lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div className="flex flex-col items-center justify-center bg-stone-800 p-4">
      <div>
        <div className="flex w-full items-center space-x-2">
          <select
            value={tool}
            onChange={(e) => {
              setTool(e.target.value);
            }}
            className="mb-2 w-24 rounded border-gray-300 px-1 shadow-sm"
          >
            <option className="flex items-center space-x-2" value="pen">
              <span>펜</span>
            </option>
            <option className="flex items-center space-x-2" value="eraser">
              <span>지우개</span>
            </option>
          </select>
          {tool === "pen" ? (
            <Svgs id="edit" size="1.75rem" title="연필 아이콘" />
          ) : (
            <Svgs id="eraser" size="1.75rem" title="지우개 아이콘" />
          )}
        </div>
        <Stage
          className="rounded-md bg-white"
          width={300}
          height={300}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          ref={stageRef}
        >
          <Layer>
            {lines.map((line: any, i: number) => (
              <Line
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                points={line.points}
                stroke="#171414"
                strokeWidth={7}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === "eraser" ? "destination-out" : "source-over"
                }
              />
            ))}
            <Circle
              x={150}
              y={150}
              radius={148} // 원하는 반지름 크기
              stroke="#969696" // 선 색상
              strokeWidth={1} // 선 두께
              dash={[10, 5]} // 점선 스타일 (선택적)
            />
          </Layer>
        </Stage>
        <button
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-700"
          onClick={saveDrawingWithBackground}
          type="button"
        >
          <SpinnerWithText loading={isLoading}>
            <span>저장하기</span>
          </SpinnerWithText>
        </button>
      </div>
      {isOpen && (
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <div className="p-8">
            <p className="text-slate-200">저장이 완료되었습니다</p>
          </div>
        </Modal>
      )}
    </div>
  );
}
