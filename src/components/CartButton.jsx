import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadCart } from '../redux/cartSlice';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Styles/CartButton.css';

const CartButton = () => {
    const cartCount = useSelector((state) => state.cart.count);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(loadCart());
    }, [dispatch]);

    return (
        <Link to="/carrinho" className="cart-button">
            <i className="bi bi-cart"></i>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
    );
};

export default CartButton;