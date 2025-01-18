import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllOrders, loadOrders, updateOrderStatus } from '../redux/ordersSlice';
import '../Styles/AdminPedidos.css';

const AdminPedidos = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectAllOrders);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        dispatch(loadOrders());
    }, [dispatch]);

    const handleStatusChange = (orderId, status) => {
        dispatch(updateOrderStatus({ orderId, status }));
    };

    const filteredOrders = filter ? orders.filter(order => order.status === filter) : orders;

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
                    <option value="Cancelado">Cancelado</option>
                    <option value="Aguardando Confirmação">Aguardando Confirmação</option>
                </select>
            </div>
            <div className="admin-pedidos-orders-grid">
                {filteredOrders.length === 0 ? (
                    <p className="admin-pedidos-no-orders">Nenhum pedido encontrado.</p>
                ) : (
                    filteredOrders.map((order) => (
                        <div key={order.id} className="admin-pedidos-order-card">
                            <div className="admin-pedidos-order-header">
                                <h2 className="admin-pedidos-order-title">Pedido #{order.id}</h2>
                                <span className="admin-pedidos-order-date">{new Date(order.date).toLocaleDateString('pt-BR')}</span>
                            </div>
                            {order.user && (
                                <div className="admin-pedidos-order-user-info">
                                    <p><strong>Nome:</strong> {order.user.name}</p>
                                    <p><strong>Email:</strong> {order.user.email}</p>
                                    <p><strong>Endereço:</strong> {order.user.email === 'user@example.com' ? 'Rua Ficticia' : order.user.address}</p>
                                </div>
                            )}
                            <ul className="admin-pedidos-order-details">
                                {order.items.map((item, idx) => (
                                    <li key={`${order.id}-${item.nome}-${idx}`} className="admin-pedidos-order-detail-item">
                                        <p>{item.quantity}x {item.nome}</p>
                                        {item.toppings && item.toppings.length > 0 && (
                                            <p>Acompanhamentos: {item.toppings.map(t => t.nome).join(', ')}</p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <div className="admin-pedidos-order-footer">
                                <p className="admin-pedidos-order-total">Total: R$ {order.total ? order.total.toFixed(2) : '0.00'}</p>
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    className="admin-pedidos-status-select"
                                >
                                    <option value="Aguardando Confirmação">Aguardando Confirmação</option>
                                    <option value="Em Preparo">Em Preparo</option>
                                    <option value="Pronto para Retirada">Pronto para Retirada</option>
                                    <option value="A caminho">A caminho</option>
                                    <option value="Concluído">Concluído</option>
                                    <option value="Cancelado">Cancelado</option>
                                </select>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminPedidos;