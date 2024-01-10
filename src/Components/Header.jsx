


import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
function Header() {
  return (
    <div>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <i className='fa-solid fa-people-group me-3'/>
            Employee Management System
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header