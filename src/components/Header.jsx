// Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Logo from '../Assets/Img/Logo.svg'; // Corrija o caminho se necessário
import '../Styles/Header.css';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
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
            </nav>
        </header>
    );
};

export default Header;