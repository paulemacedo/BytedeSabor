import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    fetchProdutos,
    addProductAsync, 
    updateProductAsync, 
    deleteProductAsync,
    selectAllProducts,
    selectProductsStatus,
    selectProductsError
} from '../redux/productsSlice';
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

const AdminProduto = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const acompanhamentos = useSelector(selectAllAcompanhamentos);
    const productsStatus = useSelector(selectProductsStatus);
    const acompanhamentosStatus = useSelector(selectAcompanhamentosStatus);
    
    const [editingItem, setEditingItem] = useState(null);
    const [form, setForm] = useState({ tipo: '', nome: '', descricao: '', preco: 0, imagem: '', status: 'Em stock' });
    const [filter, setFilter] = useState('');
    const [mode, setMode] = useState('add');
    const [itemType, setItemType] = useState('produto'); // 'produto' or 'acompanhamento'

    useEffect(() => {
        if (productsStatus === 'idle') {
            dispatch(fetchProdutos());
        }
        if (acompanhamentosStatus === 'idle') {
            dispatch(fetchAcompanhamentos());
        }
    }, [dispatch, productsStatus, acompanhamentosStatus]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: name === 'preco' ? parseFloat(value) : value });
    };

    const handleAddItem = async () => {
        try {
            const itemData = {
                ...form,
                tipo: itemType,
                emEstoque: form.status === 'Em stock'
            };
            
            if (itemType === 'produto') {
                await dispatch(addProductAsync(itemData)).unwrap();
            } else {
                await dispatch(addAcompanhamentoAsync(itemData)).unwrap();
            }
            setForm({ tipo: '', nome: '', descricao: '', preco: 0, imagem: '', status: 'Em stock' });
            setMode('manage');
        } catch (error) {
            console.error('Failed to add item:', error);
        }
    };

    // Prepares item for editing
    const handleEditItem = (item) => {
        setEditingItem(item);
        setForm({
            ...item,
            status: item.emEstoque ? 'Em stock' : 'Fora de stock'
        });
        setMode('edit');
        setItemType(item.tipo === 'acompanhamento' ? 'acompanhamento' : 'produto');
    };


    const handleUpdateItem = async () => {
        try {
            const updateData = {
                ...form,
                _id: editingItem._id,
                emEstoque: form.status === 'Em stock',
                tipo: itemType
            };
            
            const result = itemType === 'produto' 
                ? await dispatch(updateProductAsync(updateData)).unwrap()
                : await dispatch(updateAcompanhamentoAsync(updateData)).unwrap();
    
            if (result.success) {
                setEditingItem(null);
                setMode('manage');
                setForm({ tipo: '', nome: '', descricao: '', preco: 0, imagem: '', status: 'Em stock' });
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Failed to update item:', error);
            alert('Erro ao atualizar item: ' + error.message);
        }
    };

    const handleDeleteItem = async (id, type) => {
        if (!window.confirm('Tem certeza que deseja excluir este item?')) return;
        
        try {
            if (type === 'produto') {
                await dispatch(deleteProductAsync(id)).unwrap();
            } else {
                await dispatch(deleteAcompanhamentoAsync(id)).unwrap();
            }
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    const filteredItems = () => {
        const items = itemType === 'produto' ? products : acompanhamentos;
        return filter ? items.filter(item => 
            item.nome.toLowerCase().includes(filter.toLowerCase())
        ) : items;
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
                        <button className="btn admin-produto-delete-btn" onClick={() => handleDeleteItem(item._id, item.tipo)}>
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
                <div className="admin-produto-item-card-content">
                    <p><strong>Tipo:</strong> {item.tipo}</p>
                    <p><strong>Preço:</strong> R$ {item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    <p><strong>Status:</strong> {item.emEstoque ? 'Em stock' : 'Fora de stock'}</p>
                    <p><strong>Descrição:</strong> {item.descricao}</p>
                    <img src={item.imagem} alt={item.nome} className="admin-produto-item-image" />
                </div>
            </div>
        ));
    };

    return (
        <div className="admin-produto-container">
            <h1>Gerenciamento de Produtos</h1>
            <div className="admin-produto-filter-bar">
                <select 
                    value={itemType} 
                    onChange={(e) => setItemType(e.target.value)}
                    className="type-selector"
                >
                    <option value="produto">Produtos</option>
                    <option value="acompanhamento">Acompanhamentos</option>
                </select>
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