import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './Pages/Home';
import Productpage from './Pages/Productpage';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap'

function App() {
  return (
    <BrowserRouter>
     <div className="d-flex flex-column site-ct">
    
    {/* //HEADER SECTION OF THE HOMEPAGE */}
    {/* //later we convert it into a bootstrape header */}
      <header>
      <Navbar bg="dark" variant="dark">
      <Container>
      <LinkContainer to="/">
      <Navbar.Brand>WICK STORE</Navbar.Brand>
      </LinkContainer>
      </Container>
      </Navbar>
      </header>

    {/* //MAIN BODY START HERE */}
      <main>
     <Container>

      <Routes>

        {/* //homepage route */}
        <Route path="/" element={<Home />}>
        </Route>

        {/* //PRODUCT PAGE ROUTE */}
        <Route path="/product/:slug" element={<Productpage />}>
        </Route>

      </Routes>

       {/* //RENDERING THE PRODUCT data */}
       </Container>
      </main>
<footer>
  <div className="text-center">All right reserved.</div>
</footer>


     </div>
     </BrowserRouter>
  );
}

export default App;
