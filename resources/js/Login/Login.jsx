import React, { Component } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import cogoToast from 'cogo-toast'
import './Login.module.scss'

import configs from '../configs'

class Login extends Component {
  state = {
    email: '',
    password: '',
    isLoading: false
  }

  onChangeEmail = event => {
    this.setState({ email: event.target.value })
  }
  onChangePassword = event => {
    this.setState({ password: event.target.value })
  }

  onClickLogin = async () => {
    if (this.state.email === '' || this.state.password === '') {
      cogoToast.error('Please Fill In The Required Fields')
      return
    }

    this.setState({ isLoading: true })
    try {
      const payload = {
        username: this.state.email,
        password: this.state.password
      }
      const response = await window.axios.post(`${configs.BASE_URL}/login`, payload)
      window.localStorage.setItem('login_data', JSON.stringify(response.data))

      const userData = await window.axios.get(`${configs.BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${response.data.access_token}`
        }
      })
      window.localStorage.setItem('user_data', JSON.stringify(userData.data))

      cogoToast.success('Logged In Successfully!')
      this.props.handleMoveToDashboard()
    } catch (error) {
      const errorResponse = { ...error }
      cogoToast.error(window._.startCase(errorResponse.response.data.message))
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { handleMoveToRegister } = this.props
    const { email, password, isLoading } = this.state

    return (
      <>
        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" required placeholder="Enter email" value={email} onChange={this.onChangeEmail} />
          </Form.Group>
          <Form.Group controlId="formGroupPassword" className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={this.onChangePassword}
            />
          </Form.Group>
          <Button variant="danger" block disabled={isLoading} onClick={this.onClickLogin}>
            {isLoading ? 'Loading...' : 'Sign In'}
          </Button>
        </Form>
        <Alert variant="light" className="mt-4 text-center">
          Don't Have an Account yet?
          <Button variant="link" onClick={handleMoveToRegister}>
            Sign Up Here!
          </Button>
        </Alert>
      </>
    )
  }
}

export default Login
