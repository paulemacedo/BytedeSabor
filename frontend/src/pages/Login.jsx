import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/loginSlice';
import '../Styles/LoginForms.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, senha: password }))
            .unwrap()
            .then((data) => {
                navigate(data.user.isAdmin ? '/admin' : '/user');
            })
            .catch((error) => {
                console.error('Login failed:', error);
            });
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
                        name="email"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <label htmlFor="password" className="form-label">Senha</label>
                <div className="mb-3">
                    <input 
                        type="password" 
                        className="form-input" 
                        id="password" 
                        name="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={handleChange}
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