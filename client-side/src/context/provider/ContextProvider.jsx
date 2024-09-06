import ThemeProvider from "./ThemeProvider"
import { AuthProvider } from "../authContext"
import { AppDataProvider } from "../AppDataContext"

const ContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <AppDataProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AppDataProvider>
    </AuthProvider>
  )
}

export default ContextProvider
