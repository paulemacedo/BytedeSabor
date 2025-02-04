import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/loginSlice';
import EditProfileModal from '../components/EditProfileModal';
import '../Styles/User.css';

const User = () => {
    const user = useSelector((state) => state.login.user);
    const profileImage = useSelector((state) => state.login.profileImage);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleEditProfile = () => {
        setIsModalOpen(true);
    };

    if (!user) {
        return <div id="not-logged-in">Usuario não esta logado.</div>;
    }

    return (
        <div className="user-container">
            <h2>Bem vindo, {user.nome}</h2>
            <img src={profileImage} alt="Profile" className="profile-picture" />
            <p>{user.email}</p>
            <p>{user.endereco}</p>
            <div className="button-group">
                <button className="btn" onClick={handleEditProfile}>Editar Perfil</button>
                <button className="btn" onClick={handleLogout}>Deslogar</button>
            </div>
            <EditProfileModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
        </div>
    );
};


export default User;