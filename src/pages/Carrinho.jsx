import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, loadCart, getTotalPrice, addToCart, removeFromCart } from '../redux/cartSlice';
import { addOrder } from '../redux/ordersSlice';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Styles/Carrinho.css';

const Carrinho = () => {
    const cart = useSelector((state) => state.cart.items);
    const totalPrice = useSelector((state) => getTotalPrice(state));
    const user = useSelector((state) => state.login.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCart());
    }, [dispatch]);

    useEffect(() => {
        console.log('Total Price:', totalPrice);
    }, [totalPrice]);

    const handleCheckout = () => {
        if (!user) {
            alert('Você precisa estar logado para finalizar o pedido.');
            return;
        }

        const order = {
            id: new Date().getTime(),
            date: new Date().toLocaleString(),
            items: cart,
            total: parseFloat(totalPrice),
            user: {
                name: user.name,
                address: user.address || 'user@example.com',
            },
        };

        dispatch(addOrder(order));
        localStorage.setItem('orders', JSON.stringify([...JSON.parse(localStorage.getItem('orders') || '[]'), order]));

        alert('Pedido finalizado com sucesso!');
        dispatch(clearCart());
    };

    const handleIncreaseQuantity = (item) => {
        dispatch(addToCart(item));
    };

    const handleDecreaseQuantity = (item) => {
        dispatch(removeFromCart(item));
    };

    return (
        <div className="cart-container">
            <h1 className="cart-title">Meu Carrinho</h1>
            {cart.length === 0 ? (
                <p className="cart-empty">Seu carrinho está vazio.</p>
            ) : (
                cart.map((item) => (
                    <div key={`${item.nome}-${JSON.stringify(item.toppings)}`} className="cart-item">
                        <div className="cart-item-content">
                            <div className="cart-content">
                                <p className="cart-item-title">{item.quantity}x {item.nome}</p>
                                {item.toppings && item.toppings.length > 0 && (
                                    <p className="cart-item-toppings">{item.toppings.map(t => t.nome).join(', ')}</p>
                                )}
                            </div>
                            <div className="cart-item-controls">
                                <i className="bi bi-dash-circle cart-item-icon" onClick={() => handleDecreaseQuantity(item)}></i>
                                <i className="bi bi-plus-circle cart-item-icon" onClick={() => handleIncreaseQuantity(item)}></i>
                            </div>
                        </div>
                    </div>
                ))
            )}
            {cart.length > 0 && (
                <div className="cart-summary">
                    <p className="cart-total">Total: R$ {Number(totalPrice).toFixed(2)}</p>
                    <button className="cart-checkout-button btn" onClick={handleCheckout}>Finalizar Pedido</button>
                </div>
            )}
        </div>
    );
};

export default Carrinho;