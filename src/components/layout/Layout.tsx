import { BrowserRouter } from "react-router-dom";

import CanvasContainer from "src/components/canvas/CanvasContainer";
import DomContainer from "src/components/dom/DomContainer";

export default function Layout() {
  return (
    <BrowserRouter>
      <div className="grid h-screen w-full grid-cols-[minmax(42rem,_1fr)_30rem] gap-1 overflow-hidden bg-neutral-900">
        <section className="bg-canvas rounded-lg">
          <CanvasContainer />
        </section>
        <section className="flex overflow-hidden rounded-lg bg-neutral-800">
          <DomContainer />
        </section>
      </div>
    </BrowserRouter>
  );
}
