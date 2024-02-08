import { useEffect, useRef, MutableRefObject } from "react";

import { updateProfile } from "src/apis/user/userApis";

interface Point {
  x: number;
  y: number;
}

export function useCanvasDraw() {
  const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useRef(null);
  const isDrawingRef: MutableRefObject<boolean> = useRef(false);
  const prevPointRef: MutableRefObject<Point | null> = useRef(null);

  const saveDrawing = () => {
    if (!canvasRef.current) return;

    const dataUrl = canvasRef.current.toDataURL("image/png");
    fetch(dataUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const formData = new FormData();

        formData.append("photo", blob);

        updateProfile(formData);
      });
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
