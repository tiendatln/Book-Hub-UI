import { BookOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

function Header() {
  const navigate = useNavigate()
  const accessToken = sessionStorage.getItem('accessToken')

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken')
    CookieStoreManager.deleteCookie('refresh_token') // Delete the cookie if it exists
    navigate('/', { replace: true }) // Redirect to the login page after logout
  }

  return (
    <header className="site-header">
      <Link className="brand" to="/">
        <span className="brand-mark"><BookOutlined /></span>
        <span>Book Hub</span>
      </Link>

      <nav className="main-nav">
        <Link to="/">Discover</Link>
        <a href="#categories">Categories</a>
        <a href="#library">My Library</a>
      </nav>

      {accessToken ? (
        <Space size="small">
          <Button type="text" icon={<UserOutlined />}>
            Profile
          </Button>

          <Button type="primary" onClick={handleLogout}>
            Sign out
          </Button>
        </Space>
      ) : (
        <Space size="small">
          <Button type="primary" onClick={() => navigate('/login')}>
            Sign in
          </Button>
        </Space>
      )}
    </header>
  )
}

export default Header