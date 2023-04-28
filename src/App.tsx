import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Tasks from "./pages/tasks/Tasks";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ThemeContext from "./pages/tasks/ThemeContext";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
        <div className={darkMode ? "dark-mode" : "light-mode"}>
          <Navbar expand="md" className="mb-4">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Todo list</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <LinkContainer to="/">
                    <Nav.Link>Home</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/tasks">
                    <Nav.Link>Tasks</Nav.Link>
                  </LinkContainer>
                </Nav>
                {/* Přidáno tlačítko pro přepínání režimu */}
                <Button onClick={toggleDarkMode} className="ms-2">
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </Button>
                {/* Konec přidaného tlačítka */}
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tasks" element={<Tasks />} />
            </Routes>
          </Container>
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
