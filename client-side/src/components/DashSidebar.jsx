import { Sidebar } from "flowbite-react"
import {
  HiArrowSmRight,
  HiChartPie,
  HiDocumentText,
  HiOutlineUserGroup,
  HiUser,
} from "react-icons/hi"
import { Link } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { useSelector } from "react-redux"
import { useTabFromUrlParams } from "../hooks/useTabFromUrlParams"

const DashSidebar = () => {
  const { currentUser } = useSelector((state) => state.user)
  const { signOutUser } = useAuth()

  // Use the custom hook to get the current tab
  const tab = useTabFromUrlParams()

  const handleSignOut = () => {
    signOutUser()
  }

  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {currentUser?.isAdmin && (
            <>
              <Link to='/dashboard?tab=main-dashboard'>
                <Sidebar.Item
                  active={tab === "main-dashboard" || !tab}
                  icon={HiChartPie}
                  as='div'
                >
                  DashBoard
                </Sidebar.Item>
              </Link>
            </>
          )}
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser?.isAdmin ? "Admin" : "User"}
              labelColor='dark'
              className='cursor-pointer'
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser?.isAdmin && (
            <>
              <Link to={"/dashboard?tab=posts"}>
                <Sidebar.Item
                  active={tab === "posts"}
                  icon={HiDocumentText}
                  className='cursor-pointer'
                  as='div'
                >
                  Post
                </Sidebar.Item>
              </Link>
              <Link to={"/dashboard?tab=users"}>
                <Sidebar.Item
                  active={tab === "users"}
                  icon={HiOutlineUserGroup}
                  className='cursor-pointer'
                  as='div'
                >
                  Users
                </Sidebar.Item>
              </Link>
            </>
          )}
          <Sidebar.Item
            icon={HiArrowSmRight}
            className='cursor-pointer'
            onClick={handleSignOut}
          >
            Log Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar
