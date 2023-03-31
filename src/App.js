import "./App.css";
import Navbar from "./components/Navbar";
import AddTask from "./components/AddTask";
import { Col, Row } from "react-bootstrap";
import Container from "./../node_modules/react-bootstrap/esm/Container";
import TasksList from "./components/TasksList";

function App() {
  return (
    <>
      <Container>
        <Navbar></Navbar>
        <Row className="justify-content-md-center">
          <Col lg="8">
            <AddTask></AddTask>
            <TasksList></TasksList>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col lg="8"></Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
