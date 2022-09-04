import { Navigate, Outlet } from 'react-router-dom'

const WithoutTokenRoute = ({ children }) => {
  const token = JSON.parse(localStorage.getItem('token'))
  if (!token) {
    return <Navigate to='/' replace />
  }
  return <Outlet />
}

export default WithoutTokenRoute
