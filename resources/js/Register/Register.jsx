import React, { Component } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import cogoToast from 'cogo-toast'
import './Register.module.scss'

import configs from '../configs'

class Register extends Component {
  state = {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    isLoading: false
  }

  onChangeFullName = event => this.setState({ fullName: event.target.value })
  onChangeEmail = event => this.setState({ email: event.target.value })
  onChangePhone = event => this.setState({ phone: event.target.value })
  onChangePassword = event => this.setState({ password: event.target.value })
  onChangeConfirmPassword = event => this.setState({ confirmPassword: event.target.value })

  onClickRegister = async () => {
    if (
      this.state.fullName === '' ||
      this.state.email === '' ||
      this.state.phone === '' ||
      this.state.password === '' ||
      this.state.confirmPassword === ''
    ) {
      cogoToast.error('Please fill in the required data')
      return
    }

    this.setState({ isLoading: true })
    try {
      const payload = {
        username: this.state.email,
        password: this.state.password,
        grant_type: 'password',
        client_id: configs.CLIENT_ID,
        client_secret: configs.CLIENT_SECRET
      }
      const response = await window.axios.post(`${configs.BASE_URL}/oauth/token`, payload)
      window.localStorage.setItem('login_data', JSON.stringify(response.data))
      cogoToast.success('Congratz! You are now successfully logged in!')
    } catch (error) {
      const errorResponse = { ...error }
      cogoToast.error(window._.startCase(errorResponse.response.data.message))
    } finally {
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { handleMoveToLogin } = this.props
    const { fullName, email, phone, password, confirmPassword, isLoading } = this.state

    return (
      <>
        <Form>
          <Form.Group controlId="formGroupFullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Your Full Name" value={fullName} onChange={this.onChangeFullName} />
          </Form.Group>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Your Email" value={email} onChange={this.onChangeEmail} />
          </Form.Group>
          <Form.Group controlId="formGroupPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" placeholder="Your Phone Number" value={phone} onChange={this.onChangePhone} />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={this.onChangePassword}
            />
          </Form.Group>
          <Form.Group controlId="formGroupConfirmPassword" className="mb-4">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Your Confirm Password"
              value={confirmPassword}
              onChange={this.onChangeConfirmPassword}
            />
          </Form.Group>
          <Button variant="danger" block disabled={isLoading} onClick={this.onClickRegister}>
            {isLoading ? 'Loading...' : 'Sign Up'}
          </Button>
        </Form>
        <Alert variant="light" className="mt-4 text-center">
          Already Have an Account?
          <Button variant="link" onClick={handleMoveToLogin}>
            Sign In Here!
          </Button>
        </Alert>
      </>
    )
  }
}

export default Register
