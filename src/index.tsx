import ReactDOM from "react-dom/client";
import App from "src/App";
import "src/tailwind/main.css"

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
