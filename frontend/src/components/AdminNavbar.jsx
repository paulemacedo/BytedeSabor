import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/AdminNavbar.css';

const AdminNav = () => {
  return (
    <nav className="admin-nav">
      <Link to="/adminproduto" className="admin-nav-link">
        <i className="bi bi-box"></i> Produtos
      </Link>
      <Link to="/adminacompanhamento" className="admin-nav-link">
        <i className="bi bi-plus-circle"></i> Acompanhamentos
      </Link>
    </nav>
  );
};

export default AdminNav;