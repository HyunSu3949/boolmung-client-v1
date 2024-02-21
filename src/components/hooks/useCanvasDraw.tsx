import { useEffect, useRef, MutableRefObject } from "react";
import { useDispatch } from "react-redux";

import { getPreSignedUrl } from "src/apis/getApis";
import { patchUserInfo } from "src/apis/patchApis";
import { updateImage } from "src/redux/features/authSlice";

type Point = {
  x: number;
  y: number;
};

export function useCanvasDraw() {
  const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useRef(null);
  const isDrawingRef: MutableRefObject<boolean> = useRef(false);
  const prevPointRef: MutableRefObject<Point | null> = useRef(null);
  const dispatch = useDispatch();

  const saveDrawing = async () => {
    if (!canvasRef.current || !canvasRef) return;

    const context = canvasRef.current.getContext("2d");
    if (context) {
      context.save();
      const { width, height } = canvasRef.current;
      context.globalCompositeOperation = "destination-over";
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, width, height);
    }

    canvasRef.current.toBlob(async (blob) => {
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
        }
      }
    }, "image/png");
  };

  useEffect(() => {
    function drawLine(
      start: Point | null,
      end: Point,
      ctx: CanvasRenderingContext2D,
      color: string,
      width: number,
    ) {
      if (!start) start = end;
      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.strokeStyle = color;
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
      ctx.fill();
    }

    function onDraw(
      ctx: CanvasRenderingContext2D,
      point: Point,
      prevPoint: Point | null,
    ) {
      drawLine(prevPoint, point, ctx, "#000000", 5);
    }

    function computePointInCanvas(
      clientX: number,
      clientY: number,
    ): Point | null {
      if (canvasRef.current) {
        const boundingRect = canvasRef.current.getBoundingClientRect();
        return {
          x: clientX - boundingRect.left,
          y: clientY - boundingRect.top,
        };
      }
      return null;
    }

    const mouseMoveListener = (e: MouseEvent) => {
      if (isDrawingRef.current && canvasRef.current) {
        const point = computePointInCanvas(e.clientX, e.clientY);
        const ctx = canvasRef.current.getContext("2d");
        if (ctx && point) onDraw(ctx, point, prevPointRef.current);
        prevPointRef.current = point;
      }
    };

    const mouseUpListener = () => {
      isDrawingRef.current = false;
      prevPointRef.current = null;
    };

    window.addEventListener("mousemove", mouseMoveListener);
    window.addEventListener("mouseup", mouseUpListener);

    return () => {
      window.removeEventListener("mousemove", mouseMoveListener);
      window.removeEventListener("mouseup", mouseUpListener);
    };
  }, []);

  return {
    setCanvasRef: (ref: HTMLCanvasElement) => {
      canvasRef.current = ref;
    },
    onCanvasMouseDown: () => {
      isDrawingRef.current = true;
    },
    saveDrawing,
  };
}
