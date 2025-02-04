import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, fetchUser, loadUserFromStorage } from '../redux/loginSlice';
import EditProfileModal from '../components/EditProfileModal';
import '../Styles/User.css';

const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 1 semana em milissegundos

const User = () => {
    const user = useSelector((state) => state.login.user);
    const profileImage = useSelector((state) => state.login.profileImage);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(loadUserFromStorage());
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const userTimestamp = localStorage.getItem('userTimestamp');
        const now = new Date().getTime();

        if (storedUser && storedUser._id && (!userTimestamp || now - userTimestamp >= CACHE_DURATION)) {
            dispatch(fetchUser(storedUser._id));
        }
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleEditProfile = () => {
        setIsModalOpen(true);
    };

    if (!user) {
        return <div id="not-logged-in">Usuario não está logado.</div>;
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