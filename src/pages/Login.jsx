import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../redux/loginSlice';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/LoginForms.css';
import profPicture from '../Assets/Img/profilePicture.jpg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulação de login
        if (email === 'user@example.com' && password === 'password') {
            dispatch(loginSuccess({ user: { email, name: 'Anonimo', profilePicture: profPicture, address: 'Rua Ficticia' }, isAdmin: false }));
            navigate('/user');
        } else if (email === 'admin@byte.com' && password === 'admin') {
            dispatch(loginSuccess({ user: { email, name: 'Admin', profilePicture: profPicture, address: 'Admin Address' }, isAdmin: true }));
            navigate('/admin');
        } else {
            dispatch(loginFailure('Invalid credentials'));
        }
    };

    return (
        <div className="container">
            <h2 id="form-title">Login</h2>
            <form id="forrm" onSubmit={handleSubmit}>
                <label htmlFor="email" className="form-label">E-mail</label>
                <div className="mb-3">
                    <input 
                        type="email" 
                        className="form-input" 
                        id="email" 
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <label htmlFor="password" className="form-label">Senha</label>
                <div className="mb-3">
                    <input 
                        type="password" 
                        className="form-input" 
                        id="password" 
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="link-container">
                    <Link to="/password-recovery">Esqueci minha senha</Link>
                </div>
                <div className="center-btn">
                    <button type="submit" className="btn form-btn">Entrar</button>
                </div>
                <div className="link-container">
                    Não tem uma conta? <Link to="/register">Cadastre-se</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;