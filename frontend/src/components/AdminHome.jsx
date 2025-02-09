import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/AdminHome.css';

const AdminHome = () => {
    return (
        <div className="admin-home-container">
            <h1>Bem-vindo ao Painel Administrativo</h1>
            <div className="admin-home-links">
                <Link to="/adminproduto" className="btn">
                    Gerenciar Produtos
                </Link>
                <Link to="/adminpedidos" className="btn">
                    Gerenciar Pedidos
                </Link>
                <Link to="/adminacompanhamento" className="btn">
                    Gerenciar Acompanhamentos
                </Link>
            </div>
        </div>
    );
};

export default AdminHome;