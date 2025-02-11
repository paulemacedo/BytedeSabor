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
    const profileImage = useSelector((state) => state.login.profileImage);
    const isAdmin = useSelector((state) => state.login.isAdmin);

    return (
        <header>
            <div className="logo">
                <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
                    <img src={Logo} alt="Logo" />
                </Link>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                <i className={isOpen ? "bi bi-x" : "bi bi-list"}></i>
            </div>
            <nav className={isOpen ? "active" : ""}>
                <Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link>
                {isAdmin ? (
                    <>
                        <Link to="/adminproduto" className="nav-link" onClick={toggleMenu}>Produtos</Link>
                        <Link to="/adminpedidos" className="nav-link" onClick={toggleMenu}>Pedidos</Link>
                    </>
                ) : (
                    <>
                        <Link to="/pedidos" className="nav-link" onClick={toggleMenu}>Pedidos</Link>
                    </>
                )}
                {user ? (
                    <Link to="/user" className="header-user-info nav-link" onClick={toggleMenu}>
                        <img src={profileImage} alt="Profile" className="header-profile-picture" />
                        <div className="header-user-info-text">
                            <p>Bem vindo,</p>
                            <span>{user.nome}</span>
                        </div>
                    </Link>
                ) : (
                    <Link to="/login" className="nav-link" onClick={toggleMenu}>Login</Link>
                )}
            </nav>
        </header>
    );
};

export default Header;