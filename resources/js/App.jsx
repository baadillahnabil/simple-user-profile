import React, { Component } from 'react'
import { Container, Row, Image, Card } from 'react-bootstrap'
import Logo from '../images/logo.png'
import './App.module.scss'

import Login from './Login/Login'
import Register from './Register/Register'

class App extends Component {
  state = {
    showing: 'login'
  }

  moveComponent = to => this.setState({ showing: to })

  render() {
    const { showing } = this.state

    let showedComponent
    if (showing === 'login')
      showedComponent = <Login handleMoveToRegister={this.moveComponent.bind(this, 'register')} />
    else if (showing === 'register')
      showedComponent = <Register handleMoveToLogin={this.moveComponent.bind(this, 'login')} />
    // else if (showing === 'dashboard')
    //   showedComponent = <Login handleMoveToLogin={this.moveComponent.bind(this, 'login')} />

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
