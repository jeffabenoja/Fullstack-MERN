import ThemeProvider from "./ThemeProvider"
import { AuthProvider } from "../authContext"
import { PostProvider } from "../PostContext"

const ContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <PostProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </PostProvider>
    </AuthProvider>
  )
}

export default ContextProvider
