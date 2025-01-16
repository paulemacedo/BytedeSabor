import React from 'react';
import Catalogo from '../components/Catalogo.jsx';
import CartButton from '../components/CartButton.jsx';

const Home = () => {
    return (
        <>
            <CartButton />   
            <Catalogo />
        </>
    );
};

export default Home;