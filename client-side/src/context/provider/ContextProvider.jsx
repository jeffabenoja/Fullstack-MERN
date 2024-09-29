import ThemeProvider from "./ThemeProvider"
import { AuthProvider } from "../authContext"

const ContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  )
}

export default ContextProvider
