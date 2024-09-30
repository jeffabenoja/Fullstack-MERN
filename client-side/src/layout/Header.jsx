import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon, FaSun } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { toggleTheme } from "../redux/theme/theme"
import { useAuth } from "../context/authContext"
import { useFromUrlParams } from "../hooks/useFromUrlParams"
import { useEffect } from "react"

const Header = () => {
  const { signOutUser } = useAuth()
  const dispatch = useDispatch()
  const pathLocation = useLocation().pathname
  const location = useLocation()
  const { searchTerm, setSearchTerm } = useFromUrlParams("searchTerm")

  // useEffect(() => {
  //   setSearchTerm("")
  // }, [pathLocation])

  const navigate = useNavigate()

  const { currentUser } = useSelector((state) => state.user)
  const { theme } = useSelector((state) => state.theme)

  const handleSignOut = () => {
    signOutUser()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const urlParams = new URLSearchParams(location.search)
    urlParams.set("searchTerm", searchTerm)

    const searchQuery = urlParams.toString()

    navigate(`/search?${searchQuery}`)
  }

  return (
    <Navbar className='border-b-2 p-3 border-gray-300'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-yellow-200 rounded'>
          Tatche's
        </span>
        Website
      </Link>
      <form className='relative hidden lg:block' onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button
        className='w-12 h-12 flex items-center justify-center lg:hidden text-gray-500'
        pill
      >
        <AiOutlineSearch />
      </Button>

      <div className='flex gap-2 md:order-2 items-center'>
        <Button
          className='w-12 h-10 hidden sm:block focus:outline-transparent'
          onClick={() => dispatch(toggleTheme())}
          pill
        >
          {theme === "light" ? <FaMoon className='text-black' /> : <FaSun />}
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt='user icon'
                img={currentUser.profilePicture}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/login'>
            <Button
              gradientDuoTone='purpleToBlue'
              outline
              className='focus:ring-2 focus:ring-purple-500 active:ring-2 active:ring-blue-500'
            >
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          active={pathLocation === "/"}
          as={"div"}
          className={pathLocation === "/" ? "text-black" : ""}
        >
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link
          active={pathLocation === "/about"}
          as={"div"}
          className={pathLocation === "/about" ? "text-black" : ""}
        >
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link
          active={pathLocation === "/projects"}
          as={"div"}
          className={pathLocation === "/projects" ? "text-black" : ""}
        >
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
