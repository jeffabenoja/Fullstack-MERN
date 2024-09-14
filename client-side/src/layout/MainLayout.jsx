import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import ScrollToTop from "../components/ScrollToTop"

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    </>
  )
}

export default MainLayout
