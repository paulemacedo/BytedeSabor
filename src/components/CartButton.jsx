import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './CartButton.css';

const CartButton = () => {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartCount(cart.length);
    }, []);

    return (
        <Link to="/carrinho" className="cart-button">
            <i className="bi bi-cart"></i>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
    );
};

export default CartButton;