import RootErrorBoundary from "src/components/Error/RootErrorBoundary";
import { Providers } from "src/layouts/provider";
import Router from "src/layouts/Router";

export default function App() {
  return (
    <RootErrorBoundary>
      <Providers>
        <Router />
      </Providers>
    </RootErrorBoundary>
  );
}
