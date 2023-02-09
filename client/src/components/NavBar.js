import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context';
import { Link, useNavigate } from 'react-router-dom'
import { Nav, Navbar, Container, Button, NavDropdown } from "react-bootstrap";
function NavBar() {
    const navigate = useNavigate()
    const { socket, auser } = useContext(AppContext)
    const [user, setUser] = auser

    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        setUser()
        navigate('/')
    };
    const taoGroup = () => {
        navigate('/group')
    };
    return (
        <Navbar bg="light" style={{ position: "sticky" }} fixed="top" max-height="50px" >
            <Container>
                <Link to={user ? '/chat' : '/'}>
                    Home
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {!user && (
                            <Link to="/login" onClick={handleLogout}>
                                <Nav.Link>Login</Nav.Link>
                            </Link>
                        )}
                        <Link to="/group" onClick={taoGroup} >
                            <Nav.Link>Tao Goup</Nav.Link>
                        </Link>

                        {user && (
                            <NavDropdown
                                title={
                                    <>
                                        {user.username}
                                    </>
                                }
                                id="basic-nav-dropdown"
                            >


                                <NavDropdown.Item>
                                    <Button variant="danger" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar