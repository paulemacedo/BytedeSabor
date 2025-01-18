import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pedidos from "./pages/Pedidos";
import Login from "./pages/Login";
import Register from './pages/Register';
import Carrinho from "./pages/Carrinho";
import User from './pages/User';
import Recovery from './pages/Recovery.jsx';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home"; 
import Management from './pages/Management.jsx';
import './Styles/App.css'; 



const App = () => {
  return (
      <Router>
        <div className="app-wrapper">
          <Header />
          <main className="content" style={{ padding: "1rem" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pedidos" element={<Pedidos />} />
              <Route path="/login" element={<Login />} />
              <Route path="/carrinho" element={<Carrinho />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/password-recovery" element={<Recovery />} />
              <Route path="/user" element={<User />} />
              <Route path="/management" element={<Management />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
  );
};

export default App;