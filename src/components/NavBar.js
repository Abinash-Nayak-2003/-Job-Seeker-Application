import Nav from 'react-bootstrap/Nav'
import { Link, useNavigate } from 'react-router-dom'
import { userIsAuthenticated } from './helpers/auth'
import logo from '../img/logo.jpg'

const NavBar = () => {
  const navigate = useNavigate()
  const adminUser = JSON.parse(window.localStorage.getItem('admin-user'))

  const handleLogOut = () => {
    window.localStorage.removeItem('local-user-Token')
    window.localStorage.removeItem('local-user-Id')
    window.localStorage.removeItem('local-user')
    navigate('/')
  }

  const handleAdminLogOut = () => {
    window.localStorage.removeItem('admin-user')
    window.localStorage.removeItem('admin-token')
    navigate('/')
  }

  return (
    <div className='nav-wrapper'>
      {/* Logo */}
      <Nav className='main-nav'>
        <Nav.Item>
          <Link to='/'>
            <img
              width='75'
              height='75'
              src={logo}
              alt='Logo'
              style={{ cursor: 'pointer' }}
            />
          </Link>
        </Nav.Item>
      </Nav>

      { userIsAuthenticated() ? (
        <Nav className='main-nav'>
          <Nav.Item>
            <Nav.Link as={Link} to='/add-job'>Add A Job</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to='/activities'>Activities</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to='/jobs'>Job Board</Nav.Link>
          </Nav.Item>

          { adminUser && adminUser.is_admin && (
            <>
              <Nav.Item>
                <Nav.Link as={Link} to='/admin-dashboard'>Admin Dashboard</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to='/admin/questions'>User Questions</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to='/admin/feedback'>User Feedback</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={handleAdminLogOut}>Logout Admin</Nav.Link>
              </Nav.Item>
            </>
          )}

          <Nav.Item>
            <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>
          </Nav.Item>
        </Nav>
      ) : (
        <Nav className='main-nav'>
          <Nav.Item>
            <Nav.Link as={Link} to='/register'>Register</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to='/login'>Login</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to='/admin-login'>Admin</Nav.Link>
          </Nav.Item>
        </Nav>
      )}
    </div>
  )
}

export default NavBar
