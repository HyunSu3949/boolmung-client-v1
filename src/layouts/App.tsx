import Router from "src/layouts/Router";
import { Providers } from "src/layouts/provider";

export default function App() {
  return (
    <Providers>
      <Router />
    </Providers>
  );
}
