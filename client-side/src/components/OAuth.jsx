import { Button } from "flowbite-react"
import { AiFillGoogleCircle } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"

const OAuth = () => {
  const { googleLogin } = useAuth()
  const navigate = useNavigate()

  const handleGoogleClick = async () => {
    const loginSuccessful = await googleLogin() // Wait for googleLogin to complete
    if (loginSuccessful) {
      navigate("/")
    }
  }

  return (
    <Button
      type='button'
      gradientDuoTone='pinkToOrange'
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className='w-6 h-6 mr-2' />
      Continue with Google
    </Button>
  )
}

export default OAuth
