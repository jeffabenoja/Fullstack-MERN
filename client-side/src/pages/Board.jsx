import { useFromUrlParams } from "../hooks/useFromUrlParams"
import DashSidebar from "../components/DashSidebar"
import DashProfile from "../components/DashProfile"
import DashPosts from "../components/DashPosts"
import DashUsers from "../components/DashUsers"
import DashBoard from "../components/DashBoard"

const Board = () => {
  // Use the custom hook to get the current tab
  const { searchTerm } = useFromUrlParams("tab")
  const tab = searchTerm

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        <DashSidebar />
      </div>
      {tab === "main-dashboard" && <DashBoard />}
      {tab === "profile" && <DashProfile />}
      {tab === "posts" && <DashPosts />}
      {tab === "users" && <DashUsers />}
    </div>
  )
}

export default Board
