import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, deleteUserProfile, logout } from '../redux/loginSlice';
import Modal from 'react-modal';
import '../Styles/EditProfileModal.css';

const EditProfileModal = ({ isOpen, onRequestClose, onSuccess, onError }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.login.user);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        foto: '',
        endereco: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                nome: user.nome || '',
                email: user.email || '',
                foto: user.foto || '',
                endereco: user.endereco || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(updateUserProfile({ ...user, ...formData }));
        if (updateUserProfile.fulfilled.match(result)) {
            onSuccess('Perfil atualizado com sucesso!');
            onRequestClose();
        } else {
            onError('Erro ao atualizar perfil.');
        }
    };

    const handleDeleteProfile = async () => {
        const result = await dispatch(deleteUserProfile(user._id));
        if (deleteUserProfile.fulfilled.match(result)) {
            onSuccess('Perfil excluído com sucesso!');
            dispatch(logout());
            onRequestClose();
        } else {
            onError('Erro ao excluir perfil.');
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal-content" overlayClassName="modal-overlay">
            <h2>Editar Perfil</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="foto">Foto</label>
                    <input type="text" id="foto" name="foto" value={formData.foto} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="endereco">Endereço</label>
                    <input type="text" id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} />
                </div>
                <div className="button-group">
                    <button type="submit" className="btn">Salvar</button>
                    <button type="button" className="btn delete-btn" onClick={handleDeleteProfile}>Excluir Perfil</button>
                </div>
            </form>
        </Modal>
    );
};

export default EditProfileModal;