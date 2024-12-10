import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Pedidos from "./pages/Pedidos";
import Login from "./pages/Login";

const App = () => {
  return (
    <Router>
      <header>
        <nav style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#ddd" }}>
          <Link to="/">Home</Link>
          <Link to="/pedidos">Pedidos</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>

      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
