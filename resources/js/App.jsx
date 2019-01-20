import React, { Component } from 'react'
import { Container, Row, Image, Card } from 'react-bootstrap'
import Logo from '../images/logo.png'
import './App.module.scss'

import Login from './Login/Login'
import Register from './Register/Register'
import Dashboard from './Dashboard/Dashboard'
import Update from './Update/Update'

class App extends Component {
  state = {
    showing: 'login'
  }

  componentDidMount() {
    if (window.localStorage.getItem('login_data')) {
      this.setState({ showing: 'dashboard' })
    }
  }

  moveComponent = to => this.setState({ showing: to })

  render() {
    const { showing } = this.state

    let showedComponent
    if (showing === 'login')
      showedComponent = (
        <Login
          handleMoveToRegister={this.moveComponent.bind(this, 'register')}
          handleMoveToDashboard={this.moveComponent.bind(this, 'dashboard')}
        />
      )
    else if (showing === 'register')
      showedComponent = <Register handleMoveToLogin={this.moveComponent.bind(this, 'login')} />
    else if (showing === 'dashboard')
      showedComponent = (
        <Dashboard
          handleMoveToLogin={this.moveComponent.bind(this, 'login')}
          handleMoveToUpdate={this.moveComponent.bind(this, 'update')}
        />
      )
    else if (showing === 'update')
      showedComponent = <Update handleMoveToDashboard={this.moveComponent.bind(this, 'dashboard')} />

    return (
      <>
        <div className="BoxedLayout">
          <Container>
            <Row className="CenteredRow">
              <Card body className="CardBody">
                <Image src={Logo} className="ImageLogo" thumbnail roundedCircle />
                {showedComponent}
              </Card>
            </Row>
          </Container>
        </div>
      </>
    )
  }
}

export default App
