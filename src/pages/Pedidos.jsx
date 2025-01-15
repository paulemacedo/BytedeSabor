import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadOrders, selectAllOrders } from '../redux/ordersSlice';
import './Pedidos.css';

const Pedidos = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectAllOrders);

    useEffect(() => {
        dispatch(loadOrders());
    }, [dispatch]);

    return (
        <div className="pedidos-container">
            <h1 className="pedidos-title">Meus Pedidos</h1>
            <p className="pedidos-description">Acompanhe aqui os pedidos realizados.</p>
            <div className="orders-list">
                {orders.length === 0 ? (
                    <p className="no-orders">Você ainda não fez nenhum pedido.</p>
                ) : (
                    orders.map((order, index) => (
                        <div key={index} className="order-item">
                            <h2 className="order-title">Pedido #{index + 1}</h2>
                            <ul className="order-details">
                                {order.items.map((item, idx) => (
                                    <li key={idx} className="order-detail">
                                        {item.nome} - Quantidade: {item.quantity} - Preço: R$ {item.preco.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                            <p className="order-total">Total: R$ {order.total.toFixed(2)}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Pedidos;