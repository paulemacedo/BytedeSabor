import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminItemManager from '../components/AdminItemManager';
import AdminNav from '../components/AdminNavbar';
import {
    fetchProdutosAsync,
    addProductAsync,
    updateProductAsync,
    deleteProductAsync,
    selectAllProducts,
    selectProductsStatus
} from '../redux/productsSlice';

const AdminProduto = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const status = useSelector(selectProductsStatus);

    const extraFields = [
        {
            name: 'tipo',
            component: ({ form, handleInputChange }) => (
                <select
                    name="tipo"
                    value={form.tipo}
                    onChange={handleInputChange}
                    className="type-selector"
                >
                    <option value="">Selecione o tipo</option>
                    <option value="açai">Açaí</option>
                    <option value="picole">Picolé</option>
                </select>
            )
        }
    ];

    return (
        <>
            <AdminNav />
            <AdminItemManager
                title="Gerenciamento de Produtos"
                items={products}
                status={status}
                onFetch={() => dispatch(fetchProdutosAsync())}
                onAdd={(data) => dispatch(addProductAsync(data))}
                onUpdate={(data) => dispatch(updateProductAsync(data))}
                onDelete={(id) => dispatch(deleteProductAsync(id))}
                extraFields={extraFields}
                initialFormState={{ tipo: '', nome: '', descricao: '', preco: 0, imagem: '', emEstoque: true }}
            />
        </>
    );
};

export default AdminProduto;