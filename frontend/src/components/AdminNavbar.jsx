import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setActiveLink } from '../redux/activeLinkSlice';
import '../Styles/AdminNavbar.css';

const AdminNav = () => {
  const activeLink = useSelector((state) => state.activeLink);
  const dispatch = useDispatch();

  const handleLinkClick = (link) => {
    dispatch(setActiveLink(link));
  };

  return (
    <div className="admin-nav-container">
      <nav className="admin-nav">
        <Link
          to="/adminproduto"
          className={`admin-nav-link ${activeLink === 'produto' ? 'active' : ''}`}
          onClick={() => handleLinkClick('produto')}
        >
          <i className="bi bi-box"></i>
          <span>Produtos</span>
        </Link>
        <Link
          to="/adminacompanhamento"
          className={`admin-nav-link ${activeLink === 'acompanhamento' ? 'active' : ''}`}
          onClick={() => handleLinkClick('acompanhamento')}
        >
          <i className="bi bi-plus-circle"></i>
          <span>Acompanhamentos</span>
        </Link>
      </nav>
    </div>
  );
};

export default AdminNav;