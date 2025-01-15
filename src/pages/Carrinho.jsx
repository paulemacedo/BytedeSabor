import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, loadCart, getTotalPrice } from '../redux/cartSlice';
import { addOrder } from '../redux/ordersSlice';
import './Carrinho.css';

const Carrinho = () => {
    const cart = useSelector((state) => state.cart.items);
    const totalPrice = useSelector((state) => getTotalPrice(state));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCart());
    }, [dispatch]);

    const handleCheckout = () => {
        const order = {
            id: new Date().getTime(),
            date: new Date().toLocaleString(),
            items: cart,
            total: parseFloat(totalPrice),
        };

        dispatch(addOrder(order));
        localStorage.setItem('orders', JSON.stringify([...JSON.parse(localStorage.getItem('orders') || '[]'), order]));

        alert('Pedido finalizado com sucesso!');
        dispatch(clearCart());
    };

    return (
        <div className="cart-container">
            <h1 className="cart-title">Meu Carrinho</h1>
            <div className="cart-items">
                {cart.length === 0 ? (
                    <p className="cart-empty">Seu carrinho está vazio.</p>
                ) : (
                    cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <div className="cart-item-layout">
                                <div className="cart-item-image-wrapper">
                                    <img src={item.imagem} className="cart-item-image" alt={item.nome} />
                                </div>
                                <div className="cart-item-content">
                                    <div className="cart-item-details">
                                        <h5 className="cart-item-title">{item.nome}</h5>
                                        <p className="cart-item-info">Preço Unitario: R$ {item.preco.toFixed(2)}</p>
                                        <p className="cart-item-info">Quantidade: {item.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {cart.length > 0 && (
                <div className="cart-summary">
                    <h3 className="cart-total">Total: R$ {totalPrice}</h3>
                    <button className="cart-checkout-button" onClick={handleCheckout}>
                        Finalizar Pedido
                    </button>
                </div>
            )}
        </div>
    );
};

export default Carrinho;