import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminItemManager from '../components/AdminItemManager';
import AdminNav from '../components/AdminNavbar';
import {
    fetchAcompanhamentosAsync,
    addAcompanhamentoAsync,
    updateAcompanhamentoAsync,
    deleteAcompanhamentoAsync,
    selectAllAcompanhamentos,
    selectAcompanhamentosStatus
} from '../redux/acompanhamentosSlice';

const AdminAcompanhamento = () => {
    const dispatch = useDispatch();
    const acompanhamentos = useSelector(selectAllAcompanhamentos);
    const status = useSelector(selectAcompanhamentosStatus);

    return (
        <>
            <AdminNav />
            <AdminItemManager
                title="Gerenciamento de Acompanhamentos"
                items={acompanhamentos}
                status={status}
                onFetch={() => dispatch(fetchAcompanhamentosAsync())}
                onAdd={(data) => dispatch(addAcompanhamentoAsync(data))}
                onUpdate={(data) => dispatch(updateAcompanhamentoAsync(data))}
                onDelete={(id) => dispatch(deleteAcompanhamentoAsync(id))}
                initialFormState={{ nome: '', descricao: '', preco: 0, imagem: '', emEstoque: true }}
            />
        </>
    );
};

export default AdminAcompanhamento;