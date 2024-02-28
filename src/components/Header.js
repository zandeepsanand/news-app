import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Header() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Additional logic to toggle dark mode styles or classes in your application
  };
  return (
    <Navbar
      expand="lg"
      className={darkMode ? "bg-dark text-light" : "bg-light "}

    >
      <Container fluid>
        <Navbar.Brand
          href="#"
          className={darkMode ? "text-light" : "text-dark"}
        >
          News App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              href="#action1"
              className={darkMode ? "text-light" : "text-dark"}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#action2"
              className={darkMode ? "text-light" : "text-dark"}
            >
              New
            </Nav.Link>
            <NavDropdown
              title="Categories"
              id="navbarScrollingDropdown"
              className={darkMode ? "bg-dark text-light" : "bg-light "}
            >
              <NavDropdown.Item
                href="#action3"
                className={darkMode ? "text-light" : "text-dark"}
              >
                World
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action4"
                className={darkMode ? "text-light" : "text-dark"}
              >
                Business
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="#action5"
                className={darkMode ? "text-light" : "text-dark"}
              >
                Tech
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <div className="form-check form-switch" onClick={toggleDarkMode}>
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
              <label className="form-check-label" for="flexSwitchCheckChecked">
                {darkMode ? "Dark" : "Light"}
              </label>
            </div>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
