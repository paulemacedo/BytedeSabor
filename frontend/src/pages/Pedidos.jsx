import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllOrders, loadOrdersByUserAsync } from '../redux/ordersSlice';
import '../Styles/Pedidos.css';

const Pedidos = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectAllOrders);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        dispatch(loadOrdersByUserAsync());
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
                        <div key={order._id} className="order-item">
                            {selectedOrder && selectedOrder._id === order._id ? (
                                <>
                                    <div className="order-header">
                                        <h2 className="order-title">Pedido #{order._id}</h2>
                                        <span className="order-date">{new Date(order.date).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                    <div className="order-details-section">
                                        <span className="order-status">Status: {order.status}</span>
                                        <ul className="order-details">
                                            {selectedOrder.items && selectedOrder.items.map((item, idx) => (
                                                <li key={`${order._id}-${item.nome}-${idx}`} className="order-detail-item">
                                                    <p>{item.quantity}x {item.nome}</p>
                                                    {item.toppings && item.toppings.length > 0 && (
                                                        <p>Acompanhamentos: {item.toppings.map(t => t.nome).join(', ')}</p>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="order-footer">
                                        <p className="order-total">Total: R$ {order.preco ? order.preco.toFixed(2) : '0.00'}</p>
                                        <button className="btn" onClick={handleCloseDetails}>Fechar</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="order-header">
                                        <h2 className="order-title">Pedido #{order._id}</h2>
                                        <span className="order-date">{new Date(order.date).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                    <span className="order-status">Status: {order.status}</span>
                                    <ul className="order-details">
                                        {order.items && order.items.map((item, idx) => (
                                            <li key={`${order._id}-${item.nome}-${idx}`} className="order-detail">
                                                {item.quantity}x {item.nome}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="order-footer">
                                        <p className="order-total">Total: R$ {order.preco ? order.preco.toFixed(2) : '0.00'}</p>
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