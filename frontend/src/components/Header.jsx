import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../assets/Img/icon.svg';
import '../Styles/Header.css';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const user = useSelector((state) => state.login.user);
    const isAdmin = useSelector((state) => state.login.isAdmin);

    return (
        <header>
            <div className="logo">
                <Link to="/" onClick={() => setIsOpen(false)}>
                    <img src={Logo} alt="Logo" />
                </Link>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                <i className={isOpen ? "bi bi-x" : "bi bi-list"}></i>
            </div>
            <nav className={isOpen ? "active" : ""}>
                {isAdmin ? (
                    <>
                        <Link to="/admin" onClick={toggleMenu}>Home</Link>
                        <Link to="/adminproduto" onClick={toggleMenu}>Produtos</Link>
                        <Link to="/adminpedidos" onClick={toggleMenu}>Pedidos</Link>
                    </>
                ) : (
                    <>
                        <Link to="/" onClick={toggleMenu}>Home</Link>
                        <Link to="/pedidos" onClick={toggleMenu}>Pedidos</Link>
                    </>
                )}
                {user ? (
                    <Link to="/user" className="header-user-info" onClick={toggleMenu}>
                        <img src={user.profilePicture} alt="Profile" className="header-profile-picture" />
                        <span>{user.name}</span>
                    </Link>
                ) : (
                    <Link to="/login" onClick={toggleMenu}>Login</Link>
                )}
            </nav>
        </header>
    );
};

export default Header;