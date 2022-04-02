import {Route, Router, Routes} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import DefNavbar from "./components/Navbar.js";
const App = () => {
  window.onbeforeunload = null;

  return (
      <Router history={}>
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
      </Router>
  );
};
export default App;
