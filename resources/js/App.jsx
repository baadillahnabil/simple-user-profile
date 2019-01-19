import React, { Component } from 'react'
import { Container, Row, Image, Card } from 'react-bootstrap'
import Logo from '../images/logo.png'
import './App.module.scss'

import Login from './Login/Login'

class App extends Component {
  render() {
    return (
      <>
        <div className="BoxedLayout">
          <Container>
            <Row className="CenteredRow">
              <Card body className="CardBody">
                <Image src={Logo} className="ImageLogo" thumbnail roundedCircle />
                <Login />
              </Card>
            </Row>
          </Container>
        </div>
      </>
    )
  }
}

export default App
