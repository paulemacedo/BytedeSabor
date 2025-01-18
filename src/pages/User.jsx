import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/loginSlice';
import '../Styles/User.css';

const User = () => {
    const user = useSelector((state) => state.login.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    if (!user) {
        return <div>Usuario não esta logado.</div>;
    }

    return (
        <div className="user-container">
            <h2>Bem vindo, {user.name}</h2>
            <img src={user.profilePicture} alt="Profile" className="profile-picture" />
            <p>{user.email}</p>
            <button className="btn" onClick={handleLogout}>Deslogar</button>
        </div>
    );
};

export default User;