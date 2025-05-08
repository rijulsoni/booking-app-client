import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store/store"

const PrivateRoute = () => {
  const { userInfo } = useSelector((state: RootState) => state.user)

  const isAuthenticated = !!userInfo

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />
}

export default PrivateRoute
