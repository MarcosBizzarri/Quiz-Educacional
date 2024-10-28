import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Home from './Home/Home';
import Sobre from './Sobre/Sobre';
import Portugues from './Portugues/Portugues';
import Matematica from './Matematica/Matematica';
import Historia from './Historia/Historia';
import Tela from './Tela/Tela';

function App() {
  return (
    <Router>
      <Navbar className='navbar' expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" className='titulo'>Quiz Educacional</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className='navlink'>Início</Nav.Link>
            <Nav.Link as={Link} to="/sobre" className='linknav'>Sobre</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      
      <Routes>
      <Route path="/" element={<Tela />} />
      <Route path="/home" element={<Home />} />
        <Route path="/portugues" element={<Portugues />} />
        <Route path="/matematica" element={<Matematica />} />
        <Route path="/historia" element={<Historia />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/tela" element={<Tela />} /> 
      </Routes>
    </Router>
  );
}

export default App;
