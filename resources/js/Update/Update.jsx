import React, { Component } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import cogoToast from 'cogo-toast'
import './Update.module.scss'

import configs from '../configs'

class Update extends Component {
  state = {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    errorMessages: [],
    isLoading: false
  }

  componentDidMount() {
    const userData = JSON.parse(window.localStorage.getItem('user_data'))
    this.setState({
      fullName: userData.name,
      email: userData.email,
      phone: userData.phone
    })
  }

  onChangeFullName = event => this.setState({ fullName: event.target.value })
  onChangeEmail = event => this.setState({ email: event.target.value })
  onChangePhone = event => this.setState({ phone: event.target.value })
  onChangePassword = event => this.setState({ password: event.target.value })
  onChangeConfirmPassword = event => this.setState({ confirmPassword: event.target.value })

  onClickUpdate = async () => {
    this.setState({ isLoading: true })
    try {
      const payload = {
        name: this.state.fullName,
        phone: this.state.phone,
        password: this.state.password,
        password_confirmation: this.state.confirmPassword
      }

      const userData = JSON.parse(window.localStorage.getItem('user_data'))
      if (this.state.fullName === userData.name) delete payload.name
      if (this.state.phone === userData.phone) delete payload.phone

      const loginData = JSON.parse(window.localStorage.getItem('login_data'))
      const response = await window.axios.put(`${configs.BASE_URL}/users/${userData.id}`, payload, {
        headers: {
          Authorization: `Bearer ${loginData.access_token}`
        }
      })

      cogoToast.success(window._.startCase(response.data.message))
      this.props.handleMoveToDashboard()
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
    const { handleMoveToDashboard } = this.props
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
            <Form.Control type="email" placeholder="Your Email" disabled value={email} onChange={this.onChangeEmail} />
          </Form.Group>
          <Form.Group controlId="formGroupPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" placeholder="Your Phone Number" value={phone} onChange={this.onChangePhone} />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Your New Password"
              value={password}
              onChange={this.onChangePassword}
            />
          </Form.Group>
          <Form.Group controlId="formGroupConfirmPassword" className="mb-4">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Your Confirm New Password"
              value={confirmPassword}
              onChange={this.onChangeConfirmPassword}
            />
          </Form.Group>
          {showErrorMessages}
          <Button variant="danger" block disabled={isLoading} onClick={this.onClickUpdate}>
            {isLoading ? 'Loading...' : 'Save Changes'}
          </Button>
        </Form>
        <Button variant="link" className="mt-3" block onClick={handleMoveToDashboard}>
          Back
        </Button>
      </>
    )
  }
}

export default Update
