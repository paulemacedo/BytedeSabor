import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../Styles/AdminItemManager.css';

const AdminItemManager = ({
  title,
  items,
  status,
  onFetch,
  onAdd,
  onUpdate,
  onDelete,
  extraFields = [],
  initialFormState
}) => {
    const [editingItem, setEditingItem] = useState(null);
    const [form, setForm] = useState(initialFormState);
    const [filter, setFilter] = useState('');
    const [mode, setMode] = useState('manage'); 
    
    useEffect(() => {
        if (status === 'idle') {
            onFetch();
        }
    }, [status, onFetch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: name === 'preco' ? parseFloat(value) : value });
    };

    const handleAddItem = async () => {
        try {
            await onAdd(form);
            setForm(initialFormState);
            setMode('manage');
        } catch (error) {
            console.error('Failed to add item:', error);
        }
    };

    const handleEditItem = (item) => {
        setEditingItem(item);
        setForm({
            ...item,
            emEstoque: item.emEstoque
        });
        setMode('edit');
    };

    const handleUpdateItem = async () => {
        try {
            await onUpdate(form);
            setForm(initialFormState);
            setEditingItem(null);
            setMode('manage');
        } catch (error) {
            console.error('Failed to update item:', error);
        }
    };

    const handleDeleteItem = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este item?')) return;
        try {
            await onDelete(id);
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    const filteredItems = () => {
        return filter ? items.filter(item => 
            item.nome.toLowerCase().includes(filter.toLowerCase())
        ) : items;
    };

    const isAdmin = useSelector((state) => state.login.isAdmin);
    
    if (!isAdmin) {
        return <p className="admin-pedidos-no-access">Acesso não autorizado</p>;
    }

    const renderForm = () => (
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
            {extraFields.map((field) => (
                <div key={field.name} className="admin-produto-form-row">
                    {field.component({ form, handleInputChange })}
                </div>
            ))}
            <div className="admin-produto-form-row">
                <select
                    name="emEstoque"
                    value={form.emEstoque ? 'Em stock' : 'Fora de stock'}
                    onChange={(e) => setForm({ ...form, emEstoque: e.target.value === 'Em stock' })}
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
            <button className="btn" onClick={mode === 'add' ? handleAddItem : handleUpdateItem}>
                {mode === 'add' ? 'Adicionar' : 'Atualizar'}
            </button>
        </div>
    );

    return (
        <div className="admin-produto-container">
            <h1>{title}</h1>
            <div className="admin-produto-filter-bar">
                <input
                    type="text"
                    placeholder="Filtrar por nome..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="filter-input"
                />
                <div className="admin-produto-filter-buttons">
                    <button className="btn" onClick={() => setMode('add')}>
                        <i className="bi bi-plus-circle"></i> Adicionar
                    </button>
                    <button className="btn" onClick={() => setMode('manage')}>
                        <i className="bi bi-gear"></i> Gerenciar
                    </button>
                </div>
            </div>
            {mode === 'add' && renderForm()}
            {mode === 'manage' && (
                <div className="admin-produto-items-list">
                    {filteredItems().map(item => (
                        <div key={item._id} className="admin-produto-item-card">
                            <div className="admin-produto-item-card-header">
                                <h2 className="admin-produto-item-title">{item.nome}</h2>
                                <div className="admin-produto-item-card-actions">
                                    <button className="btn admin-produto-edit-btn" onClick={() => handleEditItem(item)}>
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                    <button className="btn admin-produto-delete-btn" onClick={() => handleDeleteItem(item._id)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="admin-produto-item-card-content">
                                {item.tipo && <p><strong>Tipo:</strong> {item.tipo}</p>}
                                <p><strong>Preço:</strong> R$ {item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                <p><strong>Status:</strong> {item.emEstoque ? 'Em stock' : 'Fora de stock'}</p>
                                <p><strong>Descrição:</strong> {item.descricao}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {mode === 'edit' && renderForm()}
        </div>
    );
};

export default AdminItemManager;