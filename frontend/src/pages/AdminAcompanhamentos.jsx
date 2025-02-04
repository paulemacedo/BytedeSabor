import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    fetchAcompanhamentos,
    addAcompanhamentoAsync,
    updateAcompanhamentoAsync,
    deleteAcompanhamentoAsync,
    selectAllAcompanhamentos,
    selectAcompanhamentosStatus
} from '../redux/acompanhamentosSlice';
import '../Styles/AdminProduto.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminAcompanhamento = () => {
    const dispatch = useDispatch();
    const acompanhamentos = useSelector(selectAllAcompanhamentos);
    const acompanhamentosStatus = useSelector(selectAcompanhamentosStatus);
    
    const [editingItem, setEditingItem] = useState(null);
    const [form, setForm] = useState({ nome: '', descricao: '', preco: 0, imagem: '', emEstoque: true });
    const [filter, setFilter] = useState('');
    const [mode, setMode] = useState('add');

    useEffect(() => {
        if (acompanhamentosStatus === 'idle') {
            dispatch(fetchAcompanhamentos());
        }
    }, [dispatch, acompanhamentosStatus]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: name === 'preco' ? parseFloat(value) : value });
    };

    const handleAddItem = async () => {
        try {
            const { nome, descricao, preco, imagem, emEstoque } = form;
            if (!nome || preco === null || preco === '') {
                throw new Error('Nome e preço são campos obrigatórios.');
            }
            const itemData = { nome, descricao, preco, imagem, emEstoque };
            await dispatch(addAcompanhamentoAsync(itemData)).unwrap();
            setForm({ nome: '', descricao: '', preco: 0, imagem: '', emEstoque: true });
            setMode('manage');
        } catch (error) {
            console.error('Failed to add item:', error.message);
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
            const updateData = {
                id: editingItem._id, // Adicione o ID do item que está sendo editado
                ...form,
                emEstoque: form.emEstoque,
            };

            await dispatch(updateAcompanhamentoAsync(updateData)).unwrap();
            setForm({ nome: '', descricao: '', preco: 0, imagem: '', emEstoque: true });
            setEditingItem(null);
            setMode('manage');
        } catch (error) {
            console.error('Failed to update item:', error);
            alert('Erro ao atualizar item: ' + error.message);
        }
    };

    const handleDeleteItem = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este item?')) return;
        
        try {
            await dispatch(deleteAcompanhamentoAsync(id)).unwrap();
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    const filteredItems = () => {
        return filter ? acompanhamentos.filter(item => 
            item.nome.toLowerCase().includes(filter.toLowerCase())
        ) : acompanhamentos;
    };

    const isAdmin = useSelector((state) => state.login.isAdmin);
    
    if (!isAdmin) {
        return <p className="admin-pedidos-no-access">Acesso não autorizado</p>;
    }

    const renderItems = () => {
        return filteredItems().map(item => (
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
                    <p><strong>Preço:</strong> R$ {item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    <p><strong>Status:</strong> {item.emEstoque ? 'Em stock' : 'Fora de stock'}</p>
                    <p><strong>Descrição:</strong> {item.descricao}</p>
                </div>
            </div>
        ));
    };

    return (
        <div className="admin-produto-container">
            <h1>Gerenciamento de Acompanhamentos</h1>
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
                    <button className="btn" onClick={handleAddItem}>Adicionar</button>
                </div>
            )}
            {mode === 'manage' && (
                <div className="admin-produto-items-list">
                    {renderItems()}
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
                    <button className="btn" onClick={handleUpdateItem}>Atualizar</button>
                </div>
            )}
        </div>
    );
};

export default AdminAcompanhamento;