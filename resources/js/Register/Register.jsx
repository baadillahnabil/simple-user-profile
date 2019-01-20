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
    errorMessages: [],
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
        name: this.state.fullName,
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password,
        password_confirmation: this.state.confirmPassword
      }
      const response = await window.axios.post(`${configs.BASE_URL}/register`, payload)

      cogoToast.success(window._.startCase(response.data.message))
      this.props.handleMoveToLogin()
    } catch (error) {
      const errorResponse = { ...error }
      cogoToast.error(window._.startCase(errorResponse.response.data.message))

      const errors = errorResponse.response.data.errors
      if (errors) {
        this.state.errorMessages = []
        if (errors.name) errors.name.map(message => this.state.errorMessages.push(message))
        if (errors.email) errors.email.map(message => this.state.errorMessages.push(message))
        if (errors.phone) errors.phone.map(message => this.state.errorMessages.push(message))
        if (errors.password) errors.password.map(message => this.state.errorMessages.push(message))
      }
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { handleMoveToLogin } = this.props
    const { fullName, email, phone, password, confirmPassword, errorMessages, isLoading } = this.state

    let showErrorMessages = <></>
    if (!window._.isEmpty(errorMessages)) {
      showErrorMessages = (
        <Alert variant="danger">
          {errorMessages.map((message, index) => {
            return (
              <li key={index}>
                <b>{message}</b>
              </li>
            )
          })}
        </Alert>
      )
    }

    return (
      <>
        <Form>
          <Form.Group controlId="formGroupFullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Your Full Name" value={fullName} onChange={this.onChangeFullName} />
            <Form.Control.Feedback type="invalid">Looks good!</Form.Control.Feedback>
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
          {showErrorMessages}
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
