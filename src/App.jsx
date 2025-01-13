import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Pedidos from "./pages/Pedidos";
import Login from "./pages/Login";
import Carrinho from "./pages/Carrinho";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Logo from './Assets/Img/Logo.svg';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <header>
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <i className={isOpen ? "bi bi-x" : "bi bi-list"}></i>
        </div>
        <nav className={isOpen ? "active" : ""}>
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/pedidos" onClick={toggleMenu}>Pedidos</Link>
          <Link to="/login" onClick={toggleMenu}>Login</Link>
          {/* <Link to="/carrinho" onClick={toggleMenu}>Carrinho</Link> */}
        </nav>
      </header>

      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/carrinho" element={<Carrinho />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;