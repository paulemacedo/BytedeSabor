import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateProduct, deleteProduct, selectAllProducts } from '../redux/productsSlice';
import '../Styles/AdminProduto.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminProduto = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts) || [];
    const [editingItem, setEditingItem] = useState(null);
    const [form, setForm] = useState({ tipo: '', nome: '', descricao: '', preco: 0, imagem: '', status: 'Em stock' });
    const [filter, setFilter] = useState('');
    const [mode, setMode] = useState('add'); // Default mode set to 'add'

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: name === 'preco' ? parseFloat(value) : value });
    };

    const handleAddItem = () => {
        dispatch(addProduct({ ...form, id: products.length + 100 }));
        setForm({ tipo: '', nome: '', descricao: '', preco: 0, imagem: '', status: 'Em stock' });
    };

    const handleEditItem = (item) => {
        setEditingItem(item);
        setForm(item);
        setMode('edit');
    };

    const handleUpdateItem = () => {
        dispatch(updateProduct({ ...form, preco: parseFloat(form.preco) }));
        setEditingItem(null);
        setForm({ tipo: '', nome: '', descricao: '', preco: 0, imagem: '', status: 'Em stock' });
        setMode('add'); // Reset to 'add' mode after updating
    };

    const handleDeleteItem = (id) => {
        dispatch(deleteProduct(id));
    };

    const filteredProducts = filter ? products.filter(item => item.tipo === filter) : products;

    const isAdmin = useSelector((state) => state.login.isAdmin);
    
    if (!isAdmin) {
        return <p className="admin-pedidos-no-access">Acesso não autorizado</p>;
    }

    return (
        <div className="admin-produto-container">
            <h1>Gerenciamento de Produtos</h1>
            <div className="admin-produto-filter-bar">
                <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                    <option value="">Todos</option>
                    <option value="açai">Açaí</option>
                    <option value="picole">Picolé</option>
                    <option value="acompanhamento">Acompanhamento</option>
                </select>
                <div className="admin-produto-filter-buttons">
                    <button className="btn" onClick={() => setMode('add')}>
                        <i className="bi bi-plus-circle"></i> Adicionar
                    </button>
                    <button className="btn" onClick={() => setMode('manage')}>
                        <i className="bi bi-gear"></i> Gerenciar
                    </button>
                </div>
            </div>
            {mode === 'add' && (
                <div className="admin-produto-form-container">
                    <div className="admin-produto-form-row">
                        <input
                            type="text"
                            name="nome"
                            placeholder="Nome"
                            value={form.nome}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="admin-produto-form-row">
                        <input
                            type="text"
                            name="preco"
                            placeholder="Preço"
                            value={isNaN(form.preco) ? '' : form.preco}
                            onChange={handleInputChange}
                            className="price-field"
                        />
                        <input
                            type="text"
                            name="imagem"
                            placeholder="URL da Imagem"
                            value={form.imagem}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="admin-produto-form-row">
                        <select
                            name="tipo"
                            value={form.tipo}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione o tipo</option>
                            <option value="açai">Açaí</option>
                            <option value="picole">Picolé</option>
                            <option value="acompanhamento">Acompanhamento</option>
                        </select>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleInputChange}
                        >
                            <option value="Em stock">Em stock</option>
                            <option value="Fora de stock">Fora de stock</option>
                        </select>
                    </div>
                    <textarea
                        name="descricao"
                        placeholder="Descrição"
                        value={form.descricao}
                        onChange={handleInputChange}
                        rows="3"
                    />
                    <button className="btn" onClick={handleAddItem}>Adicionar</button>
                </div>
            )}
            {mode === 'manage' && (
                <div className="admin-produto-items-list">
                    {filteredProducts.map(item => (
                        <div key={item.id} className="admin-produto-item-card">
                            <div className="admin-produto-item-card-header">
                                <h2 className="admin-produto-item-title">{item.nome}</h2>
                                <div className="admin-produto-item-card-actions">
                                    <button className="btn admin-produto-edit-btn" onClick={() => handleEditItem(item)}>
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                    <button className="btn admin-produto-delete-btn" onClick={() => handleDeleteItem(item.id)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="admin-produto-item-card-content">
                                <p><strong>Tipo:</strong> {item.tipo}</p>
                                <p><strong>Preço:</strong> R$ {typeof item.preco === 'number' && !isNaN(item.preco) ? item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}</p>
                                <p><strong>Status:</strong> {item.status}</p>
                                <p><strong>Descrição:</strong> {item.descricao}</p>
                                <img src={item.imagem} alt={item.nome} className="admin-produto-item-image" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {mode === 'edit' && (
                <div className="admin-produto-form-container">
                    <div className="admin-produto-form-row">
                        <input
                            type="text"
                            name="nome"
                            placeholder="Nome"
                            value={form.nome}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="admin-produto-form-row">
                        <input
                            type="text"
                            name="preco"
                            placeholder="Preço"
                            value={isNaN(form.preco) ? '' : form.preco}
                            onChange={handleInputChange}
                            className="price-field"
                        />
                        <input
                            type="text"
                            name="imagem"
                            placeholder="URL da Imagem"
                            value={form.imagem}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="admin-produto-form-row">
                        <select
                            name="tipo"
                            value={form.tipo}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione o tipo</option>
                            <option value="açai">Açaí</option>
                            <option value="picole">Picolé</option>
                            <option value="acompanhamento">Acompanhamento</option>
                        </select>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleInputChange}
                        >
                            <option value="Em stock">Em stock</option>
                            <option value="Fora de stock">Fora de stock</option>
                        </select>
                    </div>
                    <textarea
                        name="descricao"
                        placeholder="Descrição"
                        value={form.descricao}
                        onChange={handleInputChange}
                        rows="3"
                    />
                    <button className="btn" onClick={handleUpdateItem}>Atualizar</button>
                </div>
            )}
        </div>
    );
};

export default AdminProduto;