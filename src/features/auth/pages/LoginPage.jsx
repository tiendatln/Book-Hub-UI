import { useState } from 'react'
import { ArrowRightOutlined, BookOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, Button, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import './LoginPage.css'

function LoginPage() {
  const [notice, setNotice] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate();

  async function handleSubmit({ username, password }) {

    const accessToken = sessionStorage.getItem('accessToken')
    if(accessToken) {
      navigate('/', { replace: true }) // Redirect to the home page if already logged in
      return
    }
    setNotice(null)
    setIsSubmitting(true)

    try {
      const response = await authService.login(username, password)
      const accessToken = response.data?.body?.accessToken

      console.log('Login response:', response.data) // Log the entire response for debugging

      if (!accessToken) {
        throw new Error(response.data?.message || 'The server did not return an access token.')
      }

      sessionStorage.setItem('accessToken', accessToken)
      setNotice({ type: 'success', message: 'Signed in successfully.' })
      
      navigate('/', { replace: true }) // Redirect to the home page after successful login

    } catch (error) {
      const message = error?.response?.data?.message
        || (error?.request ? 'Could not connect to the server. Please try again.' : error?.message)
        || 'Sign-in failed. Please try again.'

      setNotice({ type: 'error', message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-story" aria-label="Welcome to Book Hub">
        <Link className="login-brand" to="/" aria-label="Book Hub home">
          <span className="login-brand-mark"><BookOutlined /></span>
          <span>Book Hub</span>
        </Link>

        <div className="login-story-copy">
          <span className="login-eyebrow">A home for every reader</span>
          <h1>Come back to<br /><em>your next chapter.</em></h1>
          <p>Pick up where you left off, save the stories you love, and find a little inspiration for what to read next.</p>
        </div>

        <div className="login-book-art" aria-hidden="true">
          <span className="login-art-sun" />
          <span className="login-art-book login-art-book-back" />
          <span className="login-art-book login-art-book-middle" />
          <span className="login-art-book login-art-book-front"><BookOutlined /></span>
          <span className="login-art-note">a good story<br />is waiting</span>
        </div>
        <p className="login-story-footer">Make room for wonder.</p>
      </section>

      <section className="login-panel" aria-labelledby="login-heading">
        <div className="login-form-wrap">
          <Link className="login-back-link" to="/">← <span>Back to discover</span></Link>
          <span className="login-mobile-brand"><BookOutlined /> Book Hub</span>

          <div className="login-heading">
            <span className="login-heading-icon"><LockOutlined /></span>
            <span className="login-eyebrow">Your reading journey</span>
            <h2 id="login-heading">Welcome back</h2>
            <p>Sign in to return to your personal bookshelf.</p>
          </div>

          <Form
            className="login-form"
            layout="vertical"
            requiredMark={false}
            onFinish={handleSubmit}
            onValuesChange={() => setNotice(null)}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please enter your username.' }]}
            >
              <Input
                prefix={<UserOutlined aria-hidden="true" />}
                autoComplete="username"
                placeholder="Enter your username"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter your password.' }]}
            >
              <Input.Password
                prefix={<LockOutlined aria-hidden="true" />}
                autoComplete="current-password"
                placeholder="Enter your password"
                size="large"
              />
            </Form.Item>

            {notice && (
              <Alert
                className="login-notice"
                type={notice.type}
                showIcon
                title={notice.message}
                role="status"
              />
            )}

            <Button
              className="login-submit"
              type="primary"
              htmlType="submit"
              size="large"
              loading={isSubmitting}
            >
              Sign in <ArrowRightOutlined aria-hidden="true" />
            </Button>
          </Form>

          <p className="login-form-footer">
            New to Book Hub? <Link to="/">Explore the library</Link> and find your next favorite.
          </p>
        </div>
      </section>
    </main>
  )
}

export default LoginPage