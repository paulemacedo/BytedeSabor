import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/loginSlice';
import '../Styles/User.css';
import profilePicture2 from '../assets/Img/profilePicture.jpg';

const User = () => {
    const user = useSelector((state) => state.login.user);
    const profileImage = useSelector((state) => state.login.profileImage);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    if (!user) {
        return <div>Usuario não esta logado.</div>;
    }
    console.log('User data:', user); // Adicione este log
    console.log('Profile image:', profileImage); // Adicione este log

    return (
        <div className="user-container">
            <h2>Bem vindo, {user.nome}</h2>
            <img src={profileImage} alt="Profile" className="profile-picture" />
            <p>{user.email}</p>
            <button className="btn" onClick={handleLogout}>Deslogar</button>
        </div>
    );
};

export default User;