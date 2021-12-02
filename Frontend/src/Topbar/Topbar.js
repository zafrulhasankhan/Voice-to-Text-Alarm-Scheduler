import React, { useState } from 'react';
import { Nav, NavDropdown, Navbar,Dropdown } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import './Navbar.css';

// import { Avatar } from "@material-ui/core";
function Topbar() {
    const { currentUser, logout, checkOwner } = useAuth();
    // const [setError] = useState("")
    const history = useHistory()

    async function handleLogout() {
        // setError("")

        try {
            await logout()
            history.push("/login")
        } catch {
            // setError("Failed to log out")
        }
    }
    return (
        <div>
            {currentUser ? (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand as={Link} to="/">&ensp;&ensp;Voice to Text Remainder</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link className="nav-link" as={Link} to="/">Home</Nav.Link>


                            <NavDropdown title="Join or create" caret={false} id="collasible-nav-dropdown">
                                {/* <NavDropdown.Item  ><Link style={{ textDecoration: 'none', color: 'black' }} to="/join-course">Join Course</Link></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item><Link style={{ textDecoration: 'none', color: 'black' }} to="/add-course">Add Course</Link></NavDropdown.Item> */}
                                {/* <NavDropdown.Item as={Link} to="/me">text here</NavDropdown.Item> */}
                                <NavDropdown.Item  as={Link} to="/join-course">Join Course</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/add-course">Create Course</NavDropdown.Item>
                            </NavDropdown>



                            <Nav.Link className="nav-link" onClick={handleLogout}>Logout</Nav.Link>


                        </Nav>

                        <Nav style={{ marginRight: '15px' }}>
                            {currentUser?.photoURL ? (
                                <Nav.Link href="#pricing"> <img style={{ borderRadius: '150px', height: '40px', width: '40px' }}
                                    src={currentUser?.photoURL} alt="" /></Nav.Link>
                            ) : (
                                <Nav.Link>

                                    <img style={{ borderRadius: '150px', height: '40px', width: '40px' }}
                                        src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s75-c-fbw=1/photo.jpg"
                                        alt="" />

                                </Nav.Link>
                            )}
                            <Nav.Link href="#pricing" style={{ padding: '2px' }}>
                                <span style={{ fontSize: "14px", padding: '0px' }}>{currentUser?.displayName}</span>
                                <br /><span style={{ fontSize: "13px", padding: '0px' }}>{currentUser?.email}</span>
                            </Nav.Link>

                        </Nav>

                    </Navbar.Collapse>
                </Navbar>

            ) : ""}
        </div>
    );
}

export default Topbar;

