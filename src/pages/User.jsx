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
        return <div>Loading...</div>;
        window.location.href = '/login';
    }

    return (
        <div className="user-container">
            <h2>Welcome, {user.name}</h2>
            <img src={user.profilePicture} alt="Profile" />
            <p>Email: {user.email}</p>
            {/* Adicione mais informações do usuário conforme necessário */}
            <button className="btn" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default User;