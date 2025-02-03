import React from 'react';
import Catalogo from '../components/Catalogo.jsx';
import CartButton from '../components/CartButton.jsx';
import { useSelector } from 'react-redux';
import AdminHome from '../components/AdminHome.jsx';
import '../Styles/Home.css';

const Home = () => {
    const user = useSelector((state) => state.login.user);
    const isAdmin = useSelector((state) => state.login.isAdmin);

    return (
        <>
            {isAdmin ? (
                <AdminHome />
            ) : null}
            {user ? (
                <>
                    <CartButton />
                    <Catalogo />
                </>
            ) : (
                <div className="welcome-message">
                    <h2>Bem-vindo ao Byte de Sabor</h2>
                    <p>Faça login para ver nosso catálogo</p>
                </div>
            )}
        </>
    );
}

export default Home;