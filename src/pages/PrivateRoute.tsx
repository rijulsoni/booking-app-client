import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { RootState } from "../redux/store/store"

const PrivateRoute = () => {
  const { userInfo } = useSelector((state: RootState) => state.user)
  const [shouldCheckAuth, setShouldCheckAuth] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldCheckAuth(true)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [])

  const isAuthenticated = !!userInfo?._id

  if (!shouldCheckAuth) {
    return null
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />
}

export default PrivateRoute
