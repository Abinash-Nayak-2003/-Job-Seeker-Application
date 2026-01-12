import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children }) => {
  const adminUser = JSON.parse(window.localStorage.getItem('admin-user'))
  const token = window.localStorage.getItem('admin-token')

  if (adminUser && token && adminUser.is_admin) {
    return children
  }

  return <Navigate to='/admin-login' />
}

export default AdminRoute
