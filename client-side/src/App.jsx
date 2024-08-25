import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home"
import About from "./pages/About"
import LogIn from "./pages/authPages/Login"
import Register from "./pages/authPages/Register"
import Search from "./pages/Search"
import Projects from "./pages/Projects"

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<MainLayout />}>
          <Route path='' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/register' element={<Register />} />
          <Route path='/search' element={<Search />} />

          <Route path='/projects' element={<Projects />} />
        </Route>
      </>
    )
  )

  return <RouterProvider router={router} />
}

export default App
