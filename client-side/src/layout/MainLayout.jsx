import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import CustomFooter from "../components/CustomFooter"

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <CustomFooter />
    </>
  )
}

export default MainLayout
