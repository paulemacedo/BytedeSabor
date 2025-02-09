// AdminNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/AdminNavbar.css';

const AdminNav = () => {
  return (
    <div className="admin-nav-container">
      <nav className="admin-nav">
        <Link to="/adminproduto" className="admin-nav-link">
        <i className="bi bi-box"></i> 
          <span>Produtos</span>
        </Link>
        <Link to="/adminacompanhamento" className="admin-nav-link">
          <i className="bi bi-plus-circle"></i>
          <span>Acompanhamentos</span>
        </Link>
      </nav>
    </div>
  );
};

export default AdminNav;