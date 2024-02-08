import { useCanvasDraw } from "src/components/hooks/useCanvasDraw";

export default function ImageEditor() {
  const { setCanvasRef, onCanvasMouseDown, saveDrawing } = useCanvasDraw();

  return (
    <div className="bg-slate-200">
      <canvas
        className=""
        width="300px"
        height="300px"
        onMouseDown={onCanvasMouseDown}
        ref={setCanvasRef}
      />
      <button
        className="bg-slate-400 text-slate-900"
        onClick={saveDrawing}
        type="button"
      >
        그림 저장
      </button>
    </div>
  );
}
