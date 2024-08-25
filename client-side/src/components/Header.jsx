import { Button, Navbar, TextInput } from "flowbite-react"
import { Link, useLocation } from "react-router-dom"
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon } from "react-icons/fa"

const Header = () => {
  const pathLocation = useLocation()

  return (
    <Navbar className='border-b-2 p-3'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-yellow-200 rounded'>
          Tatche's
        </span>
        Website
      </Link>
      <form className='relative hidden lg:block'>
        <TextInput
          type='text'
          placeholder='Search...'
          inputClassName='border-white'
        />
        <AiOutlineSearch className='absolute top-1/4 right-2.5 text-gray-500 text-lg' />
      </form>
      <Button
        className='w-12 h-12 flex items-center justify-center lg:hidden text-gray-500'
        pill
      >
        <AiOutlineSearch />
      </Button>

      <div className='flex gap-2 md:order-2 items-center'>
        <Button className='w-12 h-12 hidden sm:block'>
          <FaMoon className='text-black dark:text-gray-500 text-2xl' />
        </Button>

        <Link to='/register'>
          <Button gradientDuoTone='purpleToBlue'>Sign In</Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={pathLocation === "/"} as={"div"}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={pathLocation === "/about"} as={"div"}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={pathLocation === "/projects"} as={"div"}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
