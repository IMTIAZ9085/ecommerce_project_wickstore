import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './Pages/Home';
import Productpage from './Pages/Productpage';

function App() {
  return (
    <BrowserRouter>
     <div>
    
    {/* //HEADER SECTION OF THE HOMEPAGE */}
      <header>
        <Link to="/">WICK STORE</Link>
      </header>

    {/* //MAIN BODY START HERE */}
      <main>
     
   
      <Routes>

        {/* //homepage route */}
        <Route path="/" element={<Home />}>
        </Route>

        {/* //PRODUCT PAGE ROUTE */}
        <Route path="/product/:slug" element={<Productpage />}>
        </Route>

      </Routes>

       {/* //RENDERING THE PRODUCT data */}
       
      </main>
     </div>
     </BrowserRouter>
  );
}

export default App;
