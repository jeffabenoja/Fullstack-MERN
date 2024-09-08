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
import Board from "./pages/Board"
import PrivateRoute from "./components/route/PrivateRoute"
import AdminPrivateRoute from "./components/route/AdminPrivateRoute"
import CreatePost from "./pages/CreatePost"
import UpdatePost from "./pages/UpdatePost"
import PostPage from "./pages/PostPage"

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<MainLayout />}>
          {/* Public Route */}
          <Route path='' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='projects' element={<Projects />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/register' element={<Register />} />
          <Route path='/search' element={<Search />} />
          <Route path='/post/:postSlug' element={<PostPage />} />

          {/* Private Route */}
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Board />} />
          </Route>
          <Route element={<AdminPrivateRoute />}>
            <Route path='/post/create-post' element={<CreatePost />} />
            <Route path='/post/update-post/:postId' element={<UpdatePost />} />
          </Route>
        </Route>
      </>
    )
  )

  return <RouterProvider router={router} />
}

export default App
