import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";

import { store } from "src/redux/store";

export function Providers({ children }: { children: React.ReactNode }) {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={new QueryClient()}>
          {children}
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
