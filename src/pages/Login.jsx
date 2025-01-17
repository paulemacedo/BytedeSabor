import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../redux/loginSlice';
import { Link } from 'react-router-dom';
import '../Styles/LoginForms.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulação de login
        if (email === 'user@example.com' && password === 'password') {
            dispatch(loginSuccess({ email, profilePicture: 'path/to/profilePicture.jpg' }));
        } else {
            dispatch(loginFailure('Invalid credentials'));
        }
    };

    return (
    <div className="container">
        <h2 id="form-title">Login</h2>
        <form id="login-form" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">E-mail</label>
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
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Senha</label>
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
                <button type="submit" className="btn login-btn">Entrar</button>
            </div>
            <div className="link-container">
                Não tem uma conta? <Link to="/register">Cadastre-se</Link>
            </div>
        </form>
    </div>
    );
};

export default Login;