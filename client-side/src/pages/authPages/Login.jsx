import { Link, useNavigate } from "react-router-dom"
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react"
import { useState } from "react"

import { useSelector } from "react-redux"
import OAuth from "../../components/OAuth"
import { useAuth } from "../../context/authContext"

const Login = () => {
  const { loginUser } = useAuth()
  const [formData, setFormData] = useState({})

  const { loading, error } = useSelector((state) => state.user)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    loginUser(formData, navigate)
  }

  return (
    <div className='my-24'>
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
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Email' />
              <TextInput
                type='email'
                placeholder='example@gmail.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Password' />
              <TextInput
                type='password'
                placeholder='**********'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              outline
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>loading...</span>
                </>
              ) : (
                "Login"
              )}
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't have an account? </span>
            <Link to='/register' className='text-blue-500'>
              Register
            </Link>
          </div>
          {error && (
            <Alert className='mt-5' color='failure'>
              {error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
