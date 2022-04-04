import React from "react";
import Home from "./components/Home.js"
import {Route, BrowserRouter, Routes} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import DefNavbar from "./components/Navbar.js";
const App = () => {
  window.onbeforeunload = null;

  return (
      <BrowserRouter>
        <Container>
          <Row>
            <Col lg={12} className={"margin-top"}>
              <DefNavbar/>
              <Routes>
                <Route path="/" element={<Home/>} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
  );
};
export default App;
