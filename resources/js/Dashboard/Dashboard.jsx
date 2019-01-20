import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import cogoToast from 'cogo-toast'
import './Dashboard.module.scss'

import configs from '../configs'

class Dashboard extends Component {
  state = {
    isLoading: false
  }

  onClickLogout = async () => {
    this.setState({ isLoading: true })
    try {
      const loginData = JSON.parse(window.localStorage.getItem('login_data'))
      const response = await window.axios.post(`${configs.BASE_URL}/logout`, null, {
        headers: {
          Authorization: `Bearer ${loginData.access_token}`
        }
      })
      cogoToast.success(window._.startCase(response.data.message))
      window.localStorage.clear()
      this.props.handleMoveToLogin()
    } catch (error) {
      const errorResponse = { ...error }
      cogoToast.error(window._.startCase(errorResponse.response.data.message))
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { handleMoveToUpdate } = this.props
    const { isLoading } = this.state
    const userData = JSON.parse(window.localStorage.getItem('user_data'))

    return (
      <>
        <p className="text-center my-4">
          Hai, <b>{userData.name}</b>
        </p>
        <Button variant="outline-primary" block onClick={handleMoveToUpdate}>
          Update Profile
        </Button>
        <Button variant="outline-danger" block disabled={isLoading} onClick={this.onClickLogout}>
          {isLoading ? 'Loading...' : 'Logout'}
        </Button>
      </>
    )
  }
}

export default Dashboard
