import { Link } from "react-router-dom"
import { Label, TextInput, Button } from "flowbite-react"

const Register = () => {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <Link to='/' className='text-4xl font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-yellow-200 rounded'>
              Tatche's
            </span>
            Website
          </Link>
          <p className='text-sm mt-5'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit iusto
            veritatis quasi? Repellat soluta odit vero debitis quidem quos
            explicabo!
          </p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4 '>
            <div>
              <Label value='Username' />
              <TextInput type='text' placeholder='Username' id='username' />
            </div>
            <div>
              <Label value='Email' />
              <TextInput
                type='email'
                placeholder='example@gmail.com'
                id='email'
              />
            </div>
            <div>
              <Label value='Password' />
              <TextInput type='password' placeholder='Password' id='password' />
            </div>
            <Button gradientDuoTone='purpleToPink' outline type='submit'>
              Register
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Already have an account? </span>
            <Link to='/login' className='text-blue-500'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
