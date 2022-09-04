import { Navigate, Outlet } from 'react-router-dom'

const WithTokenRoute = ({ children }) => {
  const token = JSON.parse(localStorage.getItem('token'))
  if (token) {
    return <Navigate to='todo' replace />
  }
  return <Outlet />
}

export default WithTokenRoute
