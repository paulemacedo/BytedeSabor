import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/AdminHome.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminHome = () => {
    return (
        <div className="admin-home-container">
            <h1>Bem-vindo ao Painel Administrativo</h1>
            <div className="admin-home-links">
               <Link to="/adminpedidos" className="admin-home-link">
                    <i className="bi bi-receipt"></i> <span>Gerenciar Pedidos</span>
                </Link>
                <Link to="/adminproduto" className="admin-home-link">
                    <i className="bi bi-box"></i> <span>Gerenciar Produtos</span>
                </Link>
                <Link to="/adminacompanhamento" className="admin-home-link">
                    <i className="bi bi-plus-circle"></i> <span>Gerenciar Acompanhamentos</span>
                </Link>
            </div>
        </div>
    );
};


export default AdminHome;