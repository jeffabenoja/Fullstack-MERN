import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import "flowbite/dist/flowbite.min.css"
import { store, persistor } from "./redux/store.js"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import ContextProvider from "./context/provider/ContextProvider.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ContextProvider>
          <App />
        </ContextProvider>
      </Provider>
    </PersistGate>
  </StrictMode>
)
