import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/AdminHome.css';

const AdminHome = () => {
    return (
        <div className="admin-home-container">
            <h1>Bem-vindo ao Painel Administrativo</h1>
            <div className="admin-home-links">
                <Link to="/adminproduto" className="admin-home-link">
                    Gerenciar Produtos
                </Link>
                <Link to="/adminpedidos" className="admin-home-link">
                    Gerenciar Pedidos
                </Link>
            </div>
        </div>
    );
};

export default AdminHome;