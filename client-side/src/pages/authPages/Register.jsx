import { Link, useNavigate } from "react-router-dom"
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react"
import { useState } from "react"
import OAuth from "../../components/OAuth"

const Register = () => {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.username || !formData.email || !formData.password) {
      return setError(`Please fill out all fields!`)
    }

    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (data.success === false) {
        return setError(data.message)
      }
      setLoading(false)
      if (res.ok) {
        navigate("/login")
      }
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className='my-20'>
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
              <Label value='Username' />
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
                onChange={handleChange}
              />
            </div>
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
                placeholder='Password'
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
                "Register"
              )}
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Already have an account? </span>
            <Link to='/login' className='text-blue-500'>
              Login
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

export default Register
