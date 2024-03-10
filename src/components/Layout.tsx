import { BrowserRouter } from "react-router-dom";

import CanvasRouter from "src/components/canvas/CanvasRouter";
import DomRouter from "src/components/dom/DomRouter";

export default function Layout() {
  return (
    <BrowserRouter>
      <div className="grid h-screen w-full grid-cols-[minmax(42rem,_1fr)_30rem] gap-1 overflow-hidden bg-neutral-900">
        <section className="bg-canvas rounded-lg">
          <CanvasRouter />
        </section>
        <section className="flex h-screen flex-col overflow-hidden rounded-lg bg-neutral-800">
          <DomRouter />
        </section>
      </div>
    </BrowserRouter>
  );
}
