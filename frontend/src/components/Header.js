import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FaOpencart } from 'react-icons/fa'
import { AiFillLock } from 'react-icons/ai'

const Header = () => {
  const logoutHandler = () => {}
  return (
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand className='logo'>geekcart</Navbar.Brand>
        </LinkContainer>
        {/* // dropdown  */}
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <LinkContainer to='/cart'>
              <Nav.Link>
                <FaOpencart size={30} /> cart
              </Nav.Link>
            </LinkContainer>
            <NavDropdown title='username' id='username'>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            {/* login button  */}
            <LinkContainer to='/login'>
              <Nav.Link>
                {' '}
                <AiFillLock size={30} /> Sign In
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
