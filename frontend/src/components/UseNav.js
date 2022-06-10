import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Alert, Navbar, Nav } from "react-bootstrap";
import { UserContext } from "../UserContext";

const UseNav = () => {
  const [user, setUser] = useContext(UserContext);
  return (
    <>
      <Navbar variant="dark">
        <Container>
          <Navbar.Brand className="me-auto">
            <Nav.Link as={Link} to="/" className="text-white">
              <h3>Yuveza</h3>
            </Nav.Link>
          </Navbar.Brand>
          <Nav>
            {/* <Nav.Link as={Link} to="/">
              <Button className="btn btn-light mx-2">Home</Button>
            </Nav.Link> */}

            {!user.isLoggedin && (
              <>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </>
            )}
            {user.isLoggedin && (
              <>
                <Nav.Link as={Link} to="/dashboard">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/logout">
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default UseNav;
