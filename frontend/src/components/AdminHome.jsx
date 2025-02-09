import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/AdminHome.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminHome = () => {
    return (
        <div className="admin-home-container">
            <h1>Bem-vindo ao Painel Administrativo</h1>
            <div className="admin-home-links">
                <Link to="/adminproduto" className="admin-home-link">
                    <i className="bi bi-box"></i> Gerenciar Produtos
                </Link>
                <Link to="/adminpedidos" className="admin-home-link">
                    <i className="bi bi-receipt"></i> Gerenciar Pedidos
                </Link>
                <Link to="/adminacompanhamento" className="admin-home-link">
                    <i className="bi bi-plus-circle"></i> Gerenciar Acompanhamentos
                </Link>
            </div>
        </div>
    );
};


export default AdminHome;