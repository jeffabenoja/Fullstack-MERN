import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import "flowbite/dist/flowbite.min.css"
import { store, persistor } from "./redux/store.js"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ContextProvider from "./context/provider/ContextProvider.jsx"

// Create a QueryClient instance
const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <ContextProvider>
            <App />
          </ContextProvider>
        </Provider>
      </PersistGate>
    </QueryClientProvider>
  </StrictMode>
)
