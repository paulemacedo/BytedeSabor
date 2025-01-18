import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateProduct, deleteProduct, selectAllProducts } from '../redux/productsSlice';
import '../Styles/AdminProduto.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Management = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const [editingItem, setEditingItem] = useState(null);
    const [form, setForm] = useState({ tipo: '', nome: '', descricao: '', preco: 0 });
    const [filter, setFilter] = useState('');
    const [mode, setMode] = useState('view'); // 'view', 'add', 'edit'

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: name === 'preco' ? parseFloat(value) : value });
    };

    const handleAddItem = () => {
        dispatch(addProduct({ ...form, id: products.length + 100 }));
        setForm({ tipo: '', nome: '', descricao: '', preco: 0 });
    };

    const handleEditItem = (item) => {
        setEditingItem(item);
        setForm(item);
        setMode('edit');
    };

    const handleUpdateItem = () => {
        dispatch(updateProduct({ ...form, preco: parseFloat(form.preco) }));
        setEditingItem(null);
        setForm({ tipo: '', nome: '', descricao: '', preco: 0 });
        setMode('view');
    };

    const handleDeleteItem = (id) => {
        dispatch(deleteProduct(id));
    };

    const filteredProducts = filter ? products.filter(item => item.tipo === filter) : products;

    return (
        <div className="admin-produto-container">
            <h1>Gerenciamento de Produtos</h1>
            <div className="admin-produto-filter-bar">
                <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                    <option value="">Todos</option>
                    <option value="açai">Açaí</option>
                    <option value="picole">Picolé</option>
                    <option value="topping">Acompanhamento</option>
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
                        <div className="price-input">
                            <input
                                type="text"
                                name="preco"
                                placeholder="Preço"
                                value={isNaN(form.preco) ? '' : `R$ ${form.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                onChange={handleInputChange}
                                className="price-field"
                            />
                        </div>
                        <select
                            name="tipo"
                            value={form.tipo}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione o tipo</option>
                            <option value="açai">Açaí</option>
                            <option value="picole">Picolé</option>
                            <option value="topping">Acompanhamento</option>
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
                            <div className="admin-produto-item-card-actions">
                                <button className="btn admin-produto-edit-btn" onClick={() => handleEditItem(item)}>
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button className="btn admin-produto-delete-btn" onClick={() => handleDeleteItem(item.id)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                            <div className="admin-produto-item-card-content">
                                <p><strong>Tipo:</strong> {item.tipo}</p>
                                <p><strong>Nome:</strong> {item.nome}</p>
                                <p><strong>Descrição:</strong> {item.descricao}</p>
                                <p><strong>Preço:</strong> R$ {typeof item.preco === 'number' && !isNaN(item.preco) ? item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}</p>
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
                        <div className="price-input">
                            <input
                                type="text"
                                name="preco"
                                placeholder="Preço"
                                value={isNaN(form.preco) ? '' : `R$ ${form.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                onChange={handleInputChange}
                                className="price-field"
                            />
                        </div>
                        <select
                            name="tipo"
                            value={form.tipo}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione o tipo</option>
                            <option value="açai">Açaí</option>
                            <option value="picole">Picolé</option>
                            <option value="topping">Acompanhamento</option>
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

export default Management;