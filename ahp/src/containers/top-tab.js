import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';



function Hamburger() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="#home">Analytical Hierarchial Process</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Alternatives</Nav.Link>
              <Nav.Link href="#pricing">Result</Nav.Link>
            </Nav>
           
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  
  export default Hamburger;