import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllOrders, loadOrders, updateOrderStatus } from '../redux/ordersSlice';
import '../Styles/AdminPedidos.css';

const AdminPedidos = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectAllOrders);
    const [filter, setFilter] = useState('');
    const [cancelMessage, setCancelMessage] = useState('');

    useEffect(() => {
        dispatch(loadOrders());
    }, [dispatch]);

    const handleStatusChange = (orderId, status) => {
        dispatch(updateOrderStatus({ orderId, status }));
    };

    const handleCancelOrder = (orderId) => {
        if (window.confirm('Tem certeza de que deseja cancelar este pedido?')) {
            dispatch(updateOrderStatus({ orderId, status: 'Cancelado' }));
            setCancelMessage(`Pedido #${orderId} foi cancelado.`);
        }
    };

    const filteredOrders = filter ? orders.filter(order => order.status === filter) : orders;

    const isAdmin = useSelector((state) => state.login.isAdmin);

    if (!isAdmin) {
        return <p className="admin-pedidos-no-access">Acesso não autorizado</p>;
    }

    return (
        <div className="admin-pedidos-container">
            <h1 className="admin-pedidos-title">Administração de Pedidos</h1>
            <div className="admin-pedidos-filter-bar">
                <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                    <option value="">Todos</option>
                    <option value="Em Preparo">Em Preparo</option>
                    <option value="Pronto para Retirada">Pronto para Retirada</option>
                    <option value="A caminho">A caminho</option>
                    <option value="Concluído">Concluído</option>
                    <option value="Aguardando Confirmação">Aguardando Confirmação</option>
                </select>
            </div>
            {cancelMessage && <p className="admin-pedidos-cancel-message">{cancelMessage}</p>}
            <div className="admin-pedidos-orders-grid">
                {filteredOrders.length === 0 ? (
                    <p className="admin-pedidos-no-orders">Nenhum pedido encontrado.</p>
                ) : (
                    filteredOrders.map((order) => (
                        <div key={order._id} className="admin-pedidos-order-card">
                            <div className="admin-pedidos-order-header">
                                <h2 className="admin-pedidos-order-title">Pedido #{order._id}</h2>
                                <span className="admin-pedidos-order-date">{new Date(order.date).toLocaleDateString('pt-BR')}</span>
                            </div>
                            {order.usuario && (
                                <div className="admin-pedidos-order-user-info">
                                    <p><strong>Cliente:</strong> {order.usuario.nome}</p>
                                    <p><strong>Email:</strong> {order.usuario.email}</p>
                                </div>
                            )}
                            <ul className="admin-pedidos-order-details">
                                {order.items.map((item, idx) => (
                                    <li key={`${order._id}-${item.nome}-${idx}`} className="admin-pedidos-order-detail-item">
                                        <p>{item.quantity}x {item.nome}</p>
                                        {item.toppings && item.toppings.length > 0 && (
                                            <p>Acompanhamentos: {item.toppings.map(t => t.nome).join(', ')}</p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <div className="admin-pedidos-order-footer">
                                <p className="admin-pedidos-order-total">Total: R$ {order.preco ? order.preco.toFixed(2) : '0.00'}</p>
                                <div className="admin-pedidos-order-actions">
                                    {order.status === 'Cancelado' ? (
                                        <p className="admin-pedidos-order-cancelled">Cancelado</p>
                                    ) : (
                                        <>
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                className="admin-pedidos-status-select"
                                            >
                                                <option value="Aguardando Confirmação">Aguardando Confirmação</option>
                                                <option value="Em Preparo">Em Preparo</option>
                                                <option value="Pronto para Retirada">Pronto para Retirada</option>
                                                <option value="A caminho">A caminho</option>
                                                <option value="Concluído">Concluído</option>
                                            </select>
                                            <button className="admin-pedidos-cancel-button btn" onClick={() => handleCancelOrder(order._id)}>Cancelar Pedido</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminPedidos;