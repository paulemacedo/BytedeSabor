import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllOrders, loadOrders } from '../redux/ordersSlice';
import '../Styles/Pedidos.css';

const Pedidos = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectAllOrders);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        dispatch(loadOrders());
    }, [dispatch]);

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseDetails = () => {
        setSelectedOrder(null);
    };

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
                            {selectedOrder && selectedOrder.id === order.id ? (
                                <>
                                     <div className="order-header">
                                        <h2 className="order-title">Pedido #{order.id}</h2>
                                        <span><h2 className="order-date">{new Date(order.date).toLocaleDateString('pt-BR')}</h2></span>
                                    </div>
                                    <ul className="order-details">
                                        {selectedOrder.items.map((item, idx) => (
                                            <li key={idx} className="order-detail-item">
                                                <p>{item.quantity}x {item.nome}</p>
                                                {item.toppings && item.toppings.length > 0 && (
                                                    <p>Acompanhamentos: {item.toppings.map(t => t.nome).join(', ')}</p>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="order-footer">
                                        <p className="order-total">Total: R$ {order.total ? order.total.toFixed(2) : '0.00'}</p>
                                        <button className="btn" onClick={handleCloseDetails}>Fechar</button>
                                        </div>
                                </>
                            ) : (
                                <>
                                    <div className="order-header">
                                        <h2 className="order-title">Pedido #{order.id}</h2>
                                        <span><h2 className="order-date">{new Date(order.date).toLocaleDateString('pt-BR')}</h2></span>
                                    </div>
                                    <ul className="order-details">
                                        {order.items.map((item, idx) => (
                                            <li key={idx} className="order-detail">
                                                {item.quantity}x {item.nome}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="order-footer">
                                        <p className="order-total">Total: R$ {order.total ? order.total.toFixed(2) : '0.00'}</p>
                                        <button className="btn" onClick={() => handleViewDetails(order)}>Ver mais detalhes</button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Pedidos;