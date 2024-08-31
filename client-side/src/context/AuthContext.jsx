import {
  signInStart,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  deleteFailure,
  deleteStart,
  deleteSuccess,
  updateStart,
  updateSuccess,
  updateFailure,
} from "../redux/user/userSlice"
import { useDispatch } from "react-redux"
import { app } from "../firebase/firebase"
import { useContext, createContext, useState } from "react"
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const auth = getAuth(app)
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)

  const registerUser = async (formData, setError, setLoading, navigate) => {
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

  const loginUser = async (formData, navigate) => {
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields."))
    }

    try {
      dispatch(signInStart())
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (data.success === false) {
        return dispatch(signInFailure(data.message))
      }

      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate("/")
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: "select_account" })

    try {
      const resultFromGoogle = await signInWithPopup(auth, provider)
      const user = resultFromGoogle.user
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          googlePhotoUrl: user.photoURL,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        dispatch(signInSuccess(data))
        return true
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const signOutUser = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data.message)
      } else {
        dispatch(signOutSuccess())
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteUser = async (userId) => {
    setShowModal(false)
    try {
      dispatch(deleteStart())

      const res = await fetch(`/api/user/delete/${userId}`, {
        method: "DELETE",
      })

      const data = await res.json()

      if (!res.ok) {
        dispatch(deleteFailure(data.message))
      } else {
        dispatch(deleteSuccess())
      }
    } catch (error) {
      dispatch(deleteFailure(error.message))
    }
  }

  const updateUser = async (formData, userId, setUpdateUserSuccess) => {
    try {
      dispatch(updateStart())
      const res = await fetch(`/api/user/update/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (!res.ok) {
        dispatch(updateFailure(data.message))
      } else {
        dispatch(updateSuccess(data))
        setUpdateUserSuccess("User profile updated successfully")
      }
    } catch (error) {
      dispatch(updateFailure(error.message))
    }
  }

  const value = {
    registerUser,
    loginUser,
    signOutUser,
    deleteUser,
    setShowModal,
    showModal,
    updateUser,
    googleLogin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
