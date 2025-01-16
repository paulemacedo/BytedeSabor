import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadOrders, selectAllOrders } from '../redux/ordersSlice';
import '../Styles/Pedidos.css';

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
                    orders.map((order) => (
                        <div key={order.id} className="order-item">
                            <div className="order-header">
                                <h2 className="order-title">Pedido #{order.id}</h2>
                                <p className="order-date">{new Date(order.date).toLocaleDateString('pt-BR')}</p>
                            </div>
                            <ul className="order-details">
                                {order.items.map((item, idx) => (
                                    <li key={idx} className="order-detail">
                                        {item.quantity}x {item.nome}
                                    </li>
                                ))}
                            </ul>
                            <p className="order-total">Total: R$ {order.total ? order.total.toFixed(2) : '0.00'}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Pedidos;