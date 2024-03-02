import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

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
          className={darkMode ? "text-light ps-5" : "text-dark"}
        >
          W-News
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
       
          </Nav>
          <Form className="d-flex">
            <div className="form-check form-switch" onClick={toggleDarkMode}>
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                {darkMode ? "Light" : "Dark"}
              </label>
            </div>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
