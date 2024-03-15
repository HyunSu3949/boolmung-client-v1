import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Vector2d } from "konva/lib/types";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Line, Circle } from "react-konva";
import { useDispatch, useSelector } from "react-redux";

import { getPreSignedUrl } from "src/utils/apis/getApis";
import { patchUserInfo } from "src/utils/apis/patchApis";
import { updateImage } from "src/redux/features/authSlice";
import { RootState } from "src/redux/store";
import { openModal } from "src/redux/features/modalSlice";
import ConfirmModal from "src/components/modal/ConfirmModal";

import { SpinnerWithText } from "../common/SpinnerWithText";
import ToolDropdown from "./ToolDropdown";

export default function DrawingEditor() {
  const [isLoading, setIsLoading] = useState(false);
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

  const saveDrawingWithBackground = async () => {
    if (!stageRef.current) return;
    setIsLoading(true);
    const konvaImage = new Image();
    konvaImage.src = stageRef.current.toDataURL();

    konvaImage.onload = async () => {
      if (!stageRef.current) return;
      const tempCanvas = document.createElement("canvas");

      const scaleFactor = 0.5;
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
              dispatch(
                openModal({
                  Component: ConfirmModal,
                  props: { message: "저장이 완료되었습니다" },
                }),
              );
              dispatch(updateImage({ image: objectKey }));
              patchUserInfo({ body: { image: objectKey } });
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
    <div className="flex flex-col items-center justify-center p-4 bg-stone-800">
      <div>
        <div className="flex items-center w-full space-x-2">
          <ToolDropdown selectedValue={tool} onChange={setTool} />
        </div>
        <Stage
          className="bg-white rounded-md"
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
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded shadow hover:bg-blue-700"
          onClick={saveDrawingWithBackground}
          type="button"
        >
          <SpinnerWithText loading={isLoading}>
            <span>저장하기</span>
          </SpinnerWithText>
        </button>
      </div>
    </div>
  );
}
